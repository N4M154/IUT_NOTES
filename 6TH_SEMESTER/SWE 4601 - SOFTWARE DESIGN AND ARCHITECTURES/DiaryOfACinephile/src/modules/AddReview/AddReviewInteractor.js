import { db, auth } from "../../firebase/firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import ReviewEntity from "../../entities/ReviewEntity";

export default class AddReviewInteractor {
  constructor() {
    this.collectionRef = collection(db, "reviews");
  }

  async saveReview(reviewEntity) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("No user logged in");
      }

      if (!reviewEntity.isValid()) {
        throw new Error("Invalid review data");
      }

      reviewEntity.userId = user.uid;
      if (!reviewEntity.date) {
        reviewEntity.date = new Date().toISOString();
      }

      // saving doc to firebase
      const payload = reviewEntity.toFirebaseObject();
      const docRef = await addDoc(this.collectionRef, payload);
      console.log("Review added", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error saving review:", error);
      throw error;
    }
  }

  async updateReview(id, reviewEntity) {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No user logged in");
      if (!id) throw new Error("Missing review id for update");

      if (!reviewEntity.isValid()) {
        throw new Error("Invalid review data");
      }

      reviewEntity.userId = user.uid;
      reviewEntity.date = reviewEntity.date || new Date().toISOString();

      const docRef = doc(db, "reviews", id);
      const payload = reviewEntity.toFirebaseObject();
      await updateDoc(docRef, payload);
      return true;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  }
}

/* -_- N4M154 -_- */
