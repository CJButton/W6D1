const HanoiGame = require("./game")
const HanoiView = require("./hanoi-view")

// console.log("js sucks you guys");
$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  const v = new HanoiView(game, rootEl);
});
