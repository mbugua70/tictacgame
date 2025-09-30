import React from "react";

const PlayerForm = ({ onStartGame }) => {
  const [player1Name, setPlayer1Name] = React.useState("");
  const [player2Name, setPlayer2Name] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (player1Name.trim() && player2Name.trim()) {
      // Save to localStorage
      localStorage.setItem("player1Name", player1Name.trim());
      localStorage.setItem("player2Name", player2Name.trim());

      // Start the game
      onStartGame({
        X: player1Name.trim(),
        O: player2Name.trim()
      });
    } else {
      alert("Please enter names for both players!");
    }
  };

  return (
    <div id="player-form">
      <h2>Enter Player Names</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="player1">Player 1 (X):</label>
          <input
            type="text"
            id="player1"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="player2">Player 2 (O):</label>
          <input
            type="text"
            id="player2"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 name"
            required
          />
        </div>

        <button type="submit" className="start-game-btn">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default PlayerForm;
