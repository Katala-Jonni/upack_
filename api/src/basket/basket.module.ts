import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket, BasketSchema } from '@app/basket/basket.schema';
import { User, UserNestSchema } from '@app/user/user.schema';
import { Product, ProductSchema } from '@app/product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Basket.name, schema: BasketSchema },
      { name: User.name, schema: UserNestSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [BasketController],
  providers: [BasketService],
  exports: [BasketService]
})
export class BasketModule {}
