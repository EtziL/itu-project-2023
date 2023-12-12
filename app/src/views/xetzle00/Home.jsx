import { Link } from "react-router-dom";
import { cursor } from "../../assets/minesweeper";
import Particles from "../../components/xetzle00/Particles";

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center font-silkScreen h-screen bg-gradient-to-t from-purple-950 to-slate-950">
            <h1 className="text-8xl bg-clip-text bg-gradient-to-b from-yellow-600 from-0% via-orange-600 via-40%  to-pink-600 to-100% text-transparent animate-bounce -mt-10 select-none">
                Retro games
            </h1>
            <ul className="text-4xl text-white text-center mt-20 select-none z-10">
                <li className="relative mb-4 border-b-4 pb-2 border-dashed border-transparent hover:border-white transition-all duration-300 group">
                    <img src={cursor} className="absolute rotate-90 w-10 -left-14 top-1/2 transform -translate-y-1/2 invisible group-hover:visible" alt="Cursor" />
                    <Link to="/minesweeper">Minesweeper</Link>
                </li>
                <li className="relative mb-4 border-b-4 pb-2 border-dashed border-transparent hover:border-white transition-all duration-300 group">
                    <img src={cursor} className="absolute rotate-90 w-10 -left-14 top-1/2 transform -translate-y-1/2 invisible group-hover:visible" alt="Cursor" />
                    <Link to="/solitaire">Solitaire</Link>
                </li>
                <li className="relative mb-4 border-b-4 pb-2 border-dashed border-transparent hover:border-white transition-all duration-300 group">
                    <img src={cursor} className="absolute rotate-90 w-10 -left-14 top-1/2 transform -translate-y-1/2 invisible group-hover:visible" alt="Cursor" />
                    <Link to="/checkers">Checkers</Link>
                </li>
            </ul>
            {/* particles */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-transparent z-0 overflow-hidden opacity-50">
                <Particles />
            </div>
        </div>
    );
};

export default Home;
