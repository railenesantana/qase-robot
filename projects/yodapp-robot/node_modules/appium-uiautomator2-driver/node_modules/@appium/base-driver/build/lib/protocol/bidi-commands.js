"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIDI_COMMANDS = void 0;
const SUBSCRIPTION_REQUEST_PARAMS = /** @type {const} */ ({
    required: ['events'],
    optional: ['contexts'],
});
const BIDI_COMMANDS = /** @type {const} */ ({
    session: {
        subscribe: {
            command: 'bidiSubscribe',
            params: SUBSCRIPTION_REQUEST_PARAMS,
        },
        unsubscribe: {
            command: 'bidiUnsubscribe',
            params: SUBSCRIPTION_REQUEST_PARAMS,
        },
    },
    browsingContext: {
        navigate: {
            command: 'bidiNavigate',
            params: {
                required: ['context', 'url'],
                optional: ['wait'],
            },
        },
    },
});
exports.BIDI_COMMANDS = BIDI_COMMANDS;
//# sourceMappingURL=bidi-commands.js.map