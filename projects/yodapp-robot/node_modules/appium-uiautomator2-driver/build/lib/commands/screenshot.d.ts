/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>}
 */
export function mobileViewportScreenshot(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>}
 */
export function getViewportScreenshot(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>}
 */
export function getScreenshot(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * Retrieves screenshots of each display available to Android.
 * This functionality is only supported since Android 10.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ScreenshotsOpts} [opts={}]
 * @returns {Promise<import('@appium/types').StringRecord<import('./types').Screenshot>>}
 */
export function mobileScreenshots(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").ScreenshotsOpts | undefined): Promise<import("@appium/types").StringRecord<import("./types").Screenshot>>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=screenshot.d.ts.map