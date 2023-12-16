import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Solitaire } from "./views/xtoulm00/Solitaire";
import Minesweeper from "./views/xetzle00/Minesweeper";
import MineMenu from "./views/xetzle00/MineMenu";
import Home from "./views/xetzle00/Home";
import Checkers from "./views/xkleve00/Checkers";
import { SolitaireMenu } from "./views/xtoulm00/SolitaireMenu";
import { SolitaireResults } from "./views/xtoulm00/SolitaireResults";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solitaire" element={<SolitaireMenu />} />
                <Route path="/solitaire/:difficulty" element={<Solitaire />} />
                <Route path="/solitaire/results" element={<SolitaireResults />} />
                <Route path="/minesweeper" element={<MineMenu />} />
                <Route path="/minesweeper/game/:height/:width/:mines" element={<Minesweeper />} />
                <Route path="/checkers" element={<Checkers />} />
            </Routes>
        </div>
    );
}

export default App;
