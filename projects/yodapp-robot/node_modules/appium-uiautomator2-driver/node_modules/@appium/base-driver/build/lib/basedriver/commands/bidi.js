"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mixin_1 = require("./mixin");
const BidiCommands = {
    async bidiSubscribe(events, contexts = ['']) {
        for (const event of events) {
            this.bidiEventSubs[event] = contexts;
        }
    },
    async bidiUnsubscribe(events, contexts = ['']) {
        for (const event of events) {
            if (this.bidiEventSubs[event]) {
                this.bidiEventSubs[event] = this.bidiEventSubs[event].filter((c) => !contexts.includes(c));
            }
            if (this.bidiEventSubs[event].length === 0) {
                delete this.bidiEventSubs[event];
            }
        }
    },
};
(0, mixin_1.mixin)(BidiCommands);
//# sourceMappingURL=bidi.js.map