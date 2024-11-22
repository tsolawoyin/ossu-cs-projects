import { anyStorage } from "./findStorage.mjs";
import { bigOak } from "./Network.mjs";



// ----------------------------------my solution------------------------------------------------------->
const locateScapel = async (nest, source, name) => {
    let scalpelLocation = await anyStorage(nest, source, name);
    return scalpelLocation == source 
        ? `found at ${scalpelLocation}`
        : locateScapel(nest, scalpelLocation, name)
}

// locateScapel(bigOak, "Big Oak", "scalpel").then(e => console.log(e), f => console.log(f.message))

const locate = (nest, source, name) => {
    return new Promise((resolve,reject) => {
        const attempt = (nest, source, name) => {
            let scalpelLocation = anyStorage(nest, source, name);
            scalpelLocation.then(e => {
                if(e == source) resolve(e);
                else attempt(nest, e, name)
            }, e => reject(e))
        }
        attempt(nest, source, name)
    })
}

locateScapel(bigOak, "Big Oak", "scalpel").then(e => console.log(e)).catch(e => console.log(e))

// ------------------------------------------------------------------------------------------------>

// -------------------------------Author's solution----------------------------------------------->
async function locateScalpel(nest) {
    let current = nest.name;
    for (; ;) {
        let next = await anyStorage(nest, current, "scalpel");
        if (next == current) return current;
        current = next;
    }
}

function locateScalpel2(nest) {
    function loop(current) {
        return anyStorage(nest, current, "scalpel").then(next => {
            if (next == current) return current;
            else return loop(next);
        });
    }
    return loop(nest.name);
}
// ----------------------------------------------------------------------------------------------->