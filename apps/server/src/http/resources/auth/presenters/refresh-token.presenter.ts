interface RefreshTokenPresenterParams {
  sessionToken: string;
  sessionTokenExpiresAt: Date;
}

export class RefreshTokenPresenter {
  sessionToken: string;
  sessionTokenExpiresAt: Date;

  constructor({
    sessionToken,
    sessionTokenExpiresAt,
  }: RefreshTokenPresenterParams) {
    this.sessionToken = sessionToken;
    this.sessionTokenExpiresAt = sessionTokenExpiresAt;
  }
}
