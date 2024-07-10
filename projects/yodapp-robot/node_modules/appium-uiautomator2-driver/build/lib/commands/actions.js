"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileScheduleAction = mobileScheduleAction;
exports.mobileGetActionHistory = mobileGetActionHistory;
exports.mobileUnscheduleAction = mobileUnscheduleAction;
exports.performActions = performActions;
exports.releaseActions = releaseActions;
/**
 * See https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-scheduleaction
 * @this {AndroidUiautomator2Driver}
 * @param {Record<string, any>} [opts={}]
 * @returns {Promise<any>}
 */
async function mobileScheduleAction(opts = {}) {
    return await this.uiautomator2.jwproxy.command('/appium/schedule_action', 'POST', opts);
}
/**
 * @see https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-getactionhistory
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ActionArgs} [opts={}]
 * @returns {Promise<import('./types').ActionResult>}
 */
async function mobileGetActionHistory(opts) {
    return /** @type {import('./types').ActionResult} */ (await this.uiautomator2.jwproxy.command('/appium/action_history', 'POST', opts ?? {}));
}
/**
 * @this {AndroidUiautomator2Driver}
 * @see https://github.com/appium/appium-uiautomator2-driver/blob/master/docs/scheduled-actions.md#mobile-unscheduleaction
 * @param {import('./types').ActionArgs} [opts={}]
 * @returns {Promise<any>}
 */
async function mobileUnscheduleAction(opts) {
    return await this.uiautomator2.jwproxy.command('/appium/unschedule_action', 'POST', opts ?? {});
}
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('@appium/types').StringRecord[]} actions
 * @returns {Promise<void>}
 */
async function performActions(actions) {
    // This is mandatory, since Selenium API uses MOUSE as the default pointer type
    const preprocessedActions = actions.map((action) => Object.assign({}, action, action.type === 'pointer'
        ? {
            parameters: {
                pointerType: 'touch',
            },
        }
        : {}));
    this.log.debug(`Preprocessed actions: ${JSON.stringify(preprocessedActions, null, '  ')}`);
    await this.uiautomator2.jwproxy.command('/actions', 'POST', {
        actions: preprocessedActions,
    });
}
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<void>}
 */
// eslint-disable-next-line require-await
async function releaseActions() {
    this.log.info('On this platform, releaseActions is a no-op');
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
//# sourceMappingURL=actions.js.map