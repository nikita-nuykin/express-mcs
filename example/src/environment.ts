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
};
