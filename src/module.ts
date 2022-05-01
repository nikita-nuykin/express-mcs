import { Express } from 'express';
import { ModuleClass, ModuleParams } from './types';
import { ModuleInitializer } from './module-initializer';
import { AppContext } from './app-context';

export function Module(params: ModuleParams) {
  return (target: ModuleClass) => {
    target.prototype.params = params;
  };
}

export function initAppModule(Module: ModuleClass, app: Express): AppContext {
  const context = new AppContext({ app });
  new ModuleInitializer({ Module, context }).init();
  return context;
}
