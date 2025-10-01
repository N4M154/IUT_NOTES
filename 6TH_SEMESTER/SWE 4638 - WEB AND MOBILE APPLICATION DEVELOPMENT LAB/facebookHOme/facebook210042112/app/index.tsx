// import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
// import AntDesign from "@expo/vector-icons/AntDesign";
// import Foundation from "@expo/vector-icons/Foundation";
// import React from "react";
// import {
//   FlatList,
//   Image,
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import PostItem from "./PostItem";
// import Stories from "./Stories";

// export default function IndexScreen() {
//   const stories = [
//     {
//       id: "create",
//       title: "Create story",
//       uri: require("../assets/profile.jpeg"),
//     },
//     {
//       id: "s1",
//       title: "Antik Mahmud",
//       uri: require("../assets/a2.jpeg"),
//       profileImage: require("../assets/a1.jpeg"),
//     },
//     {
//       id: "s2",
//       title: "Kitto",
//       uri: require("../assets/k1.jpeg"),
//       profileImage: require("../assets/k2.jpeg"),
//     },
//     {
//       id: "s3",
//       title: "The Positive One",
//       uri: require("../assets/p1.jpeg"),
//       profileImage: require("../assets/p2.jpeg"),
//     },
//     {
//       id: "s4",
//       title: "Cyanide & Happiness",
//       uri: require("../assets/c1.jpeg"),
//       profileImage: require("../assets/c2.jpeg"),
//     },
//   ];

//   const posts = [
//     {
//       id: "p1",
//       author: "Letterboxd",
//       time: "20 Aug",
//       title:
//         "From a maniacal Michael Shannon and a mechanical Jason Statham to college comedies and mile-high thrillers, Dan Mecca salutes twenty standout features released in the dog days of late August.",
//       mainImage: require("../assets/post1.jpeg"),
//       actorImage: require("../assets/pos1.png"),
//       likes: 128,
//       comments: 11,
//       shares: 18,
//     },
//     {
//       id: "p2",
//       author: "A Shot.",
//       time: "8h",
//       title:
//         "First look at Adam Scott in Damian McCarthy’s ‘HOKUM’.\n\nThe film follows a horror novelist who visits an Irish inn to scatter his parents’ ashes, unaware that it is said to be haunted by a witch.",
//       mainImage: require("../assets/post2.jpeg"),
//       actorImage: require("../assets/pos2.jpeg"),
//       likes: 671,
//       comments: 27,
//       shares: 60,
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="black" />
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <TouchableOpacity style={styles.headerIcon}>
//             <Ionicons name="menu" size={30} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.facebookLogo}>facebook</Text>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity style={styles.headerIcon}>
//             <AntDesign name="plussquareo" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerIcon}>
//             <Ionicons name="search" size={25} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.headerIcon}>
//             <FontAwesome5 name="facebook-messenger" size={22} color="white" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.navTabs}>
//         <TouchableOpacity style={[styles.navTab, styles.activeTab]}>
//           <Ionicons
//             name="home"
//             size={24}
//             style={[styles.activeNavIcon]}
//           />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab}>
//           <Foundation name="play-video" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab}>
//           <Ionicons name="people" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab}>
//           <Ionicons name="people-circle-outline" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab}>
//           <Ionicons name="notifications-outline" size={26} color="white" />
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.navTab}>
//           <Ionicons name="person-circle-outline" size={26} color="white" />
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={posts}
//         keyExtractor={(p) => p.id}
//         showsVerticalScrollIndicator={false}
//         style={{ flex: 1 }}
//         ListHeaderComponent={
//           <>
//             <View style={styles.flatlist}>
//               <Image
//                 source={require("../assets/profile.jpeg")}
//                 style={styles.profilePicSmall}
//               />
//               <TextInput
//                 style={[styles.mindInput, { marginHorizontal: 8 }]}
//                 placeholder="What's on your mind?"
//                 placeholderTextColor="#999"
//                 editable={false}
//               />
//               <TouchableOpacity style={styles.galleryIcon}>
//                 <FontAwesome name="image" size={20} color="#097b20ff" />
//               </TouchableOpacity>
//             </View>

//             <Stories stories={stories} />
//           </>
//         }
//         renderItem={({ item }) => <PostItem item={item} />}
//         contentContainerStyle={{
//           flexGrow: 1,
//           justifyContent: "space-between",
//         }}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#1a1a1a" },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     backgroundColor: "#1a1a1a",
//   },
//   headerLeft: { flexDirection: "row", alignItems: "center" },
//   headerIcon: { padding: 3 },
//   facebookLogo: {
//     fontSize: 40,
//     fontWeight: "bold",
//     color: "white",
//     marginLeft: 10,
//   },
//   headerRight: { flexDirection: "row", alignItems: "center" },
//   iconText: { marginLeft: 10 },

