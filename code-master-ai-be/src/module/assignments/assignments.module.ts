import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignment } from './entities/assignment.entity';
import { AssignmentSchema } from './entities/assignment.entity';
import { Lesson, LessonSchema } from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
      { name: Lesson.name, schema: LessonSchema },
    ]),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
