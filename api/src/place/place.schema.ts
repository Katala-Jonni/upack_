import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

const getFistUppercase = (v: string): string => {
  const otherText = v.slice(1, v.length);
  return `${v[0].toUpperCase()}${otherText}`;
};

@Schema()
export class Place {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
    get: getFistUppercase,
    set: (v) => v.toLowerCase(),
  })
  title: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    get: getFistUppercase,
  })
  address: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    get: getFistUppercase,
  })
  info: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  email: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  phone: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  director;
  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    get: getFistUppercase,
  })
  description: string;
  @Prop({ default: new Date() })
  createdAt: Date;
}

export type PlaceDocument = Place & Document;

export const PlaceSchema = SchemaFactory.createForClass(Place);
