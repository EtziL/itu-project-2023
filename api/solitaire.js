/**
 * Module for handling the solitaire game logic.
 *
 * Author: Toul Matěj (xtoulm00)
 */
import { readFile, writeFile } from "fs/promises";
import express from 'express';
const solitaireRouter = express.Router();

solitaireRouter.get('/', (req, res) => {
    res.send('Hello World!')
})

export {solitaireRouter};

export const Suits = {
    CLUBS: 'clubs',
    SPADES: 'spades',
    HEARTS: 'hearts',
    DIAMONDS: 'diamonds'
};

export class SolitareManager {
    filename = 'solitaire.json';

    constructor() {
        this.initDeck()
    }

    async initDeck() {
        const deck = [];
        const housePiles = [
            { suit: Suits.CLUBS, lastDropped: null },
            { suit: Suits.SPADES, lastDropped: null },
            { suit: Suits.HEARTS, lastDropped: null },
            { suit: Suits.DIAMONDS, lastDropped: null }
        ];

        deck.push(
            { value: '7', type: Suits.SPADES },
            { value: 'J', type: Suits.HEARTS },
            { value: 'K', type: Suits.CLUBS },
            { value: 'A', type: Suits.DIAMONDS },
        );

        const state = {
            deck: deck,
            housePiles: housePiles
        };

        await this.saveGame(state);
    }

    async saveGame(state) {
        const toJson = JSON.stringify(state, null, 2);
        await writeFile(this.filename, toJson, 'utf-8');
    }

    async loadGame() {
        try {
            rea
            const file = await readFile(this.filename, 'utf-8');
            const state = JSON.parse(file);

            return state;
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.initDeck()
                return this.loadGame(this.filename)
            } else {
                throw error;
            }
        }
    }
}