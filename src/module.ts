import { ModuleClass, ModuleParams } from './types';
import { ModuleInitializer } from './module-initializer';

export function Module(params: ModuleParams) {
  return (target: unknown) => {
    // eslint-disable-next-line
    (target as ModuleClass).prototype.params = params;

    if (params.main) {
      new ModuleInitializer(params.module, {}, params.app).init();
    }
  };
}
