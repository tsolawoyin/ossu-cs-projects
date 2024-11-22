import { bigOak, everywhere } from "./Network.mjs";
import { routeRequest, requestType } from "./routeRequest.mjs";

everywhere(nest => nest.state.gossip = []);

requestType("gossip", (recipent, message, sender) => {
    if(recipent.state.gossip.includes(message)) return;
    console.log(`${recipent.name} receives ${message} from ${sender}`);
    sendGossip(recipent, message);
})

const sendGossip = (sender, message, exceptFor) => {
    sender.state.gossip.push(message);
    for(let n of sender.neighbors) {
        if(n == exceptFor) continue;
        else routeRequest(sender, n, "gossip", message);
    }
}

routeRequest(bigOak, "Cow Pasture", "gossip", "war looming")