"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClipboard = getClipboard;
exports.mobileGetClipboard = mobileGetClipboard;
exports.setClipboard = setClipboard;
exports.mobileSetClipboard = mobileSetClipboard;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>} Base64-encoded content of the clipboard
 * or an empty string if the clipboard is empty.
 */
async function getClipboard() {
    return String((await this.adb.getApiLevel()) < 29
        ? await this.uiautomator2.jwproxy.command('/appium/device/get_clipboard', 'POST', {})
        : await this.settingsApp.getClipboard());
}
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>} Base64-encoded content of the clipboard
 * or an empty string if the clipboard is empty.
 */
async function mobileGetClipboard() {
    return await this.getClipboard();
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string} content Base64-encoded clipboard payload
 * @param {'plaintext'} [contentType='plaintext'] Only a single
 * content type is supported, which is 'plaintext'
 * @param {string} [label] Optinal label to identify the current
 * clipboard payload
 * @returns {Promise<void>}
 */
async function setClipboard(content, contentType, label) {
    await this.uiautomator2.jwproxy.command('/appium/device/set_clipboard', 'POST', { content, contentType, label });
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').SetClipboardOpts} opts
 * @returns {Promise<void>}
 */
async function mobileSetClipboard(opts) {
    await this.setClipboard(opts.content, opts.contentType, opts.label);
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
//# sourceMappingURL=clipboard.js.map