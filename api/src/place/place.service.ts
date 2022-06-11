import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// shemas
import { Place, PlaceDocument } from '@app/place/place.schema';
// dto
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
// interfaces
import { PlacesResponseInterface } from '@app/place/types/placesResponse.interface';
import { PlaceResponseInterface } from '@app/place/types/placeResponse.interface';

@Injectable()
export class PlaceService {
  constructor(@InjectModel(Place.name) private readonly placeRepository: Model<PlaceDocument>) {}

  async create(createPlaceDto: CreatePlaceDto): Promise<Place[]> {
    const placeByTitle = await this.placeRepository.findOne({ title: createPlaceDto.title });
    const errorResponse = {
      errors: {},
    };
    if (placeByTitle) {
      errorResponse['title'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const payload = this.getPayload(createPlaceDto);
    const newPlace = new this.placeRepository(payload);
    await newPlace.save();
    return this.findAll();
  }

  async findAll(): Promise<Place[]> {
    return await this.placeRepository
      .find()
      .select({ __v: 0 })
      .exec();
  }

  async findOne(id: string): Promise<PlaceDocument> {
    return await this.placeRepository
      .findById(id)
      .select({ __v: 0 })
      .exec();
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    let currentPlace: PlaceDocument = await this.findOne(id);
    if (!currentPlace) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = {};
    const isCurrentPlace: boolean = updatePlaceDto.title.toLowerCase() === currentPlace.title.toLowerCase();
    const placeByTitle: Place = await this.placeRepository.findOne({ title: updatePlaceDto.title });
    if (placeByTitle && !isCurrentPlace) {
      errorResponse['title'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    currentPlace = Object.assign(currentPlace, updatePlaceDto);
    await currentPlace.save();
    return this.findOne(currentPlace.id);
  }

  async remove(id: string): Promise<Place[]> {
    const currentPlace: Place = await this.findOne(id);
    if (!currentPlace) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.placeRepository.findByIdAndDelete(id);
    return this.findAll();
  }

  private getPayload(
    place: CreatePlaceDto | UpdatePlaceDto,
  ): CreatePlaceDto | UpdatePlaceDto {
    return {
      title: place.title,
      address: place.address,
      info: place.info,
      email: place.email,
      phone: place.phone,
      director: place.director,
      description: place.description,
    };
  }

  buildPlacesResponse(places: Place[]): PlacesResponseInterface {
    return { places, placeCount: places.length };
  }

  buildPlaceResponse(place: Place): PlaceResponseInterface {
    return { place };
  }
}
