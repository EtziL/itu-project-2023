/**
* Piece component that render pieces on squares
*
* Author: Kleveta Jaromír (xkleve00)
*/


import React from 'react';
import crownIcon from "../../assets/checkers/crown-icon.svg";

const Piece = ({ type, color }) => {
  const isKing = type === 'king';

  const pieceStyle = {
    backgroundColor: color,
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imgStyle = {
    width: '70%',
    height: '70%',
    objectFit: 'contain',
    filter: color === 'black' ? 'invert(1)' : 'none',
  };

  return (
    <div className="piece w-14 h-14 border-2 border-black rounded-full mx-auto my-auto" style={pieceStyle}>
      {isKing && (
        <img src={crownIcon} alt="" style={imgStyle} />
      )}
    </div>
  );
};

export default Piece;
