import AuthInteractor from "./AuthInteractor";

export default class AuthPresenter {
  constructor() {
    this.interactor = new AuthInteractor();
  }

  async handleLogin(email, password) {
    return await this.interactor.login(email, password);
  }

  async handleRegister(email, password, displayName) {
    return await this.interactor.register(email, password, displayName);
  }
}

/* -_- N4M154 -_- */
