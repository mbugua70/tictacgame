const GameOver = ({ winner, onRestart, onNewGame }) => {
  return (
    <>
      <div id="game-over">
        <h2>Game Over!</h2>
        {winner && <p>{winner} won</p>}
        {!winner && <p>It's a draw</p>}

        <p>
          <button onClick={onRestart}>REMATCH</button>
          <button onClick={onNewGame} className="new-game-btn">NEW GAME</button>
        </p>
      </div>
    </>
  );
};

export default GameOver;
