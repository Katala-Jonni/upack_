import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

const setFirstUpperCase = v => v
  .split(/\s+/)
  .map(word => word[0].toUpperCase() + word.substring(1)).join(' ');

@Schema()
export class Feedback {
  @Prop({
    type: String,
    required: true,
    trim: true,
    set: setFirstUpperCase,
  })
  name: string;
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
  subject: string;
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  message: string;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: Boolean,
    required: true,
  })
  agreement: boolean;
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Stage',
    required: true,
  })
  stageId: string;
}

export type FeedbackDocument = Feedback & Document;

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
