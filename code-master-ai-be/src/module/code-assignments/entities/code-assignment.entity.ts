import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CodeAssignmentDocument = HydratedDocument<CodeAssignment>;

@Schema({ timestamps: true })
export class CodeAssignment {
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true })
  assignment_id!: Types.ObjectId;

  @Prop({ required: true })
  problem_description!: string;

  @Prop()
  input_format?: string;

  @Prop()
  output_format?: string;

  @Prop()
  time_limit?: number;

  @Prop()
  memory_limit?: number;

  @Prop()
  starter_code?: string;

  @Prop()
  language_support?: string;
}
export const CodeAssignmentSchema =
  SchemaFactory.createForClass(CodeAssignment);
