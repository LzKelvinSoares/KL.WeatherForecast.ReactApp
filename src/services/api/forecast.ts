import getConfig from 'next/config';
import { ForecastResponse } from '../../models/api/forecast/forecast-response.model';
import { HttpResponse } from '../../models/http-response.model';
import fetcher from './fetcher';

const { publicRuntimeConfig } = getConfig();

async function getForecastProperties(coordinates: any): Promise<HttpResponse<ForecastResponse,string>> {
    return fetcher(`${publicRuntimeConfig.externalApis.forecast}/points/${coordinates.y},${coordinates.x}`,
        forecastsNotEmpty, 'No forecasts');
}

async function getWeatherForecasts(url: string): Promise<HttpResponse<ForecastResponse,string>> {
    return fetcher(url, forecastsPeriodsNotEmpty, 'No forecasts');
}

function forecastsNotEmpty(response: ForecastResponse): boolean {
    return response.properties.forecast != null &&
        response.properties.forecast != '';
}

function forecastsPeriodsNotEmpty(response: ForecastResponse): boolean {
    return response.properties.periods.length > 0;
}

export {
    getForecastProperties,
    getWeatherForecasts
}