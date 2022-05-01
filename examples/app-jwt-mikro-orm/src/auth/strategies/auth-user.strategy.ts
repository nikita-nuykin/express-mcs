import { Response } from 'express';
import { AuthorizationError, getMiddleware } from '../../../../../src';
import { database } from '../../database';
import { User } from '../../users/users.entity';
import { UsersRepository } from '../../users/users.repository';
import { JWT } from '../../utils/jwt';

export const UserBasicAuth = getMiddleware(async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AuthorizationError();

  const token = authHeader.split(' ')[1];
  if (!token) throw new AuthorizationError();

  try {
    const id = JWT.verify(token);
    if (!id) throw new AuthorizationError();

    const userRepo: UsersRepository = database.getRepo<UsersRepository>(User);
    const user = await userRepo.findOne({ id });
    if (!user) throw new AuthorizationError();

    (req as any).user = user;
  } catch {
    throw new AuthorizationError();
  }
});

function send401(res: Response) {
  res.status(401).send();
}
