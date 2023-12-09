import React from 'react';
import { Card, Suits } from '../../components/xtoulm00/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Solitaire = () => {
  return (
    <DndProvider backend={HTML5Backend}>
        <div className='bg-solitaireBg'>

        <div className='container mx-auto w-screen h-screen'>
            <Card value="7" type={Suits.SPADES} />
            <Card value="J" type={Suits.HEARTS} />
            <Card value="K" type={Suits.CLUBS} />
            <Card value="A" type={Suits.DIAMONDS} />
        </div>
        </div>
    </DndProvider>
  )
}
