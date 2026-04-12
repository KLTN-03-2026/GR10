import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type SchemaAssginment = Document & Assignment;
export type AssignmentDocument = HydratedDocument<Assignment>;
@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lesson_id!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop()
  description!: string;

  @Prop({ default: 100 })
  max_score!: number;

  @Prop()
  due_date!: Date;
  @Prop({ required: true }) type!: string;
  // @Prop({
  //   default: AssignmentType.QUIZ,
  // })
  // type: AssignmentType;
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
