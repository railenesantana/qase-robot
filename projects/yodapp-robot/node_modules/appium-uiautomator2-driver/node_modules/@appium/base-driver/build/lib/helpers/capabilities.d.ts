export type Constraints = import('@appium/types').Constraints;
export type AppiumLogger = import('@appium/types').AppiumLogger;
export type StringRecord = import('@appium/types').StringRecord;
export type BaseDriverCapConstraints = import('@appium/types').BaseDriverCapConstraints;
export type Capabilities<C extends import("@appium/types").Constraints> = import('@appium/types').Capabilities<C>;
export function isW3cCaps(caps: any): boolean;
/**
 *
 * @template {Constraints} C
 * @param {any} oldCaps
 * @param {C} desiredCapConstraints
 * @param {AppiumLogger} log
 * @returns {Capabilities<C>}
 */
export function fixCaps<C extends import("@appium/types").Constraints>(oldCaps: any, desiredCapConstraints: C, log: AppiumLogger): import("@appium/types").ConstraintsToCaps<C>;
//# sourceMappingURL=capabilities.d.ts.map