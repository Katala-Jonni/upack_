import { Controller, Get, Post, Body, Param, Delete, Put, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketDto } from './dto/create-basket.dto';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { BasketResponseInterface } from '@app/basket/types/basketResponse.interface';
import { User } from '@app/user/decorators/user.decorator';
import { UserType } from '@app/user/types/user.type';

@Controller('/basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('basket') createBasketDto: CreateBasketDto,
    @User() user: UserType,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.create(createBasketDto, user);
    return this.basketService.buildBasketResponse(basket);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @User() user: UserType,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.findBasket(id, user);
    return this.basketService.buildBasketResponse(basket);
  }

  @Put(':basketId/product/:productId')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('basketId') basketId: string,
    @Param('productId') productId: string,
    @Body('basket') updateBasketDto: UpdateBasketDto,
    @User() user: UserType,
    @Query('inc') inc: string,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.update(basketId, productId, updateBasketDto, user, inc);
    return this.basketService.buildBasketResponse(basket);
  }

  @Delete(':basketId/product/:productId')
  async removeProduct(
    @Param('basketId') basketId: string,
    @Param('productId') productId: string,
    @User() user: UserType,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.removeProduct(basketId, productId, user);
    return this.basketService.buildBasketResponse(basket);
  }

  @Delete(':basketId')
  async remove(
    @Param('basketId') basketId: string,
    @User() user: UserType,
  ): Promise<BasketResponseInterface> {
    const basket = await this.basketService.remove(basketId, user);
    return this.basketService.buildBasketResponse(basket);
  }
}
