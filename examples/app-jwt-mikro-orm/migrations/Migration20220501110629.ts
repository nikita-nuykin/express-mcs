import { Migration } from '@mikro-orm/migrations';

export class Migration20220501110629 extends Migration {
  async up(): Promise<void> {
    this.addSql('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    this.addSql(`
      create table "user" (
        "id" uuid not null default uuid_generate_v4(),
        "login" varchar(255) not null,
        "password_hash" varchar(255) not null
      );
    `);
    this.addSql('alter table "user" add constraint "user_login_unique" unique ("login");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }
}
