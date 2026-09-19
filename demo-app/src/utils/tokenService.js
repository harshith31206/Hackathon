/**
 * Token Service utility for managing secure refresh token rotation and preventing replay attacks.
 */

const tokenStore = new Map();
const revokedFamilies = new Set();

/**
 * Generates an initial token pair for a user.
 * @param {string} userId 
 * @returns {Object} { accessToken, refreshToken, familyId }
 */
export function generateTokenPair(userId) {
  if (!userId) {
    throw new Error('User ID is required.');
  }

  const familyId = 'fam_' + Math.random().toString(36).substring(2, 11);
  const refreshToken = 'rt_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const accessToken = 'at_' + Math.random().toString(36).substring(2, 11);

  tokenStore.set(refreshToken, {
    userId,
    familyId,
    revoked: false,
    createdAt: Date.now()
  });

  return { accessToken, refreshToken, familyId };
}

/**
 * Rotates a refresh token: invalidates the old token and issues a new token pair.
 * Detects potential replay attacks (reuse of an already revoked token) and revokes the entire token family.
 * 
 * @param {string} oldRefreshToken 
 * @returns {Object} { accessToken, refreshToken }
 */
export function rotateRefreshToken(oldRefreshToken) {
  if (!oldRefreshToken || !tokenStore.has(oldRefreshToken)) {
    throw new Error('Invalid refresh token.');
  }

  const tokenData = tokenStore.get(oldRefreshToken);

  // Check if token family was already compromised / revoked (Replay attack detection)
  if (revokedFamilies.has(tokenData.familyId) || tokenData.revoked) {
    // Invalidate entire family to protect the user
    revokedFamilies.add(tokenData.familyId);
    tokenStore.forEach((data, token) => {
      if (data.familyId === tokenData.familyId) {
        data.revoked = true;
      }
    });
    throw new Error('Security Alert: Refresh token reuse detected. Token family revoked.');
  }

  // Invalidate previous refresh token (Rotation)
  tokenData.revoked = true;

  // Issue new token pair within the same family
  const newRefreshToken = 'rt_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const newAccessToken = 'at_' + Math.random().toString(36).substring(2, 11);

  tokenStore.set(newRefreshToken, {
    userId: tokenData.userId,
    familyId: tokenData.familyId,
    revoked: false,
    createdAt: Date.now()
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
}

/**
 * Helper to inspect token status (primarily for testing)
 */
export function getTokenData(refreshToken) {
  return tokenStore.get(refreshToken) || null;
}

/**
 * Clears all token storage (for test setup/teardown)
 */
export function clearTokenStore() {
  tokenStore.clear();
  revokedFamilies.clear();
}
