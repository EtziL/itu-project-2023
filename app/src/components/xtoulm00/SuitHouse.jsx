import React from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';

export const SuitHouse = ({ accept, lastDropped, onDrop }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept,
        drop: onDrop,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    })

    const isActive = isOver && canDrop;

    return (
        <div>
            <div ref={drop} className={'w-fit p-1 ' + (isActive ? 'bg-green-400' : 'bg-solitaireBg')}>
                <Card value={lastDropped ? lastDropped.value : ""} type={accept} draggable={false}/>
            </div>
        </div>
    )
}
