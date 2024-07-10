# Installation
> `npm install --save @types/find-root`

# Summary
This package contains type definitions for find-root (https://github.com/js-n/find-root).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/find-root.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/find-root/index.d.ts)
````ts
type FindRootCheckFn = (dir: string) => boolean;

/**
 * Returns the path for the nearest directory to startingPath containing a package.json file. If a check function is
 * provided, then this will return the nearest directory for which the function returns true.
 * @param startingPath The path to start searching from, e.g. __dirname
 * @param check The check predicate
 * @throws {Error} if package.json cannot be found or if the function never returns true
 */
declare function findRoot(startingPath: string, check?: FindRootCheckFn): string;

export = findRoot;

````

### Additional Details
 * Last updated: Tue, 07 Nov 2023 03:09:37 GMT
 * Dependencies: none

# Credits
These definitions were written by [Arturas Molcanovas](https://github.com/Alorel).
