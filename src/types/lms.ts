export type Role = 'siswa_rendah' | 'siswa_tinggi' | 'guru' | 'orang_tua' | 'admin';

export type SubjectCategory = 'kemenag' | 'umum';

export interface UserAccount {
  id: string;
  username: string;
  role: Role;
  name: string;
  email: string;
  avatar: string;
  identifier: string; // NIS / NIP / NIK
  title?: string;
  pairedStudentIds?: string[];
}

export interface Subject {
  id: string;
  name: string;
  arabicName?: string;
  category: SubjectCategory;
  gradeLevels: number[]; // e.g. [1, 2, 3] or [4, 5, 6]
  iconName: string;
  color: string;
  description: string;
  teacherName: string;
  teachingHours?: number; // JTM (Jam Tatap Muka)
}

export interface Student {
  id: string;
  nis: string;
  name: string;
  nickname: string;
  grade: number; // 1 to 6
  gradeLevel?: number;
  gradeLabel: string; // e.g. "Kelas 2 Ali bin Abi Thalib" or "Kelas 5 Ibnu Sina"
  avatar: string;
  points: number;
  stars: number;
  streakDays: number;
  juzProgress: number; // percentage in Juz 30
  currentSurah: string;
  parentName: string;
  parentPhone: string;
  status?: 'Aktif' | 'Cuti' | 'Mutasi';
}

export interface Teacher {
  id: string;
  nip: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  avatar: string;
  specialty: string;
  homeroomClass?: string;
  teachingHoursPerWeek: number;
  status: 'PNS' | 'PPPK' | 'Guru Tetap Yayasan';
}

export interface Surah {
  number: number;
  name: string;
  arabicName: string;
  totalAyah: number;
  juz: number;
  translation: string;
  revelation: 'Makkiyah' | 'Madaniyah';
}

export interface TahfizSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  surahNumber: number;
  surahName: string;
  ayahRange: string; // e.g. "Ayat 1-10"
  date: string;
  audioBlobUrl?: string;
  audioDurationSeconds: number;
  status: 'menunggu' | 'dinilai';
  predicate?: 'Mumtaz' | 'Jayyid Jiddan' | 'Jayyid' | 'Perlu Muraja\'ah';
  score?: number; // 0 - 100
  tajwidNotes?: string;
  teacherName?: string;
  evaluatedAt?: string;
}

export interface MutabaahEntry {
  id: string;
  studentId: string;
  date: string;
  shalat: {
    subuh: 'masjid' | 'munfarid' | 'tidak' | 'qadha';
    dzuhur: 'masjid' | 'munfarid' | 'tidak' | 'qadha';
    ashar: 'masjid' | 'munfarid' | 'tidak' | 'qadha';
    maghrib: 'masjid' | 'munfarid' | 'tidak' | 'qadha';
    isya: 'masjid' | 'munfarid' | 'tidak' | 'qadha';
  };
  sunnah: {
    dhuha: boolean;
    tahajjud: boolean;
    sedekahSubuh: boolean;
    rawatib: boolean;
  };
  tilawah: {
    completed: boolean;
    type: 'Al-Qur\'an' | 'Iqro';
    detail: string; // e.g. "Surah Al-Mulk ayat 1-15" or "Iqro 3 Hal 12"
  };
  akhlakHarian: {
    bantuOrangTua: boolean;
    doaHarian: boolean;
    adabMakan: boolean;
  };
  parentSignature: boolean;
  parentNotes?: string;
  teacherValidated?: boolean;
  teacherValidatorName?: string;
  teacherValidatedAt?: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  category: SubjectCategory;
  grade: number;
  dueDate: string;
  points: number;
  instructions: string;
  submissionFormat: 'teks' | 'audio' | 'dokumen' | 'interaktif';
  status: 'belum_selesai' | 'sudah_dikumpulkan' | 'dinilai';
  studentSubmission?: {
    submittedAt: string;
    textResponse?: string;
    fileName?: string;
    audioRecorded?: boolean;
    grade?: number;
    feedback?: string;
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  arabicPrompt?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  nis: string;
  grade: string;
  date: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpa';
  arrivalTime?: string;
  note?: string;
}

export interface LiaisonMessage {
  id: string;
  studentId: string;
  senderRole: 'guru' | 'orang_tua';
  senderName: string;
  timestamp: string;
  content: string;
  tag: 'Akademik' | 'Hafalan' | 'Ibadah' | 'Izin / Sakit' | 'Pengumuman';
  isRead: boolean;
}

export interface MadrasahAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  targetRole: 'semua' | 'guru' | 'orang_tua' | 'siswa';
  important: boolean;
}

