import { DataSourceOptions } from 'typeorm';
import { environment } from '../environment';

export default {
  migrations: [__dirname + '/**/migrations/**/*.{js,ts}'],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  database: environment.DB_NAME,
  password: environment.DB_PASSWORD,
  port: environment.DB_PORT,
  username: environment.DB_USER,
  host: environment.DB_HOST,
  type: 'postgres',
  cli: {
    migrationsDir: './migrations',
  },
  migrationsRun: true,
} as DataSourceOptions;
