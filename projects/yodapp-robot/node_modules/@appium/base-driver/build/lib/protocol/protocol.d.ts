export function checkParams(paramSets: any, jsonObj: any, protocol: any): void;
export function makeArgs(requestParams: any, jsonObj: any, payloadParams: any, protocol: any): any;
/**
 *
 * @param {import('@appium/types').Core} driver
 * @returns {import('../express/server').RouteConfiguringFunction}
 */
export function routeConfiguringFunction(driver: import("@appium/types").Core<any, import("@appium/types").StringRecord>): import("../express/server").RouteConfiguringFunction;
export function isSessionCommand(command: any): boolean;
export function driverShouldDoJwpProxy(driver: any, req: any, command: any): boolean;
export function determineProtocol(createSessionArgs: any): "MJSONWP" | "W3C";
export const CREATE_SESSION_COMMAND: "createSession";
export const DELETE_SESSION_COMMAND: "deleteSession";
export const GET_STATUS_COMMAND: "getStatus";
/** @type {Set<string>} */
export const deprecatedCommandsLogged: Set<string>;
export function validateExecuteMethodParams(params: any, paramSpec: any): any;
//# sourceMappingURL=protocol.d.ts.map