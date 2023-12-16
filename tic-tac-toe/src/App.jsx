import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function checkWinner(gameBoard) {
  for (let i = 0; i < 3; i++) {
    if (
      gameBoard[i][0] &&
      gameBoard[i][0] === gameBoard[i][1] &&
      gameBoard[i][0] === gameBoard[i][2]
    )
      return gameBoard[i][0];
    if (
      gameBoard[0][i] &&
      gameBoard[0][i] === gameBoard[1][i] &&
      gameBoard[0][i] === gameBoard[2][i]
    )
      return gameBoard[0][i];
  }

  if (
    gameBoard[0][0] &&
    gameBoard[0][0] === gameBoard[1][1] &&
    gameBoard[0][0] === gameBoard[2][2]
  )
    return gameBoard[0][0];

  if (
    gameBoard[0][2] &&
    gameBoard[0][2] === gameBoard[1][1] &&
    gameBoard[0][2] === gameBoard[2][0]
  )
    return gameBoard[0][2];

  return null;
}

export default function App() {
  const [gameStatus, setGameStatus] = useState([]);

  let currentPlayer = "X";

  if (gameStatus.length > 0 && gameStatus[0].player === "X") {
    currentPlayer = "O";
  }

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameStatus) {
    const { coord, player } = turn;
    const { row, column } = coord;

    gameBoard[row][column] = player;
  }

  const winner = checkWinner(gameBoard);

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameStatus((previousGameStatus) => {
      const updatedGameStatus = [
        {
          coord: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...previousGameStatus,
      ];

      return updatedGameStatus;
    });
  }

  return (
    <div>
      <ol>
        <Player initialName={"Player 1"} symbol={"X"} />
        <Player initialName={"Player 2"} symbol={"O"} />
      </ol>
      {winner && <p>{winner} wins </p>}
      <GameBoard gameBoard={gameBoard} onSelect={handleSelectSquare} />
    </div>
  );
}
