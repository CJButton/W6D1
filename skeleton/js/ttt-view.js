class View {
  constructor(game, $el) {
    this.game = game;
    this.element = $el;
    this.setupBoard(this.element);
    console.log(this.element);
    this.bindEvents();
  }

  bindEvents() {
    $('.square').on("click", e => {
      const $sq = $(e.currentTarget);
      const pos = $sq.attr('pos')
      let x = pos.slice(0, 1);
      let y = pos.slice(2, 3);
      console.log(this.game);
      console.log(this.game.currentPlayer);
      if (this.game.board.isEmptyPos([x, y]) === true) {
        if (this.game.currentPlayer === 'x') {
          $sq.css('color', 'pink');
        } else {
          $sq.css('color', 'slategray');
        };
        $sq.text(`${this.game.currentPlayer}`);
        $sq.css('font-size', '150px');
        $sq.css('text-align', 'center');
        this.game.playMove([x,y]);
        $sq.css('background', 'white');

      } else {
        alert("Invalid Move")
      }

      if (this.game.board.winner() !== null) {
        let $message = $('<h2>').text(`You win, ${this.game.board.winner()}!`)
        this.element.append($message);
        console.log(this.game.board.winner.posSeq);
        $('.square').off()
      }
    });
  }

  makeMove($square) {}

  setupBoard(el) {
    let $grid = $('<ul>')
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        $grid.append($('<li>',{'class': 'square'}).attr('pos', [[i,j]]));
      }
    }
    $(el).append($grid);
    }
}

module.exports = View;
