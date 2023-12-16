import React from 'react';
import { useDrop } from 'react-dnd';
import { Card, Suits } from './Card';

export const CardColumn = ({ accept = Suits.CLUBS, cards, onDrop }) => {
    const getAccept = () => {
        if (cards.length == 0) {
            return [Suits.CLUBS, Suits.SPADES, Suits.HEARTS, Suits.DIAMONDS]
        } else {
            if (cards[cards.length - 1].type === Suits.CLUBS || cards[cards.length - 1].type === Suits.SPADES) {
                return [Suits.HEARTS, Suits.DIAMONDS]
            } else {
                return [Suits.CLUBS, Suits.SPADES]
            }
        }
    }

    const [{ isOver, canDrop }, dropCol] = useDrop({
        accept: getAccept(),
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    const isActive = isOver && canDrop;

    if (cards.length == 0) {
        return (
            <div ref={dropCol} className={'flex flex-col ' + (isActive ? 'bg-green-400 p-1' : 'bg-solitaireBg p-1')}>
                {
                    <div className='-mt-[120px] w-[105px] h-[150px]'>
                    </div>
                }
            </div>
        )
    }

    return (
        <div ref={dropCol} className={'flex flex-col ' + (isActive ? 'bg-green-400 p-1' : 'bg-solitaireBg p-1')}>
            {
                cards.map((card, index) => {
                    if (!card.revealed) {
                        return (
                            <div key={index} style={{ zIndex: index }}
                                className='-mt-[120px]'>
                                <Card 
                                    value={card.value}
                                    type={Suits.BACK}
                                    draggable={false} />
                            </div>
                        )
                    }

                    else {
                        return (
                            <div key={index} style={{ zIndex: index }}
                                className='-mt-[120px]'>
                                <Card 
                                    value={card.value}
                                    type={card.type}
                                    draggable={true} />
                            </div>)
                    }
                })
            }
        </div>
    )
}
