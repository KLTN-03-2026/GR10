import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment, SchemaAssginment } from './entities/assignment.entity';
import { Model } from 'mongoose';
import { Lesson, LessonDocument } from '../lessons/entities/lesson.entity';
import { AssignmentType } from './enums/types.enum';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name)
    private readonly assigmentModel: Model<SchemaAssginment>,

    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<LessonDocument>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    const lesson = await this.lessonModel.findById(
      createAssignmentDto.lesson_id,
    );

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const assignment = await this.assigmentModel.create({
      ...createAssignmentDto,
      type: AssignmentType.QUIZ,
    });
    return assignment;
  }

  async findAll() {
    return await this.assigmentModel.find();
  }

  async findOne(id: string): Promise<Assignment> {
    const assignment = await this.assigmentModel.findById(id);
    if (!assignment) throw new NotFoundException('Assignment not exist');
    return assignment;
  }

  async update(
    id: string,
    updateAssignmentDto: UpdateAssignmentDto,
  ): Promise<Assignment> {
    const assigment = await this.assigmentModel.findByIdAndUpdate(
      id,
      updateAssignmentDto,
      { new: true },
    );
    if(!assigment) throw new NotFoundException('Assignment not found and cant update');
    return assigment;
  }

  async remove(id: string):Promise<void> {
    const assignment = await this.assigmentModel.findByIdAndDelete(id);
    if (!assignment) throw new NotFoundException('Assignment not exist');

  }
}
