/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */

class RefreshTokenUseCase {
  constructor({
    authenticationRepository,
    tokenManager,
  }) {
    this._authenticationRepository = authenticationRepository;
    this._tokenManager = tokenManager;
  }

  async execute(useCasePayload) {
    this._verifyPayload(useCasePayload);
    const { refreshToken } = useCasePayload;

    await this._tokenManager.validateRefreshToken(refreshToken);
    await this._authenticationRepository.validateAvailabilityToken(refreshToken);

    const { username } = await this._tokenManager.decodePayload(refreshToken);

    return this._tokenManager.createAccessToken({ username });
  }

  _verifyPayload(payload) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_TOKEN_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_TOKEN_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = RefreshTokenUseCase;
