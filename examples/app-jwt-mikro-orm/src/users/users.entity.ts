import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UsersRepository } from './users.repository';

@Entity({ customRepository: () => UsersRepository })
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id!: string;

  @Property({ unique: true })
  login!: string;

  @Property()
  passwordHash!: string;
}
