import { ForecastDay } from '../../forecast-day.model';

export type WeatherForecastProviderData = {
    forecastDays: ForecastDay[];
    setForecastDays: (data: ForecastDay[]) => void;
    isLoading: boolean;
    setIsLoading: (data: boolean) => void;
    errorText: string;
    setErrorText: (data: string) => void;
}
 