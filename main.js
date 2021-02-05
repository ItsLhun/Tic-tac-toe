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
    gameBoard.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    renderGame(gameBoard);
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

  function checkWin(){
    if (gameBoard.board[]){
      
    }
    
  }

  const Player = (sign) => {
    let playerSign = sign;
    let goesFirst;
    if (playerSign === "X") {
      goesFirst = true;
    } else {
      goesFirst = false;
    }
    const getGoesFirst = () => goesFirst;
    const getPlayerSign = () => playerSign;
    return { getPlayerSign, getGoesFirst };
  };

  //create Players

  let playerOne;
  let playerTwo;

  if (radioBtns[0]) {
    playerOne = Player("X");
    playerTwo = Player("O");
  } else {
    playerTwo = Player("X");
    playerOne = Player("O");
  }

  //query player 2 selection
  secondPlayerType.addEventListener("change", () => {
    playerTwo.type = secondPlayerType.value;
    resetGame();
  });

  renderGame(gameBoard);

  function startGame() {
    if (playerOne.getGoesFirst) {
      console.log("here");
      playerOneTitle.classList.add("active-player");
      playerTwoTitle.classList.remove("active-player");
    } else {
      playerOneTitle.classList.remove("active-player");
      playerTwoTitle.classList.add("active-player");
    }
  }
  console.log(playerOne.getGoesFirst());
  console.log(playerTwo.getGoesFirst());
})();
