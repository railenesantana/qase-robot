# Installation
> `npm install --save @types/method-override`

# Summary
This package contains type definitions for method-override (https://github.com/expressjs/method-override).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/method-override.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/method-override/index.d.ts)
````ts
declare namespace Express {
    export interface Request {
        originalMethod?: string | undefined;
    }
}

import express = require("express");

declare namespace e {
    export interface MethodOverrideOptions {
        methods: string[];
    }
}

declare function e(
    getter?: string | ((req: express.Request, res: express.Response) => string),
    options?: e.MethodOverrideOptions,
): express.RequestHandler;

export = e;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: [@types/express](https://npmjs.com/package/@types/express)

# Credits
These definitions were written by [Santi Albo](https://github.com/santialbo).
