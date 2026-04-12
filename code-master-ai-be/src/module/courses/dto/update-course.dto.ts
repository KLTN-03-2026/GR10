import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsEnum, IsOptional, IsMongoId, IsArray, IsString } from 'class-validator';
import { CourseLevel } from '../enums/courseLevel.enum';
import { CourseStatus } from '../enums/courseStatus.enum';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsOptional()
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsOptional()
  @IsEnum(CourseStatus)
  status: CourseStatus;

  @IsOptional()
  @IsMongoId()
  category: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  learning_outcomes: string[];

  // ✅ Yêu cầu đầu vào
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  requirements: string[];
}
