"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mobileInstallMultipleApks = mobileInstallMultipleApks;
exports.mobileBackgroundApp = mobileBackgroundApp;
const lodash_1 = __importDefault(require("lodash"));
const bluebird_1 = __importDefault(require("bluebird"));
const driver_1 = require("appium/driver");
const extensions_1 = require("../extensions");
/**
 * Install multiple APKs with `install-multiple` option.
 * @this {AndroidUiautomator2Driver}=
 * @param {import('./types').InstallMultipleApksOptions} opts
 * @throws {Error} if an error occured while installing the given APKs.
 * @returns {Promise<void>}
 */
async function mobileInstallMultipleApks(opts) {
    if (!lodash_1.default.isArray(opts.apks) || lodash_1.default.isEmpty(opts.apks)) {
        throw new driver_1.errors.InvalidArgumentError('No apks are given to install');
    }
    const apks = await bluebird_1.default.all(opts.apks.map((app) => this.helpers.configureApp(app, [extensions_1.APK_EXTENSION])));
    await this.adb.installMultipleApks(apks, opts.options);
}
/**
 * Puts the app to background and waits the given number of seconds Then restores the app
 * if necessary. The call is blocking.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').BackgroundAppOptions} [opts={}]
 * @returns {Promise<void>}
 */
async function mobileBackgroundApp(opts = {}) {
    const { seconds = -1 } = opts;
    await this.background(seconds);
}
/**
 * @typedef {import('../driver').AndroidUiautomator2Driver} AndroidUiautomator2Driver
 */
/**
 * @template [T=any]
 * @typedef {import('@appium/types').StringRecord<T>} StringRecord
 */
//# sourceMappingURL=app-management.js.map