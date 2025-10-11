export default class HomeRouter {
  constructor(navigation) {
    this.navigation = navigation;
  }

  goToAddReview() {
    this.navigation.navigate("AddReview");
  }

  goToProfile() {
    this.navigation.navigate("Profile");
  }

  goToEditReview(review) {
    this.navigation.navigate("AddReview", { review });
  }
}

/* -_- N4M154 -_- */
