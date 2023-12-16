export default function GameBoard({ gameBoard, onSelect }) {
  return (
    <ol id="gameboard">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol className="gameboard-row">
            {row.map((column, columnIndex) => (
              <li key={columnIndex}>
                <button onClick={() => onSelect(rowIndex, columnIndex)} disabled={column}>
                  {column}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
