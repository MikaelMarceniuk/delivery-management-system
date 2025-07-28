interface IUserPresenterParams {
  id: string;
  name: string;
  email: string;
}

export class UserPresenter {
  id: string;
  name: string;
  email: string;

  constructor({ id, name, email }: IUserPresenterParams) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
