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
                setHoverText('Quite a big challenge. Aces are guaranteed to be in the initial deck, but mistakes are still expensive.');
                break;
            case 'hard':
                setHoverText('Only for experts. The shuffling is completely random and with poor strategy, you can get stuck easily.');
                break;
            default:
                setHoverText('');
                break;
        }
    };

    return (
        <div className='flex flex-col w-screen h-screen items-center text-center text-white font-slab bg-solitaireBg'>
            <div className='basis-2/3 mt-32'>
                <h1 className='select-none text-8xl font-bold'>SOLITAIRE</h1>
            </div>
            <div className='flex flex-col w-screen h-screen items-center text-center text-2xl'>
                <h2 className='text-4xl font-bold mb-5 select-none'>Select a difficulty</h2>
                <Link to='/solitaire/easy'
                    onMouseEnter={() => handleButtonHover('easy')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer w-full hover:text-black hover:bg-gradient-to-r hover:from-transparent hover:via-green-500 hover:to-transparent py-3'>
                    Easy
                </Link>
                <Link to='/solitaire/medium'
                    onMouseEnter={() => handleButtonHover('medium')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer w-full hover:text-black hover:bg-gradient-to-r hover:from-transparent hover:via-yellow-500 hover:to-transparent py-3'>
                    Medium
                </Link>
                <Link to='/solitaire/hard'
                    onMouseEnter={() => handleButtonHover('hard')} onMouseLeave={() => handleButtonHover('')}
                    className='select-none cursor-pointer w-full hover:text-black hover:bg-gradient-to-r hover:from-transparent hover:via-red-500 hover:to-transparent py-3'>
                    Hard
                </Link>
                <p className='mt-10 w-2/3'>{hoverText}</p>
            </div >
        </div >
    );
};
