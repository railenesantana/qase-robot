/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>} Base64-encoded content of the clipboard
 * or an empty string if the clipboard is empty.
 */
export function getClipboard(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * @this {AndroidUiautomator2Driver}
 * @returns {Promise<string>} Base64-encoded content of the clipboard
 * or an empty string if the clipboard is empty.
 */
export function mobileGetClipboard(this: import("../driver").AndroidUiautomator2Driver): Promise<string>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {string} content Base64-encoded clipboard payload
 * @param {'plaintext'} [contentType='plaintext'] Only a single
 * content type is supported, which is 'plaintext'
 * @param {string} [label] Optinal label to identify the current
 * clipboard payload
 * @returns {Promise<void>}
 */
export function setClipboard(this: import("../driver").AndroidUiautomator2Driver, content: string, contentType?: "plaintext" | undefined, label?: string | undefined): Promise<void>;
/**
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').SetClipboardOpts} opts
 * @returns {Promise<void>}
 */
export function mobileSetClipboard(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").SetClipboardOpts): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=clipboard.d.ts.map