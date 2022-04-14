import type { AppProps } from 'next/app'
import GlobalStyles from '../src/styles/global';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp
