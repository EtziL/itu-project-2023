/**
 * Solitare results view.
*
* Author: Toul Matěj (xtoulm00)
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const SolitaireResults = () => {
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(0);
    const [timeBonus, setTimeBonus] = useState(0);

    const fetchScore = async () => {
        axios
            .get('http://localhost:3000/solitaire/load')
            .then((res) => {
                setScore(res.data.score);
                setTime(res.data.finishTime - res.data.startTime);
                const bonus = Math.round(2 * res.data.score - 10 * ((res.data.finishTime - res.data.startTime) / 1000));
                if (bonus < 0) {
                    setTimeBonus(0);
                } else {
                    setTimeBonus(bonus);
                }
            });
    }

    useEffect(() => {
        fetchScore();
    }, [])

    return (
        <div className='flex flex-col w-screen h-screen items-center text-center text-white font-slab bg-solitaireBg'>
            <div className='basis-1/3 mt-32'>
                <h1 className='select-none text-8xl font-bold'>YOU WON!</h1>
            </div>
            <div className='flex flex-col w-screen h-screen items-center text-center text-2xl'>
                <h2 className='text-4xl font-bold mb-5 select-none'>Results</h2>
                <p>Your Score: {score}</p>
                <p>Your Time: {Math.floor(time / 60000)}m {Math.floor((time / 1000) % 60)}s</p>
                <p>Time Bonus: {timeBonus} (2× score - 10× time taken)</p>
                <p className='font-bold'>Total Score: {score + timeBonus}</p>
                <div className='flex gap-5 text-black mt-5'>
                    <Link to='/solitaire'>
                        <button className='transition bg-green-400 border-b-4 border-green-500 hover:bg-green-300 rounded p-3'>New Game</button>
                    </Link>
                    <Link to='/'>
                        <button className='transition bg-green-400 border-b-4 border-green-500 hover:bg-green-300 rounded p-3'>Main Menu</button>
                    </Link>
                </div>
            </div >
        </div >
    );
}