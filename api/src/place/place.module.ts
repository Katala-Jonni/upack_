import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Place, PlaceSchema } from '@app/place/place.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Place.name, schema: PlaceSchema },
  ])],
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {
}
