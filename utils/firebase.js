import Auth from 'firebase-auth-lite';
import { Database } from './database';

export const auth = new Auth({
  apiKey: process.env.API_KEY,
  redirectUri: `${process.env.BASE_URL}/redirect`
});

export const database = new Database({
  databaseUrl: process.env.DATABASE_URL,
  auth
});
