import { DataSource } from 'typeorm';
import config from './typeorm.config';

export default new DataSource(config);
