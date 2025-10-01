# Lab 6 - Recipe Manager App - 210042112

## Features

- **Recipe Management**: Add, view, edit recipes
- **SQLite Database**: Persistent local storage for all recipe data
- **Favorites System**: Mark recipes as favorites and view them separately
- **Search & Filter**: Search recipes by title, category, or ingredients
- **Category Filtering**: Filter recipes by meal type (Breakfast, Lunch, Dinner, Dessert, Snack)

## Database Schema

The app uses SQLite with the following table structure:

```sql
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  prep_time INTEGER NOT NULL,
  cook_time INTEGER NOT NULL,
  servings INTEGER NOT NULL,
  ingredients TEXT NOT NULL,
  instructions TEXT NOT NULL,
  image_url TEXT,
  is_favorite INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   npm install expo-sqlite
   ```

2. **Start the Development Server**
   ```bash
   npx expo start
   ```


## Database Operations

### Core Functions

- `initDatabase()`: Initialize the database and create tables
- `insertRecipe(recipe)`: Add a new recipe
- `getAllRecipes()`: Retrieve all recipes
- `getFavoriteRecipes()`: Get only favorite recipes
- `getRecipeById(id)`: Get a specific recipe
- `updateRecipe(recipe)`: Update an existing recipe
- `toggleFavorite(id, status)`: Toggle favorite status
- `deleteRecipe(id)`: Delete a recipe
- `searchRecipes(query)`: Search recipes by text
- `searchFavoriteRecipes(query)`: Search within favorites

### Usage Example

```typescript
import { insertRecipe, getAllRecipes } from '../services/database';

// Add a new recipe
const newRecipe = {
  title: "Pasta Carbonara",
  category: "Dinner",
  difficulty: "Medium",
  prep_time: 15,
  cook_time: 10,
  servings: 4,
  ingredients: "400g pasta, 200g pancetta...",
  instructions: "1. Boil pasta...",
  is_favorite: 0
};

await insertRecipe(newRecipe);

// Get all recipes
const recipes = await getAllRecipes();
```

## Screen Descriptions

### 1. Main Recipes Screen (`index.tsx`)
- Displays all recipes in card format
- Search functionality
- Category filtering
- Favorite toggling
- Navigation to recipe details

### 2. Favorites Screen (`Favorite.tsx`)
- Shows only favorite recipes
- Search within favorites


### 3. Add Recipe Screen (`explore.tsx`)
- Form to add new recipes
- Input validation
- Category and difficulty selection
- Time and servings input
- Ingredients and instructions text areas

### 4. Recipe Details Screen (`recipe-details.tsx`)
- Detailed recipe information
- Ingredients checklist
- Start cooking button

### 5. Cooking Mode Screen (`cooking-mode.tsx`)
- Step-by-step cooking instructions
- Timer functionality
- Pause/stop controls

## Data Flow

1. **App Initialization**: Database is created and seeded with initial recipes
2. **Recipe Loading**: Recipes are fetched from SQLite and displayed
3. **User Interactions**: Favorites, search, and filtering update the UI
4. **Data Persistence**: All changes are saved to the local SQLite database

## Key Features Implementation

### Favorites System
- Heart icons toggle favorite status
- Favorites are stored as integers (0 or 1) in SQLite
- Real-time updates across all screens

### Search Functionality
- Searches through title, category, and ingredients
- Separate search for favorites
- Real-time filtering as user types

### Category Filtering
- Dynamic filtering by meal type
- Maintains search state


## Troubleshooting

### Common Issues

1. **Database not initializing**
   - Check expo-sqlite installation
   - Verify database permissions

2. **Recipes not loading**
   - Check console for database errors
   - Verify seedData.ts is properly imported

3. **Favorites not updating**
   - Check toggleFavorite function calls
   - Verify state updates are properly handled

## License

This project is licensed under the **MIT License**.

---

