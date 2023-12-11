import { useContext, useEffect, useState } from "react";
import "./InsetBorder.css";
import { icon_flag, icon_bomb } from "../../assets/minesweeper";
import TileAroundIcon from "./TileAroundIcon";
import MinesweeperContext from "./MinesweeperContext";
import useSound from "use-sound";
import explosion from "../../assets/minesweeper/explosion.mp3";

const Tile = ({ tile }) => {
    const [icon, setIcon] = useState(null);
    const { setClicked } = useContext(MinesweeperContext);
    const [playSound] = useSound(explosion);

    const style = {
        revealed: "bg-gray-400 border-2 border-solid border-gray-600 transition-all duration-500",
        hidden: "bg-minesweeperTileBg border-4 border-inset hover:bg-gray-400 transition-all duration-500 cursor-pointer",
    };

    return (
        <div
            className={`h-12 w-12 flex justify-center items-center
                ${tile.revealed ? style.revealed : style.hidden}`}
            onClick={() => {
                if (tile.isMine) {
                    setClicked(tile);
                    playSound();
                    console.log("BOOOOOOM");
                } else {
                    setClicked(tile);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                setClicked(tile);
            }}
        >
            {/* {tile.isMine ? <img src={icon_bomb} alt="Minesweeper" /> : <TileAroundIcon value={tile.around} />} */}
            {tile.revealed && (tile.isMine ? <img src={icon_bomb} alt="Minesweeper" className="bg-minesweeperDigitalRed" /> : <TileAroundIcon value={tile.around} />)}
            {/* <img src={icon_bomb} alt="Minesweeper" /> */}
        </div>
    );
};

export default Tile;
