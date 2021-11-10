const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const LogoutUseCase = require('../LogoutUseCase');

describe('LogoutUserUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = {};
    const logoutUseCase = new LogoutUseCase({});

    // Action & Assert
    await expect(logoutUseCase.execute(useCasePayload)).rejects.toThrowError(
      'LOGOUT_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN',
    );
  });

  it('should throw error if refresh token not string', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 123,
    };
    const logoutUseCase = new LogoutUseCase({});

    // Action & Assert
    await expect(logoutUseCase.execute(useCasePayload)).rejects.toThrowError(
      'LOGOUT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should orchestrating the delete authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      refreshToken: 'refreshToken',
    };
    const mockAuthenticationRepository = new AuthenticationRepository();
    mockAuthenticationRepository.validateAvailabilityToken = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthenticationRepository.deleteToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const logoutUseCase = new LogoutUseCase({
      authenticationRepository: mockAuthenticationRepository,
    });

    // Act
    await logoutUseCase.execute(useCasePayload);

    // Assert
    expect(mockAuthenticationRepository.validateAvailabilityToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
    expect(mockAuthenticationRepository.deleteToken)
      .toHaveBeenCalledWith(useCasePayload.refreshToken);
  });
});
