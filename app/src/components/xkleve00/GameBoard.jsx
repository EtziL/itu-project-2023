// GameBoard.jsx
import React from 'react';
import Square from './Square';

const GameBoard = ({ board, handleSquareClick}) => {

  // Render the game board based on the board state
  return (
    <div className="board border-[20px] border-[#AD874F]">
      {/* Map through the board and render squares */}
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((piece, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
              rowIndex={rowIndex}
              colIndex={colIndex}
              isSelected={piece && piece === board[rowIndex][colIndex]}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
