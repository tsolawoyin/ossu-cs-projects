// this file contains the code that actually runs the game (i.e the animation and all the fun stuff)
import { Level } from "./level.js";
import { State } from "./state.js";
import { GAME_LEVELS } from "./plans.js";
import { Display } from "./canvasDisplay.js";

function track(keys) {
  // dir is more appropriate now...
  // it can be touch or screen... no I don't get...
  let down = Object.create(null);

  const trackK = (event) => {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  };

  function trackT(event) {
    if (keys.includes(event.target.id)) {
      down[event.target.id] = event.type == "touchstart";
      event.preventDefault();
    }
  }

  window.addEventListener("keyup", trackK);
  window.addEventListener("keydown", trackK);
  window.addEventListener("touchstart", trackT, {
    passive: false
  });
  window.addEventListener("touchend", trackT, {
    passive: false
  });

  return down;
}

const arrowKeys = track(["ArrowLeft", "ArrowUp", "ArrowRight"]);


function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime != null) {
      let timeStamp = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStamp) == false) return true;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame); // cool. it looks like recursion but its not.
}

function runLevel(level, Display) {
  console.log(level)
  let state = State.start(level);
  let display = new Display(document.querySelector("main"), level);
  let ending = 1;
  return new Promise((resolve) => {
    runAnimation((time) => {
      state = state.update(time, arrowKeys);
      display.syncState(state);

      if (state.status == "playing") {
        // what should happen
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true; // still continue
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}

async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level], level + 1), Display);
    if (status == "won") level++;
  }

  console.log("You won!");
}

// let simpleLevel = new Level(GAME_LEVELS[0]);
// let levelState = State.start(simpleLevel);
// // because we need a display system
// let display = new CanvasDisplay(document.querySelector("main"), simpleLevel);
// // now we sync the state of the display
// display.syncState(levelState);
runGame(GAME_LEVELS, Display);

// there are quite a lot of things I am not quite getting in the game honestly
// concepts like state is just getting clearer
