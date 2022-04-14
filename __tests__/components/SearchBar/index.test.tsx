import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from 'styled-components';
import theme from '../../../src/styles/theme';
import { WeatherForecastProvider } from '../../../src/contexts/WeatherForecastContext';
import { WeatherForecastProviderData } from '../../../src/models/contexts/WeatherForecast/provider-data.model';
import SearchBar from '../../../src/components/SearchBar';

describe('ForecastTable', () => {
    it('renders the table with the forecasts', () => {
  
      const providerData = {
        forecastDays: [],
        setForecastDays: jest.fn(),
        isLoading: false,
        setIsLoading: jest.fn(),
        errorText: '',
        setErrorText: jest.fn()
      } as WeatherForecastProviderData;
      
      render(
        <ThemeProvider theme={theme}>
            <WeatherForecastProvider data={providerData}>
              <SearchBar />
            </WeatherForecastProvider>
        </ThemeProvider>)
  
      const searchBtn = screen.getByText('Search');
  
      expect(searchBtn).toBeInTheDocument();
    })
  })