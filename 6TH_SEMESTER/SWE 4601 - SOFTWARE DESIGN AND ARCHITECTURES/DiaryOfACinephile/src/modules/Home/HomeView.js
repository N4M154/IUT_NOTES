import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import HomePresenter from "./HomePresenter";
import HomeRouter from "./HomeRouter";
import AnimatedButton from "../../components/AnimatedButton";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PastelConfirmModal from "../../components/PastelConfirmModal";
import PastelBanner from "../../components/PastelBanner";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function HomeView({ navigation }) {
  const presenter = new HomePresenter();
  const router = new HomeRouter(navigation);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirm, setConfirm] = useState({
    visible: false,
    id: null,
    title: "",
  });
  const [banner, setBanner] = useState({ type: null, message: "" });

  const headerSlide = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(headerSlide, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const data = await presenter.getReviewsForView();
      setReviews(data);
    } catch (e) {
      console.warn("Failed to load reviews", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load);
    load();
    return unsubscribe;
  }, [navigation]);

  const confirmDelete = (id, title) => {
    setConfirm({ visible: true, id, title });
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await presenter.deleteReview(id);
      setReviews((prev) => prev.filter((item) => item.id !== id));
      setBanner({ type: "success", message: "Review deleted successfully." });
    } catch (e) {
      console.warn("Delete failed", e);
      setBanner({
        type: "error",
        message: "Failed to delete review. Try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const AnimatedCard = ({ item, index }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          delay: index * 100,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          delay: index * 100,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, []);

    return (
      <Animated.View
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {item.posterUrl ? (
          <Image source={{ uri: item.posterUrl }} style={styles.poster} />
        ) : (
          <View style={styles.posterPlaceholder}>
            <MaterialIcons name="movie-filter" size={24} color="#6B5B95" />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>
            {item.movieTitle} <Text style={{ fontSize: 12 }}>{item.stars}</Text>
          </Text>
          <Text style={styles.review}>{item.review}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            <Text style={styles.date}>{item.date}</Text>

            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPress={() => router.goToEditReview(item)}
                style={styles.editBtn}
              >
                <MaterialIcons name="edit-note" size={24} color="#6B5B95" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => confirmDelete(item.id, item.movieTitle)}
                style={styles.deleteBtn}
                disabled={deletingId === item.id}
              >
                {deletingId === item.id ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="rgba(221, 61, 93, 0.7)"
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderItem = ({ item, index }) => (
    <AnimatedCard item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      {banner.message ? (
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <PastelBanner type={banner.type} message={banner.message} />
        </View>
      ) : null}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerSlide }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>My Movies</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={[
              styles.chip,
              styles.chipPrimary,
              styles.headerButtonWrapper,
            ]}
            onPress={() => router.goToAddReview()}
          >
            <Text style={styles.chipPrimaryText}>+ Add Review</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.chip,
              styles.chipSecondary,
              styles.headerButtonWrapperLast,
            ]}
            onPress={() => router.goToProfile()}
          >
            <Text style={styles.chipSecondaryText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <PastelConfirmModal
        visible={confirm.visible}
        title={"Delete review?"}
        message={`Delete the review for "${confirm.title}"? This cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setConfirm({ visible: false, id: null, title: "" })}
        onConfirm={() => {
          const id = confirm.id;
          setConfirm({ visible: false, id: null, title: "" });
          if (id) handleDelete(id);
        }}
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E8B4D9" />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No reviews yet</Text>
              <Text style={styles.emptySubtext}>
                Start by adding your first movie!
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF0F5",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 50,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: "#9B7EBD",
    marginBottom: 16,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chip: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  chipPrimary: {
    marginRight: 8,
    backgroundColor: "#FFE0F0",
    borderColor: "#E8B4D9",
  },
  chipPrimaryText: {
    color: "#6B5B95",
    fontWeight: "400",
    fontSize: 15,
  },
  chipSecondary: {
    marginLeft: 8,
    backgroundColor: "#EFE6FA",
    borderColor: "#C7B5E8",
  },
  chipSecondaryText: {
    color: "#6B5B95",
    fontWeight: "400",
    fontSize: 15,
  },
  headerButtonWrapper: {
    flex: 1,
    marginRight: 8,
  },
  headerButtonWrapperLast: {
    flex: 1,
    marginLeft: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#E8B4D9",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    color: "#6B5B95",
    fontSize: 16,
    fontWeight: "400",
  },
  profileButton: {
    flex: 1,
    backgroundColor: "rgba(184, 164, 212, 0.3)",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(184, 164, 212, 0.4)",
  },
  profileButtonText: {
    color: "#6B5B95",
    fontSize: 16,
    fontWeight: "400",
  },
  listContent: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    padding: 12,
    borderRadius: 20,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },
  posterPlaceholder: {
    width: 80,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(232, 180, 217, 0.2)",
    borderWidth: 2,
    borderColor: "rgba(232, 180, 217, 0.3)",
    borderStyle: "dashed",
  },
  title: {
    fontWeight: "400",
    fontSize: 18,
    color: "#6B5B95",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
  },
  review: {
    marginTop: 8,
    fontSize: 14,
    color: "#8B7BA8",
    lineHeight: 20,
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    color: "#B8A4D4",
  },
  deleteBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(255, 182, 193, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(255, 105, 135, 0.3)",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "rgba(184, 164, 212, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(184, 164, 212, 0.35)",
  },
  editText: {
    color: "#6B5B95",
    fontWeight: "400",
    fontSize: 12,
    marginLeft: 4,
  },
  deleteText: {
    color: "#E8819A",
    fontWeight: "400",
    fontSize: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#B8A4D4",
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "400",
    color: "#9B7EBD",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#B8A4D4",
  },
});

/* -_- N4M154 -_- */
