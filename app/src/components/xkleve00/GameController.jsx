import React, { useState } from 'react';
import GameBoard from './GameBoard';
import BoardModel from './BoardModel';
import { Link } from 'react-router-dom';
import Confetti from '../xetzle00/Confetti';


const GameController = () => {
  const initialBoard = BoardModel.initializeBoard();
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('black'); // Starting player
  const [winner, setWinner] = useState(null);

  const handleSquareClick = (row, col) => {
    if (winner) {
      return;
    }
    if (selectedPiece) {
      const { piece, row: selectedRow, col: selectedCol } = selectedPiece;
      if (selectedPiece.color === currentPlayer) {
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

  const circleStyle = {

    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: currentPlayer === 'black' ? 'black' : 'white',
    border: '2px solid black',
  };

  return (
    <div className="game-container h-screen flex">
      <div className='flex-row flex items-center text-center'>
        <GameBoard board={board} handleSquareClick={handleSquareClick} selectedPiece={selectedPiece} currentPlayer={currentPlayer} />
      </div>

      {winner && (
        <div className="mb-4 ml-40 flex flex-col items-center mt-40">
          <Confetti gameWin={winner}/> {/*imported file created by xetzle00*/}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl mb-4 font-bold text-white">Offline checkers Game</h1>
            <div className="text-3xl font-bold text-white">{winner === 'black' ? 'Black' : 'White'} player won!</div>
            <button className="text-white font-bold py-2 px-4 rounded bg-amber-700 my-16" onClick={handleReset}>
              New game
            </button>
            <Link to="/">

              <button className="text-white font-bold py-2 px-4 rounded bg-amber-700">
                Go to Main menu
              </button>
            </Link>
          </div>
        </div>
      )}

      {!winner && (
        <div className="mb-4 ml-40 flex flex-col items-center mt-40">
          <div className="flex flex-col items-center">
            <h1 className="text-5xl mb-4  font-bold text-white">Offline checkers Game</h1>
            <div className="text-3xl text-white mb-4"> Current player</div>
            <div style={circleStyle}></div>
            <button className="text-white font-bold py-2 px-4 rounded bg-amber-700 my-16" onClick={handleReset}>
              Reset game
            </button>
            <Link to="/">

              <button className="text-white font-bold py-2 px-4 rounded bg-amber-700">
                Go to Main menu
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameController;