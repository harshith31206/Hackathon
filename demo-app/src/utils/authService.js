/**
 * Authentication Service utility for handling secure token rotation and replay attack prevention (AUTH-204)
 */

// In-memory token store for demonstration and testing purposes
// Maps refreshToken -> { userId, familyId, isRevoked }
const tokenStore = new Map();

/**
 * Generates a mock token pair for a user
 * @param {string} userId 
 * @param {string} [familyId]
 * @returns {Object} { accessToken, refreshToken, familyId }
 */
export function createTokenPair(userId, familyId = generateUUID()) {
  const accessToken = `at_${Math.random().toString(36).substring(2)}_${Date.now()}`;
  const refreshToken = `rt_${Math.random().toString(36).substring(2)}_${Date.now()}`;

  tokenStore.set(refreshToken, {
    userId,
    familyId,
    isRevoked: false
  });

  return { accessToken, refreshToken, familyId };
}

/**
 * Rotates a refresh token: invalidates the old refresh token and returns a new access & refresh token pair.
 * Detects replay attacks if a revoked token is reused, revoking the entire token family.
 * 
 * @param {string} refreshToken - The current refresh token
 * @returns {Object} { accessToken, refreshToken }
 * @throws {Error} if token is invalid, expired, or compromised (replay attack detected)
 */
export function rotateRefreshToken(refreshToken) {
  if (!refreshToken || typeof refreshToken !== 'string') {
    throw new Error('Refresh token is required.');
  }

  const tokenRecord = tokenStore.get(refreshToken);

  if (!tokenRecord) {
    throw new Error('Invalid refresh token.');
  }

  // Check if token was already revoked (Replay attack detection)
  if (tokenRecord.isRevoked) {
    // Revoke all tokens in this family as a security measure
    for (const [token, record] of tokenStore.entries()) {
      if (record.familyId === tokenRecord.familyId) {
        record.isRevoked = true;
      }
    }
    throw new Error('Security alert: Refresh token reuse detected. Token family revoked.');
  }

  // Invalidate the current refresh token (Rotation)
  tokenRecord.isRevoked = true;

  // Issue new token pair within the same family
  return createTokenPair(tokenRecord.userId, tokenRecord.familyId);
}

/**
 * Helper to check if a refresh token is currently valid
 * @param {string} refreshToken 
 * @returns {boolean}
 */
export function isRefreshTokenValid(refreshToken) {
  const record = tokenStore.get(refreshToken);
  return !!record && !record.isRevoked;
}

/**
 * Clears the token store (useful for testing)
 */
export function clearTokenStore() {
  tokenStore.clear();
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
