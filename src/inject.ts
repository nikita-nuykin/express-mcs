import { ControllerClass, ServiceClass } from './types';
import { setInjected } from './utils/injected';

export function Inject(Injected: ServiceClass): ParameterDecorator {
  return (Cls: unknown) => {
    const name = Injected.name;
    setInjected(Cls as ControllerClass | ServiceClass, name);
  };
}
