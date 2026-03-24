import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AssignmentType } from '../enums/types.enum';
export type SchemaAssginment = Document & Assignment;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lesson_id: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: 100 })
  max_score: number;

  @Prop()
  due_date: Date;

  @Prop({
    default: AssignmentType.QUIZ,
  })
  type: AssignmentType;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
