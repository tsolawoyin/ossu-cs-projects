import { bigOak } from "./Network.mjs";
import { requestType, routeRequest} from "./routeRequest.mjs"

const availableNeighbors = async (nest, type, request) => {
    let requests = nest.neighbors.map(n => routeRequest(nest, n, "ping").then(() => true).catch(() => false));
    let arr = [];
    for await (let x of requests) {
        arr.push(x);
    }
    return nest.neighbors.filter((_, i) => arr[i])
}

requestType("ping", () => "ping");

availableNeighbors(bigOak, "ping", "are you there").then(e => console.log(e));