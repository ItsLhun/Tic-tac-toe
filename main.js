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
  let tieCounter = 0;
  let win;
  let winningSymbol;

  let gameStarted = false;

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

  //query player 2 selection

  secondPlayerType.addEventListener("change", () => {
    playerTwo.type = secondPlayerType.value;
    secondPlayerType.classList.remove("selector");
    resetGame();
  });

  function resetGame() {
    win = false;
    gameStarted = false;
    tieCounter = 0;
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
    playerOne.type = "human";
    playerTwo.type = secondPlayerType.value;
    console.log(playerTwo.type);
    if (secondPlayerType.value !== "selector") {
      secondPlayerType.classList.remove("selector");
    }

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
    } else if (win !== true) {
      if (activePlayer === playerOne) {
        activePlayer = playerTwo;

        playerOneTitle.classList.remove("active-player");
        playerTwoTitle.classList.add("active-player");
      } else if (activePlayer === playerTwo) {
        activePlayer = playerOne;
        playerOneTitle.classList.add("active-player");
        playerTwoTitle.classList.remove("active-player");
      }
    } else {
      return;
    }
    console.log("Active player is: " + activePlayer + activePlayer.type);
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

    for (let i = 0; i < 3; i++) {
      let row = 0;
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i][j] === "X") {
          row += 1;
        } else if (gameBoard.board[i][j] === "O") {
          row -= 1;
        }
      }
      if (row === 3 || row === -3) {
        if (row === 3) {
          winningSymbol = "X";
        } else {
          winningSymbol = "O";
        }
        win = true;
      } else {
        row = 0;
      }
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
      let col = 0;
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[j][i] === "X") {
          col += 1;
        } else if (gameBoard.board[j][i] === "O") {
          col -= 1;
        }
      }
      if (col === 3 || col === -3) {
        if (col === 3) {
          winningSymbol = "X";
        } else {
          winningSymbol = "O";
        }
        win = true;
      } else {
        col = 0;
      }
    }
    return;
  };

  function alertWin() {
    if (win === true) {
      if (playerOne.getPlayerSign() === winningSymbol) {
        alert("Player One wins!");
      } else if (playerTwo.getPlayerSign() === winningSymbol) {
        alert("Player Two wins!");
      }
    }
    tieCounter++;
    if (tieCounter === 9 && win === false) {
      alert("It's a tie!");
    }
  }

  const Player = (sign) => {
    let playerSign = sign;
    let nextTurn = false;
    const getPlayerSign = () => playerSign;
    return { getPlayerSign, nextTurn };
  };

  function startGame() {
    swapPlayer();
    console.log(activePlayer + "on Start");
    if (activePlayer.type !== "human" && win !== true && tieCounter < 9) {
      console.log("should only execute once");
      aiPlay();
    }
    gameBoard.boardArray.forEach((item) => {
      item.addEventListener("click", () => {
        console.log(activePlayer.type + "human???");
        if (activePlayer.type === "human") {
          console.log("HERE");
          let searchX = item.id.charAt(1);
          let searchY = item.id.charAt(2);
          if (gameBoard.board[searchX][searchY] === "") {
            gameBoard.board[searchX][searchY] = activePlayer.getPlayerSign();
            renderGame(gameBoard);
            checkWin();
            alertWin();
            if (win !== true && tieCounter < 9) {
              console.log(win + " " + tieCounter);
              console.log("this is inside playeroneplay");
              swapPlayer();
              if (activePlayer.type !== "human") {
                aiPlay();
              }
            }
          }
        }
      });
    });
  }

  function playerPlay() {}

  function aiPlay() {
    let chance;
    switch (activePlayer.type) {
      case "easyAI":
        randomAIPlay();
        break;
      case "medAI":
        chance = randomIntFromInterval(0, 10);
        if (chance <= 2) {
          minMaxAI();
        } else {
          randomAIPlay();
        }
        break;
      case "hardAI":
        chance = randomIntFromInterval(0, 10);
        if (chance <= 5) {
          minMaxAI();
        } else {
          randomAIPlay();
        }
        break;
      case "impAI":
        minMaxAI();
        break;
    }
    renderGame(gameBoard);
    checkWin();
    alertWin();
    swapPlayer();
  }

  function randomAIPlay() {
    let randX = randomIntFromInterval(0, 2);
    let randY = randomIntFromInterval(0, 2);
    if (
      gameBoard.board[randX][randY] === "" &&
      win !== true &&
      tieCounter < 9
    ) {
      gameBoard.board[randX][randY] = activePlayer.getPlayerSign();
    } else if (win !== true && tieCounter < 9) {
      randomAIPlay();
    }
  }

  function minMaxAI() {
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i][j] === "") {
          gameBoard.board[i][j] = activePlayer.getPlayerSign();
          let score = minimax(gameBoard.board, 0, true);
          gameBoard.board[i][j] = "";
          if (score > bestScore) {
            bestScore = score;
            bestMove = { i, j };
            gameBoard.board[i][j] = activePlayer.getPlayerSign();
          }
        }
      }
    }
  }
  function minimax(gameboard, depth, isMaximizing) {
    checkWin();
    return 1;
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
})();
