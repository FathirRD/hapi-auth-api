/* eslint no-unused-vars: "off" */
/* eslint class-methods-use-this: "off" */
/* eslint-env es6 */

class AuthenticationRepository {
  async addToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async validateAvailabilityToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteToken(token) {
    throw new Error('AUTHENTICATION_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = AuthenticationRepository;
