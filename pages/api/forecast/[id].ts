import type { NextApiRequest, NextApiResponse } from 'next';
import { ForecastPoint } from '../../../src/models/api/forecast/forecast-point.model';
import { ForecastResponse } from '../../../src/models/api/forecast/forecast-response.model';
import { GeolocationResponse } from '../../../src/models/api/geolocation/geolocation-response.model';
import { HttpStatus } from '../../../src/models/http-status.enum';
import { getForecastProperties, getWeatherForecasts } from '../../../src/services/api/forecast';
import geolocation from '../../../src/services/api/geolocation';

type Data = {
  periods: ForecastPoint[];
}

type ErrorData = {
  error: string;
}

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
    const geolocationResponse = await geolocation(req.query.id as string);
    let status = HttpStatus.OK;
    let error = '';
    if (geolocationResponse.status === HttpStatus.OK) {
      const geolocationProps = geolocationResponse.data as GeolocationResponse;
      const forecastResponse = await getForecastProperties(geolocationProps.result.addressMatches[0].coordinates);
      if (forecastResponse.status === HttpStatus.OK) {
        const forecastProps = forecastResponse.data as ForecastResponse;
        const weatherForecastsResponse = await getWeatherForecasts(forecastProps.properties.forecast);
        if (weatherForecastsResponse.status === HttpStatus.OK) {
          const weatherForecasts = weatherForecastsResponse.data as ForecastResponse;
          return res.status(status).json({periods: weatherForecasts.properties.periods});
        } else {
          status = weatherForecastsResponse.status;
          error = weatherForecastsResponse.data as string;
        }
      } else {
        status = forecastResponse.status;
        error = forecastResponse.data as string;
      }
    } else {
      status = geolocationResponse.status;
      error = geolocationResponse.data as string;
    }

    return res.status(status).json({error});
}
