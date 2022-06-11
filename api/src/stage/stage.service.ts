import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// schema
import { Stage, StageDocument } from '@app/stage/stage.shema';
// dto
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
// interfaces
import { StageResponseInterface } from '@app/stage/types/stageResponse.interface';
import { StagesResponseInterface } from '@app/stage/types/stagesResponse.interface';

const getErrorResponse = () => {
  return {
    statusCode: 400,
    message: [],
    error: 'Bad Request',
  };
};

@Injectable()
export class StageService {
  constructor(@InjectModel(Stage.name) private readonly stageRepository: Model<StageDocument>) {
  }

  async create(createStageDto: CreateStageDto): Promise<Stage[]> {
    const stageTitle = await this.stageRepository.findOne({ title: createStageDto.title });
    const errorResponse = getErrorResponse();
    if (stageTitle) {
      errorResponse.message.push('title has already been taken');
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
    const payload = this.getPayload(createStageDto);
    const newPlace = new this.stageRepository(payload);
    await newPlace.save();
    return this.findAll();
  }

  async findAll(): Promise<Stage[]> {
    return await this.stageRepository
      .find()
      .select({ __v: 0 })
      .exec();
  }

  async findOne(id: string): Promise<Stage> {
    return await this.stageRepository
      .findById(id)
      .select({ __v: 0 })
      .exec();
  }

  async update(id: string, updateStageDto: UpdateStageDto): Promise<Stage> {
    let currentStage: StageDocument = await this.stageRepository.findById(id);
    if (!currentStage) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = getErrorResponse();
    const isCurrentStage: boolean = updateStageDto.title.toLowerCase() === currentStage.title.toLowerCase();
    const newStage = await this.stageRepository.findOne({ title: updateStageDto.title });
    const isNotValidStage = newStage && !isCurrentStage;
    if (isNotValidStage) {
      errorResponse.message.push('title has already been taken');
      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
    currentStage = Object.assign(currentStage, updateStageDto);
    await currentStage.save();
    return this.findOne(id);
  }

  async remove(id: string): Promise<Stage[]> {
    const currentStage: Stage & { _id?: string } = await this.findOne(id);
    if (!currentStage) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.stageRepository.findByIdAndDelete(currentStage._id);
    return this.findAll();
  }

  private getPayload(
    stage: CreateStageDto | UpdateStageDto,
  ): CreateStageDto | UpdateStageDto {
    return {
      title: stage.title,
      color: stage.color,
      active: stage.active,
    };
  }

  buildStagesResponse(stages: Stage[]): StagesResponseInterface {
    return { stages, stagesCount: stages.length };
  }

  buildStageResponse(stage: Stage): StageResponseInterface {
    return { stage };
  }
}
