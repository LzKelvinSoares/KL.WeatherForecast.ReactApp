import { createContext, useContext, useEffect, useState } from 'react';
import { WeatherForecastContextData } from '../models/contexts/WeatherForecast/context-data.model';
import { ForecastDay } from '../models/forecast-day.model';
import { WeatherForecastProviderProps } from '../models/props/WeatherForecast/provider-props.model';

const WeatherForecastContext = createContext({} as WeatherForecastContextData);

export function WeatherForecastProvider({children, data}: WeatherForecastProviderProps): JSX.Element {
    const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    useEffect(() => {
        if (data) {
          setForecastDays(data.forecastDays || []);
          setIsLoading(data.isLoading || false);
          setErrorText(data.errorText || '');
        }
      }, [data]);

    return (
        <WeatherForecastContext.Provider
            value={data}>
            {children}
        </WeatherForecastContext.Provider>
    );
}

const useWeatherForecastContext = (): WeatherForecastContextData => useContext(WeatherForecastContext);

export default useWeatherForecastContext;