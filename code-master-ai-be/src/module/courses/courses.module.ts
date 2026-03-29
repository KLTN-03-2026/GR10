import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './entities/course.entity';
import { Course } from './entities/course.entity';
import { CategoriesModule } from '../categories/categories.module';
import { Lesson, LessonSchema } from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }, {name: Lesson.name, schema: LessonSchema }]),
    CategoriesModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
