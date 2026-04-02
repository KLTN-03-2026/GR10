import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderStatus } from './entities/order.entity';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.ordersService.findAll(query, +current, +pageSize);
  }
  @Get('my-orders')
  @UseGuards(JwtAuthGuard)
  findMyOrders(
    @CurrentUser() user: any,
    @Query() query: any,
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.ordersService.findByUser(user._id, query, +current, +pageSize);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() status: OrderStatus,
  ) {
    return this.ordersService.updateStatus(id, status);
  }
}
