import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { ParseObjectIdPipe } from '@/common/pipes/parse-object-id.pipe';
import { JwtAuthGuard } from '@/auth/passport/jwt-auth.guard';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('create')
  createCart(@CurrentUser() user: any, @Body() dto: CreateCartDto) {
    return this.cartsService.createCart(user._id, dto);
  }

  @Patch('update')
  updateCart(@CurrentUser() user: any, @Body() dto: UpdateCartDto) {
    return this.cartsService.updateCart(user._id, dto);
  }

  @Delete('delete/:courseId')
  deleteProductInCart(
    @CurrentUser() user: any,
    @Param('courseId', ParseObjectIdPipe) courseId: string,
  ) {
    return this.cartsService.deleteProductInCart(user._id, courseId);
  }

  @Get('get')
  getCartInUser(@CurrentUser() user: any) {
    return this.cartsService.getCartInUser(user._id);
  }

  @Delete('clear')
  clearCart(@CurrentUser() user: any) {
    return this.cartsService.clearCart(user._id);
  }

  @Get('count')
  countCart(@CurrentUser() user: any) {
    return this.cartsService.countCartItems(user._id);
  }
}
