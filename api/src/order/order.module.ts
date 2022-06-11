import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '@app/order/order.schema';
import { Coupon, CouponSchema } from '@app/coupon/coupon.shcema';
import { User, UserNestSchema } from '@app/user/user.schema';
import { Basket, BasketSchema } from '@app/basket/basket.schema';
import { Stage, StageSchema } from '@app/stage/stage.shema';
import { BasketModule } from '@app/basket/basket.module';
import { BasketService } from '@app/basket/basket.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: User.name, schema: UserNestSchema },
      { name: Basket.name, schema: BasketSchema },
      { name: Stage.name, schema: StageSchema },
    ]),
    BasketModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
