import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE_NAME,
  API_URL,
  MACHINE_ENV,
  JWT_SECRET,
} = process.env;
