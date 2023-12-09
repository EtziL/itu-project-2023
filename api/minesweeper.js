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

// Class with game logic
class Minesweeper {
    filename = "minesweeper.json";

    constructor(height, width, mineCnt) {
        this.height = height;
        this.width = width;
        this.mineCnt = mineCnt;
        this.createBoard();
    }

    async createBoard() {
        //TODO: insert bombs, calculate around
        const board = [];
        for (let i = 0; i < this.height; i++) {
            const row = [];
            for (let j = 0; j < this.width; j++) {
                row.push({ x: j, y: i, around: 0, revealed: false, flagged: false });
            }
            board.push(row);
        }

        await this.saveGame(board);
    }

    async saveGame(board) {
        const toJson = JSON.stringify(board, null, 2);
        await writeFile(this.filename, toJson, "utf-8");
    }

    async loadGame() {
        try {
            const fromJson = await readFile(this.filename, "utf-8");
            return JSON.parse(fromJson);
        } catch (error) {
            console.log(error);
        }
    }
}

export { minesweeperRouter };
