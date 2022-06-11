import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
// enums
import { RolesEnum } from '@app/common/enum/roles.emum';
// services
import { StageService } from './stage.service';
// dto
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
//interface
import { StagesResponseInterface } from '@app/stage/types/stagesResponse.interface';
import { StageResponseInterface } from '@app/stage/types/stageResponse.interface';

@Controller('/stage')
export class StageController {
  constructor(private readonly stageService: StageService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('stage') createStageDto: CreateStageDto
  ): Promise<StagesResponseInterface> {
    const stages = await this.stageService.create(createStageDto);
    return this.stageService.buildStagesResponse(stages);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findAll(): Promise<StagesResponseInterface> {
    const stages = await this.stageService.findAll();
    return this.stageService.buildStagesResponse(stages);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async findOne(
    @Param('id') id: string
  ): Promise<StageResponseInterface> {
    const stage = await this.stageService.findOne(id);
    return this.stageService.buildStageResponse(stage);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body('stage') updateStageDto: UpdateStageDto
  ) {
    const stage = await this.stageService.update(id, updateStageDto);
    return this.stageService.buildStageResponse(stage);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async remove(
    @Param('id') id: string
  ): Promise<StagesResponseInterface> {
    const stages = await this.stageService.remove(id);
    return this.stageService.buildStagesResponse(stages);
  }
}
