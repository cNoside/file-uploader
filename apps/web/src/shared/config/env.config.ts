export const env = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000', // remove this and use APP_URL instead
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
};
