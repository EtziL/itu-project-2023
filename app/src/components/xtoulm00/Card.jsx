import React from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { Suits } from '../../../../api/solitaire';

export const GetCardIcon = (type) => {
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

export const Card = memo(({value, type}) => {
    const [{opacity}, drag] = useDrag(
        () => ({
            type,
            item: { value, type },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0 : 1,
            })
        }),
        [value, type]
    );



    return (
        <div ref={drag} className={'select-none bg-gray-200 cursor-pointer w-[90px] border border-black rounded grid grid-cols-2 text-bold ' + ((type == Suits.CLUBS || type == Suits.SPADES) ? 'text-black' : 'text-red-600')}
        
            style={{opacity}}>
            <p className='ml-1'>{value}</p>
            <img src={GetCardIcon(type)} className='w-[30%] justify-self-end mt-1 mr-1'/>
            <img src={GetCardIcon(type)} className='col-span-2 py-5 w-[50%] place-self-center'/>
            <img src={GetCardIcon(type)} className='w-[30%] ml-1 mt-1'/>
            <p className='text-right mr-1'>{value}</p>
        </div>
    )
});
