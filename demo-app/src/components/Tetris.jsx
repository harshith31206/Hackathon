        import React, { useState, useEffect, useRef } from 'react';
        import { createStage, checkCollision, randomTetrominos, BOARD_WIDTH, BOARD_HEIGHT } from '../utils/tetris';

        export function Tetris() {
                // State for game board stage
                const [stage, setStage] = useState(createStage());
                // State for score, rows, and level
                const [score, setScore] = useState(0);
                const [rows, setRows] = useState(0);
                const [level,setLevel] = useState(0);
                // State for current player piece
                const [player, setPlayer] = useState({
                        pos: { x: 0, y: 0 },
                        tetromino: randomTetrominos().shape,
                        collided: false
                });
                // Game over and start states
                const [gameOver, setGameOver] = useState(false);
                const [dropTime, setDropTime] = useState(null);

                // Move player left or right
                const movePlayerHorizontal = (dir) => {
                        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
                                setPlayer(prev => ({
                                        ...prev,
                                        pos: { ...prev.pos, x: prev.pos.x + dir }
                                }));
                        }
                };

                // Start game handler
                const startGame = () => {
                        setStage(createStage());
                        setDropTime(1000);
                        setPlayer({
                                pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
                                tetromino: randomTetrominos().shape,
                                collided: false
                        });
                        setGameOver(false);
                        setScore(0);
                        setRows(0);
                        setLevel(0);
                };

                // Drop player down one row
                const drop = () => {
                        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
                                setPlayer(prev => ({
                                        ...prev,
                                        pos: { ...prev.pos, y: prev.pos.y + 1 }
                                }));
                        } else {
                                if (player.pos.y < 1) {
                                        setGameOver(true);
                                        setDropTime(null);
                                }
                                setPlayer(prev => ({ ...prev, collided: true }));
                        }
                };

                // Drop player immediately
                const dropPlayer = () => {
                        setDropTime(null);
                        drop();
                };

                // Key down handler for controls
                const move = ({ keyCode }) => {
                        if (!gameOver) {
                                if (keyCode === 37) {
                                        movePlayerHorizontal(-1);
                                } else if (keyCode === 39) {
                                        movePlayerHorizontal(1);
                                } else if (keyCode === 40) {
                                        dropPlayer();
                                } else if (keyCode === 38) {
                                        // Rotate player
                                        rotatePlayer(stage, 1);
                                }
                        }
                };

                // Rotate matrix helper
                const rotate = (matrix, dir) => {
                        const mtrx = matrix.map((_, index) =>
                                matrix.map(column => column[index])
                        );
                        if (dir > 0) return mtrx.map(row => row.reverse());
                        return mtrx.reverse();
                };

                // Rotate player piece
                const rotatePlayer = (stageGrid, dir) => {
                        const clonedPlayer = JSON.parse(JSON.stringify(player));
                        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);
                        const pos = clonedPlayer.pos.x;
                        let offset = 1;
                        while (checkCollision(clonedPlayer, stageGrid, { x: 0, y: 0 })) {
                                clonedPlayer.pos.x += offset;
                                offset = -(offset + (offset > 0 ? 1 : -1));
                                if (offset > clonedPlayer.tetromino[0].length) {
                                        rotate(clonedPlayer.tetromino, -dir);
                                        clonedPlayer.pos.x = pos;
                                        return;
                                }
                        }
                        setPlayer(clonedPlayer);
                };

                // Interval hook for game loop
                useInterval(() => {
                        drop();
                }, dropTime);

                // Effect to handle stage updates and row clearing
                useEffect(() => {
                        const updateStage = prevStage => {
                                const newStage = prevStage.map(row =>
                                        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                                );

                                player.tetromino.forEach((row, y) => {
                                        row.forEach((value, x) => {
                                                if (value !== 0) {
                                                        newStage[y + player.pos.y][x + player.pos.x] = [
                                                                value,
                                                                player.collided ? 'merged' : 'clear'
                                                        ];
                                                }
                                        });
                                });

                                if (player.collided) {
                                        setPlayer({
                                                pos: { x: BOARD_WIDTH / 2 - 2, y: 0 },
                                                tetromino: randomTetrominos().shape,
                                                collided: false
                                        });

                                        // Check and clear rows
                                        let clearedRows = 0;
                                        const sweptStage = newStage.reduce((acc, row) => {
                                                if (row.findIndex(cell => cell[0] === 0) === -1) {
                                                        clearedRows += 1;
                                                        acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                                                        return acc;
                                                }
                                                acc.push(row);
                                                return acc;
                                        }, []);

                                        if (clearedRows > 0) {
                                                setScore(prev => prev + clearedRows * 100);
                                                setRows(prev => prev + clearedRows);
                                        }

                                        return sweptStage;
                                }

                                return newStage;
                        };

                        setStage(prev => updateStage(prev));
                }, [player.collided, player.pos, player.tetromino]);

                return (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                                <h2>Tetris Clone</h2>
                                <div style={{ display: 'flex', gap: '20px' }}>
                                        <div style={{
                                                display: 'grid',
                                                gridTemplateRows: `repeat(${BOARD_HEIGHT}, 20px)`,
                                                gridTemplateColumns: `repeat(${BOARD_WIDTH}, 20px)`,
                                                gap: '1px',
                                                background: '#111',
                                                border: '2px solid #333'
                                        }}
                                        tabIndex="0"
                                        onKeyDown={e => move(e)}
                                        >
                                                {stage.map((row, y) =>
                                                        row.map((cell, x) => (
                                                                <div
                                                                        key={`${y}-${x}`}
                                                                        style={{
                                                                                width: '20px',
                                                                                height: '20px',
                                                                                background: cell[0] === 0 ? '#1e293b' : `rgb(${cell[0] === 1 ? '0, 240, 240' : cell[0] === 2 ? '0, 0, 240' : cell[0] === 3 ? '240, 160, 0' : cell[0] === 4 ? '240, 240, 0' : cell[0] === 5 ? '0, 240, 0' : cell[0] === 6 ? '160, 0, 240' : '240, 0, 0'})`,
                                                                                border: cell[0] === 0 ? '1px solid #334155' : '1px solid #fff'
                                                                        }}
                                                                />
                                                        ))
                                                )}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px' }}>
                                                <div style={{ padding: '10px', background: '#1e293b', borderRadius: '6px' }}>
                                                        <div>Score: {score}</div>
                                                        <div>Rows: {rows}</div>
                                                        <div>Level: {level}</div>
                                                </div>
                                                {gameOver && (
                                                        <div style={{ color: 'red', fontWeight: 'bold' }}>Game Over</div>
                                                )}
                                                <button
                                                        onClick={startGame}
                                                        style={{ padding: '10px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                                                >
                                                        {gameOver ? 'Play Again' : 'Start Game'}
                                                </button>
                                        </div>
                                </div>
                        </div>
                );
        }

        // Custom interval hook helper
        function useInterval(callback, delay) {
                const savedCallback = useRef();
                useEffect(() => {
                        savedCallback.current = callback;
                }, [callback]);
                useEffect(() => {
                        function tick() {
                                savedCallback.current();
                        }
                        if (delay !== null) {
                                const id = setInterval(tick, delay);
                                return () => clearInterval(id);
                        }
                }, [delay]);
        }