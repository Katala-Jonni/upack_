import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Stage {
  @Prop({
    type: String,
    required: true,
    trim: true,
    unique: true,
    set: (v) => v.toLowerCase(),
  })
  title: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  color: string;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;
}

export type StageDocument = Stage & Document;

export const StageSchema = SchemaFactory.createForClass(Stage);
