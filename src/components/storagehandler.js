import { useAsyncStorage as _useAsyncStorage } from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key) => {
  const { getItem, setItem } = _useAsyncStorage(key);

  const loadSettings = async () => {
    try {
      const savedSettings = await getItem();
      if (savedSettings) {
        return JSON.parse(savedSettings);
      }
      return null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  };

  const saveSettings = async (settings) => {
    try {
      await setItem(JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return { loadSettings, saveSettings };
};
