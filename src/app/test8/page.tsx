'use client';
import React, { useState } from 'react';

const MAX = 5;
const page = () => {
  const [rating, setRating] = useState(0);
  const arr = [...Array(MAX)];
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1>{rating}</h1>
      <>
        {arr.map((val, index) => {
          return (
            <div
              key={index}
              onClick={() => setRating(index + 1)}
              className="cursor-pointer"
            >
              ⭐️
            </div>
          );
        })}
      </>
    </div>
  );
};

export default page;
