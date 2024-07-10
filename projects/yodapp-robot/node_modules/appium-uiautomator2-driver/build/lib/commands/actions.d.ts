/**
 * See https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-scheduleaction
 * @this {AndroidUiautomator2Driver}
 * @param {Record<string, any>} [opts={}]
 * @returns {Promise<any>}
 */
export function mobileScheduleAction(this: import("../driver").AndroidUiautomator2Driver, opts?: Record<string, any> | undefined): Promise<any>;
/**
 * @see https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-getactionhistory
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ActionArgs} [opts={}]
 * @returns {Promise<import('./types').ActionResult>}
 */
export function mobileGetActionHistory(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").ActionArgs | undefined): Promise<import("./types").ActionResult>;
/**
 * @this {AndroidUiautomator2Driver}
 * @see https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-unscheduleaction
 * @param {import('./types').ActionArgs} [opts={}]
 * @returns {Promise<any>}
 */
export function mobileUnscheduleAction(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").ActionArgs | undefined): Promise<any>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('@appium/types').StringRecord[]} actions
 * @returns {Promise<void>}
 */
export function performActions(this: import("../driver").AndroidUiautomator2Driver, actions: import("@appium/types").StringRecord[]): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
export function releaseActions(this: import("../driver").AndroidUiautomator2Driver): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=actions.d.ts.map