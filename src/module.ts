import { Express } from 'express';
import { ModuleClass, ModuleParams } from './types';
import { ModuleInitializer } from './module-initializer';

export function Module(params: ModuleParams) {
  return (target: unknown) => {
    // eslint-disable-next-line
    (target as ModuleClass).prototype.params = params;
  };
}

export function initAppModule(Module: ModuleClass, app: Express) {
  const module = new ModuleInitializer(Module, {}, app);
  module.init();
  return module;
}
