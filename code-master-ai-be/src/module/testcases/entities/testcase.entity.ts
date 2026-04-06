import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TestCaseDocument = HydratedDocument<TestCase>;

@Schema({ timestamps: true, collection: 'testcases' })
export class TestCase {
  // Phải có { type: Types.ObjectId }
  @Prop({ type: Types.ObjectId, ref: 'CodeAssignment', required: true }) 
  code_assignment_id!: Types.ObjectId;

  // PHẢI CÓ { type: String } - Đây là mấu chốt!
  @Prop({ type: String, required: true }) 
  input_data!: string;

  // PHẢI CÓ { type: String }
  @Prop({ type: String, required: true }) 
  expected_output!: string;

  // PHẢI CÓ { type: Boolean }
  @Prop({ type: Boolean, default: false }) 
  is_hidden!: boolean;
}
export const TestCaseSchema = SchemaFactory.createForClass(TestCase);