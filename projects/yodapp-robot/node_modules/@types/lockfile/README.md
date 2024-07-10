# Installation
> `npm install --save @types/lockfile`

# Summary
This package contains type definitions for lockfile (https://github.com/npm/lockfile).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lockfile.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lockfile/index.d.ts)
````ts
export interface Options {
    wait?: number | undefined;
    pollPeriod?: number | undefined;
    stale?: number | undefined;
    retries?: number | undefined;
    retryWait?: number | undefined;
}

export function lock(path: string, opts: Options, callback: (err: Error | null) => void): void;
export function lock(path: string, callback: (err: Error | null) => void): void;
export function lockSync(path: string, opts?: Options): void;

export function unlock(path: string, callback: (err: Error | null) => void): void;
export function unlockSync(path: string): void;

export function check(path: string, opts: Options, callback: (err: Error | null, isLocked: boolean) => void): void;
export function check(path: string, callback: (err: Error | null, isLocked: boolean) => void): void;
export function checkSync(path: string, opts?: Options): boolean;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 20:08:00 GMT
 * Dependencies: none

# Credits
These definitions were written by [Bart van der Schoor](https://github.com/Bartvds), and [BendingBender](https://github.com/BendingBender).
