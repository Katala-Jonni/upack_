import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import axios from 'axios';
// services
// schemas
import { Order, OrderDocument } from "@app/orderEmail/order.schema";
// dto
import { CreateNewOrderProductDto } from '@app/order/dto/create-new-order-product.dto';
import { UpdateOrderProductDto } from '@app/order/dto/update-order-product.dto';
import { UpdateOrderStageDto } from '@app/order/dto/update-stage.dto';
import { CreateOrderDto } from './dto/create-order.dto';
// enums
import { StageEnum } from '@app/common/enum/stage.enum';
// types
import { UserType } from '@app/user/types/user.type';
// interfaces
// import { OrdersResponseInterface } from '@app/order/types/ordersResponse.interface';
// import { OrderResponseInterface } from '@app/order/types/orderResponse.interface';
import { OrderCreateInterface } from '@app/order/types/orderCreate.interface';
import { log } from "util";
import { StageStatusEnum } from "@app/common/enum/stage-status.enum";
import { OrdersResponseInterface } from "@app/orderEmail/types/ordersResponse.interface";
import { OrderResponseInterface } from "@app/orderEmail/types/orderResponse.interface";

const getErrorResponse = () => {
    return {
        statusCode: 400,
        message: [],
        error: 'Bad Request'
    };
};

const stageMap = {
    [StageEnum['новый']]: {
        actions: [
            StageEnum['отменено'],
            StageEnum['закрыто']
        ]
    },
    [StageEnum['прочитано']]: {
        actions: [
            StageEnum['отменено'],
            StageEnum['закрыто']
        ]
    },
    [StageEnum['отменено']]: {
        actions: [
            StageEnum['прочитано'],
            StageEnum['закрыто']
        ]
    },
    [StageEnum['закрыто']]: {
        actions: [
            StageEnum['прочитано']
        ]
    }
};

