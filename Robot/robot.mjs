
// The heart of the Robot 

const runRobot = (state, robot, memory) => {
    for(let turns = 0;; turns++) {
        if(state.parcels.length == 0) {
            console.log(`Done in ${turns}`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.destination);
        memory = action.memory;
        console.log(`Moved to ${action.destination}`)
    }
}

export { runRobot };