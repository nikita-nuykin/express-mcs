import { AuthorizationError, getMiddleware } from 'express-mcs';
import { Repository } from 'typeorm';
import { database } from '../../db/database';
import { User } from '../../users/users.entity';
import { JWT } from '../../utils/jwt';

export const UserBasicAuth = getMiddleware(async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AuthorizationError();

  const token = authHeader.split(' ')[1];
  if (!token) throw new AuthorizationError();

  try {
    const id = JWT.verify(token);
    if (!id) throw new AuthorizationError();

    const userRepo: Repository<User> = database.getRepo<User>(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new AuthorizationError();

    (req as any).user = user;
  } catch {
    throw new AuthorizationError();
  }
});
