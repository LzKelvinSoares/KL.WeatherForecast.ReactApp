import getConfig from 'next/config';
import { GeolocationResponse } from '../../models/api/geolocation/geolocation-response.model';
import { HttpResponse } from '../../models/http-response.model';
import fetcher from './fetcher';

const { publicRuntimeConfig } = getConfig();

export default async function geolocation(address: string): Promise<HttpResponse<GeolocationResponse,string>> {
    return fetcher<GeolocationResponse>(`${publicRuntimeConfig.externalApis.geocoder}?address=${address}&benchmark=2020&format=json`, 
        matchedAddressNotEmpty, 'No matched address');
}

function matchedAddressNotEmpty(response: GeolocationResponse): boolean {
    return response.result.addressMatches.length > 0;
}