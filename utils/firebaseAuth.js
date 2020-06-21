import Auth from 'firebase-auth-lite';

export default new Auth({
  apiKey: process.env.API_KEY,
  redirectUri: `${process.env.BASE_URL}/redirect`
});
