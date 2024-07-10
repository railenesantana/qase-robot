# Installation
> `npm install --save @types/base64-stream`

# Summary
This package contains type definitions for base64-stream (https://github.com/mazira/base64-stream).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/base64-stream.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/base64-stream/index.d.ts)
````ts
/// <reference types="node" />

import { Transform, TransformOptions } from "stream";
export class Base64Decode extends Transform {}
export class Base64Encode extends Transform {
    constructor(
        options?: TransformOptions & {
            outputEncoding?: string | null | undefined;
            inputEncoding?: string | undefined;
            lineLength?: number | undefined;
            prefix?: string | undefined;
        },
    );
}

````

### Additional Details
 * Last updated: Mon, 06 Nov 2023 22:41:04 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)

# Credits
These definitions were written by [Sean O'Brien](https://github.com/s73obrien), and [Erik Weatherwax](https://github.com/erikjwaxx).
