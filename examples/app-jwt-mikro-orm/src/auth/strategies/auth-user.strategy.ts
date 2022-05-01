import { Response } from 'express';
import { getMiddleware } from '../../../../../src';
import { database } from '../../database';
import { User } from '../../users/users.entity';
import { UsersRepository } from '../../users/users.repository';
import { JWT } from '../../utils/jwt';

export const UserBasicAuth = getMiddleware(async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return send401(res);

  const token = authHeader.split(' ')[1];
  if (!token) return send401(res);

  try {
    const id = JWT.verify(token);
    if (!id) return send401(res);

    const userRepo: UsersRepository = database.getRepo<UsersRepository>(User);
    const user = await userRepo.findOne({ id });
    if (!user) return send401(res);

    (req as any).user = user;
  } catch {
    return send401(res);
  }
});

function send401(res: Response) {
  res.status(401).send();
}
