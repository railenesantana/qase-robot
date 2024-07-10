export const COMMAND_URLS_CONFLICTS: {
    commandNames: string[];
    jsonwpConverter: (url: any) => any;
    w3cConverter: (url: any) => any;
}[];
export default ProtocolConverter;
declare class ProtocolConverter {
    constructor(proxyFunc: any, log?: null);
    proxyFunc: any;
    _downstreamProtocol: any;
    _log: any;
    get log(): any;
    set downstreamProtocol(value: any);
    get downstreamProtocol(): any;
    /**
     * W3C /timeouts can take as many as 3 timeout types at once, MJSONWP /timeouts only takes one
     * at a time. So if we're using W3C and proxying to MJSONWP and there's more than one timeout type
     * provided in the request, we need to do 3 proxies and combine the result
     *
     * @param {Object} body Request body
     * @return {Array} Array of W3C + MJSONWP compatible timeout objects
     */
    getTimeoutRequestObjects(body: any): any[];
    /**
     * Proxy an array of timeout objects and merge the result
     * @param {String} url Endpoint url
     * @param {String} method Endpoint method
     * @param {Object} body Request body
     */
    proxySetTimeouts(url: string, method: string, body: any): Promise<any[]>;
    proxySetWindow(url: any, method: any, body: any): Promise<any>;
    proxySetValue(url: any, method: any, body: any): Promise<any>;
    proxySetFrame(url: any, method: any, body: any): Promise<any>;
    proxyPerformActions(url: any, method: any, body: any): Promise<any>;
    proxyReleaseActions(url: any, method: any): Promise<any>;
    /**
     * Handle "crossing" endpoints for the case
     * when upstream and downstream drivers operate different protocols
     *
     * @param {string} commandName
     * @param {string} url
     * @param {string} method
     * @param {?string|object} body
     * @returns The proxyfying result as [response, responseBody] tuple
     */
    convertAndProxy(commandName: string, url: string, method: string, body: (string | object) | null): Promise<any>;
}
//# sourceMappingURL=protocol-converter.d.ts.map