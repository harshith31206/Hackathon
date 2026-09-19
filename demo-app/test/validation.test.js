import test from 'node:test';
import assert from 'node:assert';
import { validatePasswordStrength, validateRegistration } from '../src/utils/validation.js';

test('validatePasswordStrength rejects passwords shorter than 8 characters', () => {
  const result = validatePasswordStrength('Short1!');
  assert.strictEqual(result, 'Password must be at least 8 characters long.');
});

test('validatePasswordStrength rejects passwords missing a number', () => {
  const result = validatePasswordStrength('LongPassword!');
  assert.strictEqual(result, 'Password must contain at least one number.');
});

test('validatePasswordStrength rejects passwords missing a special character', () => {
  const result = validatePasswordStrength('LongPassword1');
  assert.strictEqual(result, 'Password must contain at least one special character.');
});

test('validatePasswordStrength rejects empty or missing passwords', () => {
  const result = validatePasswordStrength('');
  assert.strictEqual(result, 'Password is required.');
});

test('validatePasswordStrength accepts fully compliant passwords', () => {
  const result = validatePasswordStrength('ValidPass1@');
  assert.strictEqual(result, null);
});

test('validateRegistration validates overall form fields correctly', () => {
  const invalidResult = validateRegistration('', 'invalid-email', 'weak');
  assert.strictEqual(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.username);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.password);

  const validResult = validateRegistration('testuser', 'user@example.com', 'ValidPass1@');
  assert.strictEqual(validResult.isValid, true);
  assert.deepStrictEqual(validResult.errors, {});
});
