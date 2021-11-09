const AuthenticationData = require('../AuthenticationData');

describe('a AuthenticationData entities', () => {
  it("should throw error when payload didn't contain needed property", () => {
    // Arrange
    const payload = {
      accessToken: 'token',
    };

    // Action
    // Assert
    expect(() => new AuthenticationData(payload)).toThrowError(
      'AUTHENTICATION_DATA.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it("should throw error when payload didn't meet data type specification", () => {
    // Arrange
    const payload = {
      accessToken: '123',
      refreshToken: 321,
    };

    // Arrange
    // Assert
    expect(() => new AuthenticationData(payload)).toThrowError(
      'AUTHENTICATION_DATA.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create AuthenticationData object entities correctly', () => {
    // Arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    // Action
    const authenticationData = new AuthenticationData(payload);

    // Assert
    expect(authenticationData).toBeInstanceOf(AuthenticationData);
    expect(authenticationData.accessToken).toEqual(payload.accessToken);
    expect(authenticationData.refreshToken).toEqual(payload.refreshToken);
  });
});
