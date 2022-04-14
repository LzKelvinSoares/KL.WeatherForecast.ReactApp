import { Weather } from './weather.model';

export class ForecastDay {
    name: string = '';
    date: Date = new Date();
    weatherForecasts: Weather[] = [];
}
