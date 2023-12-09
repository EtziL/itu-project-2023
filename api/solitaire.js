/**
 * Module for handling the solitaire game logic.
*
* Author: Toul Matěj (xtoulm00)
*/
import { readFile, writeFile } from "fs/promises";
import express from 'express';
const solitaireRouter = express.Router();

const filename = 'solitaire.json';

const Suits = {
    CLUBS: 'CLUBS',
    SPADES: 'SPADES',
    HEARTS: 'HEARTS',
    DIAMONDS: 'DIAMONDS'
};

const cardValues = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13
};

solitaireRouter.get('/new', async (req, res) => {
    await initDeck();
    const state = await loadGame();
    res.status(200).send(state);
});

solitaireRouter.get('/load', async (req, res) => {
    const state = await loadGame();
    res.status(200).send(state);
});

solitaireRouter.get('/draw', async (req, res) => {
    const state = await loadGame();
    let newDeck = [...state.deck];
    let newState;
    if (newDeck.length) {
        let drawn = newDeck.pop();
        let newWaste = [...state.waste];
        newWaste.push(drawn);
    
        newState = {
            ...state,
            deck: newDeck,
            waste: newWaste
        }
    } else {
        newDeck = [...state.waste];
        newDeck = newDeck.reverse();
        let newWaste = [];
        newState = {
            ...state,
            deck: newDeck,
            waste: newWaste
        }
    }
    await saveGame(newState);
    res.status(200).send(newState);
});

solitaireRouter.post('/drop-house', async (req, res) => {
    const { card, suit } = req.body;
    const state = await loadGame();
    const pile = state.housePiles.find(item => item['suit'] == suit)

    if (!pile.lastDropped && card.value != 'A') {
        res.status(200).send(state);
        return;
    }

    if ((!pile.lastDropped && card.value === 'A') ||(cardValues[pile.lastDropped.value] + 1 == cardValues[card.value])) {
        console.log('valid')
        const newDeck = removeFromDeck(state.deck, card);
        const newWaste = removeFromDeck(state.waste, card);
        let newPiles = [...state.housePiles];
        newPiles = newPiles.map(pile => {
            if (pile.suit === suit) {
                return { ...pile, lastDropped: card };
            }
            return pile;
        });
        const newState = {
            ...state,
            waste: newWaste,
            deck: newDeck,
            housePiles: newPiles
        }
        await saveGame(newState);
        res.status(200).send(newState);
    }

});

export { solitaireRouter };


const removeFromDeck = (deck, card) => {
    const indexToRemove = deck.findIndex(
        item => card.value === item.value && card.type === item.type
    );

    if (indexToRemove !== -1) {
        return [...deck.slice(0, indexToRemove), ...deck.slice(indexToRemove + 1)];
    }

    return deck;
}


const initDeck = async () => {
    const deck = [];
    const housePiles = [
        { suit: Suits.HEARTS, lastDropped: null },
        { suit: Suits.CLUBS, lastDropped: null },
        { suit: Suits.DIAMONDS, lastDropped: null },
        { suit: Suits.SPADES, lastDropped: null },
    ];

    for (const suit in Suits) {
        for (const value in cardValues) {
            deck.push({ value: value, type: suit });
        }
    }

    // Fisher-Yates shuffle
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const state = {
        deck: deck,
        housePiles: housePiles,
        waste: []
    };

    await saveGame(state);
}

const saveGame = async (state) => {
    const toJson = JSON.stringify(state, null, 2);
    await writeFile(filename, toJson, 'utf-8');
}

const loadGame = async () => {
    try {
        const file = await readFile(filename, 'utf-8');
        const state = JSON.parse(file);

        return state;
    } catch (error) {
        if (error.code === 'ENOENT') {
            await initDeck()
            return await loadGame(filename)
        } else {
            throw error;
        }
    }
}