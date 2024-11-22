export function storageFor(name) {
    let storage = Object.create(null);
    storage["food caches"] = ["cache in the oak", "cache in the meadow", "cache under the hedge"];
    storage["cache in the oak"] = "A hollow above the third big branch from the bottom. Several pieces of bread and a pile of acorns."
    storage["cache in the meadow"] = "Buried below the patch of nettles (south side). A dead snake."
    storage["cache under the hedge"] = "Middle of the hedge at Gilles' garden. Marked with a forked twig. Two bottles of beer."
    storage["enemies"] = ["Farmer Jacques' dog", "The butcher", "That one-legged jackdaw", "The boy with the airgun"];
    if (name == "Church Tower" || name == "Hawthorn" || name == "Chateau")
    storage["events on 2017-12-21"] = "Deep snow. Butcher's garbage can fell over. We chased off the ravens from Saint-Vulbas."
    let hash = 0;
    for(let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
    for(let y = 1985; y <= 2018; y++) {
        storage[`chicks in ${y}`] = hash % 6;
        hash = Math.abs((hash << 2) ^ (hash+y))
    }
    // setting the scapel property conditionally
    if (name == "Big Oak") storage.scalpel = "Gilles' Garden"
    else if (name == "Gilles' Garden") storage.scalpel = "Woods"
    else if (name == "Woods") storage.scalpel = "Chateau"
    else if (name == "Chateau" || name == "Butcher Shop") storage.scalpel = "Butcher Shop"
    else storage.scalpel = "Big Oak"
    for(let prop of Object.keys(storage)) storage[prop] = JSON.stringify(storage[prop])
    return storage;
}
