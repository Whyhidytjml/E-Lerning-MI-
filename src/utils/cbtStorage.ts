import { CbtExamResult } from '../types/lms';

export const CBT_RESULTS_STORAGE_KEY = 'madrasahku_cbt_exam_results';
export const CBT_RESULTS_UPDATED_EVENT = 'madrasahku_cbt_results_updated';

// Realistic initial seed records representing completed CBT tests by students
export const defaultMockCbtResults: CbtExamResult[] = [
  {
    id: 'cbt_res_01',
    studentId: 'std_02',
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'fikih',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    score: 100,
    totalQuestions: 8,
    correctCount: 8,
    wrongCount: 0,
    unansweredCount: 0,
    predicate: 'Mumtaz',
    completedAt: '11 Nov 2026, 10:15 WIB',
    timestamp: Date.now() - 1000 * 60 * 180,
    packageCode: 'PKT-4B21',
    durationSpentMinutes: 9,
    isPassed: true,
    teacherNote: 'Mumtaz! Pemahaman tentang rukun wudhu dan shalat jamak sangat istimewa.',
    answersSnapshot: { 0: 1, 1: 2, 2: 1, 3: 0, 4: 2, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_02',
    studentId: 'std_02',
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'matematika',
    subjectName: 'Matematika',
    category: 'umum',
    score: 88,
    totalQuestions: 8,
    correctCount: 7,
    wrongCount: 1,
    unansweredCount: 0,
    predicate: 'Jayyid Jiddan',
    completedAt: '11 Nov 2026, 09:30 WIB',
    timestamp: Date.now() - 1000 * 60 * 240,
    packageCode: 'PKT-9A33',
    durationSpentMinutes: 14,
    isPassed: true,
    teacherNote: 'Sangat baik pada soal pecahan dan geometri, tingkatkan ketelitian pada skala peta.',
    answersSnapshot: { 0: 1, 1: 2, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 1 }
  },
  {
    id: 'cbt_res_03',
    studentId: 'std_05',
    studentNis: 'MI210513',
    studentName: 'Hamzah Asadullah',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'fikih',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    score: 88,
    totalQuestions: 8,
    correctCount: 7,
    wrongCount: 1,
    unansweredCount: 0,
    predicate: 'Jayyid Jiddan',
    completedAt: '11 Nov 2026, 08:45 WIB',
    timestamp: Date.now() - 1000 * 60 * 300,
    packageCode: 'PKT-1D4F',
    durationSpentMinutes: 11,
    isPassed: true,
    teacherNote: 'Bagus sekali Hamzah, hafalkan kembali ketentuan zakat fitrah.',
    answersSnapshot: { 0: 1, 1: 2, 2: 1, 3: 1, 4: 2, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_04',
    studentId: 'std_02',
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'qurdis',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    score: 100,
    totalQuestions: 8,
    correctCount: 8,
    wrongCount: 0,
    unansweredCount: 0,
    predicate: 'Mumtaz',
    completedAt: '10 Nov 2026, 14:10 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 20,
    packageCode: 'PKT-7E55',
    durationSpentMinutes: 8,
    isPassed: true,
    teacherNote: 'Kaidah tajwid Ikhfa dan Qalqalah dikuasai dengan sangat sempurna.',
    answersSnapshot: { 0: 3, 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_05',
    studentId: 'std_01',
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    studentGrade: 2,
    className: 'Kelas 2 - Ali bin Abi Thalib',
    subjectId: 'qurdis',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    score: 100,
    totalQuestions: 8,
    correctCount: 8,
    wrongCount: 0,
    unansweredCount: 0,
    predicate: 'Mumtaz',
    completedAt: '10 Nov 2026, 11:20 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    packageCode: 'PKT-3A19',
    durationSpentMinutes: 7,
    isPassed: true,
    teacherNote: 'Alhamdulillah Ahmad sangat memahami hukum bacaan Nun Sukun.',
    answersSnapshot: { 0: 3, 1: 1, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_06',
    studentId: 'std_04',
    studentNis: 'MI240203',
    studentName: 'Zahra Humaira',
    studentGrade: 2,
    className: 'Kelas 2 - Ali bin Abi Thalib',
    subjectId: 'fikih',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    score: 100,
    totalQuestions: 8,
    correctCount: 8,
    wrongCount: 0,
    unansweredCount: 0,
    predicate: 'Mumtaz',
    completedAt: '10 Nov 2026, 10:05 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 26,
    packageCode: 'PKT-8C21',
    durationSpentMinutes: 10,
    isPassed: true,
    teacherNote: 'Luar biasa, memahami rukun wudhu dan shalat dengan tepat.',
    answersSnapshot: { 0: 1, 1: 2, 2: 1, 3: 0, 4: 2, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_07',
    studentId: 'std_03',
    studentNis: 'MI240202',
    studentName: 'Bilal Habasyi Putra',
    studentGrade: 2,
    className: 'Kelas 2 - Ali bin Abi Thalib',
    subjectId: 'fikih',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    score: 63,
    totalQuestions: 8,
    correctCount: 5,
    wrongCount: 3,
    unansweredCount: 0,
    predicate: 'Perlu Bimbingan',
    completedAt: '10 Nov 2026, 09:15 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 28,
    packageCode: 'PKT-2F88',
    durationSpentMinutes: 13,
    isPassed: false,
    teacherNote: 'Perlu bimbingan dan remidial mengenai perbedaan jamak takdim dan takkhir.',
    answersSnapshot: { 0: 0, 1: 2, 2: 0, 3: 1, 4: 2, 5: 0, 6: 1, 7: 1 }
  },
  {
    id: 'cbt_res_08',
    studentId: 'std_01',
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    studentGrade: 2,
    className: 'Kelas 2 - Ali bin Abi Thalib',
    subjectId: 'arab',
    subjectName: 'Bahasa Arab',
    category: 'kemenag',
    score: 88,
    totalQuestions: 8,
    correctCount: 7,
    wrongCount: 1,
    unansweredCount: 0,
    predicate: 'Jayyid Jiddan',
    completedAt: '09 Nov 2026, 13:45 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 46,
    packageCode: 'PKT-6D12',
    durationSpentMinutes: 9,
    isPassed: true,
    teacherNote: 'Kosa kata peralatan sekolah sangat baik, latihan lagi untuk muannats-mudzakkar.',
    answersSnapshot: { 0: 0, 1: 1, 2: 2, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1 }
  },
  {
    id: 'cbt_res_09',
    studentId: 'std_05',
    studentNis: 'MI210513',
    studentName: 'Hamzah Asadullah',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'ski',
    subjectName: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    score: 88,
    totalQuestions: 8,
    correctCount: 7,
    wrongCount: 1,
    unansweredCount: 0,
    predicate: 'Jayyid Jiddan',
    completedAt: '09 Nov 2026, 11:00 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    packageCode: 'PKT-5E77',
    durationSpentMinutes: 10,
    isPassed: true,
    teacherNote: 'Sangat paham kisah Perang Badar dan Piagam Madinah.',
    answersSnapshot: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 1 }
  },
  {
    id: 'cbt_res_10',
    studentId: 'std_02',
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    studentGrade: 5,
    className: 'Kelas 5 - Siti Khadijah',
    subjectId: 'ipas',
    subjectName: 'IPAS (Sains & Sosial)',
    category: 'umum',
    score: 100,
    totalQuestions: 8,
    correctCount: 8,
    wrongCount: 0,
    unansweredCount: 0,
    predicate: 'Mumtaz',
    completedAt: '08 Nov 2026, 10:30 WIB',
    timestamp: Date.now() - 1000 * 60 * 60 * 70,
    packageCode: 'PKT-1B90',
    durationSpentMinutes: 8,
    isPassed: true,
    teacherNote: 'Mumtaz! Menguasai konsep ekosistem rantai makanan dan organ paru-paru.',
    answersSnapshot: { 0: 2, 1: 0, 2: 2, 3: 2, 4: 0, 5: 2, 6: 0, 7: 0 }
  }
];

export function getCbtResults(): CbtExamResult[] {
  try {
    const raw = localStorage.getItem(CBT_RESULTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CBT_RESULTS_STORAGE_KEY, JSON.stringify(defaultMockCbtResults));
      return defaultMockCbtResults;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(CBT_RESULTS_STORAGE_KEY, JSON.stringify(defaultMockCbtResults));
    return defaultMockCbtResults;
  } catch (e) {
    console.error('Failed to read CBT results from localStorage', e);
    return defaultMockCbtResults;
  }
}

export function saveCbtResult(newResult: CbtExamResult): void {
  try {
    const current = getCbtResults();
    // Prepend newest result
    const updated = [newResult, ...current];
    localStorage.setItem(CBT_RESULTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(CBT_RESULTS_UPDATED_EVENT));
  } catch (e) {
    console.error('Failed to save CBT result to localStorage', e);
  }
}

export function updateCbtTeacherNote(resultId: string, note: string): void {
  try {
    const current = getCbtResults();
    const updated = current.map((item) =>
      item.id === resultId ? { ...item, teacherNote: note } : item
    );
    localStorage.setItem(CBT_RESULTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(CBT_RESULTS_UPDATED_EVENT));
  } catch (e) {
    console.error('Failed to update teacher note in CBT result', e);
  }
}

export function resetCbtResults(): void {
  try {
    localStorage.setItem(CBT_RESULTS_STORAGE_KEY, JSON.stringify(defaultMockCbtResults));
    window.dispatchEvent(new Event(CBT_RESULTS_UPDATED_EVENT));
  } catch (e) {}
}
