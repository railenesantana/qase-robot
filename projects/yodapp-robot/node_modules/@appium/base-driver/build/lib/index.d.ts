export { DriverCore } from "./basedriver/core";
export { DeviceSettings } from "./basedriver/device-settings";
export { BaseDriver };
export default BaseDriver;
export * from "./protocol";
export { errorFromMJSONWPStatusCode as errorFromCode } from "./protocol";
export { STATIC_DIR } from "./express/static";
export { JWProxy } from "./jsonwp-proxy/proxy";
export { DEFAULT_WS_PATHNAME_PREFIX } from "./express/websocket";
export type ServerOpts = import("./express/server").ServerOpts;
import { BaseDriver } from './basedriver/driver';
export { MAX_LOG_BODY_LENGTH, DEFAULT_BASE_PATH, PROTOCOLS, W3C_ELEMENT_KEY } from "./constants";
export { server, normalizeBasePath } from "./express/server";
export { getSummaryByCode, codes as statusCodes } from "./jsonwp-status/status";
export { PREFIXED_APPIUM_OPTS_CAP, STANDARD_CAPS, processCapabilities, isStandardCap, validateCaps, promoteAppiumOptions, promoteAppiumOptionsForObject } from "./basedriver/capabilities";
//# sourceMappingURL=index.d.ts.map