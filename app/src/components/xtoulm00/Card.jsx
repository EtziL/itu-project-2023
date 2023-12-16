import React from 'react';
import { memo } from 'react';
import { useDrag } from 'react-dnd';
import { icon_clubs, icon_spades, icon_hearts, icon_diamonds, card_back } from "../../assets/solitaire";

export const GetCardIcon = (type) => {
    switch (type) {
        case Suits.CLUBS:
            return icon_clubs;
        case Suits.SPADES:
            return icon_spades;
        case Suits.HEARTS:
            return icon_hearts;
        case Suits.DIAMONDS:
            return icon_diamonds;
        case Suits.BACK:
            return card_back;
    }
};

export const Suits = {
    CLUBS: 'CLUBS',
    SPADES: 'SPADES',
    HEARTS: 'HEARTS',
    DIAMONDS: 'DIAMONDS',
    BACK: 'HIDDEN'
};

export const Card = memo(({ value, type, draggable = true }) => {
    const [{ opacity }, drag] = useDrag(
        () => ({
            type,
            item: { value, type },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0 : 1,
            })
        }),
        [value, type]
    );

    const renderCard = () => {
        if (type !== Suits.BACK) {
            return (
                <div ref={draggable ? drag : null}
                    className={'select-none bg-gray-200 w-[105px] h-[150px] border border-black rounded grid grid-cols-2 text-bold '
                        + ((type == Suits.CLUBS || type == Suits.SPADES) ? 'text-black ' : 'text-red-600 ')
                        + (draggable ? 'cursor-pointer' : '')}
                    style={{ opacity }}>
                    <p className='ml-1'>{value}</p>
                    <img src={GetCardIcon(type)} className='w-[30%] justify-self-end mt-1 mr-1' />
                    <img src={GetCardIcon(type)} className='col-span-2 w-[50%] place-self-center' />
                    <img src={GetCardIcon(type)} className='w-[30%] ml-1 mt-1' />
                    <p className='text-right mr-1'>{value}</p>
                </div>
            )
        } else {
            return (
                <div className={'select-none w-[105px] h-[150px] border border-black rounded'}
                    style={{ opacity }}>
                    <img src={GetCardIcon(type)} className='object-cover' />
                </div>
            )
        }
    }

    return (
        renderCard()
    )
});
