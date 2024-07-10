/**
 *
 * @param {import('../types').ParsedArgs} args
 * @returns {Promise<void>}
 */
export function init(args: import("../types").ParsedArgs): Promise<void>;
/**
 * @returns {void}
 */
export function clear(): void;
export default init;
export type ParsedArgs = import("appium/types").ParsedArgs;
export type MessageObject = import("@appium/logger").MessageObject;
//# sourceMappingURL=logsink.d.ts.map