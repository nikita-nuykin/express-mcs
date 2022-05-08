# Changelog

_This changelog follows the [keep a changelog](https://keepachangelog.com)_ format to maintain a human readable changelog.

### [1.1.0](https://github.com/nikita-nuykin/express-mcs/compare/v1.0.1...v1.1.0) (2022-05-08)

> **NOTE:** This version allows package user to inject validation strategy and reduces overall package size and dependency amount by removing class-validator from project dependencies

#### Added

- Custom validation func support

#### Changed

- `initAppModule` usage
- Data validation strategy
- `AppContext` is injected into Controller instead of `Express` app

#### Deleted

- `class-validator` dependency
