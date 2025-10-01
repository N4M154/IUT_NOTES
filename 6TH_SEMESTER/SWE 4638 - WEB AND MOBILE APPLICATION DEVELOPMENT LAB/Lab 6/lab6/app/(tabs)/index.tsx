// 210042112
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Recipe,
  getAllRecipes,
  initDatabase,
  searchRecipes,
  toggleFavorite,
} from "../../services/database";
import { seedDatabase } from "../../services/seedData";

const categories = ["All", "Breakfast", "Dinner", "Dessert", "Lunch"];

export default function HomeScreen() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [])
  );

  const initializeApp = async () => {
    try {
      await initDatabase();
      await seedDatabase();
      await loadRecipes();
    } catch (error) {
      console.error("Error initializing app:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecipes = async () => {
    try {
      const allRecipes = await getAllRecipes();
      setRecipes(allRecipes);
      setFilteredRecipes(allRecipes);
    } catch (error) {
      console.error("Error loading recipes:", error);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim() === "") {
      await loadRecipes();
    } else {
      try {
        const searchResults = await searchRecipes(text);
        setFilteredRecipes(searchResults);
      } catch (error) {
        console.error("Error searching recipes:", error);
      }
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) => recipe.category === category);
      setFilteredRecipes(filtered);
    }
  };

  const handleToggleFavorite = async (id: number) => {
    try {
      const recipe = recipes.find((r) => r.id === id);
      if (recipe) {
        const newFavoriteStatus = recipe.is_favorite === 1 ? 0 : 1;
        await toggleFavorite(id, newFavoriteStatus);

        const updatedRecipes = recipes.map((r) =>
          r.id === id ? { ...r, is_favorite: newFavoriteStatus } : r
        );
        setRecipes(updatedRecipes);

        if (selectedCategory === "All") {
          setFilteredRecipes(updatedRecipes);
        } else {
          const filtered = updatedRecipes.filter(
            (r) => r.category === selectedCategory
          );
          setFilteredRecipes(filtered);
        }
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const getTotalTime = (prepTime: number, cookTime: number) => {
    return `${prepTime + cookTime} min`;
  };

  const getGradientColors = (category: string): [string, string] => {
    switch (category) {
      case "Dinner":
        return ["#ff6b6b", "teal"];
      case "Breakfast":
        return ["#ff6b6b", "teal"];
      case "Dessert":
        return ["#ff6b6b", "teal"];
      case "Lunch":
        return ["#ff6b6b", "teal"];
      default:
        return ["#ff6b6b", "teal"];
    }
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity
      style={styles.recipeCard}
      onPress={() => router.push(`/recipe-details?id=${item.id}`)}
    >
      <View style={styles.recipeImageContainer}>
        <LinearGradient
          colors={getGradientColors(item.category)}
          style={styles.recipeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {item.category === "Dinner" ? (
            <MaterialCommunityIcons name="noodles" size={60} color="white" />
          ) : item.category === "Breakfast" ? (
            <MaterialCommunityIcons
              name="food-croissant"
              size={60}
              color="white"
            />
          ) : item.category === "Dessert" ? (
            <MaterialCommunityIcons
              name="food-variant"
              size={60}
              color="white"
            />
          ) : item.category === "Lunch" ? (
            <MaterialCommunityIcons name="food-apple" size={60} color="white" />
          ) : (
            <MaterialCommunityIcons name="food" size={60} color="white" />
          )}
        </LinearGradient>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            if (item.id) {
              handleToggleFavorite(item.id);
            }
          }}
        >
          <Ionicons
            name={item.is_favorite === 1 ? "heart" : "heart-outline"}
            size={24}
            color={item.is_favorite === 1 ? "#EC4899" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <View style={styles.categoryRow}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.difficultyText}>{item.difficulty}</Text>
        </View>
        <View style={styles.recipeDetails}>
          <View style={styles.detailItem}>
            <Ionicons name="stopwatch" size={16} color="#666" />
            <Text style={styles.detailText}>
              {getTotalTime(item.prep_time, item.cook_time)}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people-sharp" size={16} color="#666" />
            <Text style={styles.detailText}>{item.servings} servings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Recipes</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8B5CF6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search recipes..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <Ionicons
            name="chevron-back"
            size={20}
            color="#6B7280"
            style={styles.scrollArrow}
          />
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive,
              ]}
              onPress={() => handleCategoryFilter(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#6B7280"
            style={styles.scrollArrow}
          />
        </ScrollView>
      </View>

      {filteredRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recipes yet</Text>
          <Text style={styles.emptySubtext}>
            Add your first recipe using the + button below
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id?.toString() || "0"}
          contentContainerStyle={styles.recipeList}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  header: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },

  scrollArrow: {
    marginHorizontal: 8,
  },
  categoryButton: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  categoryButtonActive: {
    backgroundColor: "#FF6B6B",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  categoryButtonTextActive: {
    color: "white",
  },

  recipeList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "pink",
  },
  recipeImageContainer: {
    position: "relative",
    height: 150,
  },
  recipeGradient: {
    flex: 1,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    padding: 8,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  categoryTag: {
    backgroundColor: "pink",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 0,
  },
  categoryText: {
    color: "red",
    fontSize: 12,
    fontWeight: "600",
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  recipeDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  difficultyText: {
    fontSize: 14,
    color: "#6B7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
    backgroundColor: "white",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
// -_- N4M154 -_-
