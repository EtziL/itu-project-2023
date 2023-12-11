import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/xetzle00/InsetBorder.css";
import { MinesweeperBoard, MinesweeperHeader, Tile } from "../../components/xetzle00";
import MinesweeperContext from "../../components/xetzle00/MinesweeperContext";

const Minesweeper = () => {
    const { height, width, mines } = useParams();
    const [board, setBoard] = useState([]);
    const [clicked, setClicked] = useState({});
    const [reset, setReset] = useState(false);
    const [mineCnt, setMineCnt] = useState(mines);

    const handleRightClick = (e) => {
        e.preventDefault();
        console.log(e.target);
        console.log("Right click");
    };

    // -- on Mount OR reset | Create new board -- //
    useEffect(() => {
        const getBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/create/${height}/${width}/${mines}`);
            setBoard(response.data);
            console.log(response.data);
        };
        getBoard();
    }, [reset]);

    useEffect(() => {
        console.log(`Clicked on ${clicked.x}, ${clicked.y}`);
        const updateBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/reveal/${clicked.x}/${clicked.y}`);
            setBoard(response.data);
            console.log(response.data);
        };
        updateBoard();
    }, [clicked]);

    return (
        <div className="bg-slate-800 min-h-screen py-5 flex flex-col justify-center items-center">
            <div className="w-max max-w-7xl bg-minesweeperTileBg p-4 border-8 border-inset">
                <MinesweeperContext.Provider value={{ board, reset, setReset, setClicked }}>
                    <MinesweeperHeader mineCnt={mineCnt} timer={999} />
                    <MinesweeperBoard />
                </MinesweeperContext.Provider>
            </div>
        </div>
    );
};

export default Minesweeper;
