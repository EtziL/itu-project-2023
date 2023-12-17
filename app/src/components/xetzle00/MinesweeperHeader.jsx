/**
 * Upper part of the game window. Contains mine counter, timer and dynamic face button
 *
 * Author: Etzler Lukáš (xetzle00)
 */
import { useContext } from "react";
import "../../components/xetzle00/InsetBorder.css";
import MinesweeperContext from "./MinesweeperContext";

const MinesweeperHeader = ({ mineCnt, timer }) => {
    const { reset, setReset, face } = useContext(MinesweeperContext);

    const formatNumber = (num) => {
        if (num >= 0) {
            if (num < 10) {
                return `00${num}`;
            } else if (num < 100) {
                return `0${num}`;
            } else if (num > 999) {
                return `${num % 999}`;
            } else {
                return `${num}`;
            }
        } else {
            if (num >= -9) {
                return `-0${num * -1}`;
            } else if (num > -99) {
                return `-${num * -1}`;
            } else {
                return `ERR`;
            }
        }
    };

    return (
        <div className="flex justify-between text-minesweeperDigitalRed mb-4 font-digital text-5xl font-bold bg-minesweeperTileBg p-2 border-8 border-inset-r w-full">
            <div className="bg-black px-px leading-none border-2 border-inset-r w-20 text-center">{formatNumber(mineCnt)}</div>
            <div
                className="px-px leading-none select-none cursor-pointer hover:scale-110 transition-all duration-150"
                onClick={() => {
                    setReset(!reset);
                }}
            >
                {face}
            </div>
            <div className="bg-black px-px leading-none border-2 border-inset-r w-20 text-center">{formatNumber(timer)}</div>
        </div>
    );
};

export default MinesweeperHeader;
