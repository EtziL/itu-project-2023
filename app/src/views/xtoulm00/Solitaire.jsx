import React, { useState, useEffect } from 'react';
import { Card, Suits } from '../../components/xtoulm00/Card';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SuitHouse } from '../../components/xtoulm00/SuitHouse';
import axios from 'axios';

export const Solitaire = () => {
  const [houses, setHouses] = useState([])
  const [stack, setStack] = useState([])
  const [waste, setWaste] = useState([])
  const [empty, setEmpty] = useState(false)

  const update = (res) => {
    setHouses(res.data.housePiles);
    setWaste(res.data.waste);
    if (!res.data.deck.length) {
      setEmpty(true)
    } else {
      setEmpty(false)
    }
  }

  const getState = async () => {
    axios
      .get('http://localhost:3000/solitaire/load')
      .then((res) => {
        update(res);
      });
  }

  useEffect(() => {
    getState();
  }, [])


  const handleDrop = async (suit, card) => {
    axios
      .post('http://localhost:3000/solitaire/drop-house', {
        card: card,
        suit: suit
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
      <div className='bg-solitaireBg'>

        <div className='container mx-auto grid grid-cols-2 w-screen h-screen'>
          <div className='grid grid-cols-2'>
            <div className='cursor-pointer w-fit h-fit' onClick={(e) => handleDraw()}>
              {empty ? <div className='w-[105px] h-[150px] bg-green-300 opacity-50 rounded'></div> : <Card value="A" type={Suits.BACK} />}
            </div>
            {waste[waste.length - 1] && <Card value={waste[waste.length - 1].value} type={waste[waste.length - 1].type} />}
          </div>
          <div className='flex flex-row justify-between'>
            {houses.map(({ suit, lastDropped }, index) => (
              <SuitHouse accept={suit} lastDropped={lastDropped} onDrop={(card) => handleDrop(suit, card)} key={index} />
            ))}
          </div>
          <div className='col-span-2 flex flex-row justify-between'>
            <p>col1</p>
            <p>col2</p>
            <p>col3</p>
            <p>col4</p>
            <p>col5</p>
            <p>col6</p>
            <p>col7</p>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
