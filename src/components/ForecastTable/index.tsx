import useWeatherForecastContext from '../../contexts/WeatherForecastContext';
import { ForecastDay } from '../../models/forecast-day.model';
import { Weather } from '../../models/weather.model';
import { Container, DayGrid, ForecastGrid, Loading } from './styles';

export default function ForecastTableCP(): JSX.Element {
    const {
        forecastDays,
        isLoading,
        errorText
    } = useWeatherForecastContext();

    function formatDate(date: string) {
        return new Date(date).toLocaleDateString('en-US');
    }

    function loadForecastTable() {
        if (!isLoading) {
            if (errorText !== '') {
                return <Loading>{errorText}</Loading>;
            } else {
                return (<Container>
                     {
                         forecastDays.map((item: ForecastDay, i: number) => (
                             <DayGrid key={i}>
                                 <div data-testid="forecast-name-test" className="forecast-day-name forecast-day-property">
                                     {item.name}, {formatDate(item.date.toString())}
                                 </div>
                                 <div className="forecast-day-weather">
                                     {item.weatherForecasts.map((forecast: Weather, j: number) => (
                                         <ForecastGrid key={j}>
                                             <div className="forecast-name forecast-property">
                                                 {forecast.isDaytime ? 'Day' : 'Night'}
                                             </div>
                                             <div className="forecast-temperature forecast-property">
                                                 {forecast.temperature}°{forecast.temperatureUnit}
                                             </div>
                                             <div className="forecast-short-forecast forecast-property">
                                                 {forecast.shortForecast}
                                             </div>
                                             <div className="forecast-detailed-forecast forecast-property">
                                                 {forecast.detailedForecast}
                                             </div>
                                             <div className="forecast-image-container forecast-property">
                                                 <img className="forecast-image" src={forecast.icon} alt={forecast.name} />
                                             </div>
                                         </ForecastGrid>
                                     ))}
                                 </div>
                             </DayGrid>
                         ))
                     }
                 </Container>
                );                
            }
        } else {
            return <Loading>Loading...</Loading>
        }
    }

    return (
        <>
            {loadForecastTable()}
        </>
    );
}