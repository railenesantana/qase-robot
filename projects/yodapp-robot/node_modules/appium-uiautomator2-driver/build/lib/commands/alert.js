"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlertText = getAlertText;
exports.mobileAcceptAlert = mobileAcceptAlert;
exports.postAcceptAlert = postAcceptAlert;
exports.mobileDismissAlert = mobileDismissAlert;
exports.postDismissAlert = postDismissAlert;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>}
 */
async function getAlertText() {
    return String(await this.uiautomator2.jwproxy.command('/alert/text', 'GET', {}));
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').AcceptAlertOptions} [opts={}]
 * @returns {Promise<void>}
 */
async function mobileAcceptAlert(opts = {}) {
    await this.uiautomator2.jwproxy.command('/alert/accept', 'POST', opts);
}
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
async function postAcceptAlert() {
    await this.mobileAcceptAlert();
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').DismissAlertOptions} [opts={}]
 * @returns {Promise<void>}
 */
async function mobileDismissAlert(opts = {}) {
    await this.uiautomator2.jwproxy.command('/alert/dismiss', 'POST', opts);
}
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
async function postDismissAlert() {
    await this.mobileDismissAlert();
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
//# sourceMappingURL=alert.js.map