export default class ProfileRouter {
  constructor(navigation) {
    this.navigation = navigation;
  }

  goHome() {
    this.navigation.navigate("Home");
  }

  goToLogin() {
    this.navigation.replace("Login");
  }
}

/* -_- N4M154 -_- */
