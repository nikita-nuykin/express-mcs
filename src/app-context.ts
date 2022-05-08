import { Express } from 'express';
import {
  ControllerClass,
  ControllerInstance,
  ServiceClass,
  ServiceInstance,
  GetValidatedData,
} from './types';

export type AppContextProps = {
  app: Express;
  getValidatedData?: GetValidatedData;
};

export class AppContext {
  public readonly app: Express;
  public readonly allInstances: Record<string, ServiceInstance | ControllerInstance> = {};
  public readonly initiatedModules: string[] = [];
  public readonly exportedInstances: Record<string, ServiceInstance[]> = {};
  public readonly getValidatedData: GetValidatedData | undefined;

  constructor({ app, getValidatedData }: AppContextProps) {
    this.app = app;
    this.getValidatedData = getValidatedData;
  }

  public get<T>(Cls: ServiceClass | ControllerClass): T {
    return this.allInstances[Cls.name] as T;
  }

  public addExported(moduleName: string, service: ServiceInstance) {
    if (!this.exportedInstances[moduleName]) {
      this.exportedInstances[moduleName] = [service];
    } else {
      this.exportedInstances[moduleName].push(service);
    }
  }
}
