import express from 'express';
import {solitaireRouter} from './solitaire.js'
import pkg from 'cors';
const cors = pkg;
const app = express()
const port = 3000

app.use(cors());
app.use(express.json())

app.use('/solitaire', solitaireRouter);

app.listen(port);