export interface MadrasahStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  averageAttendanceToday: number;
  juz30CompletionRate: number;
  mutabaahComplianceRate: number;
  activeAcademicYear: string;
  activeSemester: string;
}

export interface ClassMapping {
  id: string;
  className: string;
  grade: number;
  homeroomTeacher: string;
  roomNumber: string;
  totalStudents: number;
  subjectsAssigned: {
    subjectId: string;
    subjectName: string;
    category: SubjectCategory;
    teacherName: string;
    schedule: string;
  }[];
}

export interface RDMGradeRecord {
  studentNis: string;
  studentName: string;
  className: string;
  subjectName: string;
  category: SubjectCategory;
  nilaiHarian: number; // PH (Penilaian Harian)
  nilaiPTS: number; // PTS
  nilaiPAS: number; // PAS
  nilaiAkhir: number; // NA = (2*PH + PTS + PAS) / 4
  predikat: 'A' | 'B' | 'C' | 'D';
  deskripsiCapaian: string;
  nilaiSikapSpiritual: 'Sangat Baik (A)' | 'Baik (B)';
  nilaiSikapSosial: 'Sangat Baik (A)' | 'Baik (B)';
}

export interface ExamSchedule {
  id: string;
  subjectName: string;
  category: SubjectCategory;
  examType: 'Penilaian Harian (PH)' | 'Penilaian Tengah Semester (PTS)' | 'Asesmen Akhir Semester (PAS)' | 'Ujian Tahfiz';
  date: string;
  time: string;
  room: string;
  supervisor: string;
  grade: number;
}

export interface CbtExamResult {
  id: string;
  studentId: string;
  studentNis: string;
  studentName: string;
  studentGrade: number;
  className: string;
  subjectId: string;
  subjectName: string;
  category: SubjectCategory;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  predicate: 'Mumtaz' | 'Jayyid Jiddan' | 'Jayyid' | 'Maqbul' | 'Perlu Bimbingan';
  completedAt: string;
  timestamp: number;
  packageCode: string;
  durationSpentMinutes: number;
  isPassed: boolean;
  teacherNote?: string;
  answersSnapshot?: Record<number, number>;
}

export interface MaterialPage {
  pageNumber: number;
  heading: string;
  subheading?: string;
  paragraphs: string[];
  keyPoints?: string[];
  arabicText?: string;
  verseTranslation?: string;
  exercisePrompt?: string;
  exerciseAnswer?: string;
}

export interface MaterialSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  highlightText?: string;
  reflectionQuestion?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  subjectId: string;
  subjectName: string;
  category: SubjectCategory;
  grade: number;
  format: 'Video' | 'Dokumen PDF' | 'Audio MP3' | 'Slide Interaktif';
  scheduledDate: string;
  scheduledTime: string;
  status: 'Diterbitkan' | 'Terjadwal' | 'Draf';
  mediaUrl?: string;
  description: string;
  teacherName: string;
  documentFileName?: string;
  documentFileSize?: string;
  contentBody?: string;
  pages?: MaterialPage[];
  slides?: MaterialSlide[];
  videoDuration?: string;
  audioDuration?: string;
  keyTakeaways?: string[];
}

export interface LessonSession {
  id?: string;
  period?: number;
  time?: string;
  timeSlot?: string;
  periodLabel?: string;
  subjectId?: string;
  subjectName: string;
  subjectArabic?: string;
  category: SubjectCategory;
  teacherId?: string;
  teacherName: string;
  room: string;
  icon?: string;
  iconName?: string;
  color?: string;
  focusTopic?: string;
}

export interface DayLessonSchedule {
  day?: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | string;
  dayName?: string;
  dateLabel?: string;
  dayArabic: string;
  morningHabit: string;
  sessions: LessonSession[];
}


