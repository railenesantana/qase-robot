"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWProxy = void 0;
const lodash_1 = __importDefault(require("lodash"));
const support_1 = require("@appium/support");
const axios_1 = __importDefault(require("axios"));
const status_1 = require("../jsonwp-status/status");
const errors_1 = require("../protocol/errors");
const protocol_1 = require("../protocol");
const constants_1 = require("../constants");
const protocol_converter_1 = __importDefault(require("./protocol-converter"));
const helpers_1 = require("../protocol/helpers");
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const DEFAULT_LOG = support_1.logger.getLogger('WD Proxy');
const DEFAULT_REQUEST_TIMEOUT = 240000;
const COMPACT_ERROR_PATTERNS = [/\bECONNREFUSED\b/, /socket hang up/];
const { MJSONWP, W3C } = constants_1.PROTOCOLS;
const ALLOWED_OPTS = [
    'scheme',
    'server',
    'port',
    'base',
    'reqBasePath',
    'sessionId',
    'timeout',
    'log',
    'keepAlive',
];
class JWProxy {
    constructor(opts = {}) {
        opts = lodash_1.default.pick(opts, ALLOWED_OPTS);
        // omit 'log' in the defaults assignment here because 'log' is a getter and we are going to set
        // it to this._log (which lies behind the getter) further down
        const options = lodash_1.default.defaults(lodash_1.default.omit(opts, 'log'), {
            scheme: 'http',
            server: 'localhost',
            port: 4444,
            base: constants_1.DEFAULT_BASE_PATH,
            reqBasePath: constants_1.DEFAULT_BASE_PATH,
            sessionId: null,
            timeout: DEFAULT_REQUEST_TIMEOUT,
        });
        options.scheme = options.scheme.toLowerCase();
        Object.assign(this, options);
        this._activeRequests = [];
        this._downstreamProtocol = null;
        const agentOpts = {
            keepAlive: opts.keepAlive ?? true,
            maxSockets: 10,
            maxFreeSockets: 5,
        };
        this.httpAgent = new http_1.default.Agent(agentOpts);
        this.httpsAgent = new https_1.default.Agent(agentOpts);
        this.protocolConverter = new protocol_converter_1.default(this.proxy.bind(this), opts.log);
        this._log = opts.log;
    }
    get log() {
        return this._log ?? DEFAULT_LOG;
    }
    /**
     * Performs requests to the downstream server
     *
     * @private - Do not call this method directly,
     * it uses client-specific arguments and responses!
     *
     * @param {import('axios').RawAxiosRequestConfig} requestConfig
     * @returns {Promise<import('axios').AxiosResponse>}
     */
    async request(requestConfig) {
        const reqPromise = (0, axios_1.default)(requestConfig);
        this._activeRequests.push(reqPromise);
        try {
            return await reqPromise;
        }
        finally {
            lodash_1.default.pull(this._activeRequests, reqPromise);
        }
    }
    getActiveRequestsCount() {
        return this._activeRequests.length;
    }
    cancelActiveRequests() {
        this._activeRequests = [];
    }
    endpointRequiresSessionId(endpoint) {
        return !lodash_1.default.includes(['/session', '/sessions', '/status'], endpoint);
    }
    set downstreamProtocol(value) {
        this._downstreamProtocol = value;
        this.protocolConverter.downstreamProtocol = value;
    }
    get downstreamProtocol() {
        return this._downstreamProtocol;
    }
    getUrlForProxy(url) {
        if (url === '') {
            url = '/';
        }
        const proxyBase = `${this.scheme}://${this.server}:${this.port}${this.base}`;
        const endpointRe = '(/(session|status))';
        let remainingUrl = '';
        if (/^http/.test(url)) {
            const first = new RegExp(`(https?://.+)${endpointRe}`).exec(url);
            if (!first) {
                throw new Error('Got a complete url but could not extract JWP endpoint');
            }
            remainingUrl = url.replace(first[1], '');
        }
        else if (new RegExp('^/').test(url)) {
            remainingUrl = url;
        }
        else {
            throw new Error(`Did not know what to do with url '${url}'`);
        }
        const stripPrefixRe = new RegExp('^.*?(/(session|status).*)$');
        if (stripPrefixRe.test(remainingUrl)) {
            remainingUrl = /** @type {RegExpExecArray} */ (stripPrefixRe.exec(remainingUrl))[1];
        }
        if (!new RegExp(endpointRe).test(remainingUrl)) {
            remainingUrl = `/session/${this.sessionId}${remainingUrl}`;
        }
        const requiresSessionId = this.endpointRequiresSessionId(remainingUrl);
        if (requiresSessionId && this.sessionId === null) {
            throw new Error('Trying to proxy a session command without session id');
        }
        const sessionBaseRe = new RegExp('^/session/([^/]+)');
        if (sessionBaseRe.test(remainingUrl)) {
            if (this.sessionId === null) {
                throw new ReferenceError(`Session ID is not set, but saw a URL path referencing a session (${remainingUrl}). This may be a bug in your client.`);
            }
            // we have something like /session/:id/foobar, so we need to replace
            // the session id
            const match = sessionBaseRe.exec(remainingUrl);
            // TODO: if `requiresSessionId` is `false` and `sessionId` is `null`, this is a bug.
            // are we sure `sessionId` is not `null`?
            remainingUrl = remainingUrl.replace(
            /** @type {RegExpExecArray} */ (match)[1], 
            /** @type {string} */ (this.sessionId));
        }
        else if (requiresSessionId) {
            throw new Error(`Could not find :session section for url: ${remainingUrl}`);
        }
        remainingUrl = remainingUrl.replace(/\/$/, ''); // can't have trailing slashes
        return proxyBase + remainingUrl;
    }
    async proxy(url, method, body = null) {
        method = method.toUpperCase();
        const newUrl = this.getUrlForProxy(url);
        const truncateBody = (content) => lodash_1.default.truncate(lodash_1.default.isString(content) ? content : JSON.stringify(content), {
            length: constants_1.MAX_LOG_BODY_LENGTH,
        });
        /** @type {import('axios').RawAxiosRequestConfig} */
        const reqOpts = {
            url: newUrl,
            method,
            headers: {
                'content-type': 'application/json; charset=utf-8',
                'user-agent': 'appium',
                accept: 'application/json, */*',
            },
            proxy: false,
            timeout: this.timeout,
            httpAgent: this.httpAgent,
            httpsAgent: this.httpsAgent,
        };
        // GET methods shouldn't have any body. Most servers are OK with this, but WebDriverAgent throws 400 errors
        if (support_1.util.hasValue(body) && method !== 'GET') {
            if (typeof body !== 'object') {
                try {
                    reqOpts.data = JSON.parse(body);
                }
                catch (e) {
                    throw new Error(`Cannot interpret the request body as valid JSON: ${truncateBody(body)}`);
                }
            }
            else {
                reqOpts.data = body;
            }
        }
        this.log.debug(`Proxying [${method} ${url || '/'}] to [${method} ${newUrl}] ` +
            (reqOpts.data ? `with body: ${truncateBody(reqOpts.data)}` : 'with no body'));
        const throwProxyError = (error) => {
            const err = /** @type {ProxyError} */ (new Error(`The request to ${url} has failed`));
            err.response = {
                data: error,
                status: 500,
            };
            throw err;
        };
        let isResponseLogged = false;
        try {
            const { data, status, headers } = await this.request(reqOpts);
            // `data` might be really big
            // Be careful while handling it to avoid memory leaks
            if (!lodash_1.default.isPlainObject(data)) {
                // The response should be a valid JSON object
                // If it cannot be coerced to an object then the response is wrong
                throwProxyError(data);
            }
            this.log.debug(`Got response with status ${status}: ${truncateBody(data)}`);
            isResponseLogged = true;
            const isSessionCreationRequest = /\/session$/.test(url) && method === 'POST';
            if (isSessionCreationRequest) {
                if (status === 200) {
                    this.sessionId = data.sessionId || (data.value || {}).sessionId;
                }
                this.downstreamProtocol = this.getProtocolFromResBody(data);
                this.log.info(`Determined the downstream protocol as '${this.downstreamProtocol}'`);
            }
            if (lodash_1.default.has(data, 'status') && parseInt(data.status, 10) !== 0) {
                // Some servers, like chromedriver may return response code 200 for non-zero JSONWP statuses
                throwProxyError(data);
            }
            const res = { statusCode: status, headers, body: data };
            return [res, data];
        }
        catch (e) {
            // We only consider an error unexpected if this was not
            // an async request module error or if the response cannot be cast to
            // a valid JSON
            let proxyErrorMsg = e.message;
            if (support_1.util.hasValue(e.response)) {
                if (!isResponseLogged) {
                    const error = truncateBody(e.response.data);
                    this.log.info(support_1.util.hasValue(e.response.status)
                        ? `Got response with status ${e.response.status}: ${error}`
                        : `Got response with unknown status: ${error}`);
                }
            }
            else {
                proxyErrorMsg = `Could not proxy command to the remote server. Original error: ${e.message}`;
                if (COMPACT_ERROR_PATTERNS.some((p) => p.test(e.message))) {
                    this.log.info(e.message);
                }
                else {
                    this.log.info(e.stack);
                }
            }
            throw new errors_1.errors.ProxyRequestError(proxyErrorMsg, e.response?.data, e.response?.status);
        }
    }
    getProtocolFromResBody(resObj) {
        if (lodash_1.default.isInteger(resObj.status)) {
            return MJSONWP;
        }
        if (!lodash_1.default.isUndefined(resObj.value)) {
            return W3C;
        }
    }
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @returns {string|undefined}
     */
    requestToCommandName(url, method) {
        /**
         *
         * @param {RegExp} pattern
         * @returns {string|undefined}
         */
        const extractCommandName = (pattern) => {
            const pathMatch = pattern.exec(url);
            if (pathMatch) {
                return (0, protocol_1.routeToCommandName)(pathMatch[1], method, this.reqBasePath);
            }
        };
        let commandName = (0, protocol_1.routeToCommandName)(url, method, this.reqBasePath);
        if (!commandName && lodash_1.default.includes(url, `${this.reqBasePath}/session/`)) {
            commandName = extractCommandName(new RegExp(`${lodash_1.default.escapeRegExp(this.reqBasePath)}/session/[^/]+(.+)`));
        }
        if (!commandName && lodash_1.default.includes(url, this.reqBasePath)) {
            commandName = extractCommandName(new RegExp(`${lodash_1.default.escapeRegExp(this.reqBasePath)}(/.+)`));
        }
        return commandName;
    }
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @param {any?} body
     */
    async proxyCommand(url, method, body = null) {
        const commandName = this.requestToCommandName(url, method);
        if (!commandName) {
            return await this.proxy(url, method, body);
        }
        this.log.debug(`Matched '${url}' to command name '${commandName}'`);
        return await this.protocolConverter.convertAndProxy(commandName, url, method, body);
    }
    /**
     *
     * @param {string} url
     * @param {import('@appium/types').HTTPMethod} method
     * @param {any?} body
     * @returns {Promise<unknown>}
     */
    async command(url, method, body = null) {
        let response;
        let resBodyObj;
        try {
            [response, resBodyObj] = await this.proxyCommand(url, method, body);
        }
        catch (err) {
            if ((0, errors_1.isErrorType)(err, errors_1.errors.ProxyRequestError)) {
                throw err.getActualError();
            }
            throw new errors_1.errors.UnknownError(err.message);
        }
        const protocol = this.getProtocolFromResBody(resBodyObj);
        if (protocol === MJSONWP) {
            // Got response in MJSONWP format
            if (response.statusCode === 200 && resBodyObj.status === 0) {
                return resBodyObj.value;
            }
            const status = parseInt(resBodyObj.status, 10);
            if (!isNaN(status) && status !== 0) {
                let message = resBodyObj.value;
                if (lodash_1.default.has(message, 'message')) {
                    message = message.message;
                }
                throw (0, errors_1.errorFromMJSONWPStatusCode)(status, lodash_1.default.isEmpty(message) ? (0, status_1.getSummaryByCode)(status) : message);
            }
        }
        else if (protocol === W3C) {
            // Got response in W3C format
            if (response.statusCode < 300) {
                return resBodyObj.value;
            }
            if (lodash_1.default.isPlainObject(resBodyObj.value) && resBodyObj.value.error) {
                throw (0, errors_1.errorFromW3CJsonCode)(resBodyObj.value.error, resBodyObj.value.message, resBodyObj.value.stacktrace);
            }
        }
        else if (response.statusCode === 200) {
            // Unknown protocol. Keeping it because of the backward compatibility
            return resBodyObj;
        }
        throw new errors_1.errors.UnknownError(`Did not know what to do with response code '${response.statusCode}' ` +
            `and response body '${lodash_1.default.truncate(JSON.stringify(resBodyObj), {
                length: 300,
            })}'`);
    }
    getSessionIdFromUrl(url) {
        const match = url.match(/\/session\/([^/]+)/);
        return match ? match[1] : null;
    }
    async proxyReqRes(req, res) {
        // ! this method must not throw any exceptions
        // ! make sure to call res.send before return
        let statusCode;
        let resBodyObj;
        try {
            let response;
            [response, resBodyObj] = await this.proxyCommand(req.originalUrl, req.method, req.body);
            res.headers = response.headers;
            statusCode = response.statusCode;
        }
        catch (err) {
            [statusCode, resBodyObj] = (0, errors_1.getResponseForW3CError)((0, errors_1.isErrorType)(err, errors_1.errors.ProxyRequestError) ? err.getActualError() : err);
        }
        res.set('content-type', 'application/json; charset=utf-8');
        if (!lodash_1.default.isPlainObject(resBodyObj)) {
            const error = new errors_1.errors.UnknownError(`The downstream server response with the status code ${statusCode} is not a valid JSON object: ` +
                lodash_1.default.truncate(`${resBodyObj}`, { length: 300 }));
            [statusCode, resBodyObj] = (0, errors_1.getResponseForW3CError)(error);
        }
        // if the proxied response contains a sessionId that the downstream
        // driver has generated, we don't want to return that to the client.
        // Instead, return the id from the request or from current session
        if (lodash_1.default.has(resBodyObj, 'sessionId')) {
            const reqSessionId = this.getSessionIdFromUrl(req.originalUrl);
            if (reqSessionId) {
                this.log.info(`Replacing sessionId ${resBodyObj.sessionId} with ${reqSessionId}`);
                resBodyObj.sessionId = reqSessionId;
            }
            else if (this.sessionId) {
                this.log.info(`Replacing sessionId ${resBodyObj.sessionId} with ${this.sessionId}`);
                resBodyObj.sessionId = this.sessionId;
            }
        }
        resBodyObj.value = (0, helpers_1.formatResponseValue)(resBodyObj.value);
        res.status(statusCode).send(JSON.stringify((0, helpers_1.formatStatus)(resBodyObj)));
    }
}
exports.JWProxy = JWProxy;
exports.default = JWProxy;
/**
 * @typedef {Error & {response: {data: import('type-fest').JsonObject, status: import('http-status-codes').StatusCodes}}} ProxyError
 */
//# sourceMappingURL=proxy.js.map