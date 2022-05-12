import { Express } from 'express';
import { ModuleClass, ModuleParams, GetValidatedData, HandleError } from './types';
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
  handleError?: HandleError;
}

export function initAppModule({
  app,
  Module,
  getValidatedData,
  handleError,
}: InitAppModuleProps): AppContext {
  const context = new AppContext({ app, getValidatedData, handleError });
  new ModuleInitializer({ Module, context }).init();
  return context;
}
