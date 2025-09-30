import React from "react";

const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = React.useState(name);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditing = () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleSubmit = (e) => {
    setPlayerName(e.target.value);
  };

  let btnCaption = <button onClick={handleEditing}>edit</button>;

  if (isEditing) {
    btnCaption = <button onClick={handleEditing}>save</button>;
  }
  return (
    <>
      <li className={isActive ? "active" : undefined}>
        <span className="player">
          {isEditing ? (
            <input type="text" value={playerName} onChange={handleSubmit} />
          ) : (
            <span className="player-name">{playerName}</span>
          )}
          <span className="player-symbol">{symbol}</span>
        </span>
      </li>
      {/* {btnCaption} */}
    </>
  );
};

export default Player;
