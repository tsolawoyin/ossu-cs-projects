import { runRobot } from "./Robot.mjs";
import { randomRobot } from "./randomRobot.mjs";
import CityState from "./CityState.mjs";
import { buildGraph } from "./buildgraph.mjs";
import { routeRobot } from "./routeRobot.mjs";
import { goalOreintedRobot } from "./goalOreintedRobot.mjs";
let city = CityState.generateParcels(90, buildGraph.graph);

// runRobot(city, routeRobot)
// runRobot(city, randomRobot)
runRobot(city, goalOreintedRobot)

