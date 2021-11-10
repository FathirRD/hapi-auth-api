/* eslint no-unused-vars: "off" */
/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */

class TokenManager {
  async createAccessToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async createRefreshToken(payload) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async validateRefreshToken(refreshToken) {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }

  async decodePayload() {
    throw new Error('TOKEN_MANAGER.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = TokenManager;
