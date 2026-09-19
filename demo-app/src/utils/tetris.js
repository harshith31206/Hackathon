        // Tetris game utility module
        export const BOARD_WIDTH = 10;
        export const BOARD_HEIGHT = 20;

        // Define tetrimino shapes and colors
        export const TETROMINOS = {
                0: { shape: [[0]], color: 'transparent' },
                I: {
                        shape: [
                                [0, 0, 0, 0],
                                [1, 1, 1, 1],
                                [0, 0, 0, 0],
                                [0, 0, 0, 0]
                        ],
                        color: '0, 240, 240'
                },
                J: {
                        shape: [
                                [2, 0, 0],
                                [2, 2, 2],
                                [0, 0, 0]
                        ],
                        color: '0, 0, 240'
                },
                L: {
                        shape: [
                                [0, 0, 3],
                                [3, 3, 3],
                                [0, 0, 0]
                        ],
                        color: '240, 160, 0'
                },
                O: {
                        shape: [
                                [4, 4],
                                [4, 4]
                        ],
                        color: '240, 240, 0'
                },
                S: {
                        shape: [
                                [0, 5, 5],
                                [5, 5, 0],
                                [0, 0, 0]
                        ],
                        color: '0, 240, 0'
                },
                T: {
                        shape: [
                                [0, 6, 0],
                                [6, 6, 6],
                                [0, 0, 0]
                        ],
                        color: '160, 0, 240'
                },
                Z: {
                        shape: [
                                [7, 7, 0],
                                [0, 7, 7],
                                [0, 0, 0]
                        ],
                        color: '240, 0, 0'
                }
        };

        // Helper to create an empty board
        export function createStage() {
                // Create 2D grid filled with 0
                return Array.from(Array(BOARD_HEIGHT), () =>
                        Array(BOARD_WIDTH).fill([0, 'clear'])
                );
        }

        // Helper to get a random tetrimino
        export function randomTetrominos() {
                const keys = 'IJLOSTZ';
                const randKey = keys[Math.floor(Math.random() * keys.length)];
                return TETROMINOS[randKey];
        }

        // Collision detection helper function
        export function checkCollision(player, stage, { x: moveX, y: moveY }) {
                for (let y = 0; y < player.tetromino.length; y += 1) {
                        for (let x = 0; x < player.tetromino[y].length; x += 1) {
                                // Check if we are on an actual tetrimino cell
                                if (player.tetromino[y][x] !== 0) {
                                        if (
                                                // Check that our move is inside the game areas height (y)
                                                !stage[y + player.pos.y + moveY] ||
                                                // Check that our move is inside the game areas width (x)
                                                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                                                // Check that the cell we are moving to isn't set to clear
                                                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                                        ) {
                                                return true;
                                        }
                                }
                        }
                }
                return false;
        }