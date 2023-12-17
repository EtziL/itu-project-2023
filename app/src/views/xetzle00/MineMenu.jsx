/**
 * Menu for minesweeper
 * Has 3 pre-set difficulties and option to create game with custom settings
 *
 * Author: Etzler Lukáš (xetzle00)
 */
import { useState, useEffect } from "react";
import { icon_bomb } from "../../assets/minesweeper";
import { DifficultyBtn } from "../../components/xetzle00";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const MineMenu = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [customMenuVisible, setCustomMenuVisible] = useState(false);
    const [custom, setCustom] = useState({
        width: 8,
        height: 8,
        mines: 6,
    });

    const handleCustom = (e) => {
        setCustom({ ...custom, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        if (custom.mines > Math.floor(custom.width * custom.height * 0.7)) {
            setCustom({ ...custom, mines: Math.floor(custom.width * custom.height * 0.7) });
        }
        if (custom.mines < Math.floor(custom.width * custom.height * 0.1)) {
            setCustom({ ...custom, mines: Math.floor(custom.width * custom.height * 0.1) });
        }
    }, [custom.width, custom.height]);

    const toggleMenu = () => {
        if (customMenuVisible) {
            setCustomMenuVisible(!customMenuVisible);
            setMenuVisible(!menuVisible);
        } else {
            setMenuVisible(!menuVisible);
        }
    };

    return (
        <div className="bg-slate-800 w-full min-h-screen flex items-center flex-col font-silkScreen">
            <Link to="/" className="absolute top-4 left-4 text-white text-2xl hover:text-gray-400">
                Main menu
            </Link>
            <span className="flex justify-center items-center mb-20 mt-56">
                <img src={icon_bomb} className="w-12 h-12" />
                <h1 className="text-5xl text-white font-bold uppercase leading-tight">Minesweeper</h1>
                <img src={icon_bomb} className="w-12 h-12" />
            </span>
            <button
                className={`${
                    !menuVisible && !customMenuVisible ? "opacity-100 scale-100 visible delay-300" : "opacity-0 scale-0 invisible"
                } bg-slate-700 text-white font-bold uppercase px-4 py-2 rounded-lg mt-4 hover:bg-slate-600 hover:delay-0 transition-all duration-300 ease-in-out`}
                onClick={toggleMenu}
            >
                Start
            </button>
            {/* Diff menu */}
            <div
                className={`${
                    menuVisible ? "opacity-100 scale-100 visible" : `opacity-0 scale-0 invisible ${customMenuVisible ? "" : "delay-300"}`
                }  transition-all duration-300 ease-in-out flex gap-10 -translate-y-14`}
            >
                <DifficultyBtn path="/minesweeper/game" title="Easy" height={9} width={9} mines={10} />
                <DifficultyBtn path="/minesweeper/game" title="Normal" height={16} width={16} mines={40} />
                <DifficultyBtn path="/minesweeper/game" title="Hard" height={30} width={16} mines={99} />
                <button
                    className="bg-slate-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-slate-600 transition-all text-center"
                    onClick={() => {
                        setCustomMenuVisible(true);
                        setMenuVisible(false);
                    }}
                >
                    <h2>Custom</h2>
                    <p>?x?</p>
                </button>
            </div>
            {/* Custom menu */}
            <div
                className={`${
                    customMenuVisible ? "opacity-100 scale-100 visible h-max" : "opacity-0 scale-0 h-0 invisible"
                }  transition-all duration-300 ease-in-out flex gap-10 -translate-y-32 flex-col`}
            >
                <div>
                    <h2 className="text-white text-2xl font-bold uppercase">Width</h2>
                    <div className="flex justify-between text-end">
                        <input type="range" min="8" max="24" step="1" defaultValue={custom.width} className="w-72" id="width" onChange={handleCustom} />
                        <h2 className="text-3xl text-white w-20">{custom.width}</h2>
                    </div>
                    <h2 className="text-white text-2xl font-bold uppercase">Height</h2>
                    <div className="flex justify-between text-end">
                        <input type="range" min="8" max="30" step="1" defaultValue={custom.height} className="w-72" id="height" onChange={handleCustom} />
                        <h2 className="text-3xl text-white w-20">{custom.height}</h2>
                    </div>
                    <h2 className="text-white text-2xl font-bold uppercase">Mines</h2>
                    <div className="flex justify-between text-end">
                        <input
                            type="range"
                            min={Math.floor(custom.width * custom.height * 0.1)}
                            max={Math.floor(custom.width * custom.height * 0.7)}
                            step="1"
                            defaultValue={custom.mines}
                            className="w-72"
                            id="mines"
                            onChange={handleCustom}
                        />
                        <h2 className="text-3xl text-white w-20">{custom.mines}</h2>
                    </div>
                </div>
                <DifficultyBtn path="/minesweeper/game" title="Custom" height={custom.height} width={custom.width} mines={custom.mines} />
            </div>
            <button
                className={`${
                    menuVisible || customMenuVisible ? "opacity-60 scale-80 delay-300" : "opacity-0 scale-0"
                } p-4 flex justify-center items-center bg-red-600 hover:opacity-80 hover:delay-0 opacity-60 rounded-lg text-4xl transition-all duration-300 `}
                onClick={toggleMenu}
            >
                {AiOutlineClose()}
            </button>
        </div>
    );
};

export default MineMenu;
