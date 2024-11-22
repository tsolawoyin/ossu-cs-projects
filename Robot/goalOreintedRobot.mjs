import { buildGraph } from "./buildgraph.mjs";

let graph = buildGraph.graph;
let findRoute = buildGraph.findRoute


function goalOreintedRobot({place, parcels}, memory = []) {
    let p = parcels[0];
    if(memory.length == 0) {
        if(p.place !== place){
            memory = findRoute(place, p.place, graph)
        } else memory = findRoute(p.place, p.address, graph);
    }
    return {destination: memory[0], memory: memory.slice(1)};
}

export { goalOreintedRobot };