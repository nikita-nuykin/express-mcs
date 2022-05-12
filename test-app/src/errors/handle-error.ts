import { Response } from 'express';
import { HandleError, handleError as handleErrorDefault } from '../../../src';
import { CustomError } from './custom-error';

export const handleError: HandleError = async (res: Response, error: unknown) => {
  if (error instanceof CustomError) {
    res.status(400).json({ message: error.message });
  } else {
    await handleErrorDefault(res, error);
  }
};
