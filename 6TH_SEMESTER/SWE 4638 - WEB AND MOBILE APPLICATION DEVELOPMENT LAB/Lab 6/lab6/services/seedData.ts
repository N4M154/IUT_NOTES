// 210042112

import { getAllRecipes } from './database';

export const seedDatabase = async (): Promise<void> => {
  try {
    const existingRecipes = await getAllRecipes();
    
    if (existingRecipes.length === 0) {
      console.log('Database is empty - ready for user recipes');
    } else {
      console.log(`Database has ${existingRecipes.length} existing recipes`);
    }
  } catch (error) {
    console.error('Error checking database:', error);
  }
};

// -_- N4M154 -_-