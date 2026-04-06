import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { CreateTestcaseDto } from './dto/create-testcase.dto';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';

@Controller('testcases')
export class TestcasesController {
  constructor(private readonly testcasesService: TestcasesService) {}
  @Post('generate-ai/:assignmentId')
  async generateAI(
    @Param('assignmentId') assignmentId: string,
    @Body('solutionCode') solutionCode: string,
    @Body('constraints') constraints: string,
    @Body('numberOfTestCases') numberOfTestCases: number,
  ){
    return this.testcasesService.generateTestCaseByAI(assignmentId,solutionCode,constraints,numberOfTestCases)
  }

  // @Post()
  // create(@Body() createTestcaseDto: CreateTestcaseDto) {
  //   return this.testcasesService.create(createTestcaseDto);
  // }

  // @Get()
  // findAll() {
  //   return this.testcasesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.testcasesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTestcaseDto: UpdateTestcaseDto) {
  //   return this.testcasesService.update(+id, updateTestcaseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.testcasesService.remove(+id);
  // }
}
