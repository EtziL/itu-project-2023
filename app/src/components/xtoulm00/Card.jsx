import React from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';

export const Suits = {
    CLUBS : 'clubs',
    SPADES : 'spades',
    HEARTS : 'hearts',
    DIAMONDS : 'diamonds'
}

export const Card = memo(({value, type}) => {
    const [{opacity}, drag] = useDrag(
        () => ({
            type,
            item: { value },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0 : 1,
            })
        }),
        [value, type]
    );

    const cardIcon = () => {
        switch (type) {
            case Suits.CLUBS:
                return '/public/clubs.svg';
            case Suits.SPADES:
                return '/public/spades.svg';
            case Suits.HEARTS:
                return '/public/hearts.svg';
            case Suits.DIAMONDS:
                return '/public/diamonds.svg';
        }
    };

    return (
        <div ref={drag} className={'select-none bg-gray-200 cursor-pointer w-[10%] border border-black rounded grid grid-cols-2 text-bold ' + ((type == Suits.CLUBS || type == Suits.SPADES) ? 'text-black' : 'text-red-600')}
        
            style={{opacity}}>
            <p className='ml-1'>{value}</p>
            <img src={cardIcon()} className='w-[30%] justify-self-end mt-1 mr-1'/>
            <img src={cardIcon()} className='col-span-2 py-5 w-[50%] place-self-center'/>
            <img src={cardIcon()} className='w-[30%] ml-1 mt-1'/>
            <p className='text-right mr-1'>{value}</p>
        </div>
    )
});
