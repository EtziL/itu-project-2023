/**
* Board component that render board
*
* Author: Kleveta Jaromír (xkleve00)
*/


import React from 'react';
import Square from './Square';
import { useState } from 'react';
import BoardModel from './BoardModel';

const GameBoard = ({ board, handleSquareClick, selectedPiece, currentPlayer }) => {
  const [availableMoves, setAvailableMoves] = useState([]);

  const calculateAvailableMoves = (row, col) => {
    const selected = board[row][col];

    if (selected && selected.color === currentPlayer) {
      const moves = BoardModel.calculateAvailableMoves(board, selected);
      setAvailableMoves(moves);
      //console.log("moves:"+moves)
    } else {
      setAvailableMoves([]);
    }
  };

  const renderSquare = (piece, rowIndex, colIndex) => {
    const isSelected = selectedPiece && selectedPiece.row === rowIndex && selectedPiece.col === colIndex;
    const isAvailableMove = availableMoves.some(move => move.row === rowIndex && move.col === colIndex);

    return (
      <Square
        key={`${rowIndex}-${colIndex}`}
        piece={piece}
        onClick={() => {
          handleSquareClick(rowIndex, colIndex);
          calculateAvailableMoves(rowIndex, colIndex);
        }}
        rowIndex={rowIndex}
        colIndex={colIndex}
        isSelected={isSelected}
        isAvailableMove={isAvailableMove}
      />
    );
  };

  return (
    <div className=' border-[20px] border-[#7a5b2d]'>
      <div className="board border-[5px] border-[#B7925C]">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((piece, colIndex) => (
              renderSquare(piece, rowIndex, colIndex)
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
