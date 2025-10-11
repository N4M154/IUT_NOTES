import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from "react-native";
import ProfilePresenter from "./ProfilePresenter";
import ProfileRouter from "./ProfileRouter";
import AnimatedButton from "../../components/AnimatedButton";

export default function ProfileView({ navigation }) {
  const presenter = new ProfilePresenter();
  const router = new ProfileRouter(navigation);

  const [stats, setStats] = useState({ total: 0, averageRating: 0 });
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const headerSlide = useRef(new Animated.Value(-100)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerSlide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const s = await presenter.getStats();
      setStats(s);
      const info = await presenter.getUserInfo();
      setUserInfo(info);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load);
    load();
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerSlide }],
          },
        ]}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </Animated.View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#E8B4D9" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.card,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {userInfo && (
              <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>
                    {userInfo.displayName || "Not set"}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{userInfo.email}</Text>
                </View>
              </View>
            )}
          </Animated.View>

          <Animated.View
            style={[
              styles.statsCard,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.statsTitle}>Your Stats</Text>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.total}</Text>
                <Text style={styles.statLabel}>Movies Logged</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {stats.averageRating.toFixed(1)}
                </Text>
                <Text style={styles.statLabel}>Average Rating</Text>
              </View>
            </View>
            <Text style={styles.encouragement}>Keep journaling!</Text>
          </Animated.View>

          <AnimatedButton onPress={() => router.goHome()}>
            <View style={styles.homeButton}>
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </View>
          </AnimatedButton>

          <AnimatedButton
            onPress={async () => {
              try {
                await presenter.logout();
                router.goToLogin();
              } catch (e) {
                console.warn("Logout failed", e);
              }
            }}
          >
            <View style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
          </AnimatedButton>
        </Animated.View>
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
    paddingBottom: 20,
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
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  infoSection: {
    gap: 0,
  },
  infoRow: {
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#B8A4D4",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "400",
    color: "#6B5B95",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(232, 180, 217, 0.2)",
  },
  statsCard: {
    backgroundColor: "rgba(232, 180, 217, 0.2)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(232, 180, 217, 0.3)",
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#9B7EBD",
    marginBottom: 16,
    textAlign: "center",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(155, 126, 189, 0.3)",
  },
  statNumber: {
    fontSize: 36,
    fontWeight: "400",
    color: "#E8B4D9",
  },
  statLabel: {
    fontSize: 14,
    color: "#9B7EBD",
    marginTop: 4,
    textAlign: "center",
  },
  encouragement: {
    fontSize: 14,
    color: "#B8A4D4",
    textAlign: "center",
    marginTop: 8,
  },
  homeButton: {
    backgroundColor: "#E8B4D9",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "rgba(255, 182, 193, 0.3)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 105, 135, 0.3)",
  },
  logoutButtonText: {
    color: "#E8819A",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
});

/* -_- N4M154 -_- */
