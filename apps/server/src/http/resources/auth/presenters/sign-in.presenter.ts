interface SignInPresenterParams {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  sessionToken: string;
  sessionTokenExpiresAt: Date;
}

export class SignInPresenter {
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  sessionToken: string;
  sessionTokenExpiresAt: Date;

  constructor({
    refreshToken,
    sessionToken,
    refreshTokenExpiresAt,
    sessionTokenExpiresAt,
  }: SignInPresenterParams) {
    this.refreshToken = refreshToken;
    this.sessionToken = sessionToken;
    this.refreshTokenExpiresAt = refreshTokenExpiresAt;
    this.sessionTokenExpiresAt = sessionTokenExpiresAt;
  }
}
