import { Express } from 'express';
import { CONTROLLER_APP_PROPERTY_NAME } from './constants';
import {
  ControllerClass,
  ControllerInstance,
  ControllerMethod,
  ModuleClass,
  ModuleInstance,
  ModuleParams,
  ServiceClass,
  ServiceInstance,
} from './types';
import { setControllerApp } from './utils/inject-app';
import { getInjected } from './utils/injected';

export class ModuleInitializer {
  private readonly params: ModuleParams;
  private readonly providedServices: Record<string, ServiceInstance> = {};
  public readonly exportedServices: Record<string, ServiceInstance> = {};

  private get moduleName(): string {
    return this.Module.name;
  }

  constructor(
    private readonly Module: ModuleClass,
    private readonly initiated: Record<string, ModuleInstance>,
    private readonly app: Express,
    private readonly allInstances: Record<string, ServiceInstance | ControllerInstance> = {},
  ) {
    this.params = Module.prototype.params || {};
  }

  public get<T>(Cls: ServiceClass | ControllerClass): T {
    return this.allInstances[Cls.name] as T;
  }

  public init(): ModuleInstance | undefined {
    if (this.initiated[this.moduleName]) return undefined;

    this.initIncluded();
    this.initProviders();
    this.initControllers();

    const instance = new this.Module();
    this.initiated[this.moduleName] = instance;
    return instance;
  }

  private initIncluded() {
    const toInclude = this.params.include || [];
    toInclude.forEach((module) => {
      const initializer = new ModuleInitializer(module, this.initiated, this.app, this.allInstances);
      initializer.init();
      Object.keys(initializer.exportedServices).forEach((key: string) => {
        this.providedServices[key] = initializer.exportedServices[key];
      });
    });
  }

  private initProviders() {
    const providers = this.params.providers || [];
    providers.forEach(this.initProvider);
  }

  private initControllers() {
    const toInit = this.params.controllers || [];
    toInit.forEach(this.initController);
  }

  private initController = (Cls: ControllerClass): ControllerInstance => {
    setControllerApp(Cls, this.app);

    const toInject = getInjected(Cls);
    const args = toInject.map((item: string) => this.providedServices[item]);
    const controller = new (Cls as any)(...args);
    this.allInstances[Cls.name] = controller;

    // eslint-disable-next-line
    for (const key in controller) {
      if (key === CONTROLLER_APP_PROPERTY_NAME) continue;
      if (typeof (controller as any)[key] === 'function') {
        ((controller as any)[key] as ControllerMethod)();
      }
    }
    return controller;
  };

  private initProvider = (Cls: ServiceClass) => {
    const toInject = getInjected(Cls);
    const args = toInject.map((item: string) => this.providedServices[item]);
    const service = new (Cls as any)(...args);
    this.providedServices[Cls.name] = service;
    this.allInstances[Cls.name] = service;

    const toExport = this.params.export || [];
    if (toExport.includes(Cls)) this.exportedServices[Cls.name] = service;
  };
}
