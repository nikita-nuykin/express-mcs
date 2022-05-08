import { validate } from 'class-validator';
import { Response } from 'express';

export async function getValidatedData(data: any, res: Response): Promise<unknown> {
  const errors = await validate(data);
  if (!errors.length) return data;
  res.status(400).json(errors).send();
  return undefined;
}
