import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PastelBanner({ type = "info", message = "", style }) {
  const colors =
    {
      info: {
        bg: "rgba(184, 164, 212, 0.2)",
        border: "rgba(184, 164, 212, 0.35)",
        text: "#6B5B95",
      },
      success: {
        bg: "rgba(200, 235, 200, 0.25)",
        border: "rgba(150, 220, 150, 0.4)",
        text: "#3C7A3B",
      },
      warning: {
        bg: "rgba(255, 235, 200, 0.35)",
        border: "rgba(255, 210, 150, 0.5)",
        text: "#7A5D3C",
      },
      error: {
        bg: "rgba(255, 182, 193, 0.25)",
        border: "rgba(255, 105, 135, 0.35)",
        text: "#E8819A",
      },
    }[type] || {};

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.bg, borderColor: colors.border },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});

/* -_- N4M154 -_- */
