const View = require("./ttt-view")// require appropriate file
const Game = require("./game")// require appropriate file

$( () => {
  g = new Game();
  v = new View(g, $(".ttt"));
  // $found = $("h1").text("We found it.")
  // $(".ttt").ready();
  // v.setupBoard($(".ttt"))
  // Your code here
});
