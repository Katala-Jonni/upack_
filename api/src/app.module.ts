import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database/database.module';
import { AuthMiddleware } from '@app/common/middlewares/auth.middleware';
import { AuthModule } from '@app/auth/auth.module';
import { CategoryModule } from '@app/category/category.module';
import { ProductModule } from './product/product.module';
import { PlaceModule } from './place/place.module';
import { CouponModule } from './coupon/coupon.module';
import { StageModule } from './stage/stage.module';
import { FeedbackModule } from './feedback/feedback.module';
import { BasketModule } from './basket/basket.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    PlaceModule,
    CouponModule,
    StageModule,
    FeedbackModule,
    BasketModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
