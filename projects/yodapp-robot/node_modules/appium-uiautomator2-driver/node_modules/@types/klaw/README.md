# Installation
> `npm install --save @types/klaw`

# Summary
This package contains type definitions for klaw (https://github.com/jprichardson/node-klaw).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/klaw.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/klaw/index.d.ts)
````ts
/// <reference types="node" />

declare module "klaw" {
    import * as fs from "fs";
    import { Readable, ReadableOptions } from "stream";

    function K(root: string, options?: K.Options): K.Walker;

    namespace K {
        interface Item {
            path: string;
            stats: fs.Stats;
        }

        type QueueMethod = "shift" | "pop";

        interface Options extends ReadableOptions {
            queueMethod?: QueueMethod | undefined;
            pathSorter?: ((pathA: string, pathB: string) => number) | undefined;
            fs?: any; // fs or mock-fs
            filter?: ((path: string) => boolean) | undefined;
            depthLimit?: number | undefined;
            preserveSymlinks?: boolean | undefined;
        }

        type Event = "close" | "data" | "end" | "error" | "pause" | "readable" | "resume";

        interface Walker extends Readable, AsyncIterable<Item> {
            on(event: Event, listener: Function): this;
            on(event: "close", listener: () => void): this;
            on(event: "data", listener: (item: Item) => void): this;
            on(event: "end", listener: () => void): this;
            on(event: "readable", listener: () => void): this;
            on(event: "error", listener: (err: Error) => void): this;
            read(): Item;
            [Symbol.asyncIterator](): AsyncIterableIterator<Item>;
        }
    }

    export = K;
}

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 20:08:00 GMT
 * Dependencies: [@types/node](https://npmjs.com/package/@types/node)

# Credits
These definitions were written by [Matthew McEachen](https://github.com/mceachen), and [Pascal Sthamer](https://github.com/p4sca1).
