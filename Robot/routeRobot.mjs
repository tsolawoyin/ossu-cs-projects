import { buildGraph } from "./buildgraph.mjs";

let route = [
    "H", "T", "G", "R", "G", "M", "ED", "B", "E", "MC", "I", "MC", "H"
]

function routeRobot(state, memory = []) {
    if(memory.length == 0) memory = route;
    return {destination: memory[0], memory: memory.slice(1)};
}

export { routeRobot };