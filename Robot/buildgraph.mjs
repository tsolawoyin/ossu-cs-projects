class BuildGraph {
    constructor() {
        this.graph = new Map;
    }
    // Adding vertex(node) to graph
    addNode(node) {
        this.graph.set(node, new Map);
    }
    // Adding edges between nodes
    addEdge(node1, node2, weight = 0) {
        this.graph.get(node1).set(node2, weight);
        this.graph.get(node2).set(node1, weight);
    }
    // reomving edges
    removeEdge(node1, node2) {
        this.graph.get(node1).delete(node2);
        this.graph.get(node2).delete(node1);
    }
    // removing a node completely
    removeNode(node) {
        for(let key of this.graph.keys()) {
            if(this.graph.get(key).has(node)) { 
                this.graph.get(key).delete(node);
            }
        }
        this.graph.delete(node);
    }
    // Traversing graph with BFS
    traverseBFS(from) {
        let queue = [], visited = {};
        queue.push(from);
        while(queue.length) {
            let current = queue.shift();
            visited[current] = true;
            for(let node of this.graph.get(current).keys())
                if(!visited[node]) queue.push(node);
        }
    }
    // Traversing graph with DFS

    //  The traverseDFS works by recursively visiting all nodes
    traverseDFS(from, fn) {
        let visited = {};
        return this._traverseDFS(from, visited, fn)
    }
    _traverseDFS(from, visited, fn) {
        visited[from] = true;
        for(let node of this.graph.get(from).keys()) 
            if(!visited[node]) {
                fn(node);
                this._traverseDFS(node, visited, fn)
            }
    }
    // calculating routes using BFS
    findRoute(from, to, graph) {
        let work = [{at: from, route: []}];
        for(let i = 0;; i++) {
            let {at, route} = work[i];
            for(let node of graph.get(at).keys()) {
                if(node == to) return route.concat(node);
                if(!work.some(e => e.at == node)) work.push({at: node, route: route.concat(node)});
            }
        }
    }
}

// ------- You can build an undirected graph with the above interface ----------

const buildGraph = new BuildGraph;
// Adding nodes
buildGraph.addNode("E")
buildGraph.addNode("B")
buildGraph.addNode("ED")
buildGraph.addNode("M")
buildGraph.addNode("I")
buildGraph.addNode("MC")
buildGraph.addNode("G")
buildGraph.addNode("T")
buildGraph.addNode("H")

// This code can be easily improved by using a for loop to perform this actions

// Adding edges


buildGraph.addEdge("E", "B", 20)
buildGraph.addEdge("E", "MC", 20)
buildGraph.addEdge("B", "I", 20)
buildGraph.addEdge("B", "ED", 20)
buildGraph.addEdge("M", "ED", 20)
buildGraph.addEdge("B", "M", 20)
buildGraph.addEdge("I", "M", 20)
buildGraph.addEdge("MC", "I", 20)
buildGraph.addEdge("M", "G", 20)
buildGraph.addEdge("T", "G", 20)
buildGraph.addEdge("T", "H", 20)
buildGraph.addEdge("MC", "H", 20)

// For now the weight doesn't really matter

// --------Meaning of Abbreviation----------------
// E -> Eleigbo
// B -> Beta's House
// E -> Ebook Designer
// M -> Market
// I -> Idoka
// MC -> Methodist church
// G -> God's Praise
// R -> Redeem Church
// T -> Town Hall
// H -> Hotel

export { buildGraph }