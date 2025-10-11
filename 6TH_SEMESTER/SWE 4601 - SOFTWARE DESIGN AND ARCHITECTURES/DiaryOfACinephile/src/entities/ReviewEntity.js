export default class ReviewEntity {
  constructor(data = {}) {
    this.id = data.id || null;
    this.movieTitle = data.movieTitle || "";
    this.review = data.review || "";
    this.rating = data.rating || 0;
    this.posterUrl = data.posterUrl || "";
    this.date = data.date || new Date().toISOString();
    this.userId = data.userId || null;
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  //Business logics
  isValid() {
    return (
      this.movieTitle.trim() !== "" && this.rating >= 1 && this.rating <= 5
    );
  }

  getStars() {
    const count = Math.max(0, Math.min(5, Math.floor(this.rating)));
    return "★".repeat(count);
  }

  getFormattedDate() {
    if (!this.date) return "";
    return new Date(this.date).toLocaleString();
  }

  getReviewPreview(maxLength = 100) {
    if (!this.review) return "";
    if (this.review.length <= maxLength) return this.review;
    return this.review.substring(0, maxLength) + "...";
  }
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  //Firebase object conversion
  toFirebaseObject() {
    return {
      movieTitle: this.movieTitle,
      review: this.review,
      rating: Number(this.rating),
      posterUrl: this.posterUrl,
      date: this.date,
      userId: this.userId,
    };
  }

  // Firebase document creation
  static fromFirebaseDoc(doc) {
    return new ReviewEntity({
      id: doc.id,
      ...doc.data(),
    });
  }

  clone() {
    return new ReviewEntity({
      id: this.id,
      movieTitle: this.movieTitle,
      review: this.review,
      rating: this.rating,
      posterUrl: this.posterUrl,
      date: this.date,
      userId: this.userId,
    });
  }
}

/* -_- N4M154 -_- */
