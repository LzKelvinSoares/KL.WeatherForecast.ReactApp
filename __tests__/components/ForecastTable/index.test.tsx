import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../src/styles/theme';
import ForecastTable from '../../../src/components/ForecastTable';
import { WeatherForecastProvider } from '../../../src/contexts/WeatherForecastContext';
import { WeatherForecastProviderData } from '../../../src/models/contexts/WeatherForecast/provider-data.model';
import { ForecastDay } from '../../../src/models/forecast-day.model';

describe('ForecastTable', () => {
  it('renders the table with the forecasts', () => {

    const forecastDay = new ForecastDay();
    forecastDay.name = 'Today Test';

    const providerData = {
      forecastDays: [forecastDay],
      setForecastDays: jest.fn(),
      isLoading: false,
      setIsLoading: jest.fn(),
      errorText: '',
      setErrorText: jest.fn()
    } as WeatherForecastProviderData;
    
    render(
      <ThemeProvider theme={theme}>
          <WeatherForecastProvider data={providerData}>
            <ForecastTable />
          </WeatherForecastProvider>
      </ThemeProvider>)

    const forecastTitle = screen.getByTestId('forecast-name-test');

    expect(forecastTitle.textContent).toEqual(`Today Test, ${forecastDay.date.toLocaleDateString('en-US')}`);
  })
})