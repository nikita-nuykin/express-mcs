import { FindOptionsWhere } from 'typeorm';
import { database } from '../db/database';
import { environment } from '../environment';
import { UserDoesNotExistError } from '../errors/errors';
import { createHash } from '../utils/create-hash';

import { User } from './users.entity';
import { UserCredentials } from './users.types';

export class UsersService {
  private readonly repo = database.getRepo<User>(User);

  public async create({ login, password }: UserCredentials): Promise<User> {
    await this.repo.insert({
      login,
      passwordHash: UsersService.passwordToHash(password),
    });
    return this.findOneOrFail({ login });
  }

  public async login({ login, password }: UserCredentials): Promise<User> {
    return this.findOneOrFail({ login, passwordHash: UsersService.passwordToHash(password) });
  }

  private async findOneOrFail(criteria: FindOptionsWhere<User>): Promise<User> {
    const user = await this.repo.findOne({ where: criteria });
    if (!user) {
      throw new UserDoesNotExistError();
    }
    return user;
  }

  private static passwordToHash(password: string): string {
    return createHash(password, environment.APP_HASH);
  }
}
