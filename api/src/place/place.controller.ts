import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
import { RolesEnum } from '@app/common/enum/roles.emum';
// services
import { PlaceService } from './place.service';
// dto
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
// interfaces
import { PlacesResponseInterface } from '@app/place/types/placesResponse.interface';
import { PlaceResponseInterface } from '@app/place/types/placeResponse.interface';

@Controller('/place')
export class PlaceController {
  constructor(private readonly placeService: PlaceService) {
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async create(
    @Body('place') createPlaceDto: CreatePlaceDto,
  ): Promise<PlacesResponseInterface> {
    const places = await this.placeService.create(createPlaceDto);
    return this.placeService.buildPlacesResponse(places);
  }

  @Get()
  async findAll(): Promise<PlacesResponseInterface> {
    const places = await this.placeService.findAll();
    return this.placeService.buildPlacesResponse(places);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PlaceResponseInterface> {
    const place = await this.placeService.findOne(id);
    return this.placeService.buildPlaceResponse(place);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body('place') updatePlaceDto: UpdatePlaceDto,
  ): Promise<PlaceResponseInterface> {
    const place = await this.placeService.update(id, updatePlaceDto);
    return this.placeService.buildPlaceResponse(place);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  async remove(
    @Param('id') id: string,
  ): Promise<PlacesResponseInterface> {
    const places = await this.placeService.remove(id);
    return this.placeService.buildPlacesResponse(places);
  }
}
