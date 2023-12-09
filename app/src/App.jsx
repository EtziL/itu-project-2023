import { Route, Routes } from "react-router-dom";
import {useEffect} from "react";
import { Solitaire } from "./views/xtoulm00/Solitaire";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<h1 className="text-3xl uppercase text-center">Classic games</h1>} />
                <Route path="/solitaire" element={<Solitaire/>} />
            </Routes>
        </div>
    );
}

export default App;
