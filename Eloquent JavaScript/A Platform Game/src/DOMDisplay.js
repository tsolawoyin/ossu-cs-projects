// all the code that helps with display goes here
let scale = 20;

class DOMDisplay {
  constructor(parent, level) {
    this.dom = elt("div", { class: "game" }, drawGrid(level));
    this.actorLayer = null;
    parent.appendChild(this.dom);
  }

  clear() {
    this.dom.remove();
  }
}
// syncState means synchronize state.
DOMDisplay.prototype.syncState = function (state) {
  if (this.actorLayer) this.actorLayer.remove();
  this.actorLayer = drawActors(state.actors);
  this.dom.className = `game ${state.status}`; // paid attention to this hack like that...
  this.dom.appendChild(this.actorLayer);
  this.scrollPlayerIntoView(state);
};

function elt(name, attrs, ...children) {
  let dom = document.createElement(name);
  // setting attributes
  for (let attr of Object.keys(attrs)) {
    dom.setAttribute(attr, attrs[attr]);
  }
  // appending child
  for (let child of children) {
    dom.appendChild(child);
  }

  return dom;
}

DOMDisplay.prototype.scrollPlayerIntoView = function (state) {
  // this game will load normally but we will be the scrolling it in and out
  let width = this.dom.clientWidth;
  let height = this.dom.clientHeight;
  let margin = width / 3;
  // The viewport
  let left = this.dom.scrollLeft, // scrollLeft is zero according to this
    right = left + width;
  let top = this.dom.scrollTop,
    bottom = top + height;

  // console.log(this.dom.scrollTop, this.dom.scrollLeft)
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5)).times(scale);

  if (center.x < left + margin) {
    // center.x < left + margin
    this.dom.scrollLeft = center.x - margin;
    // taking a negative value won't make it bulge
  } else if (center.x > right - margin) {
    this.dom.scrollLeft = center.x + margin - width;
    //
  }
  if (center.y < top + margin) {
    this.dom.scrollTop = center.y - margin;
  } else if (center.y > bottom - margin) {
    this.dom.scrollTop = center.y + margin - height;
  }
};
// now these functions have become unreasonably simple
// wahala wa o
// all these canvas thing is too complicated in my opinion
// kilode.
function drawGrid(level) {
  return elt(
    "table",
    {
      class: "background",
      style: `width: ${level.width * scale}px`,
    },
    ...level.rows.map((row) => {
      return elt(
        "tr",
        {
          style: `height: ${scale}px`,
        },
        ...row.map((type) => elt("td", { class: type }))
      );
    })
  );
}

function drawActors(actors) {
  return elt(
    "div",
    {},
    ...actors.map((actor) => {
      let rect = elt("div", { class: `actor ${actor.type}` });
      rect.style.width = `${actor.size.x * scale}px`;
      rect.style.height = `${actor.size.y * scale}px`;
      rect.style.left = `${actor.pos.x * scale}px`;
      rect.style.top = `${actor.pos.y * scale}px`;
      return rect;
    })
  );
}

function trackKeys(keys) {
  let down = Object.create(null);

  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == "keydown";
      event.preventDefault();
    }
  }

  window.addEventListener("keydown", track);
  window.addEventListener("keyup", track);
  return down;
}

let arrowKeys = trackKeys(["ArrowUp", "ArrowLeft", "ArrowRight"]);

export { DOMDisplay, arrowKeys };
