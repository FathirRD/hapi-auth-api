const TokenManager = require('../TokenManager');

describe('TokenManager interface', () => {
  it('should throw error when invokde abstract behavior', async () => {
    const tokenManager = new TokenManager();

    // Action
    // Assert
    await expect(
      tokenManager.createAccessToken(''),
    ).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(
      tokenManager.createRefreshToken(''),
    ).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(
      tokenManager.validateRefreshToken(''),
    ).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
    await expect(
      tokenManager.decodePayload(''),
    ).rejects.toThrowError('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  });
});
