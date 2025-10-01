// 210042112
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getRecipeById, Recipe } from '../services/database';

export default function RecipeDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (id) {
      loadRecipe(parseInt(id as string));
    }
  }, [id]);

  const loadRecipe = async (recipeId: number) => {
    try {
      setIsLoading(true);
      const recipeData = await getRecipeById(recipeId);
      if (recipeData) {
        setRecipe(recipeData);
        let ingredients: string[] = [];
        try {
          ingredients = JSON.parse(recipeData.ingredients);
        } catch {
          ingredients = recipeData.ingredients.split(/\n|,/).filter(item => item.trim() !== '');
        }
        setCheckedIngredients(new Set(ingredients.map((_: any, index: number) => index)));
      } else {
        Alert.alert('Error', 'Recipe not found');
        router.back();
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
      Alert.alert('Error', 'Failed to load recipe');
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const getTotalTime = (prepTime: number, cookTime: number) => {
    return prepTime + cookTime;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Dinner":
        return <Text style={{ fontSize: 80, color: "#8B5CF6" }}>🍜</Text>;
      case "Breakfast":
        return <Text style={{ fontSize: 80, color: "#8B5CF6" }}>🥐</Text>;
      case "Lunch":
        return <Text style={{ fontSize: 80, color: "#8B5CF6" }}>🍎</Text>;
      case "Dessert":
        return <Text style={{ fontSize: 80, color: "#8B5CF6" }}>🍰</Text>;
      default:
        return <Text style={{ fontSize: 80, color: "#8B5CF6" }}>🍽️</Text>;
    }
  };

  const handleStartCooking = () => {
    if (recipe) {
      router.push(`/cooking-mode?id=${recipe.id}`);
    }
  };

  const navigateToTab = (tabName: string) => {
    if (tabName === 'index') {
      router.push('/(tabs)');
    } else {
      router.push(`/(tabs)/${tabName}` as any);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Recipe not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  let ingredients: string[] = [];
  try {
    ingredients = JSON.parse(recipe.ingredients);
  } catch {
    ingredients = recipe.ingredients.split(/\n|,/).filter(item => item.trim() !== '');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.recipeCard}>
          <View style={styles.recipeImageContainer}>
            <LinearGradient
              colors={['#ff6b6b', 'teal']}
              style={styles.recipeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {recipe.category === "Dinner" ? (
                <MaterialCommunityIcons name="noodles" size={60} color="white" />
              ) : recipe.category === "Breakfast" ? (
                <MaterialCommunityIcons name="food-croissant" size={60} color="white" />
              ) : recipe.category === "Dessert" ? (
                <MaterialCommunityIcons name="food-variant" size={60} color="white" />
              ) : recipe.category === "Lunch" ? (
                <MaterialCommunityIcons name="food-apple" size={60} color="white" />
              ) : (
                <MaterialCommunityIcons name="food" size={60} color="white" />
              )}
            </LinearGradient>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons
                name={recipe.is_favorite === 1 ? "heart" : "heart-outline"}
                size={24}
                color={recipe.is_favorite === 1 ? "#EC4899" : "gray"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
            <View style={styles.categoryRow}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{recipe.category}</Text>
              </View>
              <Text style={styles.difficultyText}>{recipe.difficulty}</Text>
            </View>
            <View style={styles.recipeDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="stopwatch" size={16} color="#666" />
                <Text style={styles.detailText}>{getTotalTime(recipe.prep_time, recipe.cook_time)} min</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="people-sharp" size={16} color="#666" />
                <Text style={styles.detailText}>{recipe.servings} servings</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ingredientsCard}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredients.map((ingredient: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.ingredientRow}
              onPress={() => toggleIngredient(index)}
            >
              <View style={[
                styles.checkbox,
                checkedIngredients.has(index) && styles.checkboxChecked
              ]}>
                {checkedIngredients.has(index) && (
                  <Text style={{ fontSize: 16, color: "white" }}>✓</Text>
                )}
              </View>
              <Text style={styles.ingredientText}>{ingredient}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.startCookingButton} onPress={handleStartCooking}>
            <Text style={styles.startCookingText}>Start Cooking</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.editRecipeButton}>
            <Text style={styles.editRecipeText}>Edit Recipe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('index')}>
          <Text style={{ fontSize: 24, color: "#8B5CF6" }}>🍳</Text>
          <Text style={styles.tabLabel}>Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('explore')}>
          <Text style={{ fontSize: 28, color: "#8B5CF6" }}>➕</Text>
          <Text style={styles.tabLabel}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('Favorite')}>
          <Text style={{ fontSize: 24, color: "#EC4899" }}>❤️</Text>
          <Text style={styles.tabLabel}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('profile')}>
          <Text style={{ fontSize: 24, color: "#8B5CF6" }}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#FF6B6B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSpacer: {
    width: 80,
  },
  recipeCard: {
    backgroundColor: "white",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
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
  difficultyText: {
    fontSize: 14,
    color: "#6B7280",
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
  content: {
    flex: 1,
  },
  ingredientsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginHorizontal: 20,
 borderWidth: 1,
 borderColor: "pink",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B6B',
  },
  ingredientText: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  startCookingButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  startCookingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  editRecipeButton: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
  },
  editRecipeText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    fontSize: 18,
    color: '#FF6B6B',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#8B5CF6',
    marginTop: 4,
  },
});
// -_- N4M154 -_-