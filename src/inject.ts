import { ControllerClass, ServiceClass } from './types';
import { setInjected } from './utils/injected';

export function Inject(name: string): ParameterDecorator {
  return (Cls: unknown) => {
    setInjected((Cls as ControllerClass | ServiceClass).constructor, name);
  };
}
