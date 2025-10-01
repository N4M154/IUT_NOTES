//210042112
import { Feather } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const API_BASE_URL = __DEV__ 
  ? "http://192.168.0.103:5000"  // your computer's IP address
  : "http://localhost:5000"; 

interface User {
  id: string;
  name: string;
  email: string;
}

export default function CreatePostScreen() {
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userJson = await AsyncStorage.getItem('currentUser');
      
      if (!authToken || !userJson) {
        router.replace('/(auth)/login');
        return;
      }

      const user = JSON.parse(userJson);
      setCurrentUser(user);
    } catch (error) {
      console.log(error);
      router.replace('/(auth)/login');
    }
  };

  const handlePost = async () => {
    if (!currentUser) {
      console.log('Please login to create a post');
      return;
    }

    try {
      if (!content.trim()) {
        console.log('Please enter some content');
        return;
      }

        const response = await axios.post(`${API_BASE_URL}/api/posts`, {
        userName: currentUser.name,
        content: content.trim(),
      });

      setContent("");
      console.log('Post created successfully!');
    } catch (error: any) {
      console.log(error);
      console.log('Failed to create post: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Create New Post</Text>
      </View>
      
      <View style={styles.postCard}>
        <View style={styles.userProfileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>😊</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>You</Text>
            <Text style={styles.promptText}>What's on your mind?</Text>
          </View>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Share your thoughts..."
          placeholderTextColor="#9CA3AF"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        <View style={styles.actionContainer}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="image" size={20} color="#374151" />
              <Text style={styles.actionText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Feather name="camera" size={20} color="#374151" />
              <Text style={styles.actionText}>Camera</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.postButton, !content.trim() && styles.postButtonDisabled]} 
            onPress={handlePost}
            disabled={!content.trim()}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F3F4F6",
    paddingTop: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  postCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userProfileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#8B5CF6',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 2,
  },
  promptText: {
    fontSize: 14,
    color: "#6B7280",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftActions: {
    flexDirection: "row",
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
  },
  postButton: {
    backgroundColor: "#D1D5DB",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  postButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
});

// -_- N4M154 -_-