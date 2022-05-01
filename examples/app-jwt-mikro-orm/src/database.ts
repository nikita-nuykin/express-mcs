import { MikroORM } from '@mikro-orm/core';
import type { PostgreSqlDriver, EntityManager } from '@mikro-orm/postgresql';
import config from './mikro-orm.config';

class Database {
  private _orm: MikroORM<PostgreSqlDriver> | null = null;

  public getOrm(): MikroORM<PostgreSqlDriver> {
    return this._orm as MikroORM<PostgreSqlDriver>;
  }

  public async init() {
    this._orm = await MikroORM.init<PostgreSqlDriver>(config);
  }

  public getManager(): EntityManager {
    return this.getOrm().em.fork();
  }

  public getRepo<T>(entity: any): T {
    return this.getManager().getRepository(entity) as any;
  }
}

export const database = new Database();
