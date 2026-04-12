import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';

@Controller('testcases')
export class TestcasesController {
  constructor(private readonly testcasesService: TestcasesService) {}
  @Post('generate-ai/:assignmentId')
  async generateAI(
    @Param('assignmentId') codeAssignmentId: string,
    @Body('solutionCode') solutionCode: string,
    @Body('constraints') constraints: string,
    @Body('numberOfTestCases') numberOfTestCases: number,
  ) {
    return this.testcasesService.generateTestCaseByAI(
      codeAssignmentId,
      solutionCode,
      constraints,
      numberOfTestCases,
    );
  }

  // @Post()
  // create(@Body() createTestcaseDto: CreateTestcaseDto) {
  //   return this.testcasesService.create(createTestcaseDto);
  // }

  @Get()
  findAll(@Query('code_assignment_id') codeAssignmentId?: string) {
    return this.testcasesService.findAll(codeAssignmentId);
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testcasesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateTestcaseDto: UpdateTestcaseDto,
  ) {
    return this.testcasesService.update(id, updateTestcaseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.testcasesService.remove(id);
  }
}
