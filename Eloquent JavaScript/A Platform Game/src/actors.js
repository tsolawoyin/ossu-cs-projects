// This file contains class definition and other important functions for the Actors in the game

import { Vec } from "./vec.js";
import { State } from "./state.js";

class Player {
  // nice and cool
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}
Player.prototype.size = new Vec(0.8, 1.5);

let playerXSpeed = 7;
let gravity = 30;
let jumpSpeed = 17;

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;

  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));

  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX; // that is why we needed the pos variable in the first place
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));

  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }

  return new Player(pos, new Vec(xSpeed, ySpeed));
};

class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch == "=") {
      // horizontal lavas
      return new Lava(pos, new Vec(4, 0));
    } else if (ch == "|") {
      // vertical lavas
      return new Lava(pos, new Vec(0, 4));
    } else if (ch == "v") {
      // dripping lavas
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}
Lava.prototype.size = new Vec(1, 1);

Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));

  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1)); // reverses its direction
  }
};

Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, "lost");
};

class Coin {
  constructor(pos, basePos, wobble, color) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
    this.color = color;
  }

  get type() {
    return "coin";
  }

  static create(pos, ch) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * Math.PI * 2);
  }
}
Coin.prototype.size = new Vec(0.8, 0.8);
// ======= DON'T QUITE GET THIS WOBBLE STUFF YET AS WELL =================
const wobbleSpeed = 8,
  wobbleDist = 0.07;

Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((actor) => actor != this);
  let status = state.status;
  if (!filtered.some((actor) => actor.type == "coin")) status = "won";

  return new State(state.level, filtered, status);
};

export { Player, Lava, Coin };
