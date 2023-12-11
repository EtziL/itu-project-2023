import express from "express";
import { solitaireRouter } from "./solitaire.js";
import { minesweeperRouter } from "./minesweeper.js";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

app.use("/solitaire", solitaireRouter);
app.use("/minesweeper", minesweeperRouter);

app.listen(port);
