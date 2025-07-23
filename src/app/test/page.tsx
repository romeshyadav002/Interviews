'use client';
import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev - 10);
      }, [10]);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const miilisconds = ms % 1000;
    return `${seconds}.${miilisconds.toString().padStart(3, '0')}s`;
  };
  return (
    <div className="flex p-10 flex-col">
      {formatTime(time)}

      <button
        onClick={() => {
          const temp = prompt('Enter time');
          setTime(temp);
        }}
      >
        Set Timer
      </button>
      {!isRunning ? (
        <button onClick={() => setIsRunning(true)}> Start</button>
      ) : (
        <button onClick={() => setIsRunning(false)}> Pause</button>
      )}
      <button
        onClick={() => {
          setIsRunning(false);
          setTime(0);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Page;
