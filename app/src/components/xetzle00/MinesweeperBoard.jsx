import Tile from "./Tile";
import MinesweeperContext from "./MinesweeperContext";
import { useContext } from "react";

const MinesweeperBoard = () => {
    const { board } = useContext(MinesweeperContext);

    const generateBoard = () => {
        if (board.length === 0) {
            return <div>Loading...</div>;
        }
        return board.map((row, i) => {
            return (
                <div key={i} className="flex">
                    {row.map((tile, j) => {
                        return <Tile key={j} tile={tile} />;
                    })}
                </div>
            );
        });
    };

    return (
        <div className="border-8 border-inset-r w-full">
            <div className="flex flex-col">{generateBoard()}</div>
        </div>
    );
};

export default MinesweeperBoard;
