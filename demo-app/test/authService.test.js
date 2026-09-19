import test from 'node:test';
import assert from 'node:assert';
import { createTokenPair, rotateRefreshToken, isRefreshTokenValid, clearTokenStore } from '../src/utils/authService.js';

test.beforeEach(() => {
  clearTokenStore();
});

test('createTokenPair generates valid access and refresh tokens', () => {
  const tokens = createTokenPair('user_123');
  assert.ok(tokens.accessToken);
  assert.ok(tokens.refreshToken);
  assert.strictEqual(isRefreshTokenValid(tokens.refreshToken), true);
});

test('rotateRefreshToken invalidates the previous refresh token and issues a new pair', () => {
  const initial = createTokenPair('user_123');
  const rotated = rotateRefreshToken(initial.refreshToken);

  assert.notStrictEqual(initial.refreshToken, rotated.refreshToken);
  assert.notStrictEqual(initial.accessToken, rotated.accessToken);
  
  // Previous token should now be invalid
  assert.strictEqual(isRefreshTokenValid(initial.refreshToken), false);
  // New token should be valid
  assert.strictEqual(isRefreshTokenValid(rotated.refreshToken), true);
});

test('rotateRefreshToken detects replay attack and revokes the token family', () => {
  const initial = createTokenPair('user_123');
  const rotated1 = rotateRefreshToken(initial.refreshToken);

  // Attempt replay attack by reusing the initial (now revoked) refresh token
  assert.throws(() => {
    rotateRefreshToken(initial.refreshToken);
  }, /Security alert: Refresh token reuse detected/);

  // The subsequent token in the family should also be invalidated now
  assert.strictEqual(isRefreshTokenValid(rotated1.refreshToken), false);
});

test('rotateRefreshToken throws error for unknown or missing tokens', () => {
  assert.throws(() => {
    rotateRefreshToken('non_existent_token');
  }, /Invalid refresh token/);

  assert.throws(() => {
    rotateRefreshToken(null);
  }, /Refresh token is required/);
});
