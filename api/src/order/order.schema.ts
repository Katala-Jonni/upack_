import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as moment from 'moment';
import * as randomatic from 'randomatic';

moment.locale('ru');

@Schema()
export class Order {
  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Basket',
    default: null,
  })
  basket: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    default: null,
  })
  client: string;
  @Prop({
    type: String,
    default: function() {
      return `${moment().format('DDMM')}-${randomatic('0000')}`;
    },
  })
  orderNumber: string;
  @Prop({
    type: Date,
    default: new Date(),
  })
  deliveryDate: Date;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  street: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true
  })
  house: string;
  @Prop({
    type: String,
    trim: true,
    default: null,
    lowercase: true
  })
  building: string;
  @Prop({
    type: Number,
    default: null,
  })
  apartment: number;
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  })
  addressComment: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Stage',
    default: function() {
      console.log('Stage-MongooseSchema.Types.ObjectId', this);
      return null;
    },
  })
  stage: string;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Coupon',
    default: null,
  })
  coupon: string;
  @Prop({
    type: String,
    trim: true,
    default: null,
  })
  guestName: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  phone: string;
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  })
  causeRejected: string;
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    required: true,
  })
  payType: string;
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  amountMoney: number;
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  })
  wishes: string;
}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
