/**
 * Install multiple APKs with `install-multiple` option.
 * @this {AndroidUiautomator2Driver}=
 * @param {import('./types').InstallMultipleApksOptions} opts
 * @throws {Error} if an error occured while installing the given APKs.
 * @returns {Promise<void>}
 */
export function mobileInstallMultipleApks(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").InstallMultipleApksOptions): Promise<void>;
/**
 * Puts the app to background and waits the given number of seconds Then restores the app
 * if necessary. The call is blocking.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').BackgroundAppOptions} [opts={}]
 * @returns {Promise<void>}
 */
export function mobileBackgroundApp(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").BackgroundAppOptions | undefined): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
export type StringRecord<T = any> = import("@appium/types").StringRecord<T>;
//# sourceMappingURL=app-management.d.ts.map