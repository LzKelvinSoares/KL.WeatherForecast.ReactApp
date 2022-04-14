export type ForecastPoint = {
    detailedForecast: string;
    endTime: Date;
    icon: string;
    isDaytime: boolean;
    name: string;
    number: number;
    shortForecast: string;
    startTime: Date;
    temperature: number;
    temperatureUnit: string;
}