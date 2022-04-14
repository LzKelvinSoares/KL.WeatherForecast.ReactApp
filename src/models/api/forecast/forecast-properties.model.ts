import { ForecastPoint } from './forecast-point.model';

export type ForecastProperties = {
    forecast: string;
    periods: ForecastPoint[]
}