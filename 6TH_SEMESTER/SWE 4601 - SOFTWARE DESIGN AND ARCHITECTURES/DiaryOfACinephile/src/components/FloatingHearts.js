import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";

const FloatingHeart = ({ delay, duration }) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          delay: delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          delay: duration - 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(scale, {
        toValue: 1,
        delay: delay,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]);

    animation.start();
  }, []);

  return (
    <Animated.Text
      style={[
        styles.bubbles,
        {
          opacity,
          transform: [{ translateY }, { scale }],
        },
      ]}
    >
      🫧
    </Animated.Text>
  );
};

export default function FloatingHearts() {
  return (
    <View style={styles.container} pointerEvents="none">
      <FloatingHeart delay={0} duration={2000} />
      <FloatingHeart delay={200} duration={2200} />
      <FloatingHeart delay={400} duration={1800} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    alignSelf: "center",
    alignItems: "center",
  },
  bubbles: {
    fontSize: 30,
    position: "absolute",
  },
});

/* -_- N4M154 -_- */
