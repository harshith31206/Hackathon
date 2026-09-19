import React, { useState } from 'react';
import { rollDice, movePlayer, checkWin, SNAKES_AND_LADDERS } from '../utils/snakeAndLadder';

export function SnakeAndLadder() {
  const [playerPosition, setPlayerPosition] = useState(0);
  const [diceResult, setDiceResult] = useState(null);
  const [message, setMessage] = useState('Click "Roll Dice" to start the game!');
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRoll = () => {
    if (isGameOver) return;

    const roll = rollDice();
    setDiceResult(roll);

    try {
      const nextPos = movePlayer(playerPosition, roll);
      setPlayerPosition(nextPos);

      if (checkWin(nextPos)) {
        setIsGameOver(true);
        setMessage(`🎉 Congratulations! You landed on 100 and Won the Game!`);
      } else if (nextPos > playerPosition) {
        const matched = SNAKES_AND_LADDERS[playerPosition + roll];
        if (matched) {
          if (matched > playerPosition + roll) {
            setMessage(`Rolled a ${roll}. Yay! Climbed a ladder to ${nextPos}!`);
          } else {
            setMessage(`Rolled a ${roll}. Oh no! Bit by a snake down to ${nextPos}!`);
          }
        } else {
          setMessage(`Rolled a ${roll}. Moved to ${nextPos}.`);
        }
      } else {
        setMessage(`Rolled a ${roll}. Exceeds 100, stay at ${playerPosition}.`);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleReset = () => {
    setPlayerPosition(0);
    setDiceResult(null);
    setMessage('Game reset. Click "Roll Dice" to play!');
    setIsGameOver(false);
  };

  // Generate 100 board cells (10x10 grid layout representation)
  const boardCells = [];
  for (let r = 10; r >= 1; r--) {
    const row = [];
    for (let c = 1; c <= 10; c++) {
      const cellNum = r % 2 === 0 
        ? (r - 1) * 10 + c 
        : r * 10 - (c - 1);
      row.push(cellNum);
    }
    boardCells.push(row);
  }

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '24px', border: '1px solid #334155', borderRadius: '12px', background: '#1e293b', color: '#f8fafc' }}>
      <h2 style={{ textAlign: 'center', color: '#38bdf8' }}>Snake and Ladder Game</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '16px', fontSize: '1.1rem', fontWeight: 'bold' }}>
        {message}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '20px' }}>
        <div>Current Position: <strong>{playerPosition}</strong></div>
        <div>Dice Roll: <strong>{diceResult !== null ? diceResult : '-'}</strong></div>
        <button 
          onClick={handleRoll} 
          disabled={isGameOver}
          style={{ padding: '10px 20px', background: isGameOver ? '#64748b' : '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: isGameOver ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
          Roll Dice
        </button>
        <button 
          onClick={handleReset}
          style={{ padding: '10px 20px', background: '#475569', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Reset
        </button>
      </div>

      {/* Mini Visual Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px', background: '#0f172a', padding: '8px', borderRadius: '8px' }}>
        {boardCells.flat().map((num) => {
          const isPlayerHere = playerPosition === num;
          const hasSnakeOrLadder = SNAKES_AND_Lanners || SNAKES_AND_LADDERS[num];
          return (
            <div 
              key={num} 
              style={{
                aspectRatio: '1', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '0.75rem',
                background: isPlayerHere ? '#38bdf8' : (hasSnakeOrLadder ? '#334155' : '#1e293b'),
                color: isPlayerHere ? '#0f172a' : '#94a3b8',
                fontWeight: isPlayerHere ? 'bold' : 'normal',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.05)'
              }}>
              {isPlayerHere ? '👤 P' : num}
            </div>
          );
        })}
      </div>
    </div>
  );
}
