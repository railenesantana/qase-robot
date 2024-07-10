/**
 * Retrives app strings from its resources for the given language
 * or the default device language.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').GetAppStringsOptions} [opts={}]
 * @returns {Promise<StringRecord>}
 */
export function mobileGetAppStrings(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").GetAppStringsOptions | undefined): Promise<StringRecord>;
export type ADB = import("appium-adb").ADB;
export type StringRecord = import("@appium/types").StringRecord;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=app-strings.d.ts.map