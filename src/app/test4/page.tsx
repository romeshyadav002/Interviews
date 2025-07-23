'use client';
import React, { useEffect, useState } from 'react';
const wordList = [
  'react',
  'javascript',
  'component',
  'state',
  'props',
  'hooks',
  'function',
  'interface',
  'developer',
  'application',
];
const getScrambledWord = (word) => {
  let arr = word.split('');
  for (let i = 0; i < arr.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr.join('');
};

const page = () => {
  const [score, setScore] = useState(0);
  const [word, setWord] = useState('tcaer');
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    if (wordList.includes(text)) {
      alert('You are right');
    } else {
      setError(true);
      setText('');
    }
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 10);
    const currWord = wordList[random];
    setWord(getScrambledWord(currWord));
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <h1>Word Game</h1>
      <div>
        <p>{score}</p>
        <p>Time</p>
        <p>{word}</p>
      </div>

      <input
        value={text}
        onChange={(e) => {
          setError(false);
          setText(e.target.value);
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={word && word.length !== text.length}
      >
        Submit
      </button>
      {error && <p> Try Again</p>}
    </div>
  );
};

export default page;
