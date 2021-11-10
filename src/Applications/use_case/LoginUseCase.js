const UserLogin = require('../../Domains/users/entities/UserLogin');
const AuthenticationData = require('../../Domains/authentications/entities/AuthenticationData');

class LoginUseCase {
  constructor({
    userRepository,
    authenticationRepository,
    tokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.compare(password, encryptedPassword);

    const accessToken = await this._tokenManager.createAccessToken({ username });
    const refreshToken = await this._tokenManager.createRefreshToken({ username });

    const authenticationData = new AuthenticationData({
      accessToken,
      refreshToken,
    });

    await this._authenticationRepository.addToken(authenticationData.refreshToken);

    return authenticationData;
  }
}

module.exports = LoginUseCase;
