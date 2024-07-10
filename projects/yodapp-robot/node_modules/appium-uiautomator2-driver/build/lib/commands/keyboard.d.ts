/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} [metastate]
 * @param {number} [flags]
 * @returns {Promise<void>}
 */
export function pressKeyCode(this: import("../driver").AndroidUiautomator2Driver, keycode: string | number, metastate?: number | undefined, flags?: number | undefined): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} metastate
 * @param {number} [flags]
 * @returns {Promise<void>}
 */
export function longPressKeyCode(this: import("../driver").AndroidUiautomator2Driver, keycode: string | number, metastate: number, flags?: number | undefined): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').PressKeyOptions} opts
 * @returns {Promise<void>}
 */
export function mobilePressKey(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").PressKeyOptions): Promise<void>;
/**
 * Types the given Unicode string.
 * It is expected that the focus is already put
 * to the destination input field before this method is called.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').TypingOptions} opts
 * @returns {Promise<boolean>} `true` if the input text has been successfully sent to adb
 * @throws {Error} if `text` property has not been provided
 */
export function mobileType(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").TypingOptions): Promise<boolean>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('appium-android-driver').SendKeysOpts} params
 * @returns {Promise<void>}
 */
export function doSendKeys(this: import("../driver").AndroidUiautomator2Driver, params: import("appium-android-driver").SendKeysOpts): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} [metastate]
 * @returns {Promise<void>}
 */
export function keyevent(this: import("../driver").AndroidUiautomator2Driver, keycode: string | number, metastate?: number | undefined): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=keyboard.d.ts.map