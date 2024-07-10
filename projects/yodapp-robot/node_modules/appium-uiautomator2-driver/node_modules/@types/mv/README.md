# Installation
> `npm install --save @types/mv`

# Summary
This package contains type definitions for mv (https://github.com/andrewrk/node-mv).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mv.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/mv/index.d.ts)
````ts
/**
 * `fs.rename` but works across devices. same as the unix utility `mv`
 */
declare function mv(source: string, dest: string, options: mv.Options, callback: (error?: any) => void): void;
declare function mv(source: string, dest: string, callback: (error?: any) => void): void;

declare namespace mv {
    interface Options {
        /**
         * @default false
         */
        mkdirp?: boolean | undefined;
        /**
         * @default false
         */
        clobber?: boolean | undefined;
        /**
         * @default 16
         */
        limit?: number | undefined;
    }
}

export = mv;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 09:09:39 GMT
 * Dependencies: none

# Credits
These definitions were written by [Miloslav Nenadál](https://github.com/nenadalm).
