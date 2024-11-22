import { defineRequestType, everywhere } from "./Network.mjs";
import { graph } from "./connections.mjs";

const send = (nest, to, type, request) => {
    return new Promise((resolve, reject) => {
        let done = false;
        const attempt = n => {
            nest.send(to, type, request, (err ,val) => {
                done = true;
                if(err) reject(err)
                resolve(val)
            })
            setTimeout(() => {
                if(done) return;
                else if(n < 3) attempt(n+1); 
                else reject(new Error("Timed out"))
            }, 250)
        }
        attempt(1);
    })
}

const requestType = (name, handler) => {
    defineRequestType(name, (recipent, message, sender, f) => {
        try {
            Promise.resolve(handler(recipent, message, sender))
                .then(val => f(null, val), err => f(err))
        } catch(err) {
            f(err)
        }
    })
}

everywhere(nest => {
    nest.state.graph = graph;
})

const findRoute = (from, to, graph) => {
    let work = [{at: from, via: null}];
    for(let i= 0;; i++) {
        let {at, via} = work[i];
        for(let n of graph[at] || []) {
            if(n == to) return via;
            if(!work.some(e => e.at == n)) work.push({at: n, via: via || n});
        }
    }
}

const routeRequest = (nest, to, type, request) => {
    if(nest.neighbors.includes(to)) return send(nest, to, type, request);
    else {
        let neighbor = findRoute(nest.name, to, nest.state.graph);
        if(!neighbor) throw new Error(`Can't plot a graph to ${to} from here`);
        else return routeRequest(nest, neighbor, "route", {to, type, request});
    }
}

requestType("route", (reciever, {to, type, request}) => routeRequest(reciever, to, type, request));

export { routeRequest, requestType }