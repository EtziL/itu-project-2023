import React, { useState } from 'react';
import GameBoard from './GameBoard';
import BoardModel from './BoardModel';

const GameController = () => {
  const initialBoard = BoardModel.initializeBoard();
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('black'); // Starting player
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (row, col) => {
    if(winner){
      return;
    }
    if (selectedPiece) {
      const { piece, row: selectedRow, col: selectedCol } = selectedPiece;
      if(selectedPiece.color === currentPlayer)
      {
        setSelectedPiece({ piece: clickedPiece, row, col });
        
        return;
      }
      const isValidMove = BoardModel.isValidMove(board, selectedRow, selectedCol, row, col);

      if (isValidMove) {
        const updatedBoard = BoardModel.movePiece(board, selectedRow, selectedCol, row, col);
        setBoard(updatedBoard);
        const nextPlayer = currentPlayer === 'black' ? 'white' : 'black';
        setCurrentPlayer(nextPlayer);
      }

      setSelectedPiece(null);
    } 
    else {
      const clickedPiece = board[row][col];
      if (clickedPiece && clickedPiece.color === currentPlayer) {
        setSelectedPiece({ piece: clickedPiece, row, col });
      }
    }

    if (BoardModel.isWinConditionMet(board, currentPlayer)) {
      setWinner(currentPlayer);
    }
  };

  const handleReset = () => {
    setBoard(BoardModel.initializeBoard());
    setWinner(null);
    setCurrentPlayer('black'); // Reset to starting player
  };

  return (
    <div className="game-container">
      <h1>Checkers Game</h1>
      {winner && <div>Winner: {winner}</div>}
      {!winner && <div>Current Player: {currentPlayer}</div>}
      <GameBoard board={board} handleSquareClick={handleSquareClick} selectedPiece={selectedPiece}/>
      {/* Other components like status display, reset button, etc. */}
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
};

export default GameController;