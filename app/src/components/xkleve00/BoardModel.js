const BoardModel = {
  //initialize the game board
  initializeBoard: () => {
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

    if (toRow < 0 || toRow >= 8 || toCol < 0 || toCol >= 8) {
      return false;
    }
    if (board[toRow][toCol] !== null) {
      return false;
    }

    const isForwardMove = piece.color === 'black' ? toRow < fromRow : toRow > fromRow;
    //console.log(`moved forward ${isForwardMove}`);
    const isDiagonal = Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1;
    const isPossibleCapure = Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - fromCol) === 2;
    //console.log(`moved rows ${Math.abs(toRow - fromRow)} moved cols ${Math.abs(toCol - fromCol)}`);

    if (piece.type === 'king' && isDiagonal) {
      // King pieces can move in any direction
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

    const middleRow = (fromRow + toRow) / 2;
    const middleCol = (fromCol + toCol) / 2;

    console.log(`from ${fromRow}-${fromCol} to ${toRow}-${toCol}`);


    if (Number.isInteger(middleCol) && Number.isInteger(middleRow)) {
      if (board[middleRow][middleCol]?.color !== pieceToMove.color) {
        updatedBoard[middleRow][middleCol] = null;
      }
    }

    if (pieceToMove.color === 'black' && toRow === 0) {
      updatedBoard[toRow][toCol].type = 'king'; // Update the piece to a king
      //console.log(`got king black on ${toRow}-${toCol}`);
    } else if (pieceToMove.color === 'white' && toRow === 7) {
      updatedBoard[toRow][toCol].type = 'king'; // Update the piece to a king
      //console.log(`got king white on ${toRow}-${toCol}`);
    }

    return updatedBoard;
  },

  // Count remaining pieces
  isWinConditionMet: (board, currentPlayer) => {
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

    if (currentPlayer === 'black' && whitePieces === 0) {
      console.log("black win");
      return true;
    } else if (currentPlayer === 'white' && blackPieces === 0) {
      console.log("white win");
      return true;
    }

    return false;
  },

  
  calculateAvailableMoves: (board, selectedPiece) => {
    const { row: selectedRow, col: selectedCol, color } = selectedPiece;
    const availableMoves = [];

    const checkMove = (row, col) => {
      if (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] === null) {
        availableMoves.push({ row, col });
      }
    };

    const forwardDirection = color === 'black' ? -1 : 1;

    // Forward movement
    checkMove(selectedRow + forwardDirection, selectedCol - 1);
    checkMove(selectedRow + forwardDirection, selectedCol + 1);

    // Diagonal movements for capturing
    const checkCapture = (middleRow, middleCol, targetRow, targetCol) => {
      if (
        middleRow >= 0 &&
        middleRow < 8 &&
        middleCol >= 0 &&
        middleCol < 8 &&
        board[middleRow][middleCol]?.color !== color &&
        board[targetRow][targetCol] === null
      ) {
        availableMoves.push({ row: targetRow, col: targetCol });
      }
    };

    //checkCapture(selectedRow + forwardDirection, selectedCol - 1, selectedRow + 2 * forwardDirection, selectedCol - 2);
    //checkCapture(selectedRow + forwardDirection, selectedCol + 1, selectedRow + 2 * forwardDirection, selectedCol + 2);

    return availableMoves;
  },
};

export default BoardModel;
