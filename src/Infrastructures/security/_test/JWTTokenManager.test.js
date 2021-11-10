const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const JWTTokenManager = require('../JWTTokenManager');

describe('JWTTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create accessToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'test',
      };
      const mockJWTToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JWTTokenManager(mockJWTToken);

      // Action
      const accessToken = await jwtTokenManager.createAccessToken(payload);

      // Assert
      expect(mockJWTToken.generate).toBeCalledWith(
        payload, process.env.ACCESS_TOKEN_KEY,
      );
      expect(accessToken).toEqual('mock_token');
    });
  });

  describe('createRefreshToken function', () => {
    it('should create refreshToken correctly', async () => {
      // Arrange
      const payload = {
        username: 'test',
      };
      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };
      const jwtTokenManager = new JWTTokenManager(mockJwtToken);

      // Action
      const refreshToken = await jwtTokenManager.createRefreshToken(payload);

      // Assert
      expect(mockJwtToken.generate).toBeCalledWith(
        payload, process.env.REFRESH_TOKEN_KEY,
      );
      expect(refreshToken).toEqual('mock_token');
    });
  });

  describe('validateRefreshToken function', () => {
    it('should throw InvariantError refresh token invalid', async () => {
      // Arrange
      const jwtTokenManager = new JWTTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken(
        { username: 'test' },
      );

      // Action
      // Assert
      await expect(jwtTokenManager.validateRefreshToken(
        accessToken,
      )).rejects.toThrow(InvariantError);
    });

    it('should not throw InvariantError when refresh token valid', async () => {
    // Arrange
      const jwtTokenManager = new JWTTokenManager(Jwt.token);
      const refreshToken = await jwtTokenManager.createRefreshToken(
        { username: 'test' },
      );

      // Action
      // Assert
      await expect(jwtTokenManager.validateRefreshToken(
        refreshToken,
      )).resolves.not.toThrow(InvariantError);
    });
  });

  describe('decodePayload function', () => {
    it('should decode payload correctly', async () => {
    // Arrange
      const jwtTokenManager = new JWTTokenManager(Jwt.token);
      const accessToken = await jwtTokenManager.createAccessToken(
        { username: 'test' },
      );

      // Action
      const { username: expectedUsername } = await jwtTokenManager.decodePayload(accessToken);

      // Action
      // Assert
      expect(expectedUsername).toEqual('test');
    });
  });
});
