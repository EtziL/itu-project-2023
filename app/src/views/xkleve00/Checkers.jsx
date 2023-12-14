import { Link } from "react-router-dom";
import Game from "../../components/xkleve00/GameController";

const Checkers = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-solitaireBg">
        <Game />
      </div>
    );
};

export default Checkers;