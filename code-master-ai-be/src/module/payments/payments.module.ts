import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

import { Payment, PaymentSchema } from './entities/payment.entity';
import { Cart, CartSchema } from '../carts/entities/cart.entity';
import {
  CartDetail,
  CartDetailSchema,
} from '../cart-details/entities/cart-detail.entity';
import { User, UserSchema } from '../users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Cart.name, schema: CartSchema },
      { name: CartDetail.name, schema: CartDetailSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
