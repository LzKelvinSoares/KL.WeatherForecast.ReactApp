import { Geocordinates } from './geocoordinates.model';

export type MatchedAddress = {
    matchedAddress: string;
    coordinates: Geocordinates;
}