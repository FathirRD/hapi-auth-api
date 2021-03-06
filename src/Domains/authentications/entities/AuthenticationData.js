/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */

class AuthenticationData {
  constructor(payload) {
    this._verifyPayload(payload);

    const { accessToken, refreshToken } = payload;

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  _verifyPayload({ accessToken, refreshToken }) {
    if (!accessToken || !refreshToken) {
      throw new Error('AUTHENTICATION_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string') {
      throw new Error('AUTHENTICATION_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AuthenticationData;
