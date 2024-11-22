import { buildGraph } from "./buildgraph.mjs";

let graph = buildGraph.graph;

const random = (location) => location[Math.floor(Math.random() * location.length)];

const randomRobot = (state) =>{ return { destination: random([...graph.get(state.place).keys()])}};

export { randomRobot };

