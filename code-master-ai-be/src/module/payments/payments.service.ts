import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from 'vnpay';

import { ApiResponse } from '@/common/dto/api-response.dto';
import { Cart, CartDocument } from '../carts/entities/cart.entity';
import {
  CartDetail,
  CartDetailDocument,
} from '../cart-details/entities/cart-detail.entity';
import {
  Payment,
  PaymentDocument,
  PaymentMethod,
  PaymentStatus,
} from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentStatusDto } from './dto/update-payment.dto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { User, UserDocument } from '../users/entities/user.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Cart.name)
    private readonly cartModel: Model<CartDocument>,

    @InjectModel(CartDetail.name)
    private readonly cartDetailModel: Model<CartDetailDocument>,

    private readonly configService: ConfigService,

    private readonly mailerService: MailerService,
  ) {}

  private async getCartWithItems(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('userId không hợp lệ');
    }

    const cart = await this.cartModel.findOne({
      user_id: new Types.ObjectId(userId),
    });

    if (!cart) {
      throw new NotFoundException('Giỏ hàng không tồn tại');
    }

    const cartDetails = await this.cartDetailModel
      .find({ cart_id: cart._id })
      .populate('course_id')
      .lean();

    if (!cartDetails.length) {
      throw new BadRequestException('Giỏ hàng không có sản phẩm');
    }

    const amount = cartDetails.reduce((sum, item) => sum + item.price, 0);

    return { cart, cartDetails, amount };
  }

  async createPayment(
    userId: string,
    createPaymentDto: CreatePaymentDto,
  ): Promise<ApiResponse<any>> {
    const { payment_method } = createPaymentDto;

    const { cart, cartDetails, amount } = await this.getCartWithItems(userId);

    if (payment_method === PaymentMethod.COD) {
      const payment = await this.paymentModel.create({
        user_id: new Types.ObjectId(userId),
        amount,
        payment_method: PaymentMethod.COD,
        payment_status: PaymentStatus.PENDING,
        paid_at: null,
      });

      await this.cartDetailModel.deleteMany({ cart_id: cart._id });

      return new ApiResponse('Tạo đơn thanh toán COD thành công', {
        payment,
        items: cartDetails,
        totalPrice: amount,
      });
    }

    if (payment_method === PaymentMethod.VNPAY) {
      const payment = await this.paymentModel.create({
        user_id: new Types.ObjectId(userId),
        amount,
        payment_method: PaymentMethod.VNPAY,
        payment_status: PaymentStatus.PENDING,
        paid_at: null,
      });

      const vnpay = new VNPay({
        tmnCode: this.configService.get<string>('VNPAY_TMN_CODE')!,
        secureSecret: this.configService.get<string>('VNPAY_HASH_SECRET')!,
        vnpayHost: this.configService.get<string>('VNPAY_URL')!,
        testMode: true,
        hashAlgorithm: 'SHA512' as any,
        loggerFn: ignoreLogger,
      });

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: amount,
        vnp_IpAddr: '127.0.0.1',
        vnp_TxnRef: `${userId}_${Date.now()}`,
        vnp_OrderInfo: `Thanh toan don hang ${userId}`,
        vnp_OrderType: ProductCode.Other,
        vnp_ReturnUrl: 'http://localhost:3000/api/v1/payments/vnpay-callback',
        vnp_Locale: VnpLocale.VN,
        vnp_CreateDate: dateFormat(new Date()),
        vnp_ExpireDate: dateFormat(tomorrow),
      });

      return new ApiResponse('Tạo thanh toán VNPAY thành công', {
        payment,
        payment_url: paymentUrl,
        items: cartDetails,
        totalPrice: amount,
      });
    }

    if (payment_method === PaymentMethod.MOMO) {
      const payment = await this.paymentModel.create({
        user_id: new Types.ObjectId(userId),
        amount,
        payment_method: PaymentMethod.MOMO,
        payment_status: PaymentStatus.PENDING,
        paid_at: null,
      });

      return new ApiResponse('Tạo thanh toán MOMO thành công', {
        payment,
        payment_url: 'Momo URL sẽ build ở đây',
        items: cartDetails,
        totalPrice: amount,
      });
    }

    throw new BadRequestException('Phương thức thanh toán không hợp lệ');
  }

  async getMyPayments(userId: string): Promise<ApiResponse<Payment[]>> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('userId không hợp lệ');
    }

    const payments = await this.paymentModel
      .find({ user_id: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .lean();

    return new ApiResponse('Lấy danh sách thanh toán thành công', payments);
  }

  async getPaymentById(id: string): Promise<ApiResponse<Payment>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id không hợp lệ');
    }

    const payment = await this.paymentModel
      .findById(id)
      .populate('user_id')
      .populate('order_id')
      .lean();

    if (!payment) {
      throw new NotFoundException('Thanh toán không tồn tại');
    }

    return new ApiResponse('Lấy chi tiết thanh toán thành công', payment);
  }

  async updatePaymentStatus(
    id: string,
    updatePaymentStatusDto: UpdatePaymentStatusDto,
  ): Promise<ApiResponse<Payment>> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('id không hợp lệ');
    }

    const updateData: any = {
      payment_status: updatePaymentStatusDto.payment_status,
    };

    if (updatePaymentStatusDto.payment_status === PaymentStatus.PAID) {
      updateData.paid_at = new Date();
    }

    const payment = await this.paymentModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!payment) {
      throw new NotFoundException('Thanh toán không tồn tại');
    }

    return new ApiResponse(
      'Cập nhật trạng thái thanh toán thành công',
      payment,
    );
  }

  async markPaymentPaidAndClearCart(userId: string) {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('userId không hợp lệ');
    }
    const userObjectId = new Types.ObjectId(userId);
    const payment = await this.paymentModel.findOneAndUpdate(
      {
        user_id: new Types.ObjectId(userId),
        payment_method: PaymentMethod.VNPAY,
        payment_status: PaymentStatus.PENDING,
      },
      {
        payment_status: PaymentStatus.PAID,
        paid_at: new Date(),
      },
      {
        new: true,
        sort: { createdAt: -1 },
      },
    );

    if (!payment) {
      throw new NotFoundException('Không tìm thấy payment pending để cập nhật');
    }
    const user = await this.userModel.findById(userObjectId).lean();
    const cart = await this.cartModel.findOne({
      user_id: new Types.ObjectId(userId),
    });
    let courseName = '';
    let phoneNumber = user?.phone || 'Chưa cập nhật';

    if (cart) {
      await this.cartDetailModel.deleteMany({ cart_id: cart._id });
    }

    await this.mailerService.sendMail({
      to: user?.email,
      subject: 'Xác nhận thanh toán đơn hàng CodeMaster AI',
      template: 'payment-success',
      context: {
        name: user?.email,
        invoiceCode: payment._id.toString(),
        orderCode: payment._id.toString(),
        paymentDate: payment.paid_at
          ? new Date(payment.paid_at).toLocaleString('vi-VN')
          : new Date().toLocaleString('vi-VN'),
        courseName: courseName || 'Khóa học tại CodeMaster AI',
        phoneNumber,
      },
    });

    return payment;
  }
}
