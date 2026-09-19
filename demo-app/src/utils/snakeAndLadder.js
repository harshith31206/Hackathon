/**
 * Snake and Ladder Game Logic Utility
 */

// Standard Snake and Ladder board mappings (from -> to)
export const SNAKES_AND_LADDERS = {
  // Ladders
  2: 38,
  7: 14,
  8: 31,
  15: 26,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  78: 98,
  87: 94,
  // Snakes
  16: 6,
  47: 26,
  49: 11,
  56: 53,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78
};

/**
 * Rolls a 6-sided die
 * @returns {number} integer between 1 and 6
 */
export function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

/**
 * Calculates the new position given current position and dice roll
 * @param {number} currentPosition 
 * @param {number} diceRoll 
 * @returns {number} new position
 */
export function movePlayer(currentPosition, diceRoll) {
  if (typeof currentPosition !== 'number' || typeof diceRoll !== 'number') {
    throw new Error('Position and dice roll must be numbers.');
  }
  
  let newPos = currentPosition + diceRoll;
  
  // Cannot exceed winning position (100) exactly without exact roll, or bounces back / stops at 100
  if (newPos > 100) {
    return currentPosition; // Or standard rule: stay put if exceeds 100
  }

  // Check for snakes or ladders
  if (SNAKES_AND_LADDERS[newPos]) {
    newPos = SNAKES_AND_LADDERS[newPos];
  }

  return newPos;
}

/**
 * Checks if player has won
 * @param {number} position 
 * @returns {boolean}
 */
export function checkWin(position) {
  return position === 100;
}
