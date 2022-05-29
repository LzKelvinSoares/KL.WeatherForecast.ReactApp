import { useState } from 'react';
import useWeatherForecastContext from '../../contexts/WeatherForecastContext';
import { ForecastDay } from '../../models/forecast-day.model';
import searchForecast from '../../services/searchForecast';
import { Button, FormGroup, Input, InputGroup, Select } from './styles'; 

export default function SearchBarCP(): JSX.Element {
    const [address, setAddress] = useState('');
    const [daysToForecast, setDaysToForecast] = useState(6);
    const [hasError, setHasError] = useState(false);

    const {
        setForecastDays,
        isLoading,
        setIsLoading,
        setErrorText
    } = useWeatherForecastContext(); 

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        setIsLoading(true);
        setErrorText('');
        setForecastDays([]);
        let forecasts: ForecastDay[] = [];
        try {
            forecasts = await searchForecast(address, daysToForecast);
            setForecastDays(forecasts);
        } catch(err) {
            setErrorText(err.message);
        }
        setIsLoading(false);
    }

    function handleChangeAddress({
      target,
    }: React.ChangeEvent<HTMLInputElement>): void {
        setAddress(target.value);
    }

    function handleChangeDays({
      target,
    }: React.ChangeEvent<HTMLInputElement>): void {
        setDaysToForecast(parseInt(target.value));
    }

    return (
        <section>
            <FormGroup onSubmit={handleSubmit}> 
                <InputGroup>
                    <label htmlFor="address-input">
                        Place your full address (US Only): </label>
                    <Input
                        id="address-input"
                        name="address-input"
                        type="text"
                        required
                        placeholder="Address"
                        value={address}
                        hasError={hasError}
                        data-testid="search-address-input"
                        onChange={(event): void => handleChangeAddress(event)}
                    />
                </InputGroup>
                <InputGroup>
                    <label htmlFor="days-select">
                        Days to forecast: </label>
                    <Select
                        id="days-select"
                        name="days-select"
                        value={daysToForecast}
                        data-testid="search-days-select"
                        onChange={(event): void => handleChangeDays(event)}
                    >
                        {
                            [...new Array(7)]
                            .map((_, index) => 
                                (
                                    <option key={index} value={index}>{index + 1}</option>
                                )
                            )
                        }
                    </Select>
                </InputGroup>
                <Button disabled={isLoading}>Search</Button>
            </FormGroup>
        </section>
    );
}