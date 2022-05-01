import { Response } from 'express';
import { HttpError } from './errors';

export function handleError(res: Response, error: unknown) {
  if (error instanceof HttpError) {
    if (!res.headersSent) {
      res.status(Number(error.message)).send();
    }
  } else {
    throw error;
  }
}
