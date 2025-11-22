import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
// services
import { OrderService } from './order.service';
// dto
import { CreateOrderDto } from './dto/create-order.dto';
// interfaces
import { OrderCreateInterface } from "@app/orderEmail/types/orderCreate.interface";

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('order') createOrderDto: CreateOrderDto,
  ): Promise<any> {
  // ): Promise<OrderCreateInterface> {
    return this.orderService.create(createOrderDto);
    // return this.orderService.create(createOrderDto, user);
  }
}
