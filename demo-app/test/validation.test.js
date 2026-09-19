import test from 'node:test';
import assert from 'node:assert';
import { validatePasswordStrength, validateRegistration } from '../src/utils/validation.js';

test('validatePasswordStrength checks for empty passwords', () => {
  assert.strictEqual(validatePasswordStrength(''), 'Password is required.');
  assert.strictEqual(validatePasswordStrength(null), 'Password is required.');
});

test('validatePasswordStrength checks for minimum length of 8 characters', () => {
  assert.strictEqual(validatePasswordStrength('Abc1!'), 'Password must be at least 8 characters long.');
  assert.strictEqual(validatePasswordStrength('abcdef1!'), null);
});

test('validatePasswordStrength checks for at least one number', () => {
  assert.strictEqual(validatePasswordStrength('Abcdefgh!'), 'Password must be at least one number.');
  assert.strictEqual(validatePasswordStrength('Abcdefg1!'), null);
});

test('validatePasswordStrength checks for at least one special character', () => {
  assert.strictEqual(validatePasswordStrength('Abcdefg1'), 'Password must contain at least one special character.');
  assert.strictEqual(validatePasswordStrength('Abcdefg1!'), null);
});

test('validateRegistration validates overall user registration correctly', () => {
  const invalidResult = validateRegistration('', 'invalid-email', 'short');
  assert.strictEqual(invalidResult.isValid, false);
  assert.strictEqual(invalidResult.errors.username, 'Username is required.');
  assert.strictEqual(invalidResult.errors.email, 'Valid email is required.');
  assert.strictEqual(invalidResult.errors.password, 'Password must be at least 8 characters long.');

  const validResult = validateRegistration('johndoe', 'john@example.com', 'SecurePass1!');
  assert.strictEqual(validResult.isValid, true);
  assert.deepStrictEqual(validResult.errors, {});
});
