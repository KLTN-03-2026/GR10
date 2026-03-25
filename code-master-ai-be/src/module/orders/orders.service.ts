import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument, OrderStatus } from './entities/order.entity';
import { Model, Types } from 'mongoose';
import { ApiResponse } from '@/common/dto/api-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private readonly ordersModel: Model<OrderDocument>,
  ) {}

  async findAll(query: any, current: number, pageSize: number) {
    // const { filter, sort } = aqp(query);
    const { default: aqp } = await import('api-query-params');
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    // Tối ưu hiệu suất bằng countDocuments
    const totalItems = await this.ordersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (+current - 1) * +pageSize;

    const results = await this.ordersModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);

    return new ApiResponse('Danh sách đơn hàng', { results, totalPages });
  }

  async findOne(id: string): Promise<ApiResponse<Order>> {
    const order = await this.ordersModel.findById(id).lean().exec();

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    return new ApiResponse('Thông tin đơn hàng', order);
  }

  async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<ApiResponse<Order>> {
    const order = await this.ordersModel.findById(id);

    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    order.status = status;

    await order.save();

    return new ApiResponse('Cập nhật trạng thái đơn hàng', order);
  }

  async findByUser(
    userId: string,
    query: any,
    current: number,
    pageSize: number,
  ): Promise<ApiResponse<any>> {
    const { default: aqp } = await import('api-query-params');
    const { filter, sort } = aqp(query);

    delete filter.current;
    delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    filter.user_id = new Types.ObjectId(userId);

    const totalItems = await this.ordersModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const results = await this.ordersModel
      .find(filter)
      .limit(pageSize)
      .skip(skip)
      .sort(sort as any)
      .lean();

    return new ApiResponse('Danh sách đơn hàng của user', {
      results,
      totalItems,
      totalPages,
      current,
      pageSize,
    });
  }
}
