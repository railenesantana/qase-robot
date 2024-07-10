"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable require-await */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverCore = void 0;
const support_1 = require("@appium/support");
const async_lock_1 = __importDefault(require("async-lock"));
const lodash_1 = __importDefault(require("lodash"));
const node_events_1 = require("node:events");
const node_os_1 = __importDefault(require("node:os"));
const constants_1 = require("../constants");
const protocol_1 = require("../protocol");
const device_settings_1 = __importDefault(require("./device-settings"));
const helpers_1 = __importStar(require("./helpers"));
const bidi_commands_1 = require("../protocol/bidi-commands");
const NEW_COMMAND_TIMEOUT_MS = 60 * 1000;
const ON_UNEXPECTED_SHUTDOWN_EVENT = 'onUnexpectedShutdown';
class DriverCore {
    constructor(opts = {}, shouldValidateCaps = true) {
        this._log = support_1.logger.getLogger(helpers_1.default.generateDriverLogPrefix(this));
        // setup state
        this.opts = opts;
        // use a custom tmp dir to avoid losing data and app when computer is
        // restarted
        this.opts.tmpDir = this.opts.tmpDir || process.env.APPIUM_TMP_DIR || node_os_1.default.tmpdir();
        // base-driver internals
        this.shouldValidateCaps = shouldValidateCaps;
        // keeping track of initial opts
        this.initialOpts = lodash_1.default.cloneDeep(opts);
        this.sessionId = null;
        this.helpers = helpers_1.default;
        this.basePath = constants_1.DEFAULT_BASE_PATH;
        this.relaxedSecurityEnabled = false;
        this.allowInsecure = [];
        this.denyInsecure = [];
        this.newCommandTimeoutMs = NEW_COMMAND_TIMEOUT_MS;
        this.implicitWaitMs = 0;
        this.locatorStrategies = [];
        this.webLocatorStrategies = [];
        this.managedDrivers = [];
        this.noCommandTimer = null;
        this._eventHistory = { commands: [] };
        this.eventEmitter = new node_events_1.EventEmitter();
        this.shutdownUnexpectedly = false;
        this.commandsQueueGuard = new async_lock_1.default();
        this.settings = new device_settings_1.default();
        this.bidiEventSubs = {};
        this.doesSupportBidi = false;
    }
    get log() {
        return this._log;
    }
    /**
     * Set a callback handler if needed to execute a custom piece of code
     * when the driver is shut down unexpectedly. Multiple calls to this method
     * will cause the handler to be executed mutiple times
     *
     * @param handler The code to be executed on unexpected shutdown.
     * The function may accept one argument, which is the actual error instance, which
     * caused the driver to shut down.
     */
    onUnexpectedShutdown(handler) {
        this.eventEmitter.on(ON_UNEXPECTED_SHUTDOWN_EVENT, handler);
    }
    /**
     * This property is used by AppiumDriver to store the data of the
     * specific driver sessions. This data can be later used to adjust
     * properties for driver instances running in parallel.
     * Override it in inherited driver classes if necessary.
     */
    get driverData() {
        return {};
    }
    /**
     * This property controls the way the `executeCommand` method
     * handles new driver commands received from the client.
     * Override it for inherited classes only in special cases.
     *
     * @return If the returned value is true (default) then all the commands
     *   received by the particular driver instance are going to be put into the queue,
     *   so each following command will not be executed until the previous command
     *   execution is completed. False value disables that queue, so each driver command
     *   is executed independently and does not wait for anything.
     */
    get isCommandsQueueEnabled() {
        return true;
    }
    /*
     * make eventHistory a property and return a cloned object so a consumer can't
     * inadvertently change data outside of logEvent
     */
    get eventHistory() {
        return lodash_1.default.cloneDeep(this._eventHistory);
    }
    /**
     * API method for driver developers to log timings for important events
     */
    logEvent(eventName) {
        if (eventName === 'commands') {
            throw new Error('Cannot log commands directly');
        }
        if (typeof eventName !== 'string') {
            throw new Error(`Invalid eventName ${eventName}`);
        }
        if (!this._eventHistory[eventName]) {
            this._eventHistory[eventName] = [];
        }
        const ts = Date.now();
        const logTime = new Date(ts).toTimeString();
        this._eventHistory[eventName].push(ts);
        this.log.debug(`Event '${eventName}' logged at ${ts} (${logTime})`);
    }
    /**
     * @privateRemarks Overridden in appium driver, but here so that individual drivers can be
     * tested with clients that poll
     */
    async getStatus() {
        return {};
    }
    /**
     * method required by MJSONWP in order to determine whether it should
     * respond with an invalid session response
     */
    sessionExists(sessionId) {
        if (!sessionId)
            return false; // eslint-disable-line curly
        return sessionId === this.sessionId;
    }
    /**
     * method required by MJSONWP in order to determine if the command should
     * be proxied directly to the driver
     */
    driverForSession(sessionId) {
        return this;
    }
    isMjsonwpProtocol() {
        return this.protocol === constants_1.PROTOCOLS.MJSONWP;
    }
    isW3CProtocol() {
        return this.protocol === constants_1.PROTOCOLS.W3C;
    }
    setProtocolMJSONWP() {
        this.protocol = constants_1.PROTOCOLS.MJSONWP;
    }
    setProtocolW3C() {
        this.protocol = constants_1.PROTOCOLS.W3C;
    }
    /**
     * Check whether a given feature is enabled via its name
     *
     * @param name - name of feature/command
     */
    isFeatureEnabled(name) {
        // if we have explicitly denied this feature, return false immediately
        if (this.denyInsecure && lodash_1.default.includes(this.denyInsecure, name)) {
            return false;
        }
        // if we specifically have allowed the feature, return true
        if (this.allowInsecure && lodash_1.default.includes(this.allowInsecure, name)) {
            return true;
        }
        // otherwise, if we've globally allowed insecure features and not denied
        // this one, return true
        if (this.relaxedSecurityEnabled) {
            return true;
        }
        // if we haven't allowed anything insecure, then reject
        return false;
    }
    /**
     * Assert that a given feature is enabled and throw a helpful error if it's
     * not
     *
     * @param name - name of feature/command
     * @deprecated
     */
    ensureFeatureEnabled(name) {
        this.assertFeatureEnabled(name);
    }
    /**
     * Assert that a given feature is enabled and throw a helpful error if it's
     * not
     *
     * @param name - name of feature/command
     */
    assertFeatureEnabled(name) {
        if (!this.isFeatureEnabled(name)) {
            throw new Error(`Potentially insecure feature '${name}' has not been ` +
                `enabled. If you want to enable this feature and accept ` +
                `the security ramifications, please do so by following ` +
                `the documented instructions at http://appium.io/docs/en/2.0/guides/security/`);
        }
    }
    validateLocatorStrategy(strategy, webContext = false) {
        let validStrategies = this.locatorStrategies;
        this.log.debug(`Valid locator strategies for this request: ${validStrategies.join(', ')}`);
        if (webContext) {
            validStrategies = validStrategies.concat(this.webLocatorStrategies);
        }
        if (!lodash_1.default.includes(validStrategies, strategy)) {
            throw new protocol_1.errors.InvalidSelectorError(`Locator Strategy '${strategy}' is not supported for this session`);
        }
    }
    /**
     * If this driver has requested proxying of bidi connections to an upstream bidi endpoint, this
     * method should be overridden to return the URL of that websocket, to indicate that bidi
     * proxying is enabled. Otherwise, a null return will indicate that bidi proxying should not be
     * active and bidi commands will be handled by this driver.
     *
     * @returns {string | null}
     */
    get bidiProxyUrl() {
        return null;
    }
    proxyActive(sessionId) {
        return false;
    }
    getProxyAvoidList(sessionId) {
        return [];
    }
    canProxy(sessionId) {
        return false;
    }
    /**
     * Whether a given command route (expressed as method and url) should not be
     * proxied according to this driver
     *
     * @param sessionId - the current sessionId (in case the driver runs
     * multiple session ids and requires it). This is not used in this method but
     * should be made available to overridden methods.
     * @param method - HTTP method of the route
     * @param url - url of the route
     * @param [body] - webdriver request body
     *
     * @returns whether the route should be avoided
     */
    proxyRouteIsAvoided(sessionId, method, url, body) {
        for (const avoidSchema of this.getProxyAvoidList(sessionId)) {
            if (!lodash_1.default.isArray(avoidSchema) || avoidSchema.length !== 2) {
                throw new Error('Proxy avoidance must be a list of pairs');
            }
            const [avoidMethod, avoidPathRegex] = avoidSchema;
            if (!lodash_1.default.includes(['GET', 'POST', 'DELETE'], avoidMethod)) {
                throw new Error(`Unrecognized proxy avoidance method '${avoidMethod}'`);
            }
            if (!lodash_1.default.isRegExp(avoidPathRegex)) {
                throw new Error('Proxy avoidance path must be a regular expression');
            }
            const normalizedUrl = url.replace(new RegExp(`^${lodash_1.default.escapeRegExp(this.basePath)}`), '');
            if (avoidMethod === method && avoidPathRegex.test(normalizedUrl)) {
                return true;
            }
        }
        return false;
    }
    /**
     *
     * @param {Driver} driver
     */
    addManagedDriver(driver) {
        this.managedDrivers.push(driver);
    }
    getManagedDrivers() {
        return this.managedDrivers;
    }
    async clearNewCommandTimeout() {
        if (this.noCommandTimer) {
            clearTimeout(this.noCommandTimer);
            this.noCommandTimer = null;
        }
    }
    async executeBidiCommand(bidiCmd, bidiParams) {
        const [moduleName, methodName] = bidiCmd.split('.');
        // if we don't get a valid format for bidi command name, reject
        if (!moduleName || !methodName) {
            throw new protocol_1.errors.UnknownCommandError(`Did not receive a valid BiDi module and method name ` +
                `of the form moduleName.methodName. Instead received ` +
                `'${moduleName}.${methodName}'`);
        }
        // if the command module isn't part of our spec, reject
        if (!bidi_commands_1.BIDI_COMMANDS[moduleName]) {
            throw new protocol_1.errors.UnknownCommandError();
        }
        const { command, params } = bidi_commands_1.BIDI_COMMANDS[moduleName][methodName];
        // if the command method isn't part of our spec, also reject
        if (!command) {
            throw new protocol_1.errors.UnknownCommandError();
        }
        // If the driver doesn't have this command, it must not be implemented
        if (!this[command]) {
            throw new protocol_1.errors.NotYetImplementedError();
        }
        // TODO improve param parsing and error messages along the lines of what we have in the http
        // handlers
        const args = [];
        if (params?.required?.length) {
            for (const requiredParam of params.required) {
                if (lodash_1.default.isUndefined(bidiParams[requiredParam])) {
                    throw new protocol_1.errors.InvalidArgumentError(`The ${requiredParam} parameter was required but you omitted it`);
                }
                args.push(bidiParams[requiredParam]);
            }
        }
        if (params?.optional?.length) {
            for (const optionalParam of params.optional) {
                args.push(bidiParams[optionalParam]);
            }
        }
        const logParams = lodash_1.default.truncate(JSON.stringify(bidiParams), { length: constants_1.MAX_LOG_BODY_LENGTH });
        this.log.debug(`Executing bidi command '${bidiCmd}' with params ${logParams} by passing to driver ` +
            `method '${command}'`);
        const res = (await this[command](...args)) ?? null;
        this.log.debug(`Responding to bidi command '${bidiCmd}' with ${JSON.stringify(res)}`);
        return res;
    }
}
exports.DriverCore = DriverCore;
/**
 * Make the basedriver version available so for any driver which inherits from this package, we
 * know which version of basedriver it inherited from
 */
DriverCore.baseVersion = helpers_1.BASEDRIVER_VER;
//# sourceMappingURL=core.js.map