import { LearningMaterial } from '../types/lms';
import { mockLearningMaterials } from '../data/mockData';

export const MATERIALS_STORAGE_KEY = 'madrasahku_learning_materials';
export const MATERIALS_UPDATED_EVENT = 'madrasahku_materials_updated';

export const getStoredMaterials = (): LearningMaterial[] => {
  try {
    const raw = localStorage.getItem(MATERIALS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Enrich any stored material with interactive pages/slides from mockLearningMaterials if missing
        const enriched = parsed.map((m: LearningMaterial) => {
          const defaultMatch = mockLearningMaterials.find(d => d.id === m.id);
          if (defaultMatch) {
            return {
              ...defaultMatch,
              ...m,
              pages: (m.pages && m.pages.length > 0) ? m.pages : defaultMatch.pages,
              slides: (m.slides && m.slides.length > 0) ? m.slides : defaultMatch.slides,
              keyTakeaways: m.keyTakeaways || defaultMatch.keyTakeaways,
              contentBody: m.contentBody || defaultMatch.contentBody,
              videoDuration: m.videoDuration || defaultMatch.videoDuration,
              audioDuration: m.audioDuration || defaultMatch.audioDuration
            };
          }
          return m;
        });

        // Ensure newly added default materials are never missing
        const existingIds = new Set(enriched.map(item => item.id));
        const missingDefaults = mockLearningMaterials.filter(item => !existingIds.has(item.id));
        return [...enriched, ...missingDefaults];
      }
    }
  } catch (err) {
    console.error('Error loading materials from localStorage:', err);
  }
  return mockLearningMaterials;
};

export const saveStoredMaterials = (materials: LearningMaterial[]): void => {
  try {
    localStorage.setItem(MATERIALS_STORAGE_KEY, JSON.stringify(materials));
    window.dispatchEvent(new CustomEvent(MATERIALS_UPDATED_EVENT, { detail: materials }));
  } catch (err) {
    console.error('Error saving materials to localStorage:', err);
  }
};
