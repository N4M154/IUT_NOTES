import { FontAwesome, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PostItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const [showSeeMore, setShowSeeMore] = useState(false);

  return (
    <View style={styles.feedPost}>
      <View style={[styles.postSection, styles.postHeader]}>
        <View style={styles.postHeaderLeft}>
          <Image
            source={
              typeof item.actorImage === "string"
                ? { uri: item.actorImage }
                : item.actorImage
            }
            style={styles.postProfilePicImage}
          />
          <View style={styles.postHeaderInfo}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <View style={styles.postMeta}>
              <Text style={styles.postTime}>{item.time} • </Text>
              <FontAwesome name="globe" size={14} color="gray" />
            </View>
          </View>
        </View>
        <View style={styles.postHeaderRight}>
          <TouchableOpacity style={styles.postIcon}>
            <Ionicons name="ellipsis-horizontal" size={18} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postIcon}>
            <Ionicons name="close" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={[styles.postSection, styles.postTitle]}
        numberOfLines={expanded ? undefined : 2}
        onTextLayout={(e) => {
          if (e.nativeEvent.lines.length > 2) {
            setShowSeeMore(true);
          }
        }}
      >
        {item.title}
      </Text>
      {showSeeMore && !expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)}>
          <Text style={[styles.postSection, styles.seeMore]}>See more</Text>
        </TouchableOpacity>
      )}
      <Image
        source={
          typeof item.mainImage === "string"
            ? { uri: item.mainImage }
            : item.mainImage
        }
        style={styles.postMainImage}
      />

      <View style={[styles.postSection, styles.postStatsRow]}>
        <View style={styles.likesRow}>
          <AntDesign name="like1" size={14} color="#1877f2" />
          <Text style={styles.postStatText}>{item.likes}</Text>
        </View>
        <View style={styles.sharesRow}>
          <Text style={styles.postStatText}>{item.comments} comments</Text>
          <Text
            style={[
              styles.postStatText,
              /*{
               { marginLeft: 10 }
              }*/
            ]}
          >
            {item.shares} shares
          </Text>
        </View>
      </View>

      <View style={[styles.postSection, styles.actionRow]}>
        <TouchableOpacity style={styles.actionBtn}>
          <AntDesign name="like2" size={18} color="#ccc" />
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Ionicons name="chatbubble-outline" size={18} color="#ccc" />
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialCommunityIcons name="share-outline" size={25} color="#ccc" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  feedPost: {
    backgroundColor: "#2a2a2a",
    marginHorizontal: 5,
    marginVertical: 8,
    padding: 0,
  },
  postSection: {
    paddingHorizontal: 12,
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  postHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
  },
  postProfilePicImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#1877f2",
  },
  postHeaderInfo: { flex: 1 },
  postAuthor: { color: "white", fontSize: 14, fontWeight: "bold" },
  postMeta: { flexDirection: "row", alignItems: "center" },
  postTime: { color: "#999", fontSize: 12, marginRight: 5 },
  postHeaderRight: { flexDirection: "row" },
  postIcon: { padding: 5, marginLeft: 5 },
  postTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 8,
  },
  postMainImage: {
    width: "100%",
    height: 300,
    borderRadius: 0,
    backgroundColor: "black",
    marginBottom: 10,
    marginLeft: 0,
    marginRight: 0,
  },
  seeMore: { color: "#999", marginBottom: 8 },
  postStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
    marginTop: 10,
  },
  likesRow: { flexDirection: "row", alignItems: "center" },
  sharesRow: { flexDirection: "row", alignItems: "center" },
  postStatText: { color: "#999", fontSize: 12, marginLeft: 10 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  actionBtn: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
  actionText: { color: "#ccc", marginLeft: 6 },
});

export default PostItem;
