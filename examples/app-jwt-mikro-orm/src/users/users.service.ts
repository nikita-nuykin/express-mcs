import { database } from '../database';
import { environment } from '../environment';
import { UserDoesNotExistError } from '../errors/errors';
import { createHash } from '../utils/create-hash';

import { User } from './users.entity';
import { UsersRepository } from './users.repository';
import { UserCredentials } from './users.types';

export class UsersService {
  private readonly repo: UsersRepository = database.getRepo<UsersRepository>(User);

  public async create({ login, password }: UserCredentials): Promise<User> {
    await this.repo.nativeInsert({
      login,
      passwordHash: UsersService.passwordToHash(password),
    });
    return this.findOneOrFail({ login });
  }

  public async login({ login, password }: UserCredentials): Promise<User> {
    return this.findOneOrFail({ login, passwordHash: UsersService.passwordToHash(password) });
  }

  private async findOneOrFail(criteria: Partial<User>): Promise<User> {
    const user = await this.repo.findOne(criteria);
    if (!user) {
      throw new UserDoesNotExistError();
    }
    return user;
  }

  private static passwordToHash(password: string): string {
    return createHash(password, environment.APP_HASH);
  }
}
