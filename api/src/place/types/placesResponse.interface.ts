import { Place } from '@app/place/place.schema';

export interface PlacesResponseInterface {
  places: Place[],
  placeCount: number
}
