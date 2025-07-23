'use client';
import React, { useEffect, useState } from 'react';

const Seq = ['red', 'yellow', 'green'];
const dummy = ['red', 'green', 'yellow'];
const page = () => {
  const [curr, setCurr] = useState('red');
  const [orient, setOrient] = useState('vertical');
  const Timings = { red: 2000, yellow: 500, green: 1000 };

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = dummy[(dummy.indexOf(curr) + 1) % dummy.length];
      setCurr(next);
    }, Timings[curr]);

    return () => clearTimeout(timer);
  }, [curr]);

  const handleOrientation = () => {
    setOrient((prev) => {
      if (prev === 'vertical') {
        return 'horizontal';
      } else {
        return 'vertical';
      }
    });
  };
  return (
    <div>
      <h1>Spot Lights </h1>
      <div
        className={`flex bg-white p-4 ${
          orient === 'vertical' ? 'flex-col' : 'flex-row'
        }`}
      >
        {Seq.map((val) => {
          return (
            <div
              key={val}
              className={`w-16 h-16 rounded-full transition-opacity duration-300 ${
                curr === val ? 'opacity-100' : 'opacity-20'
              }
              ${
                val === 'red'
                  ? 'bg-red-500'
                  : val === 'yellow'
                  ? 'bg-yellow-400'
                  : 'bg-green-800'
              }
              
              `}
            ></div>
          );
        })}
      </div>
      <button onClick={handleOrientation}>Toggle Orientation</button>
    </div>
  );
};

export default page;
