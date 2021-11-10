const LoginUseCase = require('../../../../Applications/use_case/LoginUseCase');
const RefreshTokenUseCase = require('../../../../Applications/use_case/RefreshTokenUseCase');
const LogoutUseCase = require('../../../../Applications/use_case/LogoutUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {
    const loginUseCase = this._container.getInstance(LoginUseCase.name);
    // test = await loginUseCase.execute(request.payload);
    // console.log(test);
    const { accessToken, refreshToken } = await loginUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request) {
    const refreshTokenUseCase = this._container
      .getInstance(RefreshTokenUseCase.name);
    const accessToken = await refreshTokenUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const logoutUseCase = this._container.getInstance(LogoutUseCase.name);
    await logoutUseCase.execute(request.payload);
    return {
      status: 'success',
    };
  }
}

module.exports = AuthenticationsHandler;
