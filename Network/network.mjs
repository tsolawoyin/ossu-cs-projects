import { Node } from "./Node.mjs";
import { connections } from "./connections.mjs";
import { storageFor } from "./storageFor.mjs";


class Network {
    constructor(connections, storageFor) {
        let reachable = Object.create(null);
        for(let [from, to] of connections.map(e => e.split("-"))) {
            ;(reachable[from] || (reachable[from] = [])).push(to)
            ;(reachable[to] || (reachable[to] = [])).push(from)
        }
        this.nodes = Object.create(null);
        for(let name of Object.keys(reachable))
            this.nodes[name] = new Node(name, reachable[name], this, storageFor(name));
        this.types = Object.create(null);
    }
    defineRequestType(name, handler) {
        this.types[name] = handler;
    }
    everywhere(f) {
        for(let nest of Object.values(this.nodes)) f(nest);
    }
}

const network = new Network(connections, storageFor);
const bigOak = network.nodes["Big Oak"];
const defineRequestType = network.defineRequestType.bind(network);
const everywhere = network.everywhere.bind(network);

export { bigOak, defineRequestType, everywhere }
