import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
  UseGuards
} from '@nestjs/common';
// decorators
import { User } from '@app/user/decorators/user.decorator';
// services
import { OrderService } from './order.service';
// dto
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateNewOrderProductDto } from '@app/order/dto/create-new-order-product.dto';
import { UpdateOrderStageDto } from '@app/order/dto/update-stage.dto';
import { UpdateOrderProductDto } from '@app/order/dto/update-order-product.dto';
// types
import { UserType } from '@app/user/types/user.type';
// interfaces
import { OrdersResponseInterface } from '@app/order/types/ordersResponse.interface';
import { OrderResponseInterface } from '@app/order/types/orderResponse.interface';
import { OrderCreateInterface } from '@app/order/types/orderCreate.interface';
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";
import { Roles } from "@app/common/metadata/roles.metadata";
import { RolesEnum } from "@app/common/enum/roles.emum";

@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('order') createOrderDto: CreateOrderDto,
    @User() user: UserType,
  ): Promise<OrderCreateInterface> {
    return this.orderService.create(createOrderDto, user);
  }

  @Post(':id/product')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async createNewOrderProduct(
    @Param('id') id: string,
    @Body('order') createNewOrderProduct: CreateNewOrderProductDto,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.createNewOrderProduct(id, createNewOrderProduct);
    return this.orderService.buildOrderResponse(order);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  async findAll(): Promise<OrdersResponseInterface> {
    const orders = await this.orderService.findAll();
    return this.orderService.buildOrdersResponse(orders);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  async findOne(
    @Param('id') id: string,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.findOne(id);
    return this.orderService.buildOrderResponse(order);
  }

  @Put(':id/stage/:stageId')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async updateStage(
    @Param('id') id: string,
    @Param('stageId') stageId: string,
    @Body('order') updateOrderStageDto: UpdateOrderStageDto,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.updateOrderStage(id, stageId, updateOrderStageDto);
    return this.orderService.buildOrderResponse(order);
  }

  @Put(':id/product/:productId')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async updateOrderProductPlusMinus(
    @Param('id') id: string,
    @Param('productId') productId: string,
    @Body('order') updateOrderProductDto: UpdateOrderProductDto,
    @Query('inc') inc: string,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.updateOrderProductPlusMinus(id, productId, updateOrderProductDto, inc);
    return this.orderService.buildOrderResponse(order);
  }

  @Delete(':id/product/:productId')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  async removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ): Promise<OrderResponseInterface> {
    const order = await this.orderService.removeOrderProduct(id, productId);
    return this.orderService.buildOrderResponse(order);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  async remove(
    @Param('id') id: string,
  ): Promise<OrdersResponseInterface> {
    const orders = await this.orderService.remove(id);
    return this.orderService.buildOrdersResponse(orders);
  }
}
