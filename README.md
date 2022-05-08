# express-mcs

Express-mcs is a decorator-based mini-framework that brings module-controller-service architecture to your express application.

Project is inspired by NestJS.

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

initAppModule(AppModule, app);

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

To validate body, just use DTO class as an argument

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

Query params can also be validated. It shares the same syntax as Body decorator.

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

Params params can also be validated. It shares the same syntax as Body decorator.