/**
 * Performs a simple click/tap gesture
 *
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ClickOptions} [opts={}]
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobileClickGesture(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").ClickOptions | undefined): Promise<void>;
/**
 * Performs a click that lasts for the given duration
 *
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').LongClickOptions} [opts={}]
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobileLongClickGesture(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").LongClickOptions | undefined): Promise<void>;
/**
 * Performs a click that lasts for the given duration
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').DoubleClickOptions} [opts={}]
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobileDoubleClickGesture(this: import("../driver").AndroidUiautomator2Driver, opts?: import("./types").ClickOptions | undefined): Promise<void>;
/**
 * Drags this object to the specified location.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').DragOptions} opts
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobileDragGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").DragOptions): Promise<void>;
/**
 * Drags to the specified location.
 *
 * @throws {Error} if provided options are not valid
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').FlingOptions} opts
 * @returns {Promise<boolean>} True if the object can still scroll in the given direction.
 */
export function mobileFlingGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").FlingOptions): Promise<boolean>;
/**
 * Performs a pinch close gesture.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').PinchOptions} opts
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobilePinchCloseGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").PinchOptions): Promise<void>;
/**
 * Performs a pinch open gesture.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').PinchOptions} opts
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobilePinchOpenGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").PinchOptions): Promise<void>;
/**
 * Performs a swipe gesture.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').SwipeOptions} opts
 * @returns {Promise<void>}
 * @throws {Error} if provided options are not valid
 */
export function mobileSwipeGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").SwipeOptions): Promise<void>;
/**
 * Performs a scroll gesture.
 *
 * @throws {Error} if provided options are not valid
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ScrollGestureOptions} opts
 * @returns {Promise<boolean>} True if the object can still scroll in the given direction.
 */
export function mobileScrollGesture(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").ScrollGestureOptions): Promise<boolean>;
/**
 * Scrolls the given scrollable element `elementId` until `elementToId`
 * becomes visible. This function returns immediately if the `elementToId`
 * is already visible in the view port. Otherwise it would scroll
 * to the very beginning of the scrollable control and tries to reach the destination element
 * by scrolling its parent to the end step by step. The scroll direction (vertical or horizontal)
 * is detected automatically.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ScrollElementToElementOpts} opts
 * @returns {Promise<void>}
 * @throws {Error} if the scrolling operation cannot be performed
 */
export function mobileScrollBackTo(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").ScrollElementToElementOpts): Promise<void>;
/**
 * Scrolls the given scrollable element until the element identified
 * by `strategy` and `selector` becomes visible. This function returns immediately if the
 * destination element is already visible in the view port. Otherwise it would scroll
 * to the very beginning of the scrollable control and tries to reach the destination element
 * by scrolling its parent to the end step by step. The scroll direction (vertical or horizontal)
 * is detected automatically.
 * @this {AndroidUiautomator2Driver}
 * @param {import('./types').ScrollOptions} opts
 * @returns {Promise<void>}
 * @throws {Error} if the scrolling operation cannot be performed
 */
export function mobileScroll(this: import("../driver").AndroidUiautomator2Driver, opts: import("./types").ScrollOptions): Promise<void>;
export type AndroidUiautomator2Driver = import("../driver").AndroidUiautomator2Driver;
//# sourceMappingURL=gestures.d.ts.map