import { ForecastDay } from '../models/forecast-day.model';
import { Weather } from '../models/weather.model';
import getWeatherForecast from './http/getWeatherForecasts';

export default async function searchForecast(fullAddress: string): Promise<ForecastDay[]> {
    const weatherForecasts = await getWeatherForecast(fullAddress);
    return _loadForecastsByDate(weatherForecasts);
}

function _loadForecastsByDate(list: Weather[]): ForecastDay[] {
    const forecastDays: ForecastDay[] = [];
    list.forEach((weather: Weather) => {
        if (forecastDays.some((f: ForecastDay) => _compareDates(f.date, weather.startTime))) {
            forecastDays
                .find((f: ForecastDay) => _compareDates(f.date, weather.startTime))
                .weatherForecasts.push(weather);
        } else {
            const newDay = new ForecastDay();
            newDay.date = weather.startTime;
            newDay.name = weather.name.toLocaleLowerCase() !== 'this afternoon' ? weather.name : 'Today';
            newDay.weatherForecasts = [weather];
            forecastDays.push(newDay);
        }
    });
    return forecastDays;
}

function _compareDates(date1: Date, date2: Date): boolean {
    return new Date(date1).setHours(0) === new Date(date2).setHours(0);
}