const populateQuery = [
    { path: 'basket', select: { __v: 0 }, populate: { path: 'products.productId' } },
    { path: 'stage', select: { __v: 0 } },
    { path: 'coupon', select: { __v: 0 } }
];

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private readonly orderRepository: Model<OrderDocument>,
        @InjectConnection() private readonly connection: Connection
    ) {
    }

    async create(createOrderDto: CreateOrderDto): Promise<any> {
        console.log('OrderServiceCreateOrderDto', createOrderDto);
        // console.log('process.env.secretAccessKeyMailopost', process.env.secretAccessKeyMailopost);
        const urlEmail = 'https://api.mailopost.ru/v1/email/messages';

        const dataEmail = {
            from_email: "u_pack@internet.ru",
            from_name: "ЮПАК",
            to: "u_pack@internet.ru",
            subject: "Поступил заказ с сайта",
            text: "Заказ позиции",
            html: "<h1>Заказ в разметке</h1>"
        };
        const headerEmail = {
            'Authorization': `Bearer ${process.env.secretAccessKeyMailopost}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await axios.post(new URL(urlEmail).toString(), { ...dataEmail }, { headers: headerEmail });
            console.log(response?.data)
        } catch (e) {
            console.log('OrderService', e);
        }

        return {
            order: {
                error: false,
                message: 'ok'
            }
        };
        // return 'OrderServiceCreateOrderDto';
        // async create(createOrderDto: CreateOrderDto): Promise<OrderCreateInterface> {
        // const session = await this.connection.startSession();
        // session.startTransaction();
        // try {
        //   let client = null;
        //   if (user) {
        //     client = await this.userRepository.findById(user._id, null, { session });
        //   }
        //   const coupon = await this.couponRepository.findById(createOrderDto.coupon, null, { session });
        //   const stage = await this.stageRepository.findOne({ title: StageEnum['новый'] }, null, { session });
        //   const {
        //     deliveryDate, street, house, building, apartment, addressComment, phone, guestName, payType, amountMoney, wishes,
        //   } = createOrderDto;
        //   const orders = new this.orderRepository({
        //     basket: basket._id,
        //     client: client ? client._id : null,
        //     deliveryDate,
        //     street,
        //     house,
        //     building,
        //     apartment,
        //     addressComment,
        //     coupon: coupon && coupon._id,
        //     stage: stage && stage._id,
        //     phone,
        //     guestName: user ? null : guestName,
        //     payType,
        //     amountMoney,
        //     wishes,
        //   });
        //   await orders.save();
        //   await this.basketRepository.findByIdAndUpdate(basketId, { isActive: false, localBasketId: null }, { session });
        //   if (user) {
        //     await this.userRepository.findByIdAndUpdate(`${user._id}`, { basketId: null }, { session });
        //   }
        //   await session.commitTransaction();
        //   await session.endSession();
        //   return {
        //     order: {
        //       error: false,
        //       message: 'ok',
        //     },
        //   };
        // } catch (e) {
        //   await session.abortTransaction();
        //   await session.endSession();
        //   return {
        //     order: {
        //       error: true,
        //       message: 'error',
        //     },
        //   };
        // }
    }

    // async createNewOrderProduct(id: string, createNewOrderProduct: CreateNewOrderProductDto): Promise<Order> {
    //   try {
    //     const order: OrderDocument = await this.orderRepository.findById(id);
    //     const validStage = await this.getValidStage(`${order.stage}`);
    //     if (!validStage) {
    //       return await order.populate(populateQuery);
    //     }
    //     const newBasket: Basket & { _id?: string } = await this.basketService.create(createNewOrderProduct, null, order);
    //     order.basket = newBasket._id;
    //     await order.save();
    //     return await order.populate(populateQuery);
    //   } catch (e) {
    //     throw new HttpException('product is not added', HttpStatus.UNPROCESSABLE_ENTITY);
    //   }
    // }
    //
    // async findAll(): Promise<Order[]> {
    //   return await this.orderRepository
    //     .find()
    //     .select({ __v: 0 })
    //     .populate(populateQuery)
    //     .exec();
    // }
    //
    // async findOne(id: string): Promise<Order> {
    //   try {
    //     const order: OrderDocument = await this.orderRepository.findById(id);
    //     const stages: StageDocument[] = await this.stageRepository.find();
    //     const findStageTitle = stages.find(st => `${st._id}` === `${order.stage}`);
    //     console.log('findStageTitle', findStageTitle);
    //     if (findStageTitle.title === StageEnum['новый']) {
    //       const stage = stages.find(st => st.title === StageEnum['прочитан']);
    //       order.stage = stage._id;
    //       await order.save();
    //     }
    //     return await order
    //         .populate(populateQuery);
    //   } catch (e) {
    //     throw new HttpException('order is not found', HttpStatus.NOT_FOUND);
    //   }
    // }
    //
    // async updateOrderStage(id: string, stageId: string, updateOrderStageDto: UpdateOrderStageDto): Promise<Order> {
    //   const errorResponse = getErrorResponse();
    //   try {
    //     errorResponse.message.push('stage is not edit');
    //     const order: OrderDocument = await this.orderRepository.findById(id);
    //     const validStage = await this.getValidStage(`${order.stage}`);
    //     console.log('validStage', validStage);
    //     if (!validStage) {
    //       return await order.populate(populateQuery);
    //     }
    //     const stage: StageDocument = await this.stageRepository.findById(stageId);
    //     if (stage.status === (StageStatusEnum['new'] || StageStatusEnum['reading'])) {
    //       return await order.populate(populateQuery);
    //     } else if (stage.status === StageStatusEnum['canceled']) {
    //       if (!updateOrderStageDto || !updateOrderStageDto.causeRejected) {
    //         errorResponse.message = [
    //           'Укажите причину отмены заказа',
    //         ];
    //         throw new Error();
    //       } else {
    //         order.stage = stage._id;
    //         order.causeRejected = updateOrderStageDto.causeRejected;
    //       }
    //     } else if (stage.status === StageStatusEnum[stage.status]) {
    //       order.stage = stage._id;
    //     }
    //     await order.save();
    //     return await order.populate(populateQuery);
    //   } catch (e) {
    //     throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    //   }
    // }
    //
    // async updateOrderProductPlusMinus(
    //   id: string,
    //   productId: string,
    //   updateOrderProductDto: UpdateOrderProductDto,
    //   inc: string,
    // ): Promise<Order> {
    //   try {
    //     const order: OrderDocument = await this.orderRepository.findById(id);
    //     const validStage = await this.getValidStage(`${order.stage}`);
    //     if (!validStage) {
    //       return await order.populate(populateQuery);
    //     }
    //     const basket: BasketDocument = await this.basketService.searchBasket({ _id: `${order.basket}` }, true);
    //     const newBasket: Basket & { _id?: string } = await this.basketService.updatePlusMinus(basket, productId, updateOrderProductDto, inc);
    //     order.basket = newBasket._id;
    //     await order.save();
    //     return await order.populate(populateQuery);
    //   } catch (e) {
    //     throw new HttpException('Order is not found', HttpStatus.NOT_FOUND);
    //   }
    // }
    //
    // async removeOrderProduct(id: string, productId: string): Promise<Order> {
    //   try {
    //     const order: OrderDocument = await this.orderRepository.findById(id);
    //     const validStage = await this.getValidStage(`${order.stage}`);
    //     if (!validStage) {
    //       return await order.populate(populateQuery);
    //     }
    //     const orderBasket: BasketDocument = await this.basketService.searchBasket({ _id: `${order.basket}` }, true);
    //     if (orderBasket.products.length === 1) {
    //       return await order.populate(populateQuery);
    //     }
    //     const basket: Basket & { _id?: string } = await this.basketService.deleteProduct({ _id: `${order.basket}` }, productId, true);
    //     order.basket = basket._id;
    //     await order.save();
    //     return await order.populate(populateQuery);
    //   } catch (e) {
    //     throw new HttpException('product is not deleted', HttpStatus.UNPROCESSABLE_ENTITY);
    //   }
    // }
    //
    // async remove(id: string): Promise<Order[]> {
    //   return `This action removes a #${id} order` as any;
    // }
    //
    // private async getValidStage(id: string): Promise<boolean> {
    //   try {
    //     const currentStage = await this.stageRepository.findById(id);
    //     if (currentStage.status === StageStatusEnum['canceled'] || currentStage.status === StageStatusEnum['closed']) {
    //       return false;
    //     }
    //     return true;
    //   } catch (e) {
    //     throw new HttpException('stage is not found', HttpStatus.NOT_FOUND);
    //   }
    // }

    buildOrdersResponse(orders: Order[]): OrdersResponseInterface {
        return { orders, ordersCount: orders.length };
    }

    buildOrderResponse(order: Order): OrderResponseInterface {
        return { order };
    }
}
