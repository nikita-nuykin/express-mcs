import { Module } from '../../../src';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';

@Module({
  providers: [CarsService],
  controllers: [CarsController],
  exports: [CarsService],
})
export class CarsModule {}
