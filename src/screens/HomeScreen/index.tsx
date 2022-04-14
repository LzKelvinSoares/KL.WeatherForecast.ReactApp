import { GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import ForecastTable from '../../components/ForecastTable';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import { WeatherForecastProvider } from '../../contexts/WeatherForecastContext';
import { WeatherForecastProviderData } from '../../models/contexts/WeatherForecast/provider-data.model';
import { ForecastDay } from '../../models/forecast-day.model';

export default function HomeScreen(): JSX.Element {
    const [isSSR, setIsSSR] = useState(true);
    const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');

    useEffect(() => {
        setIsSSR(false);
    }, []);

    const providerData = {
      forecastDays,
      setForecastDays,
      isLoading,
      setIsLoading,
      errorText,
      setErrorText
    } as WeatherForecastProviderData;

    function render() {
        return (
            <>
                <Header>
                    <h2>Weather Forecast</h2>
                </Header>
                <WeatherForecastProvider data={providerData}>
                    <SearchBar />
                    <ForecastTable />
                </WeatherForecastProvider>
            </>
        );
    }

    return (!isSSR ? render() : <></>);
}
