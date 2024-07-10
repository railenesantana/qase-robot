/**
 *
 * @param {string} app
 * @param {string|string[]|import('@appium/types').ConfigureAppOptions} options
 */
export function configureApp(app: string, options?: string | string[] | import("@appium/types").ConfigureAppOptions): Promise<any>;
/**
 * @param {string} app
 * @returns {boolean}
 */
export function isPackageOrBundle(app: string): boolean;
/**
 * Finds all instances 'firstKey' and create a duplicate with the key 'secondKey',
 * Do the same thing in reverse. If we find 'secondKey', create a duplicate with the key 'firstKey'.
 *
 * This will cause keys to be overwritten if the object contains 'firstKey' and 'secondKey'.

 * @param {*} input Any type of input
 * @param {String} firstKey The first key to duplicate
 * @param {String} secondKey The second key to duplicate
 */
export function duplicateKeys(input: any, firstKey: string, secondKey: string): any;
/**
 * Takes a desired capability and tries to JSON.parse it as an array,
 * and either returns the parsed array or a singleton array.
 *
 * @param {string|Array<String>} cap A desired capability
 */
export function parseCapsArray(cap: string | Array<string>): any[];
/**
 * Generate a string that uniquely describes driver instance
 *
 * @param {import('@appium/types').Core} obj driver instance
 * @param {string?} [sessionId=null] session identifier (if exists).
 * This parameter is deprecated and is not used.
 * @returns {string}
 */
export function generateDriverLogPrefix(obj: import("@appium/types").Core<any, import("@appium/types").StringRecord>, sessionId?: string | null | undefined): string;
export const BASEDRIVER_VER: string;
declare const _default: import("@appium/types").DriverHelpers;
export default _default;
export type RemoteAppProps = {
    lastModified: Date | null;
    immutable: boolean;
    maxAge: number | null;
    etag: string | null;
};
/**
 * Properties of the remote application (e.g. GET HTTP response) to be downloaded.
 */
export type RemoteAppData = {
    /**
     * The HTTP status of the response
     */
    status: number;
    /**
     * The HTTP response body represented as readable stream
     */
    stream: import("stream").Readable;
    /**
     * HTTP response headers
     */
    headers: import("axios").RawAxiosResponseHeaders | import("axios").AxiosResponseHeaders;
};
//# sourceMappingURL=helpers.d.ts.map