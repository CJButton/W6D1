/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1)
	const HanoiView = __webpack_require__(2)

	// console.log("js sucks you guys");
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  const v = new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, $hanoigame) {
	    this.game = game;
	    this.element = $hanoigame
	    this.setupTowers();
	    this.clickTower();
	    this.render();
	    this.startPos = null;
	    this.endPos = null;
	  }

	    setupTowers() {
	      // let $towers;
	      for (let i = 0; i < 3; i++) {
	        let $towers = $('<ul>');
	        console.log($towers);
	        for (let j = 0; j < 4; j++) {
	          if (i === 0) {
	            if (j === 0) {
	                $towers.append($('<li>', {"class":'firstDisc', pos: [0]}))
	            } else if (j === 1) {
	                $towers.append($('<li>', {"class":'secondDisc', pos: [1]}))
	            } else if (j === 2) {
	              $towers.append($('<li>', {"class":'thirdDisc', pos: [2]}));
	            } else {
	              $towers.append($('<li>'));
	            }
	          } else {
	            $towers.append($('<li>').attr("pos", [j]));
	          }
	        }
	        this.element.append($towers.attr("tower", i));
	      }
	      // console.log(this.element);
	    }

	    render() {
	      let board = this.game.board
	      let $tower = $('ul')
	      for (let i = 0; i < board.length; i++) {
	        for (let j = 0; j < board[i].length; j++) {
	          if (board[i][j] === 1){
	            $tower[i].find(j).toggleClass('firstDisc')
	          }
	        }
	      }
	    }

	    clickTower() {
	      this.element.on('click', 'ul', (e) => {
	        let $ring = $(e.currentTarget)
	        if (this.startPos === null) {
	          this.startPos = $ring.attr("tower")
	          console.log($ring.attr("tower"));
	          console.log(this.startPos);
	        } else if (this.endPos === null) {
	          console.log($ring.attr("tower"));
	          console.log(this);
	          this.endPos = $ring.attr("tower")
	          console.log(this.endPos);


	            if (this.game.isValidMove(this.startPos, this.endPos) === true) {
	              this.game.move(this.startPos, this.endPos)
	              this.render()
	            } else {
	              alert("Invalid Move")
	            }
	            this.startPos = null
	            this.endPos = null

	        }
	      })
	    }
	}

	module.exports = HanoiView;


/***/ }
/******/ ]);