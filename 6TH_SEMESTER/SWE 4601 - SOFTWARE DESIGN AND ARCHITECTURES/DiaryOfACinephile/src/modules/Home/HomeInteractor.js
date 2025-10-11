import { db, auth } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import ReviewEntity from "../../entities/ReviewEntity";

export default class HomeInteractor {
  constructor() {
    this.collectionRef = collection(db, "reviews");
  }

  async fetchReviews() {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(
      this.collectionRef,
      where("userId", "==", user.uid),
      orderBy("date", "desc")
    );
    const snapshot = await getDocs(q);

    // Firebase docs to ReviewEntity instances conversion
    return snapshot.docs.map((doc) => ReviewEntity.fromFirebaseDoc(doc));
  }

  async deleteReview(id) {
    const docRef = doc(db, "reviews", id);
    await deleteDoc(docRef);
    return true;
  }
}

/* -_- N4M154 -_- */
