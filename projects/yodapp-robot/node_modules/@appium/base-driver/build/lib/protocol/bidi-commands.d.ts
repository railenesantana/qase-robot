export namespace BIDI_COMMANDS {
    namespace session {
        namespace subscribe {
            export let command: "bidiSubscribe";
            export { SUBSCRIPTION_REQUEST_PARAMS as params };
        }
        namespace unsubscribe {
            let command_1: "bidiUnsubscribe";
            export { command_1 as command };
            export { SUBSCRIPTION_REQUEST_PARAMS as params };
        }
    }
    namespace browsingContext {
        namespace navigate {
            let command_2: "bidiNavigate";
            export { command_2 as command };
            export namespace params {
                let required: readonly ["context", "url"];
                let optional: readonly ["wait"];
            }
        }
    }
}
declare namespace SUBSCRIPTION_REQUEST_PARAMS {
    let required_1: readonly ["events"];
    export { required_1 as required };
    let optional_1: readonly ["contexts"];
    export { optional_1 as optional };
}
export {};
//# sourceMappingURL=bidi-commands.d.ts.map