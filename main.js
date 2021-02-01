(function game() {
  const GameBoard = () => {
    const boardArray = document.querySelectorAll(".square");
    return { boardArray };
  };
  (function renderGame(board) {
    console.log(board);
    for (let i = 0; i < board.boardArray.length; i++) {
      board.boardArray[i].textContent = "X";
    }
  })(GameBoard());
  const Player = (sign) => {};
})();
