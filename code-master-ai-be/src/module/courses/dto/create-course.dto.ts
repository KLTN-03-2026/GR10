import { IsString, IsNotEmpty, IsNumber, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsString()
  thumbnail: string;

  @IsMongoId()
  category: string;
}
