import { CarsController } from '../src/cars/cars.controller';
import { CarsService } from '../src/cars/cars.service';
import { ImportedCarsService } from '../src/cars/imported-cars.service';
import {appModule} from '../src';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';

import {stopServer} from './utils';

afterAll(async () => {
  stopServer();
});

describe('Service/Controller initialization', () => {
  test('Services/Controllers from imported module initialized', () => {
    const usersController = appModule.get<UsersController>(UsersController);
    expect(usersController).toBeTruthy()
    expect(usersController['service']).toBeTruthy()
    
    const usersService = appModule.get<UsersService>(UsersService);
    expect(usersService).toBeTruthy()
  });

  test('Services/Controllers from standalone module did not initialize', () => {
    const carsController = appModule.get<CarsController>(CarsController);
    expect(carsController).toBeFalsy()
    
    const carsService = appModule.get<CarsService>(CarsService);
    expect(carsService).toBeFalsy()

    const importedCarsService = appModule.get<ImportedCarsService>(ImportedCarsService);
    expect(importedCarsService).toBeFalsy()
  });
});
