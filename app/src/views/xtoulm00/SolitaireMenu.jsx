import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const SolitaireMenu = () => {
    const [hoverText, setHoverText] = useState('');

    const handleButtonHover = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                setHoverText('The shuffling is tweaked so that the game is almost always winnable.');
                break;
            case 'medium':
                setHoverText('A moderate challenge where aces are guaranteed to be in the initial deck to make the game a little easier.');
                break;
            case 'hard':
                setHoverText('The shuffling is completely random. With poor strategy, you can get stuck easily.');
                break;
            default:
                setHoverText('');
                break;
        }
    };

    return (
        <div className='flex flex-col w-screen h-screen items-center text-center'>
            <div className='my-[15%]'>
                <h1 className='text-5xl font-bold'>SOLITAIRE</h1>
            </div>
            <div className='flex flex-col w-screen h-screen items-center text-center'>
                <Link to='/solitaire/easy'
                    onMouseEnter={() => handleButtonHover('easy')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer transition-colors ease-in-out w-full hover:bg-gradient-to-r hover:from-transparent hover:via-green-300 hover:to-transparent py-3'>
                    Easy
                </Link>
                <Link to='/solitaire/medium'
                    onMouseEnter={() => handleButtonHover('medium')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer transition w-full hover:bg-gradient-to-r hover:from-transparent hover:via-yellow-300 hover:to-transparent py-3'>
                    Medium
                </Link>
                <Link to='/solitaire/hard'
                    onMouseEnter={() => handleButtonHover('hard')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer transition w-full hover:bg-gradient-to-r hover:from-transparent hover:via-red-300 hover:to-transparent py-3'>
                    Hard
                </Link>
                <p className='mt-10'>{hoverText}</p>
            </div >
        </div >
    );
};
