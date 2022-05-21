import crypto from 'crypto';

export function createHash(secret: string, salt: string): string {
  return crypto
    .createHash('sha256')
    .update(salt + secret, 'utf8')
    .digest('hex');
}
