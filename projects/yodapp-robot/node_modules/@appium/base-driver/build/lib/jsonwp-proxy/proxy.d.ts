export default JWProxy;
export type ProxyError = Error & {
    response: {
        data: import("type-fest").JsonObject;
        status: import("http-status-codes").StatusCodes;
    };
};
export class JWProxy {
    constructor(opts?: {});
    /** @type {string} */
    scheme: string;
    /** @type {string} */
    server: string;
    /** @type {number} */
    port: number;
    /** @type {string} */
    base: string;
    /** @type {string} */
    reqBasePath: string;
    /** @type {string?} */
    sessionId: string | null;
    /** @type {number} */
    timeout: number;
    _activeRequests: any[];
    _downstreamProtocol: any;
    httpAgent: http.Agent;
    httpsAgent: https.Agent;
    protocolConverter: ProtocolConverter;
    _log: any;
    get log(): any;
    /**
     * Performs requests to the downstream server
     *
     * @private - Do not call this method directly,
     * it uses client-specific arguments and responses!
     *
     * @param {import('axios').RawAxiosRequestConfig} requestConfig
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    private request;
    getActiveRequestsCount(): number;
    cancelActiveRequests(): void;
    endpointRequiresSessionId(endpoint: any): boolean;
    set downstreamProtocol(value: any);
    get downstreamProtocol(): any;
    getUrlForProxy(url: any): string;
    proxy(url: any, method: any, body?: null): Promise<any[]>;
    getProtocolFromResBody(resObj: any): "MJSONWP" | "W3C" | undefined;
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @returns {string|undefined}
     */
    requestToCommandName(url: string, method: import("@appium/types").HTTPMethod): string | undefined;
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @param {any?} body
     */
    proxyCommand(url: string, method: import("@appium/types").HTTPMethod, body?: any | null): Promise<any>;
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @param {any?} body
     * @returns {Promise<unknown>}
     */
    command(url: string, method: import("@appium/types").HTTPMethod, body?: any | null): Promise<unknown>;
    getSessionIdFromUrl(url: any): any;
    proxyReqRes(req: any, res: any): Promise<void>;
}
import http from 'http';
import https from 'https';
import ProtocolConverter from './protocol-converter';
//# sourceMappingURL=proxy.d.ts.map