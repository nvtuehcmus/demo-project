    .
    |-- app
    |   |-- rest
    |   |   |-- config
    |   |   |-- controler
    |   |   |   |-- Module
    |   |   |-- middleware
    |   |   |-- tests
    |   |   |   |-- seed
    |   |   |   |-- test-envs
    |   |   |   |-- module.test.ts
    |   |   |   `-- bootstrap.ts
    |   |   |-- app.ts
    |   |   |-- helper.ts
    |   |   `-- index.ts
    |   `-- shared
    |       |-- config
    |       |-- core
    |       |   |-- context
    |       |   |-- error
    |       |   |-- libs
    |       |   |   `-- 3rd Party
    |       |   |-- repo
    |       |   |   |-- Module
    |       |   `-- services
    |       |       |-- Module
    |       |       `-- helpers
    |       |-- helpers
    |       |-- types
    |       |-- bootstrap.ts
    |       `-- const.ts
    |-- script


Their project implementation RESTFUL API with
- Logger
- Module style
- Unit tests
- Integration 3rd party

Orientation is less dependent on dependence, easy to replace ( function, feature, lib, db...), maintain, debug, resolve bug easy

