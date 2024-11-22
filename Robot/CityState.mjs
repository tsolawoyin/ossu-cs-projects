export default class CityState {
    constructor(place, parcels, graph) {
        this.place = place;
        this.parcels = parcels;
        this.graph = graph;
    }
    move(destination) {
        if(!this.graph.get(this.place).has(destination)) return this;
        let parcels = this.parcels.map(p => {
            if(p.place != this.place) return p; // i.e robot hasn't gotten to parcel's location;
            return {place: destination, address: p.address}
        }).filter(p => p.place != p.address);
        return new CityState(destination, parcels, this.graph)
    }
    static generateParcels(count = 5, graph) {
        let parcels = [], locations = [...graph.keys()];
        for(let i = 0; i < count; i++) {
            let place = locations[Math.floor(Math.random() * locations.length)], address;
            do {
                address = locations[Math.floor(Math.random() * locations.length)], address;
            } while (place == address);
            parcels.push({place, address})
        }
        return new CityState(locations[Math.floor(Math.random() * locations.length)], parcels, graph)
    }
}

