import React, { useState } from 'react';
import { rollDice, movePlayer, checkWin, SNAKES_AND_LADDERS } from '../utils/snakeAndLadder';

export function SnakeAndLadder() {
        // Initialize player position state at 0
        const [playerPosition, setPlayerPosition] = useState(0);
        // Initialize dice result state as null
        const [diceResult, setDiceResult] = useState(null);
        // Initialize game status message state
        const [message, setMessage] = useState('Click "Roll Dice" to start the game!');
        // Initialize game over state as false
        const [isGameOver, setIsGameOver] = useState(false);

        // Handle dice roll action
        const handleRoll = () => {
                // Check if game is already over
                if (isGameOver) return;

                // Roll the dice to get a value between 1 and 6
                const roll = rollDice();
                // Update dice result state
                setDiceResult(roll);

                try {
                        // Calculate next player position
                        const nextPos = movePlayer(playerPosition, roll);
                        // Update player position state
                        setPlayerPosition(nextPos);

                        // Check if player has won the game
                        if (checkWin(nextPos)) {
                                // Set game over to true
                                setIsGameOver(true);
                                // Display win message
                                setMessage(`🎉 Congratulations! You landed on 100 and Won the Game!`);
                        } else if (nextPos > playerPosition) {
                                // Check if landed on a snake or ladder
                                const matched = SNAKES_AND_LADDERS[playerPosition + roll];
                                if (matched) {
                                        // Check if it's a ladder or snake
                                        if (matched > playerPosition + roll) {
                                                // Ladder message
                                                setMessage(`Rolled a ${roll}. Yay! Climbed a ladder to ${nextPos}!`);
                                        } else {
                                                // Snake message
                                                setMessage(`Rolled a ${roll}. Oh no! Bit by a snake down to ${nextPos}!`);
                                        }
                                } else {
                                        // Standard move message
                                        setMessage(`Rolled a ${roll}. Moved to ${nextPos}.`);
                                }
                        } else {
                                // Exceeds 100 message
                                setMessage(`Rolled a ${roll}. Exceeds 100, stay at ${playerPosition}.`);
                        }
                } catch (err) {
                        // Handle errors from move calculation
                        setMessage(err.message);
                }
        };

        // Handle game reset action
        const handleReset = () => {
                // Reset player position to 0
                setPlayerPosition(0);
                // Reset dice result to null
                setDiceResult(null);
                // Reset game message
                setMessage('Game reset. Click "Roll Dice" to play!');
                // Reset game over flag
                setIsGameOver(false);
        };

        // Generate 100 board cells for grid layout
        const boardCells = [];
        // Loop through rows from 10 down to 1
        for (let r = 10; r >= 1; r--) {
                const row = [];
                // Loop through columns from 1 to 10
                for (let c = 1; c <= 10; c++) {
                        // Calculate cell number based on snake and ladder zigzag pattern
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
                                        // Check if player is on current cell
                                        const isPlayerHere = playerPosition === num;
                                        // Check if cell has a snake or ladder
                                        const hasSnakeOrLadder = SNAKES_AND_LADDERS[num];
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
