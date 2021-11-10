const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const TokenManager = require('../../security/TokenManager');
const RefreshTokenUseCase = require('../RefreshTokenUseCase');

describe('RefreshTokenUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const refreshTokenUseCase = new RefreshTokenUseCase({});

    // Action & Assert
    await expect(refreshTokenUseCase.execute(useCasePayload)).rejects.toThrowError(
      'REFRESH_TOKEN_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 1,
    };
    const refreshTokenUseCase = new RefreshTokenUseCase({});

    // Action & Assert
    await expect(refreshTokenUseCase.execute(useCasePayload)).rejects.toThrowError(
      'REFRESH_TOKEN_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'test',
    };
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();
    // Mocking
    mockAuthenticationRepository.validateAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.validateRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'test' }));
    mockTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve('testtest'));
    // Create the use case instace
    const refreshTokenUseCase = new RefreshTokenUseCase({
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
    });

    // Action
    const accessToken = await refreshTokenUseCase.execute(useCasePayload);

    // Assert
    expect(mockTokenManager.validateRefreshToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.validateAvailabilityToken)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload.refreshToken);
    expect(mockTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'test' });
    expect(accessToken).toEqual('testtest');
  });
});
