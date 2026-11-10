import { Subject } from '../types/lms';
import { mockSubjects } from '../data/mockData';

export const SUBJECTS_STORAGE_KEY = 'madrasahku_subjects';
export const SUBJECTS_UPDATED_EVENT = 'madrasahku_subjects_updated';

export const getStoredSubjects = (): Subject[] => {
  try {
    const raw = localStorage.getItem(SUBJECTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading subjects from localStorage:', err);
  }
  return mockSubjects;
};

export const saveStoredSubjects = (subjects: Subject[]): void => {
  try {
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
    window.dispatchEvent(new CustomEvent(SUBJECTS_UPDATED_EVENT, { detail: subjects }));
  } catch (err) {
    console.error('Error saving subjects to localStorage:', err);
  }
};
