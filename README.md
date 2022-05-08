# express-mcs

Express-mcs is a decorator-based mini-framework that brings module-controller-service architecture to your express application.

Project is inspired by NestJS.

Numbers:
* [Dependency tree](https://npm.anvaka.com/#/view/2d/express-mcs)
* [Bundle size and download time](https://bundlephobia.com/package/express-mcs@1.1.0)

## Installation

### Npm

`npm i express-mcs`

### Yarn

`yarn add express-mcs`

## Quick guide

### Create service

```typescript
export class AppService {
  public status() {
    return { status: 'ok' };
  }
}
```

### Create controller

```typescript
import { Controller, Get, Inject } from 'express-mcs';

@Controller('/api')
export class AppController {
  constructor (
    @Inject(AppService)
    private readonly service: AppService,
  ) {}

  @Get('/status')
  public status() {
    return this.service.status();
  }
}

```

### Create app module

```typescript
import { Module } from 'express-mcs';
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
```

### Initialize app module

```typescript
// ...

initAppModule({
  Module: AppModule,
  app
});

// ...

app.listen(environment.PORT, () => {
  // ...
});
```

## Usage

### Controllers

```typescript
import { Controller, Get } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/all')
  public async find() {
    return { status: 'ok', users: [] }
  }
}
```

Controller decorator accepts root path.

### Methods

You can use Get, Post, Put, Patch, Delete method decorators, which accept path as a parameter

### Method params

#### Req

Injects request to controller method.

```typescript
import { Request } from 'express';
import { Controller, Get, Req } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/all')
  public async find(@Req request: Request) {
    ...
  }
}
```

#### Res

Injects response to controller method.

```typescript
import { Response } from 'express';
import { Controller, Get, Res } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/all')
  public async find(@Res response: Response) {
    res.status(401).send();
  }
}
```

#### Headers

Injects request headers to controller method.

```typescript
import { Response } from 'express';
import { Controller, Get, Headers } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/all')
  public async find(@Headers headers: unknown) {
    ...
  }
}
```

#### Body

Injects request body to controller method.

```typescript
import { Response } from 'express';
import { Controller, Post, Body } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Post('/create')
  public async create(@Body() data: UserCreateDto) {
    ...
  }
}
```

#### Query

Injects request query params to controller method.

```typescript
import { Response } from 'express';
import { Controller, Get, Query } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/find')
  public async find(@Query() pagination: UserFindRequestQuery) {
    ...
  }
}
```

#### Params

Injects request query params to controller method.

```typescript
import { Response } from 'express';
import { Controller, Get, Params } from 'express-mcs';

@Controller('/api/v1/users')
export class UsersController {
  @Get('/:id')
  public async findOne(@Params() {id}: UserFindOneRequestParams) {
    ...
  }
}
```

## Data validation

Create validation func

```typescript
import { validate } from 'class-validator';
import { Response } from 'express';

export async function getValidatedData(data: any, res: Response): Promise<unknown> {
  const errors = await validate(data);
  if (!errors.length) return data;
  res.status(400).json(errors).send();
  return undefined;
}
```

Pass validation function to module init

```typescript
export const appModule = initAppModule({
  Module: AppModule,
  app,
  getValidatedData,
});
```

Pass DTO class to Query/Body/Params

```typescript
import { IsString } from 'class-validator';
import { Response } from 'express';
import { Controller, Post, Body } from 'express-mcs';

class UserCreateDto {
  @IsString()
  login!: string
}

@Controller('/api/v1/users')
export class UsersController {
  @Post('/create')
  public async create(@Body(UserCreateDto) data: UserCreateDto) {
    ...
  }
}
```

## Custom middleware

### ApiKey auth middleware

```typescript
import { getMiddleware, AuthorizationError } from 'express-mcs';
import { environment } from '../../environment';

export const AppApiGuard = getMiddleware(async (req) => {
  if (req.headers.apikey !== environment.API_KEY) {
    throw new AuthorizationError();
  }
});
```

```typescript
import { Controller, Post } from 'express-mcs';
import { AppApiGuard } from './api-key.strategy';

@Controller('/api/v1/data-sync')
export class DataSyncController {
  @Post('/sync')
  @AppApiGuard
  public async syncItems() {
    // ...
  }
}
```

## Examples

- [App with mikro-orm](https://github.com/nikita-nuykin/express-mcs/tree/main/examples/app-jwt-mikro-orm)
