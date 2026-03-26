import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
  @Prop({ type: Types.ObjectId, ref: 'Order', required: true })
  order_id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  course_id!: Types.ObjectId;

  @Prop({ type: Number, required: true, min: 0 })
  price!: number;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);
