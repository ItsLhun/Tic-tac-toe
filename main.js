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

  //create Players
  let playerOne;
  let playerTwo;

  // DOM query
  const radioBtns = document.querySelectorAll(".radio-select");
  const resetBtn = document.querySelector("#gameReset");
  const playerOneTitle = document.querySelector("#playerTag-one");
  const playerTwoTitle = document.querySelector("#playerTag-two");
  const secondPlayerType = document.querySelector("#secondPlayer");

  // radio buttons exclude each otther
  const checkButtons = () => {
    switch (true) {
      case radioBtns[0].checked:
        radioBtns[2].checked = false;
        radioBtns[3].checked = true;
        break;
      case radioBtns[1].checked:
        radioBtns[3].checked = false;
        radioBtns[2].checked = true;
        break;
      case radioBtns[2].checked:
        radioBtns[0].checked = false;
        radioBtns[1].checked = true;
        break;
      case radioBtns[3].checked:
        radioBtns[1].checked = false;
        radioBtns[0].checked = true;
        break;
    }
    resetGame();
  };
  radioBtns.forEach((element) => {
    element.addEventListener("click", checkButtons);
  });

  //reset game
  resetBtn.addEventListener("click", resetGame);

  function resetGame() {
    checkWin.win = false;
    console.log("game reset!");
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    renderGame(gameBoard);

    if (radioBtns[0].checked) {
      playerOne = Player("X");
      playerTwo = Player("O");
    } else {
      playerTwo = Player("X");
      playerOne = Player("O");
    }

    playerOneTitle.classList.remove("active-player");
    playerTwoTitle.classList.remove("active-player");
    console.log(playerOne.getPlayerSign());
    startGame();
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

  const allEqual = (array) => array.every((val) => val === array[0]);

  // TO-DO fix win when every on the row is empty.
  function checkWin() {
    let win;
    console.log(allEqual(gameBoard.board[0]));
    if (
      allEqual(gameBoard.board[0]) ||
      allEqual(gameBoard.board[1]) ||
      allEqual(gameBoard.board[2])
    ) {
      console.log("victory");
      win = true;
    }
    console.log("got here");
    return { win };
  }

  const Player = (sign) => {
    let playerSign = sign;
    let nextTurn = false;
    const getPlayerSign = () => playerSign;
    return { getPlayerSign, nextTurn };
  };

  //query player 2 selection
  secondPlayerType.addEventListener("change", () => {
    playerTwo.type = secondPlayerType.value;
    resetGame();
  });

  renderGame(gameBoard);

  function startGame() {
    let gameStarted = false;
    if (playerOne.getPlayerSign() === "X" && gameStarted === false) {
      playerOne.nextTurn = true;
      playerTwo.nextTurn = false;
      console.log("onStartGame");
      playerOneTitle.classList.add("active-player");
      playerTwoTitle.classList.remove("active-player");
      gameStarted = true;
    } else if (playerTwo.getPlayerSign() === "X" && gameStarted === false) {
      playerOne.nextTurn = false;
      playerTwo.nextTurn = true;
      playerOneTitle.classList.remove("active-player");
      playerTwoTitle.classList.add("active-player");
      gameStarted = true;
    }
    // add Event listener
    gameBoard.boardArray.forEach((item) => {
      item.addEventListener("click", () => {
        let searchX = item.id.charAt(1);
        let searchY = item.id.charAt(2);
        if (gameBoard.board[searchX][searchY] === "") {
          gameBoard.board[searchX][searchY] = "O";
        }
        renderGame(gameBoard);
        checkWin();
      });
    });
  }
  console.log(playerOne);
  console.log(playerTwo);
})();
