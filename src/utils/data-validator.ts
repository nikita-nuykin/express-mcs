import { Response } from 'express';
import { validate } from 'class-validator';
import { ExpectedDataClass } from '../types';

export type GetValidatedDataProps = {
  data: Record<string, unknown>;
  Cls: ExpectedDataClass;
  res: Response;
};

export async function getValidatedData({ data, Cls, res }: GetValidatedDataProps) {
  const instance = new Cls();
  Object.entries(data).forEach(([key, value]) => {
    instance[key] = value;
  });
  const errors = await validate(instance);
  if (!errors.length) return instance;
  res.status(400).json(errors).send();
}
