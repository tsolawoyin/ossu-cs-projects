// This game will be using canvas 2d display system for its display
// my aim is writing seriosly efficient code and I deal majorly in algorithms that's y marijn's code catch fancy in particular
const scale = 20;

function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  for (let child of children) {
    dom.appendChild(child);
  }
  return dom;
}

class Display {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    //
    this.info = elt("div", {class: "info"}, elt("span", {class: "level-info"}), document.createTextNode("👾 " + level.id)); // neeed the elt function
    this.coinEl = null;
    // adding my own personalization
    //
    parent.appendChild(this.canvas);
    parent.appendChild(this.info);

    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;

    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
    this.info.remove();
  }
}

Display.prototype.syncState = function (state) {
  // dom update
  if (this.coinEl) this.coinEl.remove();
  this.coinEl = elt("span", {class: "coins-left"}, document.createTextNode(`🪙 ${state.level.coins - state.coins} / ${state.level.coins}`)) // the solution is here already
  this.info.appendChild(this.coinEl)
  // canvas update
  this.updateViewport(state);
  this.clearDisplay(state.level, state.status);
  this.drawBackground(state.level);
  this.drawActors(state.actors);
};

Display.prototype.updateViewport = function (state) {
  // updating viewport
  let viewport = this.viewport;
  let margin = viewport.width / 3; // dividing the viewport into three seperate region, left, right, and a neutral center. It will serve as the basis for moving the viewport around

  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)); // add half the player size to its position to get the center of the player.

  // updating the viewport is also another problem that I have been able to solve as well.
  // I have been able to solve quite a lot of problems.

  if (center.x < viewport.left + margin) {
    let offsetleft = viewport.left + margin - center.x; // getting the value we are offsetting to the left
    if (viewport.left - offsetleft < 0)
      viewport.left = 0; // if the left our coordinate minus the offset is less than zero, then it is no good moving the viewportport. just let it remain where it is... thinking all the time is not appropriate.
    else viewport.left -= offsetleft; // otherwise we are good to move it...
  } else if (center.x > viewport.left + viewport.width - margin) {
    let rightMargin = viewport.left + viewport.width - margin;
    let offsetRight = center.x - rightMargin;
    if (viewport.left + viewport.width + offsetRight > state.level.width)
      viewport.left = state.level.width - viewport.width; // clean and clear.
    else viewport.left += offsetRight;
    // it works... perfectly... makes sense...
  }
  // this checks for the top and bottom movement.
  if (center.y < viewport.top + margin) {
    let top = viewport.top + margin - center.y;
    if (viewport.top - top < 0) viewport.top = 0;
    else viewport.top -= top;
  } else if (center.y > viewport.top + viewport.height - margin) {
    let topMargin = viewport.top + viewport.height - margin;
    let offset = center.y - topMargin;
    if (viewport.top + viewport.height + offset > state.level.height)
      viewport.top = state.level.height - viewport.height;
    else viewport.top += offset;
  }
};
// this two are very important stuff
Display.prototype.clearDisplay = function (level, status) {
  if (status == "won") {
    this.cx.fillStyle = `rgb(64,191,255)`;
  } else if (status == "lost") {
    this.cx.fillStyle = `rgb(44,136,214)`;
  } else {
    this.cx.fillStyle = `rgb(52,166,251)`;
  }
  // just to display game rules
  // anything before we fill up the background????
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  if (level.id == 1 && this.viewport.left < 10) {
    this.cx.font = "28px Poppins";
    this.cx.fillStyle = "white";
    this.cx.fillText("Avoid red stuffs and collect all coins", 50, 400)
  }
};

let otherSprite = document.createElement("img");
otherSprite.src = "../img/sprites.png";

Display.prototype.drawBackground = function (level) {
  let { left, top, width, height } = this.viewport;
  let xStart = Math.floor(left); // left edge
  let xEnd = Math.ceil(left + width); // right edge
  let yStart = Math.floor(top); // top edge
  let yEnd = Math.ceil(top + height); // bottom edge... it works perfectly.... you don't even need to think to much about it...
  // normally we are drawing out the stuff in this level...
  // so no long thing...
  // we need images to get things done...
  // I understand this code like pami... you can't tell me anything now. I understand the code pa. 100%
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let tile = level.rows[y][x];
      if (tile == "empty") continue;

      // the reason why we subtract from left and top is because we need the posn of the wall or lava relative to the viewport(which moves around) and not the level(which is fixed)... makes sense?
      let scaleX = (x - left) * scale; // x > left always
      let scaleY = (y - top) * scale; // y > top always
      // the sprite we are copying from has wall at 0px, and lava at 20px... so that's why we use this scope... cool. lol
      let tileX = tile == "wall" ? 0 : scale;

      // so let's draw the tile
      this.cx.drawImage(
        otherSprite,
        tileX,
        0,
        scale,
        scale,
        scaleX,
        scaleY,
        scale,
        scale
      );
      // and that's it. it should work in this mannerism
    }
  }
};
// ============= yet to be understood fully =====================
// ============= function that controls player's movement========
function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

let playerSprites = document.createElement("img");
playerSprites.src = "../img/player.png";
const playerXOverlap = 4;

Display.prototype.drawPlayer = function (player, x, y, width, height) {
  width += playerXOverlap * 2; // let's just assume we understand it to some point...
  x -= playerXOverlap;

  if (player.speed.x != 0) {
    this.flipPlayer = player.speed.x < 0;
  }

  let tile = 8; // default tile is 8, the standing posture...
  if (player.speed.y != 0) {
    tile = 9; // if it has a vertical speed then tile is set to 9
  } else if (player.speed.x != 0) {
    tile = Math.floor(Date.now() / 60) % 8; // this line requires serious research
  }

  this.cx.save();
  if (this.flipPlayer) {
    flipHorizontally(this.cx, x + width / 2);
  }
  let tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    0,
    width,
    height,
    x,
    y,
    width,
    height
  );
  this.cx.restore();
  // just to draw one player, everything con hard like this.
  // oga oooo...
  // must it walk? honestly, must it?
};
// ==========================================================
Display.prototype.drawActors = function (actors) {
  for (let actor of actors) {
    let width = actor.size.x * scale;
    let height = actor.size.y * scale;
    let x = (actor.pos.x - this.viewport.left) * scale; // the x posn of actor relative to viewport, similar with scaleX and scaleY of the walls and lava
    let y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type == "player") {
      this.drawPlayer(actor, x, y, width, height);
    } else {
      let tileX = actor.type == "coin" ? scale * 2 : scale; // makes sense...
      // imagine drawing the actors is very simple... just get the height and width, pos.x and pos.y, then render accordingly. omase o
      this.cx.drawImage(
        otherSprite,
        tileX,
        0,
        width,
        height,
        x,
        y,
        width,
        height
      );
    }
  }
};

export { Display };
