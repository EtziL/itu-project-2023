/**
 * Main solitaire game view.
*
* Author: Toul Matěj (xtoulm00)
*/

import React, { useState, useEffect } from 'react';
import { Card, Suits } from '../../components/xtoulm00/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SuitHouse } from '../../components/xtoulm00/SuitHouse';
import axios from 'axios';
import { CardColumn } from '../../components/xtoulm00/CardColumn';
import { Link, useParams, useNavigate } from 'react-router-dom';

export const Solitaire = () => {
    const { difficulty = 'easy' } = useParams();
    const [houses, setHouses] = useState([])
    const [piles, setPiles] = useState([])
    const [waste, setWaste] = useState([])
    const [empty, setEmpty] = useState(false)
    const [score, setScore] = useState(0)
    const [startTime, setStartTime] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const navigate = useNavigate();

    const update = (res) => {
        setHouses(res.data.housePiles);
        setWaste(res.data.waste);
        setPiles(res.data.piles);
        setScore(res.data.score);
        setStartTime(res.data.startTime);
        setMinutes(0);
        setSeconds(0);
        getTime();
        if (!res.data.deck.length) {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
        if (res.data.won) {
            navigate('/solitaire/results');
        }
        return true;
    }

    const getTime = () => {
        const time = Date.now() - startTime;

        setMinutes(Math.floor(time / 60000));
        setSeconds(Math.floor((time / 1000) % 60));
    }

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        newGame();

        return () => clearInterval(interval);
    }, [])

    const newGame = async () => {
        axios
            .post('http://localhost:3000/solitaire/new', {
                difficulty
            })
            .then((res) => {
                update(res);
            });
    }

    const handleDrop = async (suit, card) => {
        axios
            .post('http://localhost:3000/solitaire/drop-house', {
                card: card,
                suit: suit
            }).then((res) => {
                update(res);
            })
    }

    const handleDropPile = async (index, card) => {
        axios
            .post('http://localhost:3000/solitaire/drop-pile', {
                card,
                index
            }).then((res) => {
                update(res);
            })
    }

    const handleDraw = async () => {
        axios
            .get('http://localhost:3000/solitaire/draw')
            .then((res) => {
                update(res);
            });
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='bg-solitaireBg h-screen'>

                <div className='absolute font-bold flex justify-between items-center w-full py-2 px-10 mb-5 bg-slate-200 font-slab'>
                    <p className='text-black text-2xl'>Score: {score}</p>
                    <p className='text-black text-2xl'>Time: {minutes}m {seconds}s</p>
                    <div className='flex gap-5'>
                        <button className='transition bg-red-400 border-b-4 border-red-500 hover:bg-red-300 rounded p-3' onClick={() => newGame()}>New Game</button>
                        <Link to='/'>
                            <button className='transition bg-green-400 border-b-4 border-green-500 hover:bg-green-300 rounded p-3'>Main Menu</button>
                        </Link>
                    </div>
                </div>
                <div className='container mx-auto flex flex-col items-start w-screen h-full pt-32'>
                    <div className='flex flex-row w-full justify-between basis-2/5'>
                        <div className='flex flex-row justify-between basis-1/3'>
                            <div className='cursor-pointer w-fit h-fit' onClick={(e) => handleDraw()}>
                                {empty ? <div className='w-[105px] h-[150px] bg-green-300 opacity-50 rounded'></div> : <Card value="A" type={Suits.BACK} />}
                            </div>
                            {waste && waste[waste.length - 1] && <Card value={waste[waste.length - 1].value} type={waste[waste.length - 1].type} />}
                        </div>
                        <div className='flex flex-row gap-5'>
                            {houses && houses.map(({ suit, lastDropped }, index) => (
                                <SuitHouse accept={suit} lastDropped={lastDropped} onDrop={(card) => handleDrop(suit, card)} key={index} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-row justify-between self-start w-full'>
                        {piles &&
                            piles.map((pile, index) => (
                                <div key={index}>
                                    {
                                        <CardColumn cards={pile} onDrop={(card) => handleDropPile(index, card)} />
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </DndProvider>
    )

}
