import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTestcaseDto } from './dto/create-testcase.dto';
import { UpdateTestcaseDto } from './dto/update-testcase.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TestCase, TestCaseDocument } from './entities/testcase.entity';
import {
  CodeAssignment,
  CodeAssignmentDocument,
} from '../code-assignments/entities/code-assignment.entity';

@Injectable()
export class TestcasesService {
  constructor(
    @InjectModel(TestCase.name)
    private readonly testCaseModel: Model<TestCaseDocument>,

    @InjectModel(CodeAssignment.name)
    private readonly codeAssignmentModel: Model<CodeAssignmentDocument>,
  ) {}

  async create(createTestcaseDto: CreateTestcaseDto): Promise<TestCase> {
    const codeAssignment = await this.codeAssignmentModel.findById(
      createTestcaseDto.code_assignment_id,
    );
    if (!codeAssignment) {
      throw new NotFoundException('CodeAssignment not found');
    }

    return this.testCaseModel.create(createTestcaseDto);
  }

  async findAll(code_assignment_id?: string): Promise<TestCase[]> {
    const filter: Record<string, any> = {};
    if (code_assignment_id) {
      if (!Types.ObjectId.isValid(code_assignment_id)) {
        throw new BadRequestException('code_assignment_id không hợp lệ');
      }
      filter.code_assignment_id = code_assignment_id;
    }

    return this.testCaseModel.find(filter).lean().exec();
  }

  async findOne(id: string): Promise<TestCase> {
    const testCase = await this.testCaseModel.findById(id).lean().exec();
    if (!testCase) {
      throw new NotFoundException('TestCase not found');
    }
    return testCase;
  }

  async update(
    id: string,
    updateTestcaseDto: UpdateTestcaseDto,
  ): Promise<TestCase> {
    if (updateTestcaseDto.code_assignment_id) {
      const codeAssignment = await this.codeAssignmentModel.findById(
        updateTestcaseDto.code_assignment_id,
      );
      if (!codeAssignment) {
        throw new NotFoundException('CodeAssignment not found');
      }
    }

    const updated = await this.testCaseModel.findByIdAndUpdate(
      id,
      updateTestcaseDto,
      { new: true, runValidators: true },
    );

    if (!updated) {
      throw new NotFoundException('TestCase not found');
    }

    return updated.toObject();
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.testCaseModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('TestCase not found');
    }
  }
}
