import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export const Stories = ({ stories }) => {
  const renderStory = (item) => {
    if (item.id === "create") {
      return (
        <View style={styles.storyCard}>
          <Image
            source={typeof item.uri === "string" ? { uri: item.uri } : item.uri}
            style={styles.storyImage}
          />
          <View style={styles.createStoryPlus}>
            <Ionicons name="add" size={28} style={styles.plusIcon} />
          </View>
          <View style={styles.storyTitleOverlay}>
            <Text style={styles.storyText}>{item.title}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.storyCard}>
        <Image
          source={typeof item.uri === "string" ? { uri: item.uri } : item.uri}
          style={styles.storyImage}
        />
        <View style={styles.storyProfileRing}>
          <View style={styles.storyProfileInner}>
            <Image
              source={
                typeof item.profileImage === "string"
                  ? { uri: item.profileImage }
                  : item.profileImage
              }
              style={styles.storyProfileImage}
            />
          </View>
        </View>
        <View style={styles.storyTitleOverlay}>
          <Text style={styles.storyText} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.storiesContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesScroll}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {stories.map((s) => (
          <View key={s.id} style={{ marginRight: -8 }}>
            {renderStory(s)}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    marginVertical: 6,
    marginTop: "20",
    paddingBottom: 10,
    marginBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: "black",
  },
  storiesScroll: {},
  storyCard: {
    width: 110,
    alignItems: "center",
    position: "relative",
  },
  storyImage: {
    width: 110,
    height: 200,
    borderRadius: 12,
    backgroundColor: "#2a2a2a",
    marginBottom: 6,
    overflow: "hidden",
  },
  createStoryPlus: {
    position: "absolute",
    bottom: 50,
    width: 30,
    height: 30,
    borderRadius: 23,
    backgroundColor: "#1877f2",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
  },
  plusIcon: {
    color: "white",
    fontWeight: "bold",
  },
  storyProfileRing: {
    position: "absolute",
    left: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#1877f2",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000066",
  },
  storyProfileInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
  },
  storyProfileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  storyText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  storyTitleOverlay: {
    position: "absolute",
    left: 6,
    right: 6,
    bottom: 6,
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    zIndex: 2,
  },
});

export default Stories;
