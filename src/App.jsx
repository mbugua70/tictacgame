import React from "react";
import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";
import GameOver from "./component/GameOver";
import PlayerForm from "./component/PlayerForm";
import { WINNING_COMBINATIONS } from "./component/winning_combinatioins";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// winning possibilities combinations

// declarative states

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  // Game state management
  const [gameStarted, setGameStarted] = React.useState(false);
  const [player, setPlayers] = React.useState({
    X: "Player 1",
    O: "Player 2",
  });
  const [gameTurn, setGameTurn] = React.useState([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  // Load player names from localStorage on component mount
  React.useEffect(() => {
    const savedPlayer1 = localStorage.getItem("player1Name");
    const savedPlayer2 = localStorage.getItem("player2Name");

    if (savedPlayer1 && savedPlayer2) {
      setPlayers({
        X: savedPlayer1,
        O: savedPlayer2,
      });
      setGameStarted(true);
    }
  }, []);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for (const turns of gameTurn) {
    const { square, player } = turns;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  // the code for combinations winnings

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = player[firstSquareSymbol];
    }
  }

  let hasDraw = gameTurn.length === 9 && !winner;

  function handleActivePlayer(rowIndex, colIndex) {
    // setactivePlayer((prevActivePlayer) =>
    //   prevActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurn((prevTurn) => {
      // let currentPlayer = "X";
      // if (prevTurn.length > 0 && prevTurn[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = deriveActivePlayer(prevTurn);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurns;
    });
  }

  // Game control functions
  function handleStartGame(playerNames) {
    setPlayers(playerNames);
    setGameStarted(true);
    setGameTurn([]);
  }

  function handleRematch() {
    setGameTurn([]);
  }

  function handleNewGame() {
    // Clear localStorage and reset to initial state
    localStorage.removeItem("player1Name");
    localStorage.removeItem("player2Name");
    setGameStarted(false);
    setGameTurn([]);
    setPlayers({
      X: "Player 1",
      O: "Player 2",
    });
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  // Show player form if game hasn't started
  if (!gameStarted) {
    return (
      <>
        <main>
          <div id="game-container">
            <PlayerForm onStartGame={handleStartGame} />
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              name={player.X}
              symbol="X"
              isActive={activePlayer === "X"}
              onChangeName={handlePlayerName}
            />
            <Player
              name={player.O}
              symbol="O"
              isActive={activePlayer === "O"}
              onChangeName={handlePlayerName}
            />
          </ol>
          {(winner || hasDraw) && (
            <GameOver
              winner={winner}
              onRestart={handleRematch}
              onNewGame={handleNewGame}
            />
          )}
          <GameBoard onSelectButton={handleActivePlayer} board={gameBoard} />
        </div>
        {/* <Log turns={gameTurn} /> */}
      </main>
    </>
  );
}

export default App;
