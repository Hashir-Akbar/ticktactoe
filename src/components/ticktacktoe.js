
"use client"

import { useState } from 'react';
import styles from '../styles/TicTacToe.module.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board) || isBoardFull(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const tie = isBoardFull(board) && !winner;
  const status = winner ? `Winner: ${winner}` : tie ? 'It\'s a tie!' : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className={styles.game}>
      <div className={styles.status}>{status}</div>
      <div className={styles.board}>
        {board.map((value, index) => (
          <button key={index} className={styles.square} onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>
      <button className={styles.reset} onClick={() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
      }}>
        Reset
      </button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const isBoardFull = (board) => {
  return board.every(square => square !== null);
};

export default TicTacToe;
