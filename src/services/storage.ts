import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScheduleState } from '../types/schedule';

const STORAGE_KEY = '@portal_jadwal_v1';

export const storageService = {
  async loadState(): Promise<ScheduleState | null> {
    try {
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
      await AsyncStorage.setItem(STORAGE_KEY, json);
      return true;
    } catch (error) {
      console.warn('Gagal menyimpan data ke storage lokal:', error);
      return false;
    }
  },

  async clearState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Gagal mereset storage lokal:', error);
    }
  },
};
