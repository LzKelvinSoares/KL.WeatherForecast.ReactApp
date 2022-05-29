import getConfig from 'next/config';
import { Weather } from '../../models/weather.model';

const { publicRuntimeConfig } = getConfig();

export default async function getWeatherForecast(fullAddress: string, daysToForecast: number): Promise<Weather[]> {
    const response = await fetch(`${publicRuntimeConfig.apiBaseUrl}/forecast/${fullAddress}`)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return {error: 'An error has occured'};
      });

    if (response.error) {
      throw new Error(response.error);
    } else {
      return response.periods
        .filter((p: Weather) => _isComparedPeriods(p, daysToForecast));
    }
}

function _isComparedPeriods(period: Weather, daysToForecast: number): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + daysToForecast);
  endDate.setHours(23, 59, 0, 0);

  const dateToCompare = new Date(period.startTime);

  return dateToCompare >= today && dateToCompare <= endDate;
}
