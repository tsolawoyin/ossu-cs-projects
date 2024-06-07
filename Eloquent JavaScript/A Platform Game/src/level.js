// This file define the level instance and all the methods associated with it.

import { Player, Lava, Coin } from "./actors.js";
import { Vec } from "./vec.js";

const levelChars = {
  ".": "empty",
  "+": "lava",
  "#": "wall",
  o: Coin,
  "@": Player,
  "=": Lava,
  "|": Lava,
  v: Lava,
  // this makes it convenient to add as much character as you want without stress
};

class Level {
  constructor(plan, id) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);
    this.width = rows[0].length;
    this.height = rows.length;
    this.startActors = [];
    this.id = id; // to be inserted in the for loop
    this.coins = 0;
    // rows will contain empty or so like that.
    // I got all these things then why do I think I can other stuffs
    // I think its the demon inside me
    // telling things I can and cannot do.
    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        // making sens
        let type = levelChars[ch];
        if (typeof type != "string") {
          if (ch == "o") this.coins += 1;
          let pos = new Vec(x, y);
          this.startActors.push(type.create(pos, ch));
          type = "empty";
        }
        return type;
      });
    });
  }
}

Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x),
    xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y),
    yEnd = Math.ceil(pos.y + size.y);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) return true;
    }
  }

  return false;
};

// setting up the code of the game
export { Level };
