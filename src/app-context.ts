import { Express } from 'express';
import {
  ControllerClass,
  ControllerInstance,
  ServiceClass,
  ServiceInstance,
  GetValidatedData,
  HandleError,
} from './types';

export type AppContextProps = {
  app: Express;
  getValidatedData?: GetValidatedData;
  handleError?: HandleError;
};

export class AppContext {
  public readonly app: Express;
  public readonly allInstances: Record<string, ServiceInstance | ControllerInstance> = {};
  public readonly initiatedModules: string[] = [];
  public readonly exportedInstances: Record<string, ServiceInstance[]> = {};
  public readonly getValidatedData: GetValidatedData | undefined;
  public readonly handleError: HandleError | undefined;

  constructor({ app, getValidatedData, handleError }: AppContextProps) {
    this.app = app;
    this.getValidatedData = getValidatedData;
    this.handleError = handleError;
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
