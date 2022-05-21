import { User } from '../users/users.entity';

export type UserContract = {
  token: string;
  data: {
    login: string;
  };
};

export type RequestWithUser = {
  user: User;
};
