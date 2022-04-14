import { WeatherForecastProviderData } from '../../contexts/WeatherForecast/provider-data.model';

export interface WeatherForecastProviderProps {
    children: React.ReactNode;
    data: WeatherForecastProviderData;
}
