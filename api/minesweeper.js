/**
 * Module for handling minesweeper game requests.
 *
 * Author: Etzler Lukáš
 */
import { readFile, writeFile } from "fs/promises";
import express from "express";
const minesweeperRouter = express.Router();

// Create a new game based on the given H, W, M
minesweeperRouter.get("/game/create/:height/:width/:mines", async (req, res) => {
    const { height, width, mines } = req.params;
    const game = new Minesweeper(height, width, mines);
    await game.createBoard();
    const board = await game.loadGame();
    res.send(board);
});

// Update the game board based on clicked tile
minesweeperRouter.get("/game/reveal/:x/:y", async (req, res) => {
    const { x, y } = req.params;
    const game = new Minesweeper();
    const result = await game.updateBoard(x, y);
    res.send(result);
});

// if around > 0 reveal, pass
// if around == 0 recursiveReveal
// if bomb => game over
const recursiveReveal = async (board, x, y, visited) => {
    const height = board?.length - 1;
    const width = board[0]?.length - 1;

    // out of reach -> ret
    if (x > width || y > height || x < 0 || y < 0 || board[y] === undefined || board[y][x] === undefined) {
        return;
    }

    // actual tile
    const tile = board[y][x];

    // Visited? -> Ret
    if (visited.some((visitedTile) => visitedTile.x === tile.x && visitedTile.y === tile.y)) {
        return;
    }

    // revealed or flagged -> ret
    if (tile.revealed || tile.flagged) {
        return;
    }

    // add to visited
    visited.push(tile);

    // If number -> reveal and ret
    if (tile.around > 0 || tile.isMine) {
        tile.revealed = true;
        return;
    }

    // Reveal blank tile
    tile.revealed = true;

    // Recursive reveal on adj
    if (x <= width) {
        if (y < height) {
            recursiveReveal(board, x, +y + 1, visited);
            if (y > 0) {
                recursiveReveal(board, x, +y - 1, visited);
            }
        }
        if (y == height) {
            recursiveReveal(board, x, +y - 1, visited);
        }

        recursiveReveal(board, +x + 1, y, visited);
        recursiveReveal(board, +x - 1, y, visited);
    }

    // Check diagonal positions for numbers
    if (x > 0 && y > 0) {
        recursiveReveal(board, +x - 1, +y - 1, visited);
    }
    if (x < width && y < height) {
        recursiveReveal(board, +x + 1, +y + 1, visited);
    }
    if (x < width && y > 0) {
        recursiveReveal(board, +x + 1, +y - 1, visited);
    }
    if (x > 0 && y < height) {
        recursiveReveal(board, +x - 1, +y + 1, visited);
    }
};

// Class with game logic
class Minesweeper {
    filename = "minesweeper.json";
    board = [];

    constructor(height, width, mineCnt) {
        this.height = height;
        this.width = width;
        this.mineCnt = mineCnt;
    }

    async createBoard() {
        this.board = [];
        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                row.push({ x: j, y: i, around: 0, revealed: false, flagged: false, isMine: false });
            }
            this.board.push(row);
        }

        // Insert mines
        for (let i = 0; i < this.mineCnt; i++) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);

            // Avoid duplicity
            if (this.board[y][x].isMine) {
                i--;
                continue;
            }
            this.board[y][x].isMine = true;

            // Calcule around for adjacent tiles
            y > 0 ? this.board[y - 1][x].around++ : null;
            x > 0 ? this.board[y][x - 1].around++ : null;
            x < this.width - 1 ? this.board[y][x + 1].around++ : null;
            y < this.height - 1 ? this.board[y + 1][x].around++ : null;

            y > 0 && x > 0 ? this.board[y - 1][x - 1].around++ : null;
            y > 0 && x < this.width - 1 ? this.board[y - 1][x + 1].around++ : null;
            x > 0 && y < this.height - 1 ? this.board[y + 1][x - 1].around++ : null;
            x < this.width - 1 && y < this.height - 1 ? this.board[y + 1][x + 1].around++ : null;
        }

        await this.saveGame();
    }

    async updateBoard(x, y) {
        const board = await this.loadGame();
        await recursiveReveal(board, x, y, []);
        await this.saveGame();
        return board;
    }

    async saveGame() {
        const toJson = JSON.stringify(this.board, null, 2);
        await writeFile(this.filename, toJson, "utf-8");
    }

    async loadGame() {
        try {
            const fromJson = await readFile(this.filename, "utf-8");
            this.board = JSON.parse(fromJson);
            return this.board;
        } catch (error) {
            console.log(error);
        }
    }
}

export { minesweeperRouter };
