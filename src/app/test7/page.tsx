'use client';
import React, { useEffect, useRef, useState } from 'react';

function isPrime(n) {
  if (n <= 1) return false;
  if (n == 2) return true;
  if (n % 2 == 0) return true;
  for (let i = 3; i <= Math.sqrt(n); i = i + 2) {
    if (n % i == 0) return false;
  }
  return true;
}
const page = () => {
  const [number, setNumber] = useState<number>(1);
  const [isRunning, SetIsRunning] = useState(false);
  const timer = useRef(null);
  const getProperties = (n) => {
    const props = [];
    if (n % 2 == 0) {
      props.push('EVEN');
    } else {
      props.push('ODD');
    }
    if (isPrime(n)) {
      props.push('prime');
    }
    return props;
  };
  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        setNumber((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }
    return () => clearInterval(timer.current);
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-6xl font-extrabold mb-4">{number}</div>
      <div>
        {getProperties(number).map((val, index) => {
          return <div key={index}>{val}</div>;
        })}
      </div>
      <div
        onClick={() => SetIsRunning(true)}
        className="px-6 py-2 bg-amber-500 rounded-2xl"
      >
        {isRunning ? 'Pause' : 'Play'}
      </div>
    </div>
  );
};

export default page;
