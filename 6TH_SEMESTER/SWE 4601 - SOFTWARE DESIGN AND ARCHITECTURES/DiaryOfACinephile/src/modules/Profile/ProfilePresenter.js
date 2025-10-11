import ProfileInteractor from "./ProfileInteractor";

export default class ProfilePresenter {
  constructor() {
    this.interactor = new ProfileInteractor();
  }

  async getStats() {
    const reviews = await this.interactor.fetchAllReviews();
    const total = reviews.length;
    const avg =
      total === 0
        ? 0
        : reviews.reduce((s, r) => s + (Number(r.rating) || 0), 0) / total;
    return {
      total,
      averageRating: avg,
    };
  }

  async logout() {
    return await this.interactor.logout();
  }

  async getUserInfo() {
    return await this.interactor.fetchUserInfo();
  }
}

/* -_- N4M154 -_- */
