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
  let activePlayer;

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
  let gameStarted = false;
  function resetGame() {
    checkWin.win = false;
    gameStarted = false;
    console.log("game reset!");
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];

    if (radioBtns[0].checked) {
      playerOne = Player("X");
      playerTwo = Player("O");
    } else {
      playerTwo = Player("X");
      playerOne = Player("O");
    }

    playerOneTitle.classList.remove("active-player");
    playerTwoTitle.classList.remove("active-player");
    renderGame(gameBoard);
    startGame();
  }

  function swapPlayer() {
    if (gameStarted === false) {
      if (playerOne.getPlayerSign() === "X") {
        activePlayer = playerOne;
        console.log("active player = one");
        playerOneTitle.classList.add("active-player");
        playerTwoTitle.classList.remove("active-player");
        gameStarted = true;
      } else {
        activePlayer = playerTwo;
        console.log("active player = two");

        playerOneTitle.classList.remove("active-player");
        playerTwoTitle.classList.add("active-player");
        gameStarted = true;
      }
    } else {
      if (activePlayer === playerOne) {
        activePlayer = playerTwo;
        playerOneTitle.classList.remove("active-player");
        playerTwoTitle.classList.add("active-player");
      } else if (activePlayer === playerTwo) {
        activePlayer = playerOne;
        playerOneTitle.classList.add("active-player");
        playerTwoTitle.classList.remove("active-player");
      }
    }
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

  const checkWin = () => {
    console.log("checking win");
    const allEqual = (array) => {
      return array.every((val) => {
        if (val === "X" || val === "O") {
          return val === array[0];
        }
      });
    };
    let win = false;
    let winningSymbol;
    if (
      allEqual(gameBoard.board[0]) ||
      allEqual(gameBoard.board[1]) ||
      allEqual(gameBoard.board[2])
    ) {
      win = true;
    }
    if (gameBoard.board[1][1] === "X" || gameBoard.board[1][1] === "O") {
      if (
        gameBoard.board[0][0] === gameBoard.board[1][1] &&
        gameBoard.board[1][1] === gameBoard.board[2][2]
      ) {
        winningSymbol = gameBoard.board[1][1];
        win = true;
      }
      if (
        gameBoard.board[0][2] === gameBoard.board[1][1] &&
        gameBoard.board[1][1] === gameBoard.board[2][0]
      ) {
        winningSymbol = gameBoard.board[1][1];
        win = true;
      }
    }
    for (let i = 0; i < 3; i++) {
      col = 0;
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[j][i] === "X") {
          col += 1;
        } else if (gameBoard.board[j][i] === "O") {
          col -= 1;
        }
      }
      if (col === 3 || col === -3) {
        win = true;
      } else {
        col = 0;
      }
    }
    if (win === true) {
      alert("victory! " + winningSymbol);
    }
    return { win };
  };

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
    gameBoard.boardArray.forEach((item) => {
      item.addEventListener("click", () => {
        let searchX = item.id.charAt(1);
        let searchY = item.id.charAt(2);
        //swapPlayer();
        if (gameBoard.board[searchX][searchY] === "") {
          gameBoard.board[searchX][searchY] = activePlayer.getPlayerSign();
          // gameBoard.board[searchX][searchY] = "X";
          console.log(activePlayer.getPlayerSign());
        }
        renderGame(gameBoard);
        checkWin();
        swapPlayer();
      });
    });
  }
  console.log(playerOne);
  console.log(playerTwo);
})();
