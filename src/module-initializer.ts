import { AppContext } from './app-context';
import { CONTROLLER_APP_CONTEXT_PROPERTY_NAME } from './constants';
import {
  ControllerClass,
  ControllerInstance,
  ControllerMethod,
  ModuleClass,
  ModuleParams,
  ServiceClass,
  ServiceInstance,
} from './types';
import { setContextToController } from './utils/inject-context';
import { getInjectedList } from './utils/injected';

export type ModuleInitializerProps = {
  Module: ModuleClass;
  context: AppContext;
};

export class ModuleInitializer {
  private readonly context: AppContext;

  private readonly moduleName: string;
  private readonly Module: ModuleClass;

  private readonly imports: ModuleClass[];
  private readonly controllers: ControllerClass[];
  private readonly providers: ServiceClass[];
  private readonly exports: ServiceClass[];

  private readonly provided: Record<string, ServiceInstance> = {};

  constructor({ Module, context }: ModuleInitializerProps) {
    const params: ModuleParams = Module.prototype.params || {};
    this.imports = params.imports || [];
    this.controllers = params.controllers || [];
    this.providers = params.providers || [];
    this.exports = params.exports || [];

    this.Module = Module;
    this.moduleName = Module.name;
    this.context = context;
  }

  public init(): void {
    if (this.context.initiatedModules.includes(this.moduleName)) return;

    this.initIncluded();
    // collect provided
    this.initProviders();
    this.initControllers();

    new this.Module(); // ???
    this.context.initiatedModules.push(this.moduleName);
  }

  private initIncluded() {
    this.imports.forEach((Module) => {
      new ModuleInitializer({ Module, context: this.context }).init();
      const providedByModule = this.context.exportedInstances[Module.name] || [];
      providedByModule.forEach((instance) => {
        this.provided[instance.constructor.name] = instance;
      });
    });
  }

  private initProviders() {
    this.providers.forEach(this.initProvider);
  }

  private initControllers() {
    this.controllers.forEach(this.initController);
  }

  private initController = (Cls: ControllerClass): ControllerInstance => {
    setContextToController(Cls, this.context);

    const toInject = getInjectedList(Cls);
    const args = toInject.map((item: string) => this.provided[item]);
    const controller = new (Cls as any)(...args);
    this.context.allInstances[Cls.name] = controller;

    // eslint-disable-next-line
    for (const key in controller) {
      if (key === CONTROLLER_APP_CONTEXT_PROPERTY_NAME) continue;
      if (typeof (controller as any)[key] === 'function') {
        ((controller as any)[key] as ControllerMethod)();
      }
    }
    return controller;
  };

  private initProvider = (Cls: ServiceClass) => {
    const toInject = getInjectedList(Cls);
    const args = toInject.map((item: string) => this.provided[item]);
    const service = new (Cls as any)(...args);
    this.provided[Cls.name] = service;
    this.context.allInstances[Cls.name] = service;

    if (this.exports.includes(Cls)) {
      this.context.addExported(this.moduleName, service);
    }
  };
}
