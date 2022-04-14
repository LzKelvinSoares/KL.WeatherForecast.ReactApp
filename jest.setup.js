// jest.setup.js

jest.mock('next/config', () => () => ({
    publicRuntimeConfig: {
        apiBaseUrl: 'http://my-fake-url.com.br',
        externalApis: {
          geocoder: 'http://my-fake-url-geo.com.br',
          forecast: 'http://my-fake-url-forecast.com.br'
        }
    }
  }))