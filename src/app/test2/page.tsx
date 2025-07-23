'use client';
import React, { useState } from 'react';

const calculateWinner = (board) => {
  const temp = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];
  for (let [a, b, c] of temp) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
};
const page = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXTurn, setIsXTurn] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : '0';
    setBoard(newBoard);
    setIsXTurn((prev) => !prev);
  };
  const resetGame = () => {
    setBoard(initialBoard);
    setIsXTurn(true);
  };
  return (
    <div className="bg-white h-screen font-black">
      <div>page</div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="h-10 w-10 border-4"
            >
              {item}
            </button>
          );
        })}
      </div>
      <h2>
        {winner
          ? `Winner is ${winner}`
          : board.includes(null)
          ? `Next turn is of ${isXTurn ? 'X' : '0'} `
          : 'Draw'}
      </h2>
      <button
        onClick={() => {
          resetGame();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default page;
