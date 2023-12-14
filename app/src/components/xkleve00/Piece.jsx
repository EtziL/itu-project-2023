// Piece.jsx
import React from 'react';

const Piece = ({ type, color }) => {
  const pieceStyle = {
    backgroundColor: type==='king'? '#45ff45' : color,
    
  };

  return <div className="piece w-14 h-14 border-2 border-black rounded-full mx-auto my-auto" style={pieceStyle}></div>;
};

export default Piece;
