import getConfig from 'next/config';
import { Weather } from '../../models/weather.model';

const { publicRuntimeConfig } = getConfig();

export default async function getWeatherForecast(fullAddress: string): Promise<Weather[]> {
    const response = await fetch(`${publicRuntimeConfig.apiBaseUrl}/forecast/${fullAddress}`)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        return {error: 'An error has occured'};
      });

    if (response.error) {
      throw new Error(response.error);
    } else {
      return response.periods;
    }
  }