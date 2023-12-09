import React, { useState } from 'react';
import { Card } from '../../components/xtoulm00/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SuitHouse } from '../../components/xtoulm00/SuitHouse';
import { SolitareManager, Suits } from '../../../../api/solitaire';

export const Solitaire = () => {
  const game = new SolitareManager();

  const [cards, setCards] = useState([
    { value: '7', type: Suits.SPADES },
    { value: 'J', type: Suits.HEARTS },
    { value: 'K', type: Suits.CLUBS },
    { value: 'A', type: Suits.DIAMONDS },
  ])

  const handleDrop = (item) => {
    let toDelete = cards.indexOf();
    console.log(cards);
    if (toDelete !== -1) {
      const updatedCards = [...cards];
      updatedCards.splice(toDelete, 1);
      setCards(updatedCards);
      console.log('spliced');
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='bg-solitaireBg'>

        <div className='container mx-auto grid grid-cols-2 w-screen h-screen'>
          <div>
            {cards.map(({ value, type }, index) => (
              <Card value={value} type={type} key={index} />
            ))}
          </div>
          <div>

            <SuitHouse accept={Suits.SPADES} lastDropped={null} onDrop={(item) => handleDrop(item)} />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
