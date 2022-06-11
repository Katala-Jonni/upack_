import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
// enums
import { RolesEnum } from '@app/common/enum/roles.emum';
// services
import { FeedbackService } from './feedback.service';
// dto
import { CreateFeedbackDto } from './dto/create-feedback.dto';
// interfaces
import { FeedbacksResponseInterface } from '@app/feedback/types/feedbacksResponse.interface';
import { FeedbackResponseInterface } from '@app/feedback/types/feedbackResponse.interface';

@Controller('/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {
  }

  @Post()
  async create(
    @Body('feedback') createFeedbackDto: CreateFeedbackDto,
  ): Promise<FeedbacksResponseInterface> {
    const feedback = await this.feedbackService.create(createFeedbackDto);
    return this.feedbackService.buildFeedbacksResponse(feedback);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findAll(): Promise<FeedbacksResponseInterface> {
    const feedback = await this.feedbackService.findAll();
    return this.feedbackService.buildFeedbacksResponse(feedback);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findOne(
    @Param('id') id: string,
  ): Promise<FeedbackResponseInterface> {
    const feedback = await this.feedbackService.findOne(id);
    return this.feedbackService.buildFeedbackResponse(feedback);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async remove(
    @Param('id') id: string,
  ): Promise<FeedbacksResponseInterface> {
    const feedback = await this.feedbackService.remove(id);
    return this.feedbackService.buildFeedbacksResponse(feedback);
  }
}
