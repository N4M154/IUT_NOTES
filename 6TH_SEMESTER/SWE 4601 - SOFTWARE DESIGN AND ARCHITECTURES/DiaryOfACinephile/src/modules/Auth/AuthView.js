import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import PastelBanner from "../../components/PastelBanner";
import AuthPresenter from "./AuthPresenter";
import AuthRouter from "./AuthRouter";
import AnimatedButton from "../../components/AnimatedButton";

export default function AuthView({ navigation }) {
  const presenter = new AuthPresenter();
  const router = new AuthRouter(navigation);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
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

  const onLogin = async () => {
    try {
      await presenter.handleLogin(email, password);
      router.goToHome();
    } catch (err) {
      setBanner({ type: "error", message: err.message || "Login failed" });
    }
  };

  const goToRegister = () => router.goToRegister();

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behavior={"padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {banner ? (
            <View style={{ marginBottom: 10 }}>
              <PastelBanner type={banner.type} message={banner.message} />
            </View>
          ) : null}
          <Animated.View
            style={[
              styles.glassMorphContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Diary of a Cinephile</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#B8A4D4"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#B8A4D4"
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <AnimatedButton onPress={onLogin}>
              <View style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Login</Text>
              </View>
            </AnimatedButton>

            <AnimatedButton onPress={goToRegister}>
              <View style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Create Account</Text>
              </View>
            </AnimatedButton>
          </Animated.View>
        </View>
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
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FAF0F5",
  },
  glassMorphContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
    padding: 32,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "400",
    color: "#9B7EBD",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#B8A4D4",
    fontWeight: "400",
  },
  inputContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(232, 180, 217, 0.3)",
  },
  input: {
    padding: 16,
    fontSize: 16,
    color: "#6B5B95",
  },
  primaryButton: {
    backgroundColor: "#E8B4D9",
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    shadowColor: "#E8B4D9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
  secondaryButton: {
    backgroundColor: "rgba(184, 164, 212, 0.2)",
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "rgba(184, 164, 212, 0.3)",
  },
  secondaryButtonText: {
    color: "#9B7EBD",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "400",
  },
});

/* -_- N4M154 -_- */
