import { bigOak } from "./Network.mjs";
import { requestType, routeRequest } from "./routeRequest.mjs";

const storage = (nest, name) => {
    return new Promise((resolve) => {
        nest.readStorage(name, val => {
            resolve(val);
        })
    })
}

requestType("storage", (nest, name) => storage(nest, name));

let network = nest => Object.keys(nest.state.graph);

const findInStorage = async (nest, name) => {
    let local = await storage(nest, name);
    if(local != null) return local;
    let sources = network(nest).filter(e => e != nest.name);

    while(sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(e => e != source);
        console.log(source)
        try{
            let remote = await routeRequest(nest, source, "storage", name);
            if(remote != null) return remote;
        } catch(_) {}
    }
    throw new Error("Not found!");
}

// findInStorage(bigOak, "enemies").then(e => console.log(e))

export const anyStorage = (nest, source, name) => {
    if(nest.name == source) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

const countChicks = async (nest, year) => {
    let sources = network(nest).map(async name => `${name}: ${await anyStorage(nest, name, `chicks in ${year}`).catch(e => "failed to fetch due to network error")}`);
    let lists;
    for await (let source of sources) {
        lists += source + "\n"
    }
    return lists.replace("undefined", "");
}

// countChicks(bigOak, 2004).then(e => console.log(e))