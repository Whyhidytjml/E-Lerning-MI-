import { Teacher } from '../types/lms';
import { mockTeachers } from '../data/mockData';

export const TEACHERS_STORAGE_KEY = 'madrasahku_teachers';
export const TEACHERS_UPDATED_EVENT = 'madrasahku_teachers_updated';

export const getStoredTeachers = (): Teacher[] => {
  try {
    const raw = localStorage.getItem(TEACHERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= mockTeachers.length) {
        return parsed;
      }
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge missing teachers from mockTeachers
        const existingNames = new Set(parsed.map((p: Teacher) => p.name));
        const merged = [...parsed];
        for (const mt of mockTeachers) {
          if (!existingNames.has(mt.name)) {
            merged.push(mt);
          }
        }
        return merged;
      }
    }
  } catch (err) {
    console.error('Error loading teachers from localStorage:', err);
  }
  return mockTeachers;
};

export const saveStoredTeachers = (teachers: Teacher[]): void => {
  try {
    localStorage.setItem(TEACHERS_STORAGE_KEY, JSON.stringify(teachers));
    window.dispatchEvent(new CustomEvent(TEACHERS_UPDATED_EVENT, { detail: teachers }));
  } catch (err) {
    console.error('Error saving teachers to localStorage:', err);
  }
};
