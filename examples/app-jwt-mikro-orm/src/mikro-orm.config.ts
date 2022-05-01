import { Configuration, Options } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { environment } from './environment';

export default {
  entities: ['../**/**.entity.js'],
  entitiesTs: ['./**/**.entity.ts'],
  dbName: environment.DB_NAME,
  password: environment.DB_PASSWORD,
  port: environment.DB_PORT,
  user: environment.DB_USER,
  type: 'postgresql',
} as Configuration<PostgreSqlDriver> | Options<PostgreSqlDriver>;
