import { Express } from 'express';
import { ControllerClass, ControllerInstance, ServiceClass, ServiceInstance } from './types';

export type AppContextProps = {
  app: Express;
};

export class AppContext {
  public readonly app: Express;
  public readonly allInstances: Record<string, ServiceInstance | ControllerInstance> = {};
  public readonly initiatedModules: string[] = [];
  public readonly exportedInstances: Record<string, ServiceInstance[]> = {};

  constructor({ app }: AppContextProps) {
    this.app = app;
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
