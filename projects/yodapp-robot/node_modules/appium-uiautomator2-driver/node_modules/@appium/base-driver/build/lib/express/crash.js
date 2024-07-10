"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceCrash = exports.produceError = void 0;
const protocol_1 = require("../protocol");
function produceError() {
    throw new protocol_1.errors.UnknownCommandError('Produced generic error for testing');
}
exports.produceError = produceError;
function produceCrash() {
    throw new Error('We just tried to crash Appium!');
}
exports.produceCrash = produceCrash;
//# sourceMappingURL=crash.js.map