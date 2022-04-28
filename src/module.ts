import { Express } from 'express';
import { ModuleClass, ModuleParams } from './types';
import { ModuleInitializer } from './module-initializer';

export function Module(params: ModuleParams) {
  return (target: ModuleClass) => {
    target.prototype.params = params;
  };
}

export function initAppModule(Module: ModuleClass, app: Express) {
  const module = new ModuleInitializer(Module, {}, app);
  module.init();
  return module;
}
