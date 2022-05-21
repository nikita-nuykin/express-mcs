import { sign, verify } from 'jsonwebtoken';
import { environment } from '../environment';
import { User } from '../users/users.entity';

export class JWT {
  public static sign(user: User): string {
    return sign({ id: user.id }, environment.APP_JWT);
  }

  public static verify(token: string): string {
    const decoded = verify(token, environment.APP_JWT) as { id: string };
    return decoded.id;
  }
}
