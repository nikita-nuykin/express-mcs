import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './users.entity';

export class UsersRepository extends EntityRepository<User> {}
