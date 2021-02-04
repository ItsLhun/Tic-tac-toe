(function game() {
  const gameBoard = (() => {
    let board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    const boardArray = document.querySelectorAll(".square");

    return { board, boardArray };
  })();

  // add Event listener
  gameBoard.boardArray.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(item);
      let searchX = item.id.charAt(1);
      let searchY = item.id.charAt(2);
      console.log(gameBoard.board[searchX][searchY]);
      if (!gameBoard.board[searchX][searchY]) {
        gameBoard.board[searchX][searchY] = "O";
      }
      renderGame(gameBoard);
    });
  });

  // DOM query
  const playerOneSymbol = document.querySelector("#symbol-P1");
  const playerTwoSymbol = document.querySelector("#symbol-P2");
  if (playerOneSymbol.nodeValue === "X") {
    playerTwoSymbol.textContent = "O";
  } else {
    playerTwoSymbol.textContent = "X";
  }

  function renderGame(gameBoard) {
    counter = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameBoard.boardArray[counter].firstChild.textContent =
          gameBoard.board[i][j];
        counter++;
      }
    }
  }

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

  renderGame(gameBoard);
})();
