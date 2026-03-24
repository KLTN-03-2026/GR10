import { IsMongoId } from 'class-validator';

export class CreateCartDto {
  @IsMongoId()
  courseId: string;
}
