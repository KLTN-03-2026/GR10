import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AssignmentType } from '../enums/types.enum';
export type SchemaAssginment = Document & Assignment;

@Schema({ timestamps: true })
export class Assignment {
<<<<<<< HEAD
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
=======
  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true }) lesson_id!: Types.ObjectId ;
  @Prop({ required: true }) title!: string;
  @Prop() description!: string;
  @Prop() max_score!: number;
  @Prop() due_date!: Date ;
  @Prop({ required: true }) type!: string; // 'quiz' or 'code'
>>>>>>> 346bb36e7977a31228eb3b08959be79a54710e4a
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
