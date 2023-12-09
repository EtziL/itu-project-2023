import React from "react";
import "./Tile.css";
import { icon_1, icon_2, icon_3, icon_4, icon_5, icon_6, icon_7, icon_8, icon_flag, icon_bomb } from "../../assets/minesweeper";

const Tile = ({ x, y }) => {
    return (
        <div
            className="w-12 h-12 cursor-pointer flex justify-center items-center
            bg-minesweeperTileBg border-4 border-inset hover:bg-gray-400 transition-all
            "
            onClick={() => {
                console.log(`Clicked on ${x}, ${y}`);
            }}
        >
            {/* <img src={icon_bomb} alt="Minesweeper" /> */}
            {`${x}, ${y}`}
        </div>
    );
};

export default Tile;
