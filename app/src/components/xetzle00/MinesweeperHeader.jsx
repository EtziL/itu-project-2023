import { useContext } from "react";
import "../../components/xetzle00/InsetBorder.css";
import MinesweeperContext from "./MinesweeperContext";

const MinesweeperHeader = ({ mineCnt, gameState, timer }) => {
    const { reset, setReset } = useContext(MinesweeperContext);
    const faces = {
        happy: "🙂",
        surprised: "😮",
        win: "😎",
        lose: "☠️",
    };

    const formatNumber = (num) => {
        if (num < 10) {
            return `00${num}`;
        } else if (num < 100) {
            return `0${num}`;
        } else {
            return `${num}`;
        }
    };

    return (
        <div className="flex justify-between text-minesweeperDigitalRed mb-4 font-digital text-5xl font-bold bg-minesweeperTileBg p-2 border-8 border-inset-r w-full">
            <div className="bg-black px-px leading-none border-2 border-inset-r">{formatNumber(mineCnt)}</div>
            <div
                className="px-px leading-none select-none cursor-pointer"
                onClick={() => {
                    setReset(!reset);
                }}
            >
                {faces.happy}
            </div>
            <div className="bg-black px-px leading-none border-2 border-inset-r">{timer}</div>
        </div>
    );
};

export default MinesweeperHeader;
