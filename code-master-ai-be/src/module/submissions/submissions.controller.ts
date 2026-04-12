import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { Public } from '@/decorator/customize';

@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('submit')
  @UseGuards(JwtAuthGuard) 
  async submitCode(
    @Req() req,
    @Body('assignmentId') assignmentId: string,
    @Body('language') language: string, 
    @Body('sourceCode') sourceCode: string,
  ){
    const userId = req.user._id;
    return this.submissionsService.submitCode(
      userId,
      assignmentId,
      language,
      sourceCode,
    );
  }
  //API gia su AI phan tich loi code
  @UseGuards(JwtAuthGuard)
  //  @Public()
  @Post(':id/ask-ai-tutor')
  async askAiTutor(@Param('id') submissionId: string){
    return await this.submissionsService.requestAiTutor(submissionId);
  }
  // API Đề xuất bài tập cho User
  @UseGuards(JwtAuthGuard) // Bắt buộc phải có Token đăng nhập
  @Get('recommendations/:userId')
  async getRecommendations(@Param('userId') userId: string) {
    return await this.submissionsService.getRecommendationsForUser(userId);
  }

  // @Post()
  // create(@Body() createSubmissionDto: CreateSubmissionDto) {
  //   return this.submissionsService.create(createSubmissionDto);
  // }

  // @Get()
  // findAll() {
  //   return this.submissionsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.submissionsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
  //   return this.submissionsService.update(+id, updateSubmissionDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.submissionsService.remove(+id);
  // }
}
