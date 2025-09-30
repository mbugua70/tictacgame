import React from "react";



const GameBoard = ({ onSelectButton, board }) => {
  // const [gameBoard, setGameboard] = React.useState(initialGameBoard);

  // function handleGameBoard(rowIndex, playerIndex) {
  //   setGameboard((prevGameBoard) => {
  //     const updateGameBoard = [
  //       ...prevGameBoard.map((innerGames) => [...innerGames]),
  //     ];

  //     updateGameBoard[rowIndex][playerIndex] = activePlayer;
  //     return updateGameBoard;
  //   });
  //   onSelectButton();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playeIndex) => (
              <li key={playeIndex}>
                <button
                  onClick={() => onSelectButton(rowIndex, playeIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};

export default GameBoard;
