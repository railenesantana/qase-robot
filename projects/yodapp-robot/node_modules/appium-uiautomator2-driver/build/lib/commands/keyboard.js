"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pressKeyCode = pressKeyCode;
exports.longPressKeyCode = longPressKeyCode;
exports.mobilePressKey = mobilePressKey;
exports.mobileType = mobileType;
exports.doSendKeys = doSendKeys;
exports.keyevent = keyevent;
const lodash_1 = __importDefault(require("lodash"));
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} [metastate]
 * @param {number} [flags]
 * @returns {Promise<void>}
 */
async function pressKeyCode(keycode, metastate, flags) {
    await this.uiautomator2.jwproxy.command('/appium/device/press_keycode', 'POST', {
        keycode,
        metastate,
        flags,
    });
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} metastate
 * @param {number} [flags]
 * @returns {Promise<void>}
 */
async function longPressKeyCode(keycode, metastate, flags) {
    await this.uiautomator2.jwproxy.command('/appium/device/long_press_keycode', 'POST', {
        keycode,
        metastate,
        flags,
    });
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').PressKeyOptions} opts
 * @returns {Promise<void>}
 */
async function mobilePressKey(opts) {
    const { keycode, metastate, flags, isLongPress = false } = opts;
    await this.uiautomator2.jwproxy.command(`/appium/device/${isLongPress ? 'long_' : ''}press_keycode`, 'POST', {
        keycode,
        metastate,
        flags,
    });
}
/**
 * Types the given Unicode string.
 * It is expected that the focus is already put
 * to the destination input field before this method is called.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').TypingOptions} opts
 * @returns {Promise<boolean>} `true` if the input text has been successfully sent to adb
 * @throws {Error} if `text` property has not been provided
 */
async function mobileType(opts) {
    const { text } = opts;
    if (lodash_1.default.isUndefined(text)) {
        throw this.log.errorAndThrow(`The 'text' argument is mandatory`);
    }
    return await this.settingsApp.typeUnicode(String(text));
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('appium-android-driver').SendKeysOpts} params
 * @returns {Promise<void>}
 */
async function doSendKeys(params) {
    await this.uiautomator2.jwproxy.command('/keys', 'POST', params);
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string|number} keycode
 * @param {number} [metastate]
 * @returns {Promise<void>}
 */
async function keyevent(keycode, metastate) {
    this.log.debug(`Ignoring metastate ${metastate}`);
    await this.adb.keyevent(keycode);
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
//# sourceMappingURL=keyboard.js.map