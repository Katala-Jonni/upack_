import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coupon {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
  })
  secret: string;
  @Prop({
    required: true,
    default: new Date(),
  })
  expire: Date;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  type: string;
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  count: number;
  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
}

export type CouponDocument = Coupon & Document;
export const CouponSchema = SchemaFactory.createForClass(Coupon);
