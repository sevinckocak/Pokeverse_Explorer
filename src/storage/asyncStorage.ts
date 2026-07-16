import AsyncStorage from '@react-native-async-storage/async-storage';
export async function getStorageItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);

    if (raw === null) {
      return null;
    }

    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[storage] Failed to read key "${key}"`, error);
    return null;
  }
}

export async function setStorageItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] Failed to write key "${key}"`, error);
  }
}

export async function removeStorageItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn(`[storage] Failed to remove key "${key}"`, error);
  }
}
