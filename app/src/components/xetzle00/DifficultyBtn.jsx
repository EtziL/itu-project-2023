/**
 * Reusable button component for selecting difficulty
 *
 * Author: Etzler Lukáš (xetzle00)
 */
import React from "react";
import { Link } from "react-router-dom";

const DifficultyBtn = ({ path, title, height, width, mines }) => {
    return (
        <Link to={`${path}/${height}/${width}/${mines}`} className="bg-slate-700 text-white px-4 py-2 rounded-lg mt-4 hover:bg-slate-600 transition-all text-center">
            <h2 className="font-bold uppercase">{title}</h2>
            <p>
                {height}x{width}
            </p>
        </Link>
    );
};

export default DifficultyBtn;
