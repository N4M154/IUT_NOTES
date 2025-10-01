// 210042112
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Recipe {
  id?: number;
  title: string;
  description?: string;
  category: string;
  difficulty: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  ingredients: string;
  instructions: string;
  image_url?: string;
  is_favorite: number;
  created_at?: string;
}

const RECIPES_STORAGE_KEY = 'recipes_data';
const NEXT_ID_STORAGE_KEY = 'next_recipe_id';

let recipes: Recipe[] = [];
let nextId = 1;

export const initDatabase = async (): Promise<void> => {
  try {
    const storedRecipes = await AsyncStorage.getItem(RECIPES_STORAGE_KEY);
    if (storedRecipes) {
      recipes = JSON.parse(storedRecipes);
    }

    const storedNextId = await AsyncStorage.getItem(NEXT_ID_STORAGE_KEY);
    if (storedNextId) {
      nextId = parseInt(storedNextId);
    }

    console.log(`Database initialized with ${recipes.length} recipes, next ID: ${nextId}`);
  } catch (error) {
    console.error('Error initializing database:', error);
    recipes = [];
    nextId = 1;
  }
};

const saveToStorage = async () => {
  try {
    await AsyncStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(recipes));
    await AsyncStorage.setItem(NEXT_ID_STORAGE_KEY, nextId.toString());
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const insertRecipe = async (recipe: Omit<Recipe, 'id' | 'created_at'>): Promise<number> => {
  const newRecipe: Recipe = {
    ...recipe,
    id: nextId++,
    created_at: new Date().toISOString()
  };
  recipes.push(newRecipe);
  
  await saveToStorage();
  
  return newRecipe.id!;
};

export const getAllRecipes = async (): Promise<Recipe[]> => {
  return [...recipes];
};

export const getFavoriteRecipes = async (): Promise<Recipe[]> => {
  return recipes.filter(recipe => recipe.is_favorite === 1);
};

export const getRecipeById = async (id: number): Promise<Recipe | null> => {
  return recipes.find(recipe => recipe.id === id) || null;
};

export const updateRecipe = async (recipe: Recipe): Promise<void> => {
  const index = recipes.findIndex(r => r.id === recipe.id);
  if (index !== -1) {
    recipes[index] = { ...recipe };
    await saveToStorage();
  }
};

export const toggleFavorite = async (id: number, isFavorite: number): Promise<void> => {
  const recipe = recipes.find(r => r.id === id);
  if (recipe) {
    recipe.is_favorite = isFavorite;
    await saveToStorage();
  }
};

export const deleteRecipe = async (id: number): Promise<void> => {
  recipes = recipes.filter(recipe => recipe.id !== id);
  await saveToStorage();
};

export const searchRecipes = async (query: string): Promise<Recipe[]> => {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(lowerQuery) ||
    recipe.category.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.toLowerCase().includes(lowerQuery)
  );
};

export const searchFavoriteRecipes = async (query: string): Promise<Recipe[]> => {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(recipe => 
    recipe.is_favorite === 1 && (
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.category.toLowerCase().includes(lowerQuery) ||
      recipe.ingredients.toLowerCase().includes(lowerQuery)
    )
  );
};
// -_- N4M154 -_-