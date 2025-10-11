import AddReviewInteractor from "./AddReviewInteractor";
import ReviewEntity from "../../entities/ReviewEntity";

export default class AddReviewPresenter {
  constructor() {
    this.interactor = new AddReviewInteractor();
  }

  async submitReview(data) {
    const entity = new ReviewEntity({
      movieTitle: data.movieTitle,
      review: data.review,
      rating: Number(data.rating),
      posterUrl: data.posterUrl,
      date: new Date().toISOString(),
    });

    if (!entity.isValid()) {
      throw new Error("Title and rating (1-5) are required");
    }

    // Save or update the review using the interactor
    if (data.id) {
      await this.interactor.updateReview(data.id, entity);
      return data.id;
    } else {
      const id = await this.interactor.saveReview(entity);
      return id;
    }
  }
}

/* -_- N4M154 -_- */
