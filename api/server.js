import express from 'express';
import {solitaireRouter} from './solitaire.js'
const app = express()
const port = 3000

app.use('/solitaire', solitaireRouter);

app.listen(port);