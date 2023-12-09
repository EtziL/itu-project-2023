import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Tile from "../../components/xetzle00/Tile";

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
        <div className="bg-slate-800 min-h-screen py-5 flex justify-center items-center">
            <div>{generateBoard()}</div>
        </div>
    );
};

export default Minesweeper;
