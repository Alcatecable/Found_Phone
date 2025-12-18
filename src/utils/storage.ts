import { StoryProgress } from '../types';

const STORAGE_KEY = 'foundphone_progress';

export const saveProgress = (progress: StoryProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): StoryProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};

export const getInitialProgress = (): StoryProgress => {
  return {
    currentMessageIndex: 0,
    decisions: {},
    startTime: Date.now(),
    batteryLevel: 47,
    isCompleted: false,
  };
};
