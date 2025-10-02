import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  setDoc,
  writeBatch,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export function chatIdFor(a, b) {
  return [a, b].sort().join("_");//avoids creating duplicate chats for the same two users
}

export async function ensureChatExists(chatId, uids) {
  const chatRef = doc(db, "chats", chatId);
  const snap = await getDoc(chatRef);
  if (!snap.exists()) {
    await setDoc(chatRef, { users: uids, createdAt: serverTimestamp() });
  }
  return chatRef;
}

export async function createChatWithFirstMessage(chatId, uids, text) {
  const batch = writeBatch(db);
  const chatRef = doc(db, "chats", chatId);
  const messagesCol = collection(db, "chats", chatId, "messages");
  const msgRef = doc(messagesCol); 

  batch.set(chatRef, { users: uids, createdAt: serverTimestamp() });
  batch.set(msgRef, {
    text,
    from: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
  await batch.commit();
}

export async function sendMessage(chatId, text) {
  await addDoc(collection(db, "chats", chatId, "messages"), {
    text,
    from: auth.currentUser.uid,
    createdAt: serverTimestamp(),
  });
}
