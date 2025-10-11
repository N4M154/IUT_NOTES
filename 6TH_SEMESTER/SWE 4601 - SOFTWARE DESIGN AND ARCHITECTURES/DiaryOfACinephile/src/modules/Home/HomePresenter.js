import HomeInteractor from "./HomeInteractor";

export default class HomePresenter {
  constructor() {
    this.interactor = new HomeInteractor();
  }

  async getReviewsForView() {
    const entities = await this.interactor.fetchReviews();

    return entities.map((entity) => ({
      id: entity.id,
      movieTitle: entity.movieTitle,
      review: entity.review,
      rating: entity.rating,
      stars: entity.getStars(),
      posterUrl: entity.posterUrl,
      date: entity.getFormattedDate(),
    }));
  }

  async deleteReview(id) {
    return await this.interactor.deleteReview(id);
  }
}

/* -_- N4M154 -_- */
