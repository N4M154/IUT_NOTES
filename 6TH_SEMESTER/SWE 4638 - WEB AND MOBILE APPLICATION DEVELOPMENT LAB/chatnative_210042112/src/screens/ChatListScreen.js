import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { db } from "../firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { chatIdFor, ensureChatExists } from "../lib/chatApi";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ChatListScreen({ navigation }) {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unSubscribeFromAuth = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map((d) => d.data()));
    });
    return () => unSubscribeFromAuth();
  }, []);

  const startChat = async (otherUid) => {
    const id = chatIdFor(user.uid, otherUid);
    await ensureChatExists(id, [user.uid, otherUid]);
    navigation.navigate("Chat", { chatId: id, otherUid });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Hello, {user.displayName || user.email}
        </Text>
      </View>

      <Text style={styles.sub}>Users</Text>
      <FlatList
      style = {styles.chatbox}
        data={users.filter((u) => u.uid !== user.uid)}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userRow}
            onPress={() => startChat(item.uid)}
          >
            <Text>{item.displayName || item.email}</Text>
            <Text >
              <Ionicons name="chatbox" size={24} color="pink" />
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop:50,backgroundColor:"white" },
  header: {
    alignItems: "center",
    marginBottom: 12,
  },
  chatbox:{padding:20},
  title: { fontSize: 18, fontWeight: "600" },
  sub: { marginBottom: 8,fontSize:20,textAlign:"center" },
  userRow: {
    padding: 12,
    backgroundColor: "lightyellow",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
