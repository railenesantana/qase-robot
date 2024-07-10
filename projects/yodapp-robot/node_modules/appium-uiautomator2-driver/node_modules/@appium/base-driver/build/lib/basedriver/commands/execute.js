"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const protocol_1 = require("../../protocol");
const mixin_1 = require("./mixin");
const ExecuteCommands = {
    async executeMethod(script, protoArgs) {
        const Driver = this.constructor;
        const commandMetadata = { ...Driver.executeMethodMap?.[script] };
        if (!commandMetadata.command) {
            const availableScripts = lodash_1.default.keys(Driver.executeMethodMap);
            throw new protocol_1.errors.UnsupportedOperationError(`Unsupported execute method '${script}'. Available methods ` +
                `are: ${availableScripts.join(', ')}`);
        }
        const args = (0, protocol_1.validateExecuteMethodParams)(protoArgs, commandMetadata.params);
        const command = this[commandMetadata.command];
        return await command.call(this, ...args);
    },
};
(0, mixin_1.mixin)(ExecuteCommands);
//# sourceMappingURL=execute.js.map