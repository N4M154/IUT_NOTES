//210042112
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
 
import CommentModal from "../../components/CommentModal";

const API_BASE_URL = __DEV__ 
  ? "http://192.168.0.103:5000" 
  : "http://localhost:5000";      

interface Post {
  _id: string;
  userName: string;
  date: string;
  content: string;
  likes: string[];
  dislikes: string[];
  comments: any[];
}

interface CommentItem {
  _id: string;
  post: string;
  userName: string;
  content: string;
  date: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommentItem[]>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [isCommentModalVisible, setIsCommentModalVisible] = useState<boolean>(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  

  useEffect(() => {
    checkAuthAndFetchData();
  }, []);

  const checkAuthAndFetchData = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      const userJson = await AsyncStorage.getItem('currentUser');
      
      if (!authToken || !userJson) {
        router.replace('/(auth)/login');
        return;
      }

      const user = JSON.parse(userJson);
      setCurrentUser(user);
      
      const response = await axios.get(`${API_BASE_URL}/api/posts`);
      const fetchedPosts: Post[] = response.data;
      setPosts(fetchedPosts);
      await loadCommentsForPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
      router.replace('/(auth)/login');
    }
  };

  const refreshFeed = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts`);
      const fetchedPosts: Post[] = response.data;
      setPosts(fetchedPosts);
      await loadCommentsForPosts(fetchedPosts);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshCommentsForPost = async (postId: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/posts/${postId}/comments`);
      setCommentsByPost({
        ...commentsByPost,
        [postId]: response.data as CommentItem[],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openCommentModal = (postId: string) => {
    setActivePostId(postId);
    setIsCommentModalVisible(true);
  };

  const closeCommentModal = () => {
    setIsCommentModalVisible(false);
    setActivePostId(null);
  };

  const loadCommentsForPosts = async (postsToLoad: Post[]) => {
    try {
      const results = await Promise.all(
        postsToLoad.map((p) => axios.get(`${API_BASE_URL}/api/posts/${p._id}/comments`).then(r => ({ postId: p._id, comments: r.data as CommentItem[] })).catch(() => ({ postId: p._id, comments: [] })))
      );
      const next: Record<string, CommentItem[]> = {};
      results.forEach(({ postId, comments }) => {
        next[postId] = comments;
      });
      setCommentsByPost(next);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    if (Platform.OS === 'web') {
      try {
        await AsyncStorage.removeItem('authToken');
        await AsyncStorage.removeItem('currentUser');
        router.replace('/(auth)/login');
      } catch (error) {
        console.log(error);
      }
      return;
    }

    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('authToken');
              await AsyncStorage.removeItem('currentUser');
              router.replace('/(auth)/login');
            } catch (error) {
              console.log(error);
            }
          },
        },
      ]
    );
  };

  const handleLike = async (postId: string) => {
    if (!currentUser) return;
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/${postId}/like`,
        {
          userName: currentUser.name,
        }
      );
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async (postId: string) => {
    if (!currentUser) return;
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/posts/${postId}/dislike`,
        {
          userName: currentUser.name,
        }
      );
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDismissPost = (postId: string) => {
    setPosts(posts.filter((p) => p._id !== postId));
  };

  const handleSubmitComment = async (postId: string) => {
    if (!currentUser) return;
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    try {
        const response = await axios.post(`${API_BASE_URL}/api/posts/${postId}/comments`, {
        userName: currentUser.name,
        content: text,
      });
      const newComment: CommentItem = response.data;
      setCommentsByPost({
        ...commentsByPost,
        [postId]: [...(commentsByPost[postId] || []), newComment],
      });
      setCommentInputs({ ...commentInputs, [postId]: "" });
    } catch (error) {
      console.log(error);
    }
  };

  

  const renderItem = ({ item }: { item: Post }) => (
    <View style={styles.fullPostContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={() => handleDismissPost(item._id)}>
        <Feather name="x" size={18} color="#333" />
      </TouchableOpacity>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={styles.headerRow}>
            <Image 
              source={require('../../assets/images/download.jpg')} 
              style={styles.profileImage} 
            />
            <Text style={styles.nameText}>{item.userName}</Text>
          </View>
          <Text style={styles.dateText}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
        <Text style={styles.postText}>{item.content}</Text>
        <View style={styles.divider} />
        <View style={styles.reactionContainer}>
          <View style={styles.leftReactions}>
            <TouchableOpacity
              style={styles.reactionItem}
              onPress={() => handleLike(item._id)}
            >
              <AntDesign
                name="heart"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.reactionText}>{item.likes.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reactionItem}
              onPress={() => handleDislike(item._id)}
            >
              <Fontisto
                name="dislike"
                size={20}
                color="black"
                style={styles.icon}
              />
              <Text style={styles.reactionText}>{item.dislikes.length}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightReactions}>
            <TouchableOpacity style={styles.reactionItem} onPress={() => openCommentModal(item._id)}>
              <Feather name="message-circle" size={20} color="black" style={styles.icon} />
              <Text style={styles.reactionText}>{(commentsByPost[item._id] || []).length}</Text>
            </TouchableOpacity>
            <Feather name="share" size={20} color="black" style={styles.icon} />
          </View>
        </View>

        {/* Comments moved to full-screen modal */}
      </View>
    </View>
  );

  if (!currentUser) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.leftTitleSection}>
          <View style={styles.feedTitleRow}>
            <Text style={styles.feedText}>Your Feed</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={refreshFeed}>
              <Feather name="refresh-cw" size={24} color="#666" />
            </TouchableOpacity>
          </View>
          <Text style={styles.welcomeText}>Welcome, {currentUser.name}!</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
      {activePostId ? (
        <CommentModal
          visible={isCommentModalVisible}
          onClose={closeCommentModal}
          postId={activePostId}
          comments={commentsByPost[activePostId] || []}
          currentUserName={currentUser ? currentUser.name : ''}
          onCommentAdded={() => refreshCommentsForPost(activePostId)}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f0f0f0",
    marginTop: 40,
  },
  listContainer: {
    paddingBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 30,
    paddingBottom: 20,
  },
  feedText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
  },
  leftTitleSection: {
    flex: 1,
  },
  feedTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  refreshButton: {
    padding: 5,
  },
  fullPostContainer: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 6,
    right: 6,
    zIndex: 10,
    backgroundColor: "#ffffffcc",
    borderRadius: 14,
    padding: 6,
  },
  postContainer: {
    padding: 20,
  },
  postHeader: {
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
    marginLeft: 26,
  },
  postText: {
    fontSize: 16,
    color: "black",
    marginVertical: 10,
    lineHeight: 22,
  },
  reactionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  leftReactions: {
    flexDirection: "row",
    gap: 20,
  },
  rightReactions: {
    flexDirection: "row",
    gap: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#d1d1d1",
    marginVertical: 12,
  },
  reactionText: {
    fontSize: 14,
    color: "gray",
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    marginRight: 4,
  },
  commentButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 5,
    borderRadius: 8,
  },
  commentsContainer: {
    marginTop: 10,
    gap: 8,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  commentAuthor: {
    fontWeight: "bold",
    color: "black",
  },
  commentText: {
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "black",
    backgroundColor: "#fafafa",
  },
  commentSendButton: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  commentSendText: {
    color: "white",
    fontWeight: "bold",
  },
});

// -_- N4M154 -_-