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
