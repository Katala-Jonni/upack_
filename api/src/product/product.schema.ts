import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

const getFistUppercase = (v: string): string => {
  const otherText = v.slice(1, v.length);
  return `${v[0].toUpperCase()}${otherText}`;
};

@Schema()
export class Product {
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  title: string;
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  price: number;
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  weight: number;
  @Prop({
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  )
  slug: string;
  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  composition: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  })
  description: string;
  @Prop({ default: new Date() })
  createdAt: Date;
  @Prop({
    type: Boolean,
    default: false,
  })
  favorited: boolean;
  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  favoritesCount: number;
  @Prop({
    type: [String],
    default: [],
  })
  images: string[];
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  categoryId: string
}

export type ProductDocument = Product & Document;

export const ProductSchema = SchemaFactory.createForClass(Product);
