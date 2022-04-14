import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeScreen from '../../../pages/index';
import { ThemeProvider } from 'styled-components';
import theme from '../../../src/styles/theme';

describe('Home', () => {
  it('renders a header', () => {
    render(
      <ThemeProvider theme={theme}>
        <HomeScreen />
      </ThemeProvider>)

    const heading = screen.getByText('Weather Forecast');

    expect(heading).toBeInTheDocument()
  })
})