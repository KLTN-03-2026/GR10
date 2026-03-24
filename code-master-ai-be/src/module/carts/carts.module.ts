import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';

import { Cart, CartSchema } from './entities/cart.entity';

import { Course, CourseSchema } from '../courses/entities/course.entity';
import {
  CartDetail,
  CartDetailSchema,
} from '../cart-details/entities/cart-detail.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: CartDetail.name, schema: CartDetailSchema },
      { name: Course.name, schema: CourseSchema },
    ]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