//   navTabs: {
//     flexDirection: "row",
//     backgroundColor: "#1a1a1a",
//     paddingHorizontal: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#3a3a3a",
//   },
//   navTab: { flex: 1, alignItems: "center", paddingVertical: 9 },
//   activeTab: { borderBottomWidth: 2, borderBottomColor: "white" },
//   navIcon: { color: "#666" },
//   activeNavIcon: { color: "#1877f2" },

//   whatsOnMind: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     backgroundColor: "#2a2a2a",
//     marginHorizontal: 10,
//     marginVertical: 10,
//     borderRadius: 25,
//   },
//   profilePicSmall: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     overflow: "hidden",
//   },
//   profilePicText: { color: "white" },
//   mindInput: {
//     flex: 1,
//     color: "white",
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#444",
//     borderRadius: 20,
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     backgroundColor: "transparent",
//   },
//   galleryIcon: { padding: 5 },
//   galleryIconText: { color: "white" },

//   storiesContainer: {
//     marginVertical: 6,
//     marginTop: 20,
//     paddingBottom: 10,
//     marginBottom: 8,
//     borderBottomWidth: 4,
//     borderBottomColor: "black",
//   },
//   storyCard: { width: 110, alignItems: "center", position: "relative" },
//   storyImage: {
//     width: 110,
//     height: 200,
//     borderRadius: 12,
//     backgroundColor: "#2a2a2a",
//     marginBottom: 6,
//     overflow: "hidden",
//   },
//   createStoryPlus: {
//     position: "absolute",
//     bottom: 50,
//     width: 30,
//     height: 30,
//     borderRadius: 23,
//     backgroundColor: "#1877f2",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 3,
//   },
//   plusIcon: { color: "white", fontWeight: "bold" },
//   storyProfileRing: {
//     position: "absolute",
//     left: 8,
//     top: 8,
//     width: 34,
//     height: 34,
//     borderRadius: 17,
//     borderWidth: 2,
//     borderColor: "#1877f2",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#00000066",
//   },
//   storyProfileInner: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     overflow: "hidden",
//   },
//   storyProfileImage: { width: 28, height: 28, borderRadius: 14 },
//   storyText: { color: "white", fontSize: 12, textAlign: "center" },
//   storyTitleOverlay: {
//     position: "absolute",
//     left: 6,
//     right: 6,
//     bottom: 6,
//     backgroundColor: "transparent",
//     borderRadius: 8,
//     paddingVertical: 4,
//     paddingHorizontal: 6,
//     zIndex: 2,
//   },

//   feedPost: {
//     backgroundColor: "#2a2a2a",
//     marginHorizontal: 10,
//     marginVertical: 8,
//     padding: 0,
//   },
//   postSection: { paddingHorizontal: 12 },
//   postHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   postHeaderLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//     marginTop: 20,
//   },
//   postProfilePicImage: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     marginRight: 10,
//     backgroundColor: "#1877f2",
//   },
//   postHeaderInfo: { flex: 1 },
//   postAuthor: { color: "white", fontSize: 14, fontWeight: "bold" },
//   postMeta: { flexDirection: "row", alignItems: "center" },
//   postTime: { color: "#999", fontSize: 12, marginRight: 5 },
//   postHeaderRight: { flexDirection: "row" },
//   postIcon: { padding: 5, marginLeft: 5 },
//   postTitle: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   postMainImage: {
//     width: "100%",
//     height: 370,
//     borderRadius: 0,
//     backgroundColor: "black",
//     marginBottom: 10,
//     marginLeft: 0,
//     marginRight: 0,
//   },

//   postBody: { flexDirection: "row", marginBottom: 12 },
//   actorImage: {
//     width: 64,
//     height: 64,
//     borderRadius: 8,
//     backgroundColor: "#3a3a3a",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//     overflow: "hidden",
//   },
//   actorImageInner: { width: "100%", height: "100%" },
//   postDescription: { flex: 1, justifyContent: "center" },
//   descriptionText: { color: "#ccc", fontSize: 14, lineHeight: 20 },

