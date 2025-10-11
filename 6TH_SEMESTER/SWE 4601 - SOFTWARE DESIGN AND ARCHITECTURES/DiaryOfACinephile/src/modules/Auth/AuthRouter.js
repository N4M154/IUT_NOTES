export default class AuthRouter {
  constructor(navigation) {
    this.navigation = navigation;
  }

  goToHome() {
    this.navigation.replace("Home");
  }

  goToRegister() {
    this.navigation.navigate("Register");
  }

  goToLogin() {
    this.navigation.replace("Login");
  }
}

/* -_- N4M154 -_- */
