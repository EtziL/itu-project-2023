import { useState } from "react";
import { icon_bomb } from "../../assets/minesweeper";
import { Link } from "react-router-dom";
import { DifficultyBtn } from "../../components/xetzle00";
import { AiOutlineClose } from "react-icons/ai";

const MineMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className="bg-slate-800 w-full min-h-screen flex justify-center items-center flex-col">
            <span className="flex justify-center items-center mb-20">
                <img src={icon_bomb} className="w-12 h-12" />
                <h1 className="text-5xl text-white font-bold uppercase leading-tight">Minesweeper</h1>
                <img src={icon_bomb} className="w-12 h-12" />
            </span>
            <button
                className={`${
                    !menuVisible ? "opacity-100 scale-100 visible delay-300" : "opacity-0 scale-0 invisible"
                } bg-slate-700 text-white font-bold uppercase px-4 py-2 rounded-lg mt-4 hover:bg-slate-600 hover:delay-0 transition-all duration-300 ease-in-out`}
                onClick={toggleMenu}
            >
                Start
            </button>
            <div
                className={`${
                    menuVisible ? "opacity-100 scale-100 visible" : "opacity-0 scale-0 invisible delay-300"
                }  transition-all duration-300 ease-in-out flex gap-10 -translate-y-14`}
            >
                <DifficultyBtn path="/minesweeper/game" title="Easy" height={9} width={9} mines={10} />
                <DifficultyBtn path="/minesweeper/game" title="Normal" height={16} width={16} mines={40} />
                <DifficultyBtn path="/minesweeper/game" title="Hard" height={30} width={16} mines={99} />
            </div>
            <button
                className={`${
                    menuVisible ? "opacity-60 scale-80 delay-300" : "opacity-0 scale-0"
                } p-4 flex justify-center items-center bg-red-600 hover:opacity-80 hover:delay-0 opacity-60 rounded-lg text-4xl transition-all duration-300`}
                onClick={toggleMenu}
            >
                {AiOutlineClose()}
            </button>
        </div>
    );
};

export default MineMenu;
