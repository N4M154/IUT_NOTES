import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import AddReviewPresenter from "./AddReviewPresenter";
import AddReviewRouter from "./AddReviewRouter";
import AnimatedButton from "../../components/AnimatedButton";
import FloatingHearts from "../../components/FloatingHearts";

export default function AddReviewView({ navigation, route }) {
  const presenter = new AddReviewPresenter();
  const router = new AddReviewRouter(navigation);

  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [showHearts, setShowHearts] = useState(false);
  const [banner, setBanner] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const headerSlide = useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(headerSlide, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (route && route.params && route.params.review) {
      const r = route.params.review;
      setId(r.id || null);
      setTitle(r.movieTitle || "");
      setReview(r.review || "");
      setRating(String(r.rating ?? ""));
      setPosterUrl(r.posterUrl || "");
    }
  }, [route]);

  const handleSubmit = async () => {
    console.log("Submit button clicked");
    if (!title || !rating) {
      setBanner({
        type: "warning",
        message: "Please fill in Title and Rating.",
      });
      return;
    }

    setShowHearts(true);
    await presenter.submitReview({
      id,
      movieTitle: title,
      review,
      rating,
      posterUrl,
    });
    console.log("Saved review, navigating home...");
    setTimeout(() => {
      router.goHome();
    }, 800);
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior={"padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          {banner ? (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ color: "#7A5D3C", fontWeight: "400" }}>
                {banner.message}
              </Text>
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
            <Text style={styles.headerTitle}>Add Review</Text>
            <Text style={styles.headerSubtitle}>Share your movie thoughts</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.form,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.label}>Movie Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter movie title"
                placeholderTextColor="#B8A4D4"
              />
            </View>

            <Text style={styles.label}>Review</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={review}
                onChangeText={setReview}
                placeholder="Write your review"
                placeholderTextColor="#B8A4D4"
                multiline
              />
            </View>

            <Text style={styles.label}>Rating (1-5)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={rating}
                onChangeText={setRating}
                placeholder="Enter rating"
                placeholderTextColor="#B8A4D4"
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.label}>Poster URL (optional)</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={posterUrl}
                onChangeText={setPosterUrl}
                placeholder="http://..."
                placeholderTextColor="#B8A4D4"
              />
            </View>

            <AnimatedButton onPress={handleSubmit}>
              <View style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save Review</Text>
              </View>
            </AnimatedButton>
          </Animated.View>
          {showHearts && <FloatingHearts />}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#FAF0F5",
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "400",
    color: "#9B7EBD",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#B8A4D4",
  },
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  label: {
    fontWeight: "400",
    marginTop: 16,
    marginBottom: 8,
    color: "#6B5B95",
    fontSize: 14,
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(232, 180, 217, 0.3)",
  },
  input: {
    padding: 14,
    fontSize: 16,
    color: "#6B5B95",
  },
  textAreaContainer: {
    minHeight: 100,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#E8B4D9",
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
});

/* -_- N4M154 -_- */
