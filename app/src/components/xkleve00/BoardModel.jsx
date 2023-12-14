const BoardModel = {
  //initialize the game board
  initializeBoard: () => {
    // Create an 8x8 board with null values
    const board = Array(8).fill(null).map(() => Array(8).fill(null));

    //fill board with default 
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 1) {
          if (row < 3)
            board[row][col] = { type: 'checker', color: 'white' };
          else if (row > 4)
            board[row][col] = { type: 'checker', color: 'black' };
        }

      }
    }

    return board;
  },
  //check if the move is valid
  isValidMove: (board, fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];

    // Check if the 'to' position is within the board boundaries
    if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) {
      return false;
    }

    // Check if the 'to' position is empty
    if (board[toRow][toCol] !== null) {
      return false;
    }

    // Implement specific logic for valid moves based on the game's rules
    // For now, let's assume a simple move for checkers (only forward and diagonally)
    const isForwardMove = piece.color === 'black' ? toRow < fromRow : toRow > fromRow;
    //console.log(`moved forward ${isForwardMove}`);
    const isDiagonal = Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1;
    const isPossibleCapure = Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2;
    //console.log(`moved rows ${Math.abs(toRow - fromRow)} moved cols ${Math.abs(toCol - fromCol)}`);

    if (piece.type === 'king' && isDiagonal) {
      // King pieces can move in any direction diagonally
      return true;
    }

    if (isForwardMove && isDiagonal) {
      return true;
    }
    else if ((isForwardMove || piece.type==='king') && isPossibleCapure) {
      // Check for capturing opponent piece
      const middleRow = (fromRow + toRow) / 2;
      const middleCol = (fromCol + toCol) / 2;

      if (board[middleRow][middleCol]?.color !== (piece.color || null)) {
        // Capture opponent's piece
        return true;
      }
    }
    return false;
  },

  movePiece: (board, fromRow, fromCol, toRow, toCol) => {
    const updatedBoard = [...board];
    const pieceToMove = updatedBoard[fromRow][fromCol];
    updatedBoard[fromRow][fromCol] = null;
    updatedBoard[toRow][toCol] = pieceToMove;

    // Implement logic for capturing opponent's piece
    const middleRow = (fromRow + toRow) / 2;
    const middleCol = (fromCol + toCol) / 2;

    console.log(`from ${fromRow}-${fromCol} to ${toRow}-${toCol}`);


    if (Number.isInteger(middleCol) && Number.isInteger(middleRow)) {
      if (board[middleRow][middleCol]?.color !== pieceToMove.color) {
        updatedBoard[middleRow][middleCol] = null;
        // Perform additional logic if capturing is needed (e.g., remove the captured piece)
      }
    }

    // Implement logic for kinging a piece if it reaches the opponent's edge
    if (pieceToMove.color === 'black' && toRow === 0) {
      updatedBoard[toRow][toCol].type = 'king'; // Update the piece to a king
      console.log(`got king black on ${toRow}-${toCol}`);
    } else if (pieceToMove.color === 'white' && toRow === 7) {
      updatedBoard[toRow][toCol].type = 'king'; // Update the piece to a king
      console.log(`got king white on ${toRow}-${toCol}`);
    }

    return updatedBoard;
  },

  isWinConditionMet: (board, currentPlayer) => {
    // Count remaining pieces for each player
    let blackPieces = 0;
    let whitePieces = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece !== null) {
          if (piece.color === 'black') {
            blackPieces++;
          } else {
            whitePieces++;
          }
        }
      }
    }

    // Win condition: Opponent has no remaining pieces
    if (currentPlayer === 'black' && whitePieces === 0) {
      console.log("black win");
      return true;
    } else if (currentPlayer === 'white' && blackPieces === 0) {
      console.log("white win");
      return true;
    }

    return false;
  },
};

export default BoardModel;
