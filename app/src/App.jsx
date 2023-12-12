import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Solitaire } from "./views/xtoulm00/Solitaire";
import Minesweeper from "./views/xetzle00/Minesweeper";
import MineMenu from "./views/xetzle00/MineMenu";
import Home from "./views/xetzle00/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/solitaire" element={<Solitaire />} />
                <Route path="/minesweeper" element={<MineMenu />} />
                <Route path="/minesweeper/game/:height/:width/:mines" element={<Minesweeper />} />
            </Routes>
        </div>
    );
}

export default App;
