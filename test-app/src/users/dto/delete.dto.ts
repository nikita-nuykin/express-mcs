import { IsUUID } from 'class-validator';

export class UserDeleteRequestParams {
  @IsUUID(4)
  id!: string;
}
