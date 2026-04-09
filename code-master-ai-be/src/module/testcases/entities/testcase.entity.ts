import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TestCaseDocument = HydratedDocument<TestCase>;

@Schema({ timestamps: true, collection: 'testcases' })
export class TestCase {
  
  @Prop({ type: Types.ObjectId, ref: 'Assignment', required: true }) 
  assignment_id!: Types.ObjectId;

  @Prop({ type: String, required: true }) 
  input_data!: string;

  @Prop({ type: String, required: true }) 
  expected_output!: string;

  @Prop({ type: Boolean, default: false }) 
  is_hidden!: boolean;
}
export const TestCaseSchema = SchemaFactory.createForClass(TestCase);