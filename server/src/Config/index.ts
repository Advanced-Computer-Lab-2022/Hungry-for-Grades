import { config } from 'dotenv';
config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  SECRET_KEY,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  EXCHANGE_BASE_URL,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  CLIENT_URL,
  COMPANY_LOGO,
} = process.env;
