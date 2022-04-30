import { Controller, Get, Inject } from '../../../src';
import { APP_ROUTES } from '../constants';
import { NotImplementedError } from '../errors/errors';
import { CarsService } from './cars.service';
import { ImportedCarsService } from './imported-cars.service';

@Controller(APP_ROUTES.cars.root)
export class CarsController {
  constructor(
    @Inject(CarsService)
    private readonly carsService: CarsService,
    @Inject(ImportedCarsService)
    private readonly importedCarsService: ImportedCarsService,
  ) {
    throw new NotImplementedError();
  }

  @Get(APP_ROUTES.cars.getCars)
  public getCars() {
    throw new NotImplementedError();
  }
}
