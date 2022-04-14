import getConfig from 'next/config';
import { ForecastResponse } from '../../models/api/forecast/forecast-response.model';
import { GeolocationResponse } from '../../models/api/geolocation/geolocation-response.model';
import { HttpResponse } from '../../models/http-response.model';
import { HttpStatus } from '../../models/http-status.enum';
import fetcher from './fetcher';
import geolocation from './geolocation';

const { publicRuntimeConfig } = getConfig();

export default async function forecasts(fullAddress: string): Promise<HttpResponse<ForecastResponse | GeolocationResponse,string>> {
    const forecastResponse = await getForecastProperties(fullAddress);
    if (forecastResponse.status === HttpStatus.OK) {
        const forecastProps = forecastResponse.data as ForecastResponse;
        return fetcher(forecastProps.properties.forecast, forecastsPeriodsNotEmpty, 'No forecasts');
    } else {
        return forecastResponse;
    }
}

async function getForecastProperties(fullAddress: string): Promise<HttpResponse<ForecastResponse | GeolocationResponse,string>> {
    const geolocationResponse = await geolocation(fullAddress);
    if (geolocationResponse.status === HttpStatus.OK) {
        const geolocationProps = geolocationResponse.data as GeolocationResponse;
        const coordinates = geolocationProps.result.addressMatches[0].coordinates;
        return fetcher(`${publicRuntimeConfig.externalApis.forecast}/points/${coordinates.y},${coordinates.x}`,
            forecastsNotEmpty, 'No forecasts');
    } else {
        return geolocationResponse;
    }
}

function forecastsNotEmpty(response: ForecastResponse): boolean {
    return response.properties &&
        response.properties.forecast != null &&
        response.properties.forecast != '';
}

function forecastsPeriodsNotEmpty(response: ForecastResponse): boolean {
    return response.properties &&
        response.properties.periods &&
        response.properties.periods.length > 0;
}
