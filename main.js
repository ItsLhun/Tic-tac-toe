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
    gameStarted = false;
    tieCounter = 0;
    checkWin.winningSymbol = null;
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
        playerOneTitle.classList.add("active-player");
        playerTwoTitle.classList.remove("active-player");
        gameStarted = true;
      } else {
        activePlayer = playerTwo;
        playerOneTitle.classList.remove("active-player");
        playerTwoTitle.classList.add("active-player");
        gameStarted = true;
      }
    } else if (checkWin.winningSymbol === null) {
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
    let winningSymbol = null;
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
          return { winningSymbol };
        } else {
          winningSymbol = "O";
          return { winningSymbol };
        }
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
      }
      if (
        gameBoard.board[0][2] === gameBoard.board[1][1] &&
        gameBoard.board[1][1] === gameBoard.board[2][0]
      ) {
        winningSymbol = gameBoard.board[1][1];
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
      } else {
        col = 0;
      }
    }
    if (tieCounter === 9 && winningSymbol === null) {
      winningSymbol = "Tie";
    }
    return { winningSymbol };
  };

  function alertWin() {
    let result = checkWin();
    if (result.winningSymbol !== null) {
      if (playerOne.getPlayerSign() === result.winningSymbol) {
        alert("Player One wins!");
        return true;
      } else if (playerTwo.getPlayerSign() === result.winningSymbol) {
        alert("Player Two wins!");
        return true;
      }
    }
    tieCounter++;
    if (tieCounter === 9 && result.winningSymbol === null) {
      alert("It's a tie!");
      return true;
    }
    return false;
  }

  const Player = (sign) => {
    let playerSign = sign;
    let nextTurn = false;
    const getPlayerSign = () => playerSign;
    return { getPlayerSign, nextTurn };
  };

  function startGame() {
    swapPlayer();
    if (
      activePlayer.type !== "human" &&
      checkWin.winningSymbol === null &&
      tieCounter < 9
    ) {
      aiPlay();
    }
    gameBoard.boardArray.forEach((item) => {
      item.addEventListener("click", () => {
        if (activePlayer.type === "human") {
          playerPlay(item);
        }
      });
    });
  }

  function playerPlay(item) {
    let searchX = item.id.charAt(1);
    let searchY = item.id.charAt(2);
    if (gameBoard.board[searchX][searchY] === "") {
      gameBoard.board[searchX][searchY] = activePlayer.getPlayerSign();
      renderGame(gameBoard);
      if (!alertWin()){
        swapPlayer();
        aiPlay();
      }

      //if (checkWin.winningSymbol === null && tieCounter < 9) {
        
     // }
    }
  }

  function aiPlay() {
    //debugger;
    //let chance;
    switch (activePlayer.type) {
    case "normalAI":
        randomAIPlay();
        break;
      /*case "hardAI":
        chance = randomIntFromInterval(0, 10);
        if (chance <= 5) {
          minMaxAI();
        } else {
          ///randomAIPlay(); 
        }
        break;*/
      case "impAI":
    let bestPlay = minMaxAI();
    gameBoard.board[bestPlay.i][bestPlay.j] = playerTwo.getPlayerSign();
    //minMaxAI();
      break;
     }
    renderGame(gameBoard);
    alertWin();
    swapPlayer();
  }

  function randomAIPlay() {
    let randX = randomIntFromInterval(0, 2);
    let randY = randomIntFromInterval(0, 2);
    if (
      gameBoard.board[randX][randY] === "" &&
      checkWin.winningSymbol === null &&
      tieCounter < 9
    ) {
      gameBoard.board[randX][randY] = activePlayer.getPlayerSign();
    } else if (checkWin.winningSymbol === null && tieCounter < 9) {
      randomAIPlay();
    }
  }

  function minMaxAI() {
    let tieTemp = tieCounter;
    let bestScore = -Infinity;
    let moveSet;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard.board[i][j] === "") {
          gameBoard.board[i][j] = "X"; //playerTwo.getPlayerSign();
          let score = minimax(gameBoard.board, 0, false);
          gameBoard.board[i][j] = "";
          if (score > bestScore) {
            console.log("new best score is " + score);
            bestScore = score;
            moveSet = { i, j };
          }
        }
      }
    }
    tieCounter = tieTemp;
    checkWin.winningSymbol = null;
    return moveSet;
  }

  function minimax(board, depth, maximizes) {
    if (checkWin.winningSymbol !== null || tieCounter == 9) {
      console.log(checkWin.winningSymbol);
      console.log(board);
      console.log(gameBoard.board);
      if (checkWin.winningSymbol == "X") {
        return 10;
      } else if (checkWin.winningSymbol == "O") {
        return -10;
      } else {
        return 0;
      }
    }

    if (maximizes) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = "X"; //playerTwo.getPlayerSign();
            let score = minimax(board, depth + 1, false);
            board[i][j] = "";
            console.log("inside maximizes");
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let minScore = +Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = "O"; //playerOne.getPlayerSign();
            let scoreTwo = minimax(board, depth + 1, true);
            board[i][j] = "";
            console.log("inside minimize");
            minScore = Math.min(scoreTwo, minScore);
          }
        }
      }
      return minScore;
    }
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
})();
