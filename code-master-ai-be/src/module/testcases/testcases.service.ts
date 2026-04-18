import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestcaseDto } from './dto/create-testcase.dto';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { TestCase, TestCaseDocument } from './entities/testcase.entity';
import { Model, Types } from 'mongoose';
import { Assignment, AssignmentDocument } from '../assignments/entities/assignment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { CodeAssignment, CodeAssignmentDocument } from '../code-assignments/entities/code-assignment.entity';

@Injectable()
export class TestcasesService {
  private genAI: GoogleGenerativeAI;
  constructor(
    @InjectModel(TestCase.name) private testCaseModel:Model<TestCaseDocument>,
    @InjectModel(Assignment.name) private assignmentModel:Model<AssignmentDocument>,
    @InjectModel(CodeAssignment.name) private codeAssignmentModel: Model<CodeAssignmentDocument>
  ){this.genAI=new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')};
  async generateTestCaseByAI(assignmentId:string , solutionCode:string,constraints:string,numberOfTestCases:number=5){
    const assignment = await this.codeAssignmentModel.findById(assignmentId);
    if(!assignment){
      throw new BadRequestException('khong tim thay bai tap');
    }
    // 2. Thiết lập Prompt ép AI trả về chuẩn cấu trúc DB của bạn
    const prompt = `
      Bạn là chuyên gia thuật toán. Hãy tạo ra ${numberOfTestCases} test cases cho bài toán sau.
      
      THÔNG TIN BÀI TOÁN:
      - Tên bài: ${assignment.title}
      - Mô tả: ${assignment.problem_description}
      - Giới hạn: ${constraints}
      - Code giải chuẩn: \n${solutionCode}

      YÊU CẦU BẮT BUỘC:
      1. Kết quả (expected_output) phải chuẩn xác 100% dựa trên Code giải chuẩn.
      2. 2 test cases đầu tiên set "is_hidden": false. Các test cases còn lại set "is_hidden": true.
      3. CHỈ TRẢ VỀ JSON ARRAY, KHÔNG ĐƯỢC CÓ BẤT KỲ VĂN BẢN NÀO KHÁC.

      Cấu trúc JSON mong muốn:
      [
        {
          "input_data": "giá trị truyền vào",
          "expected_output": "kết quả in ra",
          "is_hidden": boolean
        }
      ]
    `;
    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
      const result = await model.generateContent(prompt); 
      let textResponse = result.response.text();
      
      textResponse = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedTestCases = JSON.parse(textResponse);
      
      const testCasesToSave = parsedTestCases.map(tc => ({
        ...tc,
        assignment_id: new Types.ObjectId(assignmentId)
      }));
      
      const savedTestCases = await this.testCaseModel.insertMany(testCasesToSave);
      
      return {
        message: `Đã tự động tạo và lưu ${savedTestCases.length} Test Cases thành công!`,
        data: testCasesToSave
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException('AI tạo Test Case thất bại, vui lòng thử lại hoặc kiểm tra prompt.');
    }
  }
  // create(createTestcaseDto: CreateTestcaseDto) {
  //   return 'This action adds a new testcase';
  // }

  // findAll() {
  //   return `This action returns all testcases`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} testcase`;
  // }

  // update(id: number, updateTestcaseDto: UpdateTestcaseDto) {
  //   return `This action updates a #${id} testcase`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} testcase`;
  // }
}
