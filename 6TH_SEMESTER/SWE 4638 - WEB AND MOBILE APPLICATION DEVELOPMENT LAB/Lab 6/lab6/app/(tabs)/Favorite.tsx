// 210042112
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Recipe, getFavoriteRecipes, searchFavoriteRecipes, toggleFavorite } from '../../services/database';

export default function FavoriteScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavoriteRecipes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavoriteRecipes();
    }, [])
  );

  const loadFavoriteRecipes = async () => {
    try {
      const favoriteRecipes = await getFavoriteRecipes();
      setRecipes(favoriteRecipes);
      setFilteredRecipes(favoriteRecipes);
    } catch (error) {
      console.error('Error loading favorite recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      await loadFavoriteRecipes();
    } else {
      try {
        const searchResults = await searchFavoriteRecipes(text);
        setFilteredRecipes(searchResults);
      } catch (error) {
        console.error('Error searching favorite recipes:', error);
      }
    }
  };

  const handleToggleFavorite = async (id: number) => {
    try {
      await toggleFavorite(id, 0); 
      await loadFavoriteRecipes(); 
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const getTotalTime = (prepTime: number, cookTime: number) => {
    return `${prepTime + cookTime} min`;
  };

  const renderRecipeCard = ({ item }: { item: Recipe }) => (
    <View style={styles.recipeCard}>
      <View style={styles.recipeImageContainer}>
        <LinearGradient
          colors={['#ff6b6b', 'teal']}
          style={styles.recipeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {item.category === "Dinner" ? (
            <MaterialCommunityIcons name="noodles" size={60} color="white" />
          ) : item.category === "Breakfast" ? (
            <MaterialCommunityIcons name="food-croissant" size={60} color="white" />
          ) : item.category === "Dessert" ? (
            <MaterialCommunityIcons name="food-variant" size={60} color="white" />
          ) : item.category === "Lunch" ? (
            <MaterialCommunityIcons name="food-apple" size={60} color="white" />
          ) : (
            <MaterialCommunityIcons name="food" size={60} color="white" />
          )}
        </LinearGradient>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => {
            if (item.id) {
              handleToggleFavorite(item.id);
            }
          }}
        >
          <Ionicons name="heart" size={24} color="#EC4899" />
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
            <Ionicons name="time" size={16} color="gray" />
            <Text style={styles.detailText}>{getTotalTime(item.prep_time, item.cook_time)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="people" size={16} color="gray" />
            <Text style={styles.detailText}>{item.servings} servings</Text>
          </View>
        </View>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8B5CF6" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search favorites..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      {filteredRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite recipes yet</Text>
          <Text style={styles.emptySubtext}>Go to Recipes tab and heart some recipes to see them here</Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecipes}
          renderItem={renderRecipeCard}
          keyExtractor={(item) => item.id?.toString() || '0'}
          contentContainerStyle={styles.recipeList}
          showsVerticalScrollIndicator={true}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:30
  },
  header: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  recipeList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'pink',
   
  },
  recipeImageContainer: {
    position: 'relative',
    height: 150,
  },
  recipeGradient: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recipeInfo: {
    padding: 16,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: 'pink',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  categoryText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  recipeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
// -_- N4M154 -_-