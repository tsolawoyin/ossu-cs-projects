const connections = [
    "Church Tower-Sportsgrounds", "Church Tower-Big Maple", "Big Maple-Sportsgrounds",
    "Big Maple-Woods", "Big Maple-Fabienne's Garden", "Fabienne's Garden-Woods",
    "Fabienne's Garden-Cow Pasture", "Cow Pasture-Big Oak", "Big Oak-Butcher Shop",
    "Butcher Shop-Tall Poplar", "Tall Poplar-Sportsgrounds", "Tall Poplar-Chateau",
    "Chateau-Great Pine", "Great Pine-Jacques' Farm", "Jacques' Farm-Hawthorn",
    "Great Pine-Hawthorn", "Hawthorn-Gilles' Garden", "Great Pine-Gilles' Garden",
    "Gilles' Garden-Big Oak", "Gilles' Garden-Butcher Shop", "Chateau-Butcher Shop"
]

const connectionsTwo = [
    "N1-N2", "N1-N3", "N1-N4", "N3-N5", "N3-N6", "N5-N6", "N6-N10", "N6-N9", "N4-N9",
    "N4-N7", "N2-N7", "N2-N11", "N11-N12", "N11-N13", "N4-N8", "N9-N16", "N8-N15", "N8-N14",
    "N13-N14", "N15-N16", "N15-N20", "N16-N20", "N17-N20", "N14-N17", "N13-N18", "N18-N17", 
    "N18-N19", "N19-N22", "N17-N22", "N17-N21", "N21-N22"
]

// You can make additional connections.

const makeGraph = (connections) => {
    let graph = Object.create(null);
    for(let [from, to] of connections.map(e => e.split("-"))) {
        ;(graph[from] || (graph[from] = [])).push(to);
        ;(graph[to] || (graph[to] = [])).push(from)
    }
    return graph
}

let graph = makeGraph(connections)

export { graph, connections, connectionsTwo };

