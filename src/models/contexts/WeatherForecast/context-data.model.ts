import { ForecastDay } from '../../forecast-day.model';

export type WeatherForecastContextData = {
    forecastDays: ForecastDay[];
    setForecastDays: (data: ForecastDay[]) => void;
    isLoading: boolean;
    setIsLoading: (data: boolean) => void;
    errorText: string;
    setErrorText: (data: string) => void;
}
