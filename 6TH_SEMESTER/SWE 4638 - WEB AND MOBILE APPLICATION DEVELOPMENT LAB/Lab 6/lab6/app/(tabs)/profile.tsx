// 210042112
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { getAllRecipes, getFavoriteRecipes } from "../../services/database";

export default function ProfileScreen() {
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  const loadStats = async () => {
    try {
      const allRecipes = await getAllRecipes();
      const favoriteRecipes = await getFavoriteRecipes();

      setTotalRecipes(allRecipes.length);
      setTotalFavorites(favoriteRecipes.length);
    } catch (error) {
      console.error("Error loading profile stats:", error);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  //This makes sure stats reload every time the user comes back to the Profile screen (not just the first mount).
  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Profile</Text>
        </View>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <MaterialCommunityIcons name="chef-hat" size={40} color="black" />
          </View>
          <Text style={styles.name}>Chef Student</Text>
          <Text style={styles.tagline}>Home Cook Enthusiast</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalRecipes}</Text>
            <Text style={styles.statLabel}>Recipes</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{totalFavorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Default Servings</Text>
            <Text style={styles.rowValue}>4 people</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Measurements</Text>
            <Text style={styles.rowValue}>Metric</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Dark Theme</Text>
            <View style={styles.switchOn}>
              <View style={styles.switchThumbRight} />
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Notifications</Text>
            <View style={styles.switchOn}>
              <View style={styles.switchThumbRight} />
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Export Recipes</Text>
            <Feather name="download" size={20} color="black" />
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Import Recipes</Text>
            <Feather name="upload" size={20} color="black" />
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.row}>
            <Text style={styles.clearText}>Clear All Data</Text>
            <Feather name="trash-2" size={20} color="red" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingTop: 30,
  },
  container: {
    paddingBottom: 24,
  },
  topBar: {
    height: 52,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
  },
  topBarTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  profileHeader: {
    backgroundColor: "white",
    paddingVertical: 24,
    alignItems: "center",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "teal",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 1,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "black",
  },
  tagline: {
    marginTop: 4,
    fontSize: 14,
    color: "black",
  },
  statsCard: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "pink",
  },
  statBox: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "800",
    color: "red",
  },
  statLabel: {
    marginTop: 4,
    color: "teal",
    fontSize: 12,
  },
  divider: {
    width: 1,
    height: 80,
    marginTop: -15,
    marginBottom: -15,
    backgroundColor: "gray",
  },
  sectionCard: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "pink",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
  },
  rowLabel: {
    fontSize: 16,
    color: "#1f2937",
  },
  rowValue: {
    fontSize: 16,
    color: "red",
    fontWeight: "600",
  },

  switchOn: {
    width: 50,
    height: 28,
    borderRadius: 16,
    backgroundColor: "red",
    padding: 4,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  switchThumbRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },
  clearText: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
  },
});
// -_- N4M154 -_-
