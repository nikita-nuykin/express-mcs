import { Express } from 'express';
import { ModuleClass, ModuleParams, GetValidatedData } from './types';
import { ModuleInitializer } from './module-initializer';
import { AppContext } from './app-context';

export function Module(params: ModuleParams) {
  return (target: ModuleClass) => {
    target.prototype.params = params;
  };
}

export interface InitAppModuleProps {
  Module: ModuleClass;
  app: Express;
  getValidatedData?: GetValidatedData;
}

export function initAppModule({ app, Module, getValidatedData }: InitAppModuleProps): AppContext {
  const context = new AppContext({ app, getValidatedData });
  new ModuleInitializer({ Module, context }).init();
  return context;
}
