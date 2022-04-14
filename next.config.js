/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    externalApis: {
      geocoder: process.env.API_GEOCODER,
      forecast: process.env.API_FORECAST
    }
  },
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  ...nextConfig,
};
