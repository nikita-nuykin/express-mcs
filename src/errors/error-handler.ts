import { Response } from 'express';
import { HandleError } from '../types';
import { HttpError } from './errors';

export const handleError: HandleError = async (res: Response, error: unknown) => {
  if (error instanceof HttpError) {
    if (!res.headersSent) {
      res.status(Number(error.message)).send();
    }
  } else {
    throw error;
  }
};
