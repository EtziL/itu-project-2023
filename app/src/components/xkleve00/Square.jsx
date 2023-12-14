import React from 'react';
import Piece from './Piece';

const Square = ({ piece, onClick, rowIndex, colIndex,  isSelected }) => {
  const isEvenSquare = (rowIndex + colIndex) % 2 === 0;

  let squareStyle = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isEvenSquare ? '#DFD5A0' : '#B7925C',
  };

  return (
    <div className="square" style={squareStyle} onClick={() => onClick(rowIndex, colIndex)}>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
