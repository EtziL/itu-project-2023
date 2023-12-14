import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/xetzle00/InsetBorder.css";
import { MinesweeperBoard, MinesweeperHeader, Confetti } from "../../components/xetzle00";
import MinesweeperContext from "../../components/xetzle00/MinesweeperContext";

const Minesweeper = () => {
    const { height, width, mines } = useParams();
    const [board, setBoard] = useState([]);
    const [gameWin, setGameWin] = useState(false);
    const [clicked, setClicked] = useState({});
    const [mouseBtn, setMouseBtn] = useState(null); // [left, right]
    const [reset, setReset] = useState(false);
    const [mineCnt, setMineCnt] = useState(mines);
    const [face, setFace] = useState("🙂");
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);

    // -- on Mount OR reset | Create new board -- //
    useEffect(() => {
        setTimer(0);
        setTimerRunning(false);
        setGameWin(false);
        setMineCnt(mines);
        setFace("🙂");
        const getBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/create/${height}/${width}/${mines}`);
            setBoard(response.data);
        };
        getBoard();
    }, [reset]);

    // -- on Left Click | Reveal tile && First interaction | Start timer -- //
    // -- on Right Click | (un)Flag tile -- //
    useEffect(() => {
        if (timer === 0 && clicked.x != undefined) {
            setTimerRunning(true);
        }
        const flagTile = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/flag/${clicked.x}/${clicked.y}`);
            setBoard(response.data.board);
            setMineCnt(mines - response.data.flaggedCnt);
        };

        const revealTile = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/reveal/${clicked.x}/${clicked.y}`);
            setBoard(response.data.board);
            setGameWin(response.data.win);
            if (response.data.win) {
                setFace("😎");

                setTimerRunning(false);
            }
        };

        mouseBtn === "right" ? flagTile() : revealTile();
    }, [clicked]);

    // -- Timer func + cleanup -- //
    useEffect(() => {
        if (timerRunning && face !== "☠️") {
            const interval = setInterval(() => {
                setTimer((timer) => timer + 1);
                setFace("🙂");
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timerRunning]);

    return (
        <>
            <div className="bg-slate-800 min-h-screen py-5 flex flex-col justify-center items-center">
                <Confetti gameWin={gameWin} />
                <div className="w-max max-w-7xl bg-minesweeperTileBg p-4 border-8 border-inset">
                    <MinesweeperContext.Provider value={{ board, reset, setReset, setClicked, setTimerRunning, face, setFace, setMouseBtn }}>
                        <MinesweeperHeader mineCnt={mineCnt} timer={timer} />
                        <MinesweeperBoard />
                    </MinesweeperContext.Provider>
                </div>
            </div>
        </>
    );
};

export default Minesweeper;
