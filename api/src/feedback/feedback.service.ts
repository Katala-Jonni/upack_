import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// schemas
import { Feedback, FeedbackDocument } from '@app/feedback/feedback.schema';
// dto
import { CreateFeedbackDto } from './dto/create-feedback.dto';
// interfaces
import { FeedbacksResponseInterface } from '@app/feedback/types/feedbacksResponse.interface';
import { FeedbackResponseInterface } from '@app/feedback/types/feedbackResponse.interface';
import { Stage, StageDocument } from '@app/stage/stage.shema';
import { mapStage } from '@app/feedback/utils/stage';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name) private readonly feedbackRepository: Model<FeedbackDocument>,
    @InjectModel(Stage.name) private readonly stageRepository: Model<StageDocument>,
  ) {}

  async findAll(): Promise<Feedback[]> {
    return await this.feedbackRepository
      .find()
      .select({ __v: 0 })
      .exec();
  }

  async findOne(id: string): Promise<Feedback> {
    await this.changeStage(id);
    return await this.feedbackRepository
      .findById(id)
      .select({ __v: 0 })
      .exec();
  }

  async changeStage(id: string) {
    const currentFeedback: FeedbackDocument = await this.feedbackRepository.findById(id);
    if (!currentFeedback) {
      throw new HttpException('feedback is not found', HttpStatus.NOT_FOUND);
    }
    const stages = await this.stageRepository.find();
    const currentStage = stages.find(s => s._id.toString() === currentFeedback.stageId.toString());
    if (currentStage.title.toLowerCase() === mapStage.newS.title.toLowerCase()) {
      const stageRead = stages.find(s => s.title.toLowerCase() === mapStage.read.title.toLowerCase());
      currentFeedback.stageId = stageRead ? stageRead._id : currentFeedback.stageId;
    }
    await currentFeedback.save();
  }

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback[]> {
    const stage = await this.stageRepository.findOne({ title: mapStage.newS.title });
    if (!stage) {
      throw new HttpException('not found', HttpStatus.NOT_FOUND);
    }
    const payload: CreateFeedbackDto & { stageId?: string } = this.getPayload(createFeedbackDto);
    const newFeedback = new this.feedbackRepository({
      ...payload,
      stageId: stage,
    });
    await newFeedback.save();
    return this.findAll();
  }

  async remove(id: string): Promise<Feedback[]> {
    const currentFeedback: Feedback & { _id?: string } = await this.findOne(id);
    if (!currentFeedback) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.feedbackRepository.findByIdAndDelete(id);
    return this.findAll();
  }

  private getPayload(
    feedback: CreateFeedbackDto,
  ): CreateFeedbackDto {
    return {
      name: feedback.name,
      email: feedback.email,
      subject: feedback.subject,
      message: feedback.message,
      agreement: feedback.agreement,
    };
  }

  buildFeedbacksResponse(feedback: Feedback[]): FeedbacksResponseInterface {
    return { feedback, feedbackCount: feedback.length };
  }

  buildFeedbackResponse(feedback: Feedback): FeedbackResponseInterface {
    return { feedback };
  }
}
