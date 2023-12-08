import { Route, Routes } from "react-router-dom";
import {useEffect} from "react";

function App() {
    return (
        <div className="container mx-auto">
            <Routes>
                <Route path="/" element={<h1 className="text-3xl uppercase text-center">Classic games</h1>} />
            </Routes>
        </div>
    );
}

export default App;
