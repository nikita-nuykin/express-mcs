import 'reflect-metadata';
import { Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ExpectedDataClass } from '../types';

export type GetValidatedDataProps = {
  data: Record<string, unknown>;
  Cls: ExpectedDataClass;
  res: Response;
};

export async function getValidatedData({ data, Cls, res }: GetValidatedDataProps) {
  const instance = plainToInstance(Cls, data);
  const errors = await validate(instance);
  if (!errors.length) return instance;
  res.status(400).json(errors).send();
}
