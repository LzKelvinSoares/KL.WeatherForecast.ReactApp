import { useState } from 'react';
import useWeatherForecastContext from '../../contexts/WeatherForecastContext';
import { ForecastDay } from '../../models/forecast-day.model';
import searchForecast from '../../services/searchForecast';
import { Button, FormGroup, Input, InputGroup } from './styles'; 

export default function SearchBarCP(): JSX.Element {
    const [address, setAddress] = useState('');
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
            forecasts = await searchForecast(address);
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
                <Button disabled={isLoading}>Search</Button>
            </FormGroup>
        </section>
    );
}