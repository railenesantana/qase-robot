"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_BASE_PATH = exports.PROTOCOLS = exports.W3C_ELEMENT_KEY = exports.MJSONWP_ELEMENT_KEY = exports.MAX_LOG_BODY_LENGTH = void 0;
const support_1 = require("@appium/support");
// The default maximum length of a single log record
// containing http request/response body
// This value could be globally customized using the --log-filters
// server feature. Example rule:
// 	{"pattern": "(.{1,150}).*", "flags": "s", "replacer": "$1"}
// ^ cuts all log records to maximum 150 chars
const MAX_LOG_BODY_LENGTH = 1024;
exports.MAX_LOG_BODY_LENGTH = MAX_LOG_BODY_LENGTH;
const MJSONWP_ELEMENT_KEY = 'ELEMENT';
exports.MJSONWP_ELEMENT_KEY = MJSONWP_ELEMENT_KEY;
const W3C_ELEMENT_KEY = support_1.util.W3C_WEB_ELEMENT_IDENTIFIER;
exports.W3C_ELEMENT_KEY = W3C_ELEMENT_KEY;
const PROTOCOLS = {
    W3C: 'W3C',
    MJSONWP: 'MJSONWP',
};
exports.PROTOCOLS = PROTOCOLS;
// Before Appium 2.0, this default value was '/wd/hub' by historical reasons.
const DEFAULT_BASE_PATH = '';
exports.DEFAULT_BASE_PATH = DEFAULT_BASE_PATH;
//# sourceMappingURL=constants.js.map