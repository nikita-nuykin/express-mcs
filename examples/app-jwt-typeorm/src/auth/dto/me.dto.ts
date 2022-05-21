import { UserContract } from '../auth.types';

export class MeResponse {
  status!: 'ok';

  payload!: UserContract;
}
