import { ControllerClass, ServiceClass } from './types';
import { setInjected } from './utils/injected';

export function Inject(Injected: unknown): ParameterDecorator {
  return (Cls: unknown) => {
    const name = (Injected as ServiceClass).name;
    setInjected((Cls as ControllerClass | ServiceClass), name);
  };
}
