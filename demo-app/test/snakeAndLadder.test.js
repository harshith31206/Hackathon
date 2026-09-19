import test from 'node:test';
import assert from 'node:assert';
import { rollDice, movePlayer, checkWin } from '../src/utils/snakeAndLadder.js';

test('rollDice returns a number between 1 and 6', () => {
  for (let i = 0; i < 50; i++) {
    const roll = rollDice();
    assert.ok(roll >= 1 && roll <= 6);
  }
});

test('movePlayer moves player forward correctly without snake or ladder', () => {
  const newPos = movePlayer(10, 3);
  assert.strictEqual(newPos, 13);
});

test('movePlayer triggers ladder when landing on ladder base', () => {
  const newPos = movePlayer(0, 2); // 2 is ladder base -> 38
  assert.strictEqual(newPos, 38);
});

test('movePlayer triggers snake when landing on snake head', () => {
  const newPos = movePlayer(10, 6); // 16 is snake head -> 6
  assert.strictEqual(newPos, 6);
});

test('checkWin correctly identifies winning position 100', () => {
  assert.strictEqual(checkWin(100), true);
  assert.strictEqual(checkWin(99), false);
});
