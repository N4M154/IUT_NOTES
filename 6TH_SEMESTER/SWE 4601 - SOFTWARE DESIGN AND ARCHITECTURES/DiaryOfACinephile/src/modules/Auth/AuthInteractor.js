import { auth, db } from "../../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default class AuthInteractor {
  async login(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user.user;
  }

  async register(email, password, displayName) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    // users doc creation for firebase firestore
    const userDocRef = doc(db, "users", cred.user.uid);
    await setDoc(userDocRef, {
      email: cred.user.email,
      displayName: displayName || null,
      createdAt: serverTimestamp(),
    });
    return cred.user;
  }
}

/* -_- N4M154 -_- */
