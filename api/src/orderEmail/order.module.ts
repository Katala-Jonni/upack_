// import { Module } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// // import { MailService } from './mail.service';
// import * as path from 'path';
// import { OrderService } from './order.service';
// import { OrderController } from './order.controller';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Order, OrderSchema } from "@app/orderEmail/order.schema";
//
// @Module({
//   imports: [
//     MailerModule.forRoot({
//       // Конфигурация SMTP-сервера
//       transport: {
//         host: 'smtp.msndr.net', // Ваш SMTP-хост
//         port: 587,
//         secure: false, // true для 465, false для других портов
//         auth: {
//           user: 'u_pack@internet.ru', // Ваш email
//           pass: '5127a90ccf561c4f1476317589c09af4', // Ваш пароль
//         },
//       },
//       defaults: {
//         from: 'info@upack-10.ru',
//       },
//       // Конфигурация шаблонизатора
//       template: {
//         dir: path.join(__dirname, 'templates'), // Путь к папке с шаблонами
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//     MongooseModule.forFeature([
//       { name: Order.name, schema: OrderSchema }
//     ]),
//   ],
//   controllers: [OrderController],
//   providers: [OrderService],
//   exports: [OrderService]
// })
// export class OrderEmailModule {}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from "@app/orderEmail/order.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema }
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderEmailModule {}
