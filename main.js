(function game() {
  const GameBoard = () => {
    let board = [
      ["", "O", "O"],
      ["O", "O", "X"],
      ["O", "O", "X"],
    ];
    const boardArray = document.querySelectorAll(".square");
    boardArray.forEach((item) => {
      item.addEventListener("click", () => {
        console.log(item);
        board[0][0] = "X";
      });
    });
    return { board, boardArray };
  };

  (function renderGame(gameBoard) {
    console.log(gameBoard);
    counter = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard.boardArray[counter].firstChild.textContent =
          gameBoard.board[i][j];
        counter++;
      }
    }
  })(GameBoard());
  const Player = (sign) => {
    if (sign == "X" || sign == "O") {
      const playerSign = sign;
    } else {
      return console.error("Invalid player sign");
    }
    let score = 0;
    const increaseScore = () => {
      score++;
    };
    return { playerSign, increaseScore };
  };
})();