//   seeMore: { color: "#999", marginBottom: 8 },
//   postStatsRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 4,
//     marginTop: 10,
//   },
//   likesRow: { flexDirection: "row", alignItems: "center" },
//   sharesRow: { flexDirection: "row", alignItems: "center" },
//   postStatText: { color: "#999", fontSize: 12, marginLeft: 10 },
//   actionRow: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingTop: 12,
//     paddingBottom: 8,
//   },
//   actionBtn: { flexDirection: "row", alignItems: "center", paddingVertical: 8 },
//   actionText: { color: "#ccc", marginLeft: 6 },
//   flatlist: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginHorizontal: 10,
//     marginTop: 10,
//     paddingBottom: 10,
//     marginBottom: 8,
//     borderBottomWidth: 4,
//     borderBottomColor: "black",
//   },
// });


import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PostItem from "./PostItem";
import Stories from "./Stories";

export default function IndexScreen() {
  const stories = [
    { id: "create", title: "Create story", uri: require("../assets/profile.jpeg") },
    { id: "s1", title: "Antik Mahmud", uri: require("../assets/a2.jpeg"), profileImage: require("../assets/a1.jpeg") },
    { id: "s2", title: "Kitto", uri: require("../assets/k1.jpeg"), profileImage: require("../assets/k2.jpeg") },
    { id: "s3", title: "The Positive One", uri: require("../assets/p1.jpeg"), profileImage: require("../assets/p2.jpeg") },
    { id: "s4", title: "Cyanide & Happiness", uri: require("../assets/c1.jpeg"), profileImage: require("../assets/c2.jpeg") },
  ];

  const posts = [
    {
      id: "p1",
      author: "Letterboxd",
      time: "20 Aug",
      title:
        "From a maniacal Michael Shannon and a mechanical Jason Statham to college comedies and mile-high thrillers, Dan Mecca salutes twenty standout features released in the dog days of late August.",
      mainImage: require("../assets/post1.jpeg"),
      actorImage: require("../assets/pos1.png"),
      likes: 128,
      comments: 11,
      shares: 18,
    },
    {
      id: "p2",
      author: "A Shot.",
      time: "8h",
      title:
        "First look at Adam Scott in Damian McCarthy's 'HOKUM'.\n\nThe film follows a horror novelist who visits an Irish inn to scatter his parents' ashes, unaware that it is said to be haunted by a witch.",
      mainImage: require("../assets/post2.jpeg"),
      actorImage: require("../assets/pos2.jpeg"),
      likes: 671,
      comments: 27,
      shares: 60,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="menu" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.facebookLogo}>facebook</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <AntDesign name="plussquareo" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <FontAwesome5 name="facebook-messenger" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.navTabs}>
        <TouchableOpacity style={[styles.navTab, styles.activeTab]}>
          <Ionicons name="home" size={24} style={styles.activeNavIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Foundation name="play-video" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Ionicons name="people" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Ionicons name="people-circle-outline" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Ionicons name="notifications-outline" size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab}>
          <Ionicons name="person-circle-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={styles.flatlist}>
          <Image
            source={require("../assets/profile.jpeg")}
            style={styles.profilePicSmall}
          />
          <TextInput
            style={[styles.mindInput, { marginHorizontal: 8 }]}
            placeholder="What's on your mind?"
            placeholderTextColor="#999"
            editable={false}
          />
          <TouchableOpacity style={styles.galleryIcon}>
            <FontAwesome name="image" size={20} color="#097b20ff" />
          </TouchableOpacity>
        </View>

        <FlatList
  horizontal
  data={stories}
  keyExtractor={(s) => s.id}
  renderItem={({ item }) => <Stories stories={[item]} />}
/>

        <FlatList
          data={posts}
          keyExtractor={(p) => p.id}
          renderItem={({ item }) => <PostItem item={item} />}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a1a1a" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#1a1a1a",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  headerIcon: { padding: 3 },
  facebookLogo: { fontSize: 40, fontWeight: "bold", color: "white", marginLeft: 10 },
  headerRight: { flexDirection: "row", alignItems: "center" },

  navTabs: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3a",
  },
  navTab: { flex: 1, alignItems: "center", paddingVertical: 9 },
  activeTab: { borderBottomWidth: 2, borderBottomColor: "white" },
  activeNavIcon: { color: "#1877f2" },

  flatlist: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
    marginBottom: 8,
    borderBottomWidth: 4,
    borderBottomColor: "black",
  },
  profilePicSmall: { width: 40, height: 40, borderRadius: 20, marginRight: 10, overflow: "hidden" },
  mindInput: {
    flex: 1,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "transparent",
  },
  galleryIcon: { padding: 5 },
});
