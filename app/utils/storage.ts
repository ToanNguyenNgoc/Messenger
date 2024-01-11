import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setItem: async (key: string, value: string) => {
    try {
      return await AsyncStorage.setItem(key, value);
    } catch (error) {
      return null;
    }
  },
  getItem: async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (error) {
      return null;
    }
  },
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      return null;
    }
  },
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      return null;
    }
  },
};
