import test from 'node:test';
import assert from 'node:assert';
import { generateTokenPair, rotateRefreshToken, getTokenData, clearTokenStore } from '../src/utils/tokenService.js';

test.beforeEach(() => {
  clearTokenStore();
});

test('generateTokenPair creates valid initial tokens', () => {
  const { accessToken, refreshToken, familyId } = generateTokenPair('user123');
  assert.ok(accessToken);
  assert.ok(refreshToken);
  assert.ok(familyId);

  const tokenData = getTokenData(refreshToken);
  assert.strictEqual(tokenData.userId, 'user123');
  assert.strictEqual(tokenData.revoked, false);
});

test('rotateRefreshToken invalidates previous token and issues a new pair', () => {
  const initial = generateTokenPair('user123');
  const rotated = rotateRefreshToken(initial.refreshToken);

  assert.ok(rotated.accessToken);
  assert.ok(rotated.refreshToken);
  assert.notStrictEqual(rotated.refreshToken, initial.refreshToken);

  // Previous token should now be marked as revoked
  const oldTokenData = getTokenData(initial.refreshToken);
  assert.strictEqual(oldTokenData.revoked, true);

  // New token should be valid and active
  const newTokenData = getTokenData(rotated.refreshToken);
  assert.strictEqual(newTokenData.revoked, false);
  assert.strictEqual(newTokenData.familyId, initial.familyId);
});

test('rotateRefreshToken detects replay attacks and revokes the token family', () => {
  const initial = generateTokenPair('user123');
  
  // First rotation succeeds
  const firstRotate = rotateRefreshToken(initial.refreshToken);
  assert.ok(firstRotate.refreshToken);

  // Attempting to reuse the original (now revoked) refresh token simulates a replay attack
  assert.throws(() => {
    rotateRefreshToken(initial.refreshToken);
  }, /Security Alert: Refresh token reuse detected/);

  // Subsequent attempts to use the valid successor should also fail because the family is revoked
  assert.throws(() => {
    rotateRefreshToken(firstRotate.refreshToken);
  }, /Security Alert: Refresh token reuse detected/);
});
