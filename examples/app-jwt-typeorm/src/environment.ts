import dotenv from 'dotenv';
import { EnvironmentVariableError } from './errors/errors';

dotenv.config();

function tryGetVariable(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new EnvironmentVariableError();
  }
  return value;
}

export const environment = {
  PORT: Number(tryGetVariable('PORT')),
  APP_HASH: tryGetVariable('APP_HASH'),
  APP_JWT: tryGetVariable('APP_JWT'),
  DB_NAME: tryGetVariable('DB_NAME'),
  DB_USER: tryGetVariable('DB_USER'),
  DB_PASSWORD: tryGetVariable('DB_PASSWORD'),
  DB_PORT: Number(tryGetVariable('DB_PORT')),
  DB_HOST: tryGetVariable('DB_HOST'),
};
