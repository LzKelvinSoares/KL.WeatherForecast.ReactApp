import type { NextApiRequest, NextApiResponse } from 'next';
import { ForecastPoint } from '../../../src/models/api/forecast/forecast-point.model';
import { ForecastResponse } from '../../../src/models/api/forecast/forecast-response.model';
import { HttpStatus } from '../../../src/models/http-status.enum';
import forecasts from '../../../src/services/api/forecasts';

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
    let status = HttpStatus.OK;
    let error = '';
    const weatherForecastsResponse = await forecasts(req.query.id as string);
    if (weatherForecastsResponse.status === HttpStatus.OK) {
      const weatherForecasts = weatherForecastsResponse.data as ForecastResponse;
      return res.status(status).json({periods: weatherForecasts.properties.periods});
    } else {
      status = weatherForecastsResponse.status;
      error = weatherForecastsResponse.data as string;
    }

    return res.status(status).json({error});
}
