const $network = Symbol("network"), $storage = Symbol("storage");
let ser = val => val == null ? null : JSON.parse(JSON.stringify(val));

class Node {
    constructor(name, neighbors, network, storage) {
        this.name = name;
        this.neighbors = neighbors;
        this[$network] = network;
        this[$storage] = storage;
        this.state = Object.create(null);
    }
    send(to, type, request, f) {
        let toNode = this[$network].nodes[to];
        if(!toNode || !this.neighbors.includes(to)) f(new Error(`Can't reach ${to} from here`))
        let handler = this[$network].types[type];
        if(!handler) f(`${to} can't handle request`);
        if(Math.random() > 0.4) setTimeout(() => {
            try {
                handler(toNode, ser(request), this.name, (err, val) => {
                    setTimeout(() => err ? f(err) : f(null, val), 10)
                })
            } catch(err) {
                f(err)
            }
        }, 10 + Math.floor(Math.random() * 10))
    }
    readStorage(name, f) {
        let val = this[$storage][name];
        setTimeout(() => val && f(JSON.parse(val)), 20)
    }
}

export { Node }