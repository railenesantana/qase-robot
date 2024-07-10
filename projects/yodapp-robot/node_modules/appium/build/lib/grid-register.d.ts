export default registerNode;
/**
 * Registers a new node with a selenium grid
 * @param {string|object} data - Path or object representing selenium grid node config file. If a `string`, all subsequent arguments are required!
 * @param {string} [addr] - Bind to this address
 * @param {number} [port] - Bind to this port
 * @param {string} [basePath] - Base path for the grid
 */
declare function registerNode(data: string | object, addr?: string | undefined, port?: number | undefined, basePath?: string | undefined): Promise<void>;
//# sourceMappingURL=grid-register.d.ts.map