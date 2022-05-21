import { DataSource, EntityManager, Repository } from 'typeorm';
import config from './typeorm.config';

class Database {
  private _orm: DataSource | null = null;

  public getOrm(): DataSource {
    return this._orm as DataSource;
  }

  public async init() {
    this._orm = await new DataSource(config).initialize();
  }

  public getManager(): EntityManager {
    return this.getOrm().manager;
  }

  public getRepo<T>(entity: any): Repository<T> {
    return this.getManager().getRepository(entity);
  }
}

export const database = new Database();
