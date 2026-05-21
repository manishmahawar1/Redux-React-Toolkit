import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, incrementByAmount, reset } from "../features/counter/counterSlice.js"

export default function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const [inputValue, setInputValue] = useState(0);

  return (
    <div>
      <h1>{count}</h1>
      <input type="number" onChange={(e)=> setInputValue(e.target.value)} value={inputValue}/>

      <button onClick={()=> dispatch(increment())}>Increase</button>
      <button onClick={()=> dispatch(decrement())}>decrease</button>
      <button onClick={()=> dispatch(incrementByAmount(5))}>Increase By +5</button>
      <button onClick={()=> dispatch(incrementByAmount(10))}>Increase By +10</button>
      <button onClick={()=> dispatch(incrementByAmount(Number(inputValue)))}>Input Added</button>
      <button onClick={()=> dispatch(reset())}>Reset</button> 
    </div>
  )
}
