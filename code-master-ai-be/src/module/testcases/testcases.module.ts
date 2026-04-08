import { Module } from '@nestjs/common';
import { TestcasesService } from './testcases.service';
import { TestcasesController } from './testcases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestCase, TestCaseSchema } from './entities/testcase.entity';
import {
  CodeAssignment,
  CodeAssignmentSchema,
} from '../code-assignments/entities/code-assignment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TestCase.name, schema: TestCaseSchema },
      { name: CodeAssignment.name, schema: CodeAssignmentSchema },
    ]),
  ],
  controllers: [TestcasesController],
  providers: [TestcasesService],
})
export class TestcasesModule {}
