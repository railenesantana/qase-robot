/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>}
 */
export function getAlertText(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').AcceptAlertOptions} [opts={}]
 * @returns {Promise<void>}
 */
export function mobileAcceptAlert(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").AcceptAlertOptions | undefined): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
export function postAcceptAlert(this: import("../driver").AndroidUiautomator2Driver): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').DismissAlertOptions} [opts={}]
 * @returns {Promise<void>}
 */
export function mobileDismissAlert(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").DismissAlertOptions | undefined): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
export function postDismissAlert(this: import("../driver").AndroidUiautomator2Driver): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=alert.d.ts.map