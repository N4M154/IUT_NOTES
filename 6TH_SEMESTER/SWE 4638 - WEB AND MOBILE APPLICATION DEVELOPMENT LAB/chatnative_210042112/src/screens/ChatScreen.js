import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { sendMessage, createChatWithFirstMessage } from "../lib/chatApi";
import { useAuth } from "../contexts/AuthContext";

export default function ChatScreen({ route }) {
  const { chatId, otherUid } = route.params;
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const flatRef = useRef(null);

  useEffect(() => {
    const msgsCol = collection(db, "chats", chatId, "messages");
    const q = query(msgsCol, orderBy("createdAt"));
    const unSubscribeFromAuth = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unSubscribeFromAuth();
  }, [chatId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const chatRef = doc(db, "chats", chatId);
    const snap = await getDoc(chatRef);
    if (!snap.exists()) {
      await createChatWithFirstMessage(chatId, [user.uid, otherUid], text);
      setText("");
      return;
    }

    await sendMessage(chatId, text);
    setText("");
    setTimeout(() => flatRef.current?.scrollToEnd(), 200);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={90}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.msg,
                item.from === user.uid ? styles.own : styles.their,
              ]}
            >
              <Text>{item.text}</Text>
            </View>
          )}
          onContentSizeChange={() =>
            flatRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() => flatRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputRow}>
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
            <Text style={{ color: "black" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{ flex: 1, padding: 12 ,backgroundColor:"white"},
  msg: { padding: 10, marginVertical: 6, borderRadius: 8, maxWidth: "80%" },
  own: { backgroundColor: "pink", alignSelf: "flex-end" },
  their: { backgroundColor: "lightyellow", alignSelf: "flex-start" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "lightyellow",
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 8,
  },
  sendBtn: { backgroundColor: "lightyellow", padding: 10, borderRadius: 8 },
});
