/**
 * Component representing one tile of the minesweeper game
 *
 * Author: Etzler Lukáš (xetzle00)
 */
import { useContext } from "react";
import "./InsetBorder.css";
import { icon_flag, icon_bomb } from "../../assets/minesweeper";
import TileAroundIcon from "./TileAroundIcon";
import MinesweeperContext from "./MinesweeperContext";
import useSound from "use-sound";
import explosion from "../../assets/minesweeper/explosion.mp3";

const Tile = ({ tile }) => {
    const { setClicked, setTimerRunning, face, setFace, setMouseBtn } = useContext(MinesweeperContext);
    const [playSound] = useSound(explosion);

    const tileStyle = {
        revealed: "bg-gray-400 border-2 border-solid border-gray-600 transition-all duration-500",
        hidden: "bg-minesweeperTileBg border-4 border-inset hover:bg-gray-400 transition-all duration-500 cursor-pointer",
    };

    return (
        <div
            className={`h-12 w-12 flex justify-center items-center
                ${tile.revealed ? tileStyle.revealed : tileStyle.hidden}`}
            onClick={() => {
                setMouseBtn("left");
                if (tile.flagged) {
                    return;
                }
                if (tile.isMine) {
                    setClicked(tile);
                    setTimerRunning(false);
                    playSound();
                    setFace("☠️");
                } else {
                    if (face === "☠️") {
                        return;
                    }
                    setFace("😮");
                    setClicked(tile);
                }
            }}
            onContextMenu={(e) => {
                e.preventDefault();
                if (tile.revealed) {
                    return;
                }
                setMouseBtn("right");
                setClicked(tile);
            }}
        >
            {tile.revealed && !tile.isMine && !tile.flagged && <TileAroundIcon value={tile.around} />}
            {tile.revealed && !tile.isMine && tile.flagged && <img src={icon_flag} alt="Wrong guessed mine" className="bg-red-400" />}
            {tile.revealed && tile.isMine && !tile.flagged && <img src={icon_bomb} alt="Mine" className="bg-minesweeperDigitalRed" />}
            {tile.revealed && tile.isMine && tile.flagged && <img src={icon_bomb} alt="Right guessed mine" className="bg-green-500" />}
            {!tile.revealed && tile.flagged && <img src={icon_flag} alt="Flag icon" />}
        </div>
    );
};

export default Tile;
