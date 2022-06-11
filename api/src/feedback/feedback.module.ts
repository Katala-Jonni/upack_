import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from '@app/feedback/feedback.schema';
import { Stage, StageSchema } from '@app/stage/stage.shema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Feedback.name, schema: FeedbackSchema },
    { name: Stage.name, schema: StageSchema },
  ])],
  controllers: [FeedbackController],
  providers: [FeedbackService]
})
export class FeedbackModule {}
