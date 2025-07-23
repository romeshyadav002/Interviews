'use client';
import React, { useReducer } from 'react';

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
  }
}
const page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      page
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: 'increment' })}> Increase</button>
      <button onClick={() => dispatch({ type: 'decrement' })}> Decrease</button>
    </div>
  );
};

export default page;
