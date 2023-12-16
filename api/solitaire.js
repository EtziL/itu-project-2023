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

const isRed = (card) => {
    return card.type === Suits.HEARTS || card.type === Suits.DIAMONDS;
}

const cardValues = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 11, 'Q': 12, 'K': 13
};

solitaireRouter.post('/new', async (req, res) => {
    const { difficulty } = req.body;
    await initDeck(difficulty);
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

    if ((!pile.lastDropped && card.value === 'A') || (cardValues[pile.lastDropped.value] + 1 == cardValues[card.value])) {
        let removed = false;
        const newDeck = removeFromDeck(state.deck, card);
        if (newDeck.length !== state.deck.length) {
            removed = true;
        }
        const newWaste = removeFromDeck(state.waste, card);
        if (newWaste.length !== state.waste.length) {
            removed = true;
        }

        let newPiles = [...state.piles];
        newPiles = newPiles.map(pile => {
            const initialLength = pile.length;
            const toRemove = pile[pile.length - 1];
            if (toRemove && (toRemove.value != card.value || toRemove.type != card.type)) {
                return pile;
            }
            let mapped = removeFromDeck(pile, card);
            if (mapped.length != initialLength) {
                removed = true;
                if (mapped[mapped.length - 1]) {
                    mapped[mapped.length - 1].revealed = true;
                }
            }
            return mapped;
        });

        if (!removed) {
            res.status(200).send(state);
            return;
        }

        let newHousePiles = [...state.housePiles];
        newHousePiles = newHousePiles.map(pile => {
            if (pile.suit === suit) {
                return { ...pile, lastDropped: card };
            }
            return pile;
        });

        if (newHousePiles.every(pile => (pile.lastDropped && pile.lastDropped.value === 'K'))) {
            const newState = {
                ...state,
                waste: newWaste,
                deck: newDeck,
                housePiles: newHousePiles,
                piles: newPiles,
                score: state.score + 60,
                won: true
            }
            await saveGame(newState);
            res.status(200).send(newState);
        } else {
            const newState = {
                ...state,
                waste: newWaste,
                deck: newDeck,
                housePiles: newHousePiles,
                piles: newPiles,
                score: state.score + 60,
                won: false
            }
            await saveGame(newState);
            res.status(200).send(newState);
        }
    }
});

solitaireRouter.post('/drop-pile', async (req, res) => {
    const { card, index } = req.body;
    const state = await loadGame();
    const pile = state.piles[index];
    const lastCard = pile[pile.length - 1];

    if (lastCard) {
        if (isRed(lastCard) === isRed(card)) {
            res.status(200).send(state);
            return;
        }
        else if (cardValues[lastCard.value] - 1 !== cardValues[card.value]) {
            res.status(200).send(state);
            return;
        }
    } else {
        if (card.value !== 'K') {
            res.status(200).send(state);
            return;
        }
    }

    card.revealed = true;
    let moved = [card];
    const newDeck = removeFromDeck(state.deck, card);
    const newWaste = removeFromDeck(state.waste, card);

    let newScore = 0;
    if (newWaste.length !== state.waste.length) {
        newScore = 45;
    }

    let newPiles = [...state.piles];
    newPiles = newPiles.map(pile => {
        const indexToRemove = pile.findIndex(
            item => card.value === item.value && card.type === item.type
        );
        if (indexToRemove != -1) {
            let mapped = [...pile];
            moved = mapped.splice(indexToRemove, mapped.length - indexToRemove)
            if (mapped.length && !mapped[mapped.length - 1].revealed) {
                newScore = 25;
                mapped[mapped.length - 1].revealed = true;
            }
            return mapped;
        } else {
            return pile;
        }
    });
    newPiles[index] = [...pile, ...moved];

    const newState = {
        ...state,
        waste: newWaste,
        deck: newDeck,
        piles: newPiles,
        score: state.score + newScore
    }
    await saveGame(newState);
    res.status(200).send(newState);
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


const initDeck = async (difficulty) => {
    const deck = [];
    const housePiles = [
        { suit: Suits.HEARTS, lastDropped: null },
        { suit: Suits.CLUBS, lastDropped: null },
        { suit: Suits.DIAMONDS, lastDropped: null },
        { suit: Suits.SPADES, lastDropped: null },
    ];

    for (const suit in Suits) {
        for (const value in cardValues) {
            if (difficulty === 'easy' && (value === 'A' || value === '2')) continue;
            else if (difficulty === 'medium' && value === 'A') continue;
            deck.push({ value: value, type: suit, revealed: false });
        }
    }

    const piles = [];

    // Fisher-Yates shuffle
    // Credit: https://www.geeksforgeeks.org/shuffle-a-given-array-using-fisher-yates-shuffle-algorithm/
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    for (let i = 0; i < 7; i++) {
        const pile = deck.splice(0, i + 1);
        piles[i] = pile;
        piles[i][piles[i].length - 1].revealed = true;
    }

    // Easy difficuty = Aces and Twos are available in the start deck
    // Medium difficulty = Aces are available in the start deck
    // Hard difficulty = Cards are completely random
    for (const suit in Suits) {
        if (difficulty === 'easy' || difficulty === 'medium')
        {
            deck.push({ value: 'A', type: suit, revealed: false });
            if (difficulty === 'easy') {
                deck.push({ value: '2', type: suit, revealed: false });
            }
        }
    }

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const state = {
        deck: deck,
        piles: piles,
        housePiles: housePiles,
        waste: [],
        score: 0
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