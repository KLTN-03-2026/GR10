import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission } from './entities/submission.entity';
import { Model, Types } from 'mongoose';
import { TestCase } from '../testcases/entities/testcase.entity';
import { CodeAssignment } from '../code-assignments/entities/code-assignment.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AiAssistantService } from '@/ai-assistant/ai-assistant.service';

@Injectable()
export class SubmissionsService {
  private readonly JUDGE0_URL = 'http://localhost:2358';

  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>,
    @InjectModel(TestCase.name) private readonly testCaseModel: Model<TestCase>,
    @InjectModel(CodeAssignment.name) private readonly codeAssignmentModel: Model<CodeAssignment>,
    private readonly aiAssistantService: AiAssistantService,
    private readonly httpService: HttpService,
  ) {}

  async submitCode(
    userId: string,
    assignmentId: string,
    language: string,
    sourceCode: string,
  ) {
    try {
      //  Kiểm tra bài tập có tồn tại không
      const assignment = await this.codeAssignmentModel.findById(assignmentId);
      if (!assignment) {
        throw new BadRequestException('Không tìm thấy bài tập này.');
      }

      //  Ép kiểu assignmentId sang ObjectId để tìm kiếm chính xác
      const objectId = new Types.ObjectId(assignmentId);

      //  Tìm Test Case - CHÚ Ý: Phải dùng code_assignment_id (giống trong Entity/DB)
      const testCases = await this.testCaseModel
        .find({ code_assignment_id: objectId }) 
        .lean()
        .exec();

      console.log('Số lượng Test Case tìm được:', testCases.length);

      if (!testCases || testCases.length === 0) {
        throw new BadRequestException('Bài tập này chưa có Test Case nào để chấm điểm.');
      }

      //  Map ID ngôn ngữ cho Judge0
      const languageMap = { python: 71, cpp: 54, java: 62, javascript: 63 };
      const languageId = languageMap[language.toLowerCase()];
      if (!languageId) {
        throw new BadRequestException(`Hệ thống chưa hỗ trợ ngôn ngữ: ${language}`);
      }

      let passedCases = 0;
      let maxTime = 0;
      let maxMemory = 0;
      let finalStatus = 'ACCEPTED';
      let errorDetail = null;

      //  Gửi lên Judge0
      const judgePromises = testCases.map(async (testCase: any) => {
        const payload = {
          source_code: Buffer.from(sourceCode).toString('base64'),
          language_id: languageId,
          stdin: testCase.input_data ? Buffer.from(testCase.input_data).toString('base64') : null, 
          expected_output: testCase.expected_output ? Buffer.from(testCase.expected_output).toString('base64') : null,
          cpu_time_limit: assignment.time_limit || 2.0,
          memory_limit: assignment.memory_limit || 128000,
        };
        const response = await firstValueFrom(
          this.httpService.post(
            `${this.JUDGE0_URL}/submissions?base64_encoded=true&wait=true`,
            payload,
            { headers: { 'Content-Type': 'application/json' } },
          ),
        );
        return response.data;
      });

      const judgeResults = await Promise.all(judgePromises);
      // THÊM ĐOẠN NÀY ĐỂ DEBUG: In toàn bộ phản hồi của Judge0 ra Terminal
      console.log("=== KẾT QUẢ TỪ JUDGE0 ===");
      console.log(JSON.stringify(judgeResults, null, 2));
      console.log("=========================");

      // Phân tích kết quả
      for (const result of judgeResults) {
        if (result.status.id === 3) {
          passedCases++;
        } else {
          if (result.status.id === 6) {
            finalStatus = 'COMPILATION_ERROR';
            errorDetail = result.compile_output;
            break;
          }
          if (finalStatus === 'ACCEPTED') {
            finalStatus = result.status.description.toUpperCase().replace(/ /g, '_');
          }
        }
        if (result.time && parseFloat(result.time) > maxTime) maxTime = parseFloat(result.time);
        if (result.memory && result.memory > maxMemory) maxMemory = result.memory;
      }
      // code AI
      // let aiHint = "";
      // if (finalStatus !== 'ACCEPTED') {
      //   aiHint = await this.aiAssistantService.explainError(
      //     language, 
      //     sourceCode, 
      //     finalStatus, 
      //     errorDetail
      //   );
      // }

      //  Lưu Submission 
      const newSubmission = await this.submissionModel.create({
        user_id: userId,        
        assignment_id: assignmentId, 
        language: language,
        code: sourceCode,       
        status: finalStatus,
        score: (passedCases / testCases.length) * 10, 
        ai_hint: null
      });

      return {
        message: 'Chấm bài hoàn tất',
        submission: newSubmission,
        passedCases,
        totalCases: testCases.length,
        compileError: errorDetail,
      };

    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      console.error(error);
      throw new InternalServerErrorException('Lỗi hệ thống chấm bài.');
    }
  }
    // gia su tra loi khi nguoi dung muon hieu sai gi
  async requestAiTutor(submissionId:string){
    const submission = await this.submissionModel.findById(submissionId);
    if(!submission){
      throw new BadRequestException('khong tim thay lich su bai nop')
    }
    if(submission.status === 'ACCEPTED'){
      return { message: 'Bài của bạn đã hoàn hảo, không cần gia sư nữa nhé!' };
    }
    if(submission.ai_hint){
      return {ai_hint:submission.ai_hint,message:'da tra loi cho nguoi dung'};
    }
    try {
      const aiHint = await this.aiAssistantService.explainError(
        submission.language,
        submission.code,
        submission.status,
        null
      )
      // luu cau tra loi vao data
      submission.ai_hint=aiHint;
      await submission.save();
      return { ai_hint: aiHint,message:"luu cau tra loi thanh cong" };
      
    } catch (error) {
      console.error('Lỗi khi gọi Gia sư AI:', error);
      throw new InternalServerErrorException('Gia sư AI đang bận, vui lòng thử lại sau.');
    }
  }

  // HÀM LẤY BÀI TẬP ĐỀ XUẤT CHO USER
  async getRecommendationsForUser(userId: string) {
    //  Tìm các bài user đã nộp nhưng bị sai (WRONG_ANSWER, COMPILATION_ERROR)
    const failedSubmissions = await this.submissionModel
      .find({ user_id: userId, status: { $ne: 'ACCEPTED' } })
      .populate('assignment_id') // Join bảng để lấy thông tin bài tập
      .exec();

    // Gom tất cả các Tags mà user hay làm sai lại
    let weakTags: string[] = [];
    failedSubmissions.forEach(sub => {
      const assignment = sub.assignment_id as any;
      if (assignment && assignment.tags) {
        weakTags.push(...assignment.tags);
      }
    });

    // Nếu user chưa sai bài nào, trả về các bài dễ mặc định
    if (weakTags.length === 0) {
      const easyAssignments = await this.codeAssignmentModel.find({ difficulty: 'EASY' }).limit(5).exec();
      return {weakFocus: [], assignments: easyAssignments};
    }
     try {
      // lay toan bo bai tap trong dv de gui sang python phan tich
      const allAssignmentsRaw = await this.codeAssignmentModel.find().select('_id tags difficulty').lean().exec();
      // dinh dang lai data cho khop format ma python cho
      const allAssignments = allAssignmentsRaw.map(a=>({
        id:a._id.toString(),
        tags: a.tags || [],
        difficulty: a.difficulty || 'EASY'
      }))
      //GỌI SANG MICROSERVICE PYTHON BẰNG HTTP POST
      const pythonResponse = await firstValueFrom(
        this.httpService.post('http://localhost:8000/recommend', {
          weak_tags: weakTags,
          all_assignments: allAssignments
        })
      );

      const recommendedIds = pythonResponse.data.recommended_ids;

      // Nếu Python không tìm được bài nào phù hợp (hoặc báo lỗi logic)
      if(!recommendedIds || recommendedIds.length === 0){
        const backupAssignments = await this.codeAssignmentModel.find({ difficulty: 'EASY' }).limit(5).exec();
        return { weakFocus: weakTags, assignments: backupAssignments };
      }
      //. Query lại Database MongoDB để lấy thông tin chi tiết (tên bài, đề bài...) của các ID được gợi ý
      const finalRecommendations = await this.codeAssignmentModel
        .find({ _id: { $in: recommendedIds } })
        .exec();
        return {
          weakFocus: weakTags, // Báo cho frontend biết user đang yếu tag nào
        assignments: finalRecommendations // Trả danh sách bài tập ra
        }
      
     } catch (e) {
      console.error('Lỗi khi gọi Microservice Python AI:',);
      // Fallback: Nếu sập server Python hoặc lỗi mạng, hệ thống không được chết mà tự động trả về bài dễ
      const fallbackAssignments = await this.codeAssignmentModel.find({ difficulty: 'EASY' }).limit(5).exec();
      return { weakFocus: weakTags, assignments: fallbackAssignments };
      
     }

    // // 3. Nhờ AI phân tích xem yếu phần nào nhất
    // const recommendedTags = await this.aiAssistantService.recommendTags(weakTags);

    // // 4. Tìm trong Database các bài tập có Tag trùng với AI gợi ý
    // // Lấy ưu tiên các bài dễ (EASY) hoặc trung bình (MEDIUM)
    // const recommendedAssignments = await this.codeAssignmentModel
    //   .find({ 
    //     tags: { $in: recommendedTags }, // Tìm bài có chứa tag AI đề xuất
    //     difficulty: { $in: ['EASY', 'MEDIUM'] }
    //   })
    //   .limit(5)
    //   .exec();

    // return {
    //   weakFocus: recommendedTags, // Ví dụ: ['Array', 'For Loop']
    //   assignments: recommendedAssignments // Danh sách 5 bài tập trả về cho Frontend
    // };
  }
}

