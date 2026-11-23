import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleState } from '../types/schedule';

const STORAGE_KEY = '@portal_jadwal_v1';

export const storageService = {
  async loadState(): Promise<ScheduleState | null> {
    try {
      // Dukungan fallback otomatis untuk web browser
      if (typeof window !== 'undefined' && window.localStorage) {
        const local = window.localStorage.getItem(STORAGE_KEY);
        if (local) {
          return JSON.parse(local) as ScheduleState;
        }
      }

      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        return JSON.parse(json) as ScheduleState;
      }
      return null;
    } catch (error) {
      console.warn('Gagal membaca data dari storage lokal:', error);
      return null;
    }
  },

  async saveState(state: ScheduleState): Promise<boolean> {
    try {
      const json = JSON.stringify(state);

      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, json);
      }

      await AsyncStorage.setItem(STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.warn('Gagal menyimpan data ke storage lokal:', error);
      return false;
    }
  },

  async clearState(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Gagal mereset storage lokal:', error);
    }
  },
};
