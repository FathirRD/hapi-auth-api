const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const TokenManager = require('../../security/TokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUseCase = require('../LoginUseCase');
const AuthenticationData = require('../../../Domains/authentications/entities/AuthenticationData');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'test',
      password: 'test',
    };
    const expectedAuthentication = new AuthenticationData({
      accessToken: 'access_token',
      refreshToken: 'refresh_token',
    });
    const mockUserRepository = new UserRepository();
    const mockAuthenticationRepository = new AuthenticationRepository();
    const mockTokenManager = new TokenManager();
    const mockPasswordHash = new PasswordHash();

    // Mocking
    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.compare = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockAuthenticationRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const loginUseCase = new LoginUseCase({
      userRepository: mockUserRepository,
      authenticationRepository: mockAuthenticationRepository,
      tokenManager: mockTokenManager,
      passwordHash: mockPasswordHash,
    });

    // Action
    const actualAuthentication = await loginUseCase.execute(useCasePayload);

    // Assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername)
      .toBeCalledWith('test');
    expect(mockPasswordHash.compare)
      .toBeCalledWith('test', 'encrypted_password');
    expect(mockTokenManager.createAccessToken)
      .toBeCalledWith({ username: 'test' });
    expect(mockTokenManager.createRefreshToken)
      .toBeCalledWith({ username: 'test' });
    expect(mockAuthenticationRepository.addToken)
      .toBeCalledWith(expectedAuthentication.refreshToken);
  });
});
