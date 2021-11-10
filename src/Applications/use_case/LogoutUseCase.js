/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */

class LogoutUseCase {
  constructor({
    authenticationRepository,
  }) {
    this._authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload) {
    this._validatePayload(useCasePayload);
    const { refreshToken } = useCasePayload;
    await this._authenticationRepository.validateAvailabilityToken(refreshToken);
    await this._authenticationRepository.deleteToken(refreshToken);
  }

  _validatePayload(payload) {
    const { refreshToken } = payload;
    if (!refreshToken) {
      throw new Error('LOGOUT_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('LOGOUT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = LogoutUseCase;
