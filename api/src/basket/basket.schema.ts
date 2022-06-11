import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '@app/product/product.schema';

@Schema()
export class Basket {
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  total: number;
  @Prop({
    type: Date,
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: [
      {
        count: { type: Number, default: 1, min: 1 },
        productId: { type: MongooseSchema.Types.ObjectId, ref: 'Product' },
      },
    ],
    default: [],
  })
  products: { count: number, productId: Product }[];
  @Prop({
    type: String,
    trim: true,
    default: null,
  })
  localBasketId: string;
  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;
}

export type BasketDocument = Basket & Document;

export const BasketSchema = SchemaFactory.createForClass(Basket);
