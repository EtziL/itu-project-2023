import React from 'react';
import Piece from './Piece';

const Square = ({ piece, onClick, rowIndex, colIndex,  isSelected, isAvailableMove  }) => {
  const isEvenSquare = (rowIndex + colIndex) % 2 === 0;
  //console.log(isAvailableMove)

  let squareStyle = {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isEvenSquare ? '#DFD5A0' : '#B7925C',
    border: isSelected ? '2px solid red' : (isAvailableMove ? '2px solid green' : '2px solid transparent'),
  };

  return (
    <div className="square" style={squareStyle} onClick={() => onClick(rowIndex, colIndex)}>
      {piece && <Piece type={piece.type} color={piece.color} />}
    </div>
  );
};

export default Square;
