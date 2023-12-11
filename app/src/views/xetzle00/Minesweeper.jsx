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
    const [mineCnt, setMineCnt] = useState(mines); //TODO max mines - flagged
    const [face, setFace] = useState("🙂");
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    // -- on Mount OR reset | Create new board -- //
    useEffect(() => {
        setTimer(0);
        setTimerRunning(false);
        setFace("🙂");
        const getBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/create/${height}/${width}/${mines}`);
            setBoard(response.data);
            console.log(response.data);
        };
        getBoard();
    }, [reset]);

    // -- on Click | Reveal tile && First interaction | Start timer -- //
    useEffect(() => {
        console.log(`Clicked on ${clicked.x}, ${clicked.y}`);
        if (timer === 0 && clicked.x != undefined) {
            setTimerRunning(true);
        }
        const updateBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/reveal/${clicked.x}/${clicked.y}`);
            setBoard(response.data);
            console.log(response.data);
        };
        updateBoard();
    }, [clicked]);

    // -- Timer func + cleanup -- //
    useEffect(() => {
        console.log(`Timer running: ${timerRunning}`);
        if (timerRunning) {
            const interval = setInterval(() => {
                setTimer((timer) => timer + 1);
                setFace("🙂");
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerRunning]);

    return (
        <div className="bg-slate-800 min-h-screen py-5 flex flex-col justify-center items-center">
            <div className="w-max max-w-7xl bg-minesweeperTileBg p-4 border-8 border-inset">
                <MinesweeperContext.Provider value={{ board, reset, setReset, setClicked, setTimerRunning, face, setFace }}>
                    <MinesweeperHeader mineCnt={mineCnt} timer={timer} />
                    <MinesweeperBoard />
                </MinesweeperContext.Provider>
            </div>
        </div>
    );
};

export default Minesweeper;
