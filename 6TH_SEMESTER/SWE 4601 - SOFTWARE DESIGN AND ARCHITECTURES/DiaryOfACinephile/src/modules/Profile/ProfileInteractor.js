import { db, auth } from "../../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import ReviewEntity from "../../entities/ReviewEntity";

export default class ProfileInteractor {
  constructor() {
    this.collectionRef = collection(db, "reviews");
  }

  async fetchAllReviews() {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(this.collectionRef, where("userId", "==", user.uid));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ReviewEntity.fromFirebaseDoc(doc));
  }

  async logout() {
    await signOut(auth);
    return true;
  }

  async fetchUserInfo() {
    const user = auth.currentUser;
    if (!user) return null;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const profile = userDoc.exists() ? userDoc.data() : {};
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || profile.displayName || null,
      createdAt: profile.createdAt || null,
    };
  }
}

/* -_- N4M154 -_- */
