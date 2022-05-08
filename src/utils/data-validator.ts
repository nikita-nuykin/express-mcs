import 'reflect-metadata';
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { ExpectedDataClass, GetValidatedData } from '../types';

export type GetValidatedDataProps = {
  data: Record<string, unknown>;
  Cls: ExpectedDataClass;
  res: Response;
  getValidatedData?: GetValidatedData;
};

export async function getValidatedDataWrapper({
  data,
  Cls,
  res,
  getValidatedData,
}: GetValidatedDataProps) {
  if (!getValidatedData) return data;

  const instance = plainToInstance(Cls, data);
  return await getValidatedData(instance, res);
}
