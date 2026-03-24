import {
  IsString,
  IsOptional,
  IsMongoId,
  IsEnum,
  IsNumber,
  Min,
  IsDateString,
} from 'class-validator';
import { AssignmentType } from '../enums/types.enum';

export class CreateAssignmentDto {
  @IsMongoId()
  lesson_id: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  max_score?: number;

  @IsOptional()
  @IsDateString()
  due_date?: Date;

  @IsOptional()
  @IsEnum(AssignmentType)
  type?: AssignmentType;
}
