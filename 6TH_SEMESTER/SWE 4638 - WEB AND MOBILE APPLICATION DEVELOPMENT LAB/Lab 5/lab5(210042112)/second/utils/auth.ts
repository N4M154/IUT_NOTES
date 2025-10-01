import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const checkAuthStatus = async (): Promise<User | null> => {
  try {
    const authToken = await AsyncStorage.getItem('authToken');
    const userJson = await AsyncStorage.getItem('currentUser');
    
    if (!authToken || !userJson) {
      return null;
    }

    return JSON.parse(userJson);
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('currentUser');
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
