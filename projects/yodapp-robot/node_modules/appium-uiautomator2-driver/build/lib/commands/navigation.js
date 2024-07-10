"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUrl = setUrl;
exports.mobileDeepLink = mobileDeepLink;
exports.back = back;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string} url
 * @returns {Promise<void>}
 */
async function setUrl(url) {
    await this.adb.startUri(url, /** @type {string} */ (this.opts.appPackage));
}
/**
 * Start URL that take users directly to specific content in the app
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').DeepLinkOpts} opts
 * @returns {Promise<void>}
 */
async function mobileDeepLink(opts) {
    const { url, package: pkg, waitForLaunch } = opts;
    return await this.adb.startUri(url, pkg, { waitForLaunch });
}
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
async function back() {
    await this.adb.keyevent(4);
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
//# sourceMappingURL=navigation.js.map