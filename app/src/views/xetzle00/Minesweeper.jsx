import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tile from "../../components/xetzle00/Tile";
import "../../components/xetzle00/InsetBorder.css";

const Minesweeper = () => {
    const { height, width, mines } = useParams();
    const [board, setBoard] = useState([]);
    const [clicked, setClicked] = useState({ x: 0, y: 0 });

    // -- Mount | Create new board -- //
    useEffect(() => {
        const createBoard = async () => {
            const response = await axios.get(`http://localhost:3000/minesweeper/game/create/${height}/${width}/${mines}`);
            setBoard(response.data);
            console.log(response.data);
        };
        createBoard();
    }, []);

    const generateBoard = () => {
        return board.map((row, i) => {
            return (
                <div key={i} className="flex">
                    {row.map((tile, j) => {
                        return <Tile key={j} tile={tile} x={tile.x} y={tile.y} />;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="bg-slate-800 min-h-screen py-5 flex flex-col justify-center items-center">
            <div className="w-max max-w-7xl bg-minesweeperTileBg p-4 border-8 border-inset">
                <div className="flex justify-between text-minesweeperDigitalRed mb-4 font-digital text-5xl font-bold bg-minesweeperTileBg p-2 border-8 border-inset-r w-full">
                    <div className="bg-black px-px leading-none border-2">040</div>
                    <div className="bg-black px-px leading-none border-2">999</div>
                </div>
                <div className="border-8 border-inset-r w-full">
                    <div className="flex flex-col">{generateBoard()}</div>
                </div>
            </div>
        </div>
    );
};

export default Minesweeper;
