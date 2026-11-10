import {
  Student,
  Subject,
  Surah,
  TahfizSubmission,
  MutabaahEntry,
  Assignment,
  QuizQuestion,
  AttendanceRecord,
  LiaisonMessage,
  UserAccount,
  Teacher,
  MadrasahAnnouncement,
  MadrasahStats,
  ClassMapping,
  RDMGradeRecord,
  ExamSchedule,
  LearningMaterial,
  DayLessonSchedule
} from '../types/lms';

export const mockUserAccounts: UserAccount[] = [
  {
    id: 'usr_std_01',
    username: 'ahmad.fauzi',
    role: 'siswa_rendah',
    name: 'Ahmad Fauzi Mubarak',
    email: 'ahmad.fauzi@santri.darululum-sidareja.sch.id',
    avatar: '👦🏻',
    identifier: 'NIS: MI240201',
    title: 'Siswa Kelas 2 Ali bin Abi Thalib'
  },
  {
    id: 'usr_std_02',
    username: 'fatimah.zahra',
    role: 'siswa_tinggi',
    name: 'Fatimah Az-Zahra',
    email: 'fatimah.zahra@santri.darululum-sidareja.sch.id',
    avatar: '👧🏻',
    identifier: 'NIS: MI210512',
    title: 'Siswa Kelas 5 Siti Khadijah'
  },
  {
    id: 'usr_guru_01',
    username: 'ustadz.ridwan',
    role: 'guru',
    name: 'Ustadz Ridwan, S.Pd.I',
    email: 'ridwan@darululum-sidareja.sch.id',
    avatar: '👳🏻‍♂️',
    identifier: 'NIP: 198507122010011005',
    title: 'Wali Kelas 2 Ali bin Abi Thalib · Guru Al-Qur\'an Hadis & Koordinator Tahfiz'
  },
  {
    id: 'usr_guru_02',
    username: 'ustadzah.fatimah',
    role: 'guru',
    name: 'Ustadzah Fatimah Nur, M.Pd',
    email: 'fatimah.nur@darululum-sidareja.sch.id',
    avatar: '🧕🏻',
    identifier: 'NIP: 198803152014022003',
    title: 'Wali Kelas 5 Siti Khadijah · Guru Aqidah Akhlak'
  },
  {
    id: 'usr_guru_03',
    username: 'ustadz.hilman',
    role: 'guru',
    name: 'Ustadz Hilman Hakim, Lc.',
    email: 'hilman@darululum-sidareja.sch.id',
    avatar: '👳🏻‍♂️',
    identifier: 'NIP: 199011042018011002',
    title: 'Guru Fikih Ibadah & Syariah'
  },
  {
    id: 'usr_guru_04',
    username: 'ustadzah.aminah',
    role: 'guru',
    name: 'Ustadzah Aminah, S.Pd',
    email: 'aminah@darululum-sidareja.sch.id',
    avatar: '🧕🏻',
    identifier: 'NIP: 199106142019032007',
    title: 'Guru Bahasa Arab'
  },
  {
    id: 'usr_guru_05',
    username: 'ibu.ratnadewi',
    role: 'guru',
    name: 'Ibu Ratna Dewi, S.Pd',
    email: 'ratna.dewi@darululum-sidareja.sch.id',
    avatar: '👩🏻‍🏫',
    identifier: 'NIP: 198402102009012004',
    title: 'Guru Matematika Terpadu · Koordinator Kurikulum Nasional'
  },
  {
    id: 'usr_guru_06',
    username: 'ustadz.syamsul',
    role: 'guru',
    name: 'Ustadz Syamsul Hadi, S.Hum',
    email: 'syamsul@darululum-sidareja.sch.id',
    avatar: '👨🏻‍🏫',
    identifier: 'NIP: 199205202019031008',
    title: 'Guru Sejarah Kebudayaan Islam (SKI)'
  },
  {
    id: 'usr_guru_07',
    username: 'bapak.arif',
    role: 'guru',
    name: 'Bapak Arif Wicaksono, M.Si',
    email: 'arif.wicaksono@darululum-sidareja.sch.id',
    avatar: '👨🏻‍🏫',
    identifier: 'NIP: 198609182011011003',
    title: 'Guru IPAS (Sains & Sosial)'
  },
  {
    id: 'usr_guru_08',
    username: 'ibu.nurul',
    role: 'guru',
    name: 'Ibu Nurul Hidayati, M.Pd',
    email: 'nurul.hidayati@darululum-sidareja.sch.id',
    avatar: '👩🏻‍🏫',
    identifier: 'NIP: 198904252015032006',
    title: 'Guru Bahasa Indonesia'
  },
  {
    id: 'usr_guru_09',
    username: 'bapak.triwahyudi',
    role: 'guru',
    name: 'Bapak Tri Wahyudi, S.Pd',
    email: 'tri.wahyudi@darululum-sidareja.sch.id',
    avatar: '👨🏻‍🏫',
    identifier: 'NIP: 198711122012011004',
    title: 'Guru Pendidikan Pancasila'
  },
  {
    id: 'usr_guru_10',
    username: 'coach.bagus',
    role: 'guru',
    name: 'Coach Bagus Prasetyo, S.Or',
    email: 'bagus.prasetyo@darululum-sidareja.sch.id',
    avatar: '🏃🏻‍♂️',
    identifier: 'NIP: 199308222020121009',
    title: 'Guru PJOK & Seni Budaya'
  },
  {
    id: 'usr_parent_01',
    username: 'bunda.aisyah',
    role: 'orang_tua',
    name: 'Bunda Aisyah / Ayah Zulkifli',
    email: 'aisyah.family@gmail.com',
    avatar: '🧕🏻',
    identifier: 'ID Wali: WALI-081234567890',
    title: 'Wali dari Ahmad (Kls 2) & Fatimah (Kls 5)',
    pairedStudentIds: ['std_01', 'std_02']
  },
  {
    id: 'usr_admin_01',
    username: 'kepala.madrasah',
    role: 'admin',
    name: 'Drs. KH. Ahmad Mansur, M.Pd.I',
    email: 'kepala@darululum-sidareja.sch.id',
    avatar: '🏫',
    identifier: 'NIP: 197204151998031002',
    title: 'Kepala Madrasah & Administrator Sistem'
  }
];

export const mockMadrasahStats: MadrasahStats = {
  totalStudents: 342,
  totalTeachers: 28,
  totalClasses: 12,
  averageAttendanceToday: 96.4,
  juz30CompletionRate: 74.2,
  mutabaahComplianceRate: 91.5,
  activeAcademicYear: '2026/2027',
  activeSemester: 'Ganjil'
};

export const mockTeachers: Teacher[] = [
  {
    id: 'tch_01',
    nip: '198507122010011005',
    name: 'Ustadz Ridwan, S.Pd.I',
    title: 'Wali Kelas 2 & Koordinator Tahfiz Juz 30',
    email: 'ridwan@darululum-sidareja.sch.id',
    phone: '0812-3344-5566',
    avatar: '👳🏻‍♂️',
    specialty: "Al-Qur'an Hadis & Tahfiz Juz 30",
    homeroomClass: 'Kelas 2 Ali bin Abi Thalib',
    teachingHoursPerWeek: 24,
    status: 'PNS'
  },
  {
    id: 'tch_02',
    nip: '198803152014022003',
    name: 'Ustadzah Fatimah Nur, M.Pd',
    title: 'Wali Kelas 5 & Pembina Karakter',
    email: 'fatimah.nur@darululum-sidareja.sch.id',
    phone: '0813-2233-4455',
    avatar: '🧕🏻',
    specialty: 'Aqidah Akhlak',
    homeroomClass: 'Kelas 5 Siti Khadijah',
    teachingHoursPerWeek: 26,
    status: 'PPPK'
  },
  {
    id: 'tch_03',
    nip: '199011042018011002',
    name: 'Ustadz Hilman Hakim, Lc.',
    title: 'Guru Syariah & Fikih Ibadah',
    email: 'hilman@darululum-sidareja.sch.id',
    phone: '0811-9988-7766',
    avatar: '👳🏻‍♂️',
    specialty: 'Fikih Ibadah & Muamalah',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'Guru Tetap Yayasan'
  },
  {
    id: 'tch_04',
    nip: '199106142019032007',
    name: 'Ustadzah Aminah, S.Pd',
    title: 'Guru Bahasa Arab & Literasi Qurani',
    email: 'aminah@darululum-sidareja.sch.id',
    phone: '0812-4455-6677',
    avatar: '🧕🏻',
    specialty: 'Bahasa Arab',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'Guru Tetap Yayasan'
  },
  {
    id: 'tch_05',
    nip: '198402102009012004',
    name: 'Ibu Ratna Dewi, S.Pd',
    title: 'Koordinator Kurikulum Nasional & Guru Matematika',
    email: 'ratna.dewi@darululum-sidareja.sch.id',
    phone: '0812-8877-6655',
    avatar: '👩🏻‍🏫',
    specialty: 'Matematika Terpadu',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 28,
    status: 'PNS'
  },
  {
    id: 'tch_06',
    nip: '199205202019031008',
    name: 'Ustadz Syamsul Hadi, S.Hum',
    title: 'Guru Sejarah & Peradaban Islam',
    email: 'syamsul@darululum-sidareja.sch.id',
    phone: '0815-6677-8899',
    avatar: '👨🏻‍🏫',
    specialty: 'Sejarah Kebudayaan Islam (SKI)',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 22,
    status: 'PPPK'
  },
  {
    id: 'tch_07',
    nip: '198609182011011003',
    name: 'Bapak Arif Wicaksono, M.Si',
    title: 'Guru Sains & Praktikum IPAS',
    email: 'arif.wicaksono@darululum-sidareja.sch.id',
    phone: '0813-7788-9900',
    avatar: '👨🏻‍🏫',
    specialty: 'IPAS (Sains & Sosial)',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'PNS'
  },
  {
    id: 'tch_08',
    nip: '198904252015032006',
    name: 'Ibu Nurul Hidayati, M.Pd',
    title: 'Guru Bahasa & Budipekerti',
    email: 'nurul.hidayati@darululum-sidareja.sch.id',
    phone: '0812-5566-7788',
    avatar: '👩🏻‍🏫',
    specialty: 'Bahasa Indonesia',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'PPPK'
  },
  {
    id: 'tch_09',
    nip: '198711122012011004',
    name: 'Bapak Tri Wahyudi, S.Pd',
    title: 'Guru Pendidikan Kewarganegaraan & Karakter',
    email: 'tri.wahyudi@darululum-sidareja.sch.id',
    phone: '0813-1122-3344',
    avatar: '👨🏻‍🏫',
    specialty: 'Pendidikan Pancasila',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'PNS'
  },
  {
    id: 'tch_10',
    nip: '199308222020121009',
    name: 'Coach Bagus Prasetyo, S.Or',
    title: 'Guru Olahraga & Seni Budaya',
    email: 'bagus.prasetyo@darululum-sidareja.sch.id',
    phone: '0815-3344-5566',
    avatar: '🏃🏻‍♂️',
    specialty: 'PJOK & Seni Budaya',
    homeroomClass: 'Guru Mapel',
    teachingHoursPerWeek: 24,
    status: 'Guru Tetap Yayasan'
  }
];

export const mockAnnouncements: MadrasahAnnouncement[] = [
  {
    id: 'ann_01',
    title: 'Agenda Pelaksanaan Shalat Dhuha Akbar & Manasik Haji Cilik',
    content: 'Diberitahukan kepada seluruh santriwan/santriwati dan bapak/ibu wali santri, pada hari Kamis akan diselenggarakan Manasik Haji Cilik di aula madrasah. Seluruh santri mengenakan pakaian ihram/baju putih.',
    date: '2026-11-04',
    author: 'Drs. KH. Ahmad Mansur, M.Pd.I (Kepala Madrasah)',
    targetRole: 'semua',
    important: true
  },
  {
    id: 'ann_02',
    title: 'Sosialisasi Penyetoran Hafalan Al-Qur\'an Digital & Mutaba\'ah',
    content: 'Buku penghubung fisik kini telah terintegrasi penuh ke dalam sistem LMS MadrasahKu Digital. Wali santri dihimbau memeriksa jurnal shalat harian dan memberikan tanda tangan verifikasi digital.',
    date: '2026-11-02',
    author: 'Bagian Kurikulum & Kepengasuhan',
    targetRole: 'orang_tua',
    important: false
  },
  {
    id: 'ann_03',
    title: 'Rapat Koordinasi Evaluasi Asesmen Formatif Guru & Asatidz',
    content: 'Seluruh ustadz dan ustadzah dimohon menghadiri musyawarah penyelarasan kisi-kisi bank soal Penilaian Akhir Semester (PAS) di ruang multimedia madrasah hari Jumat pukul 13.30 WIB.',
    date: '2026-11-01',
    author: 'Drs. KH. Ahmad Mansur, M.Pd.I',
    targetRole: 'guru',
    important: true
  }
];

export const mockStudents: Student[] = [
  {
    id: 'std_01',
    nis: 'MI240201',
    name: 'Ahmad Fauzi Mubarak',
    nickname: 'Ahmad',
    grade: 2,
    gradeLabel: 'Kelas 2 - Ali bin Abi Thalib',
    avatar: '👦🏻',
    points: 840,
    stars: 28,
    streakDays: 8,
    juzProgress: 45,
    currentSurah: 'Al-Kautsar (Surat ke-108)',
    parentName: 'Bunda Aisyah / Ayah Zulkifli',
    parentPhone: '081234567890',
    status: 'Aktif'
  },
  {
    id: 'std_02',
    nis: 'MI210512',
    name: 'Fatimah Az-Zahra',
    nickname: 'Fatimah',
    grade: 5,
    gradeLabel: 'Kelas 5 - Siti Khadijah',
    avatar: '👧🏻',
    points: 1560,
    stars: 52,
    streakDays: 14,
    juzProgress: 82,
    currentSurah: 'An-Naba (Surat ke-78)',
    parentName: 'Bunda Aisyah / Ayah Zulkifli',
    parentPhone: '081234567890',
    status: 'Aktif'
  },
  {
    id: 'std_03',
    nis: 'MI240202',
    name: 'Bilal Habasyi Putra',
    nickname: 'Bilal',
    grade: 2,
    gradeLabel: 'Kelas 2 - Ali bin Abi Thalib',
    avatar: '👦🏽',
    points: 790,
    stars: 24,
    streakDays: 6,
    juzProgress: 40,
    currentSurah: 'Al-Ma\'un',
    parentName: 'Bapak Umar Habasyi',
    parentPhone: '0813-9988-1122',
    status: 'Aktif'
  },
  {
    id: 'std_04',
    nis: 'MI240203',
    name: 'Zahra Humaira',
    nickname: 'Zahra',
    grade: 2,
    gradeLabel: 'Kelas 2 - Ali bin Abi Thalib',
    avatar: '👧🏻',
    points: 920,
    stars: 32,
    streakDays: 12,
    juzProgress: 55,
    currentSurah: 'At-Takatsur',
    parentName: 'Ibu Maryam Salim',
    parentPhone: '0815-4433-2211',
    status: 'Aktif'
  },
  {
    id: 'std_05',
    nis: 'MI210513',
    name: 'Hamzah Asadullah',
    nickname: 'Hamzah',
    grade: 5,
    gradeLabel: 'Kelas 5 - Siti Khadijah',
    avatar: '👦🏻',
    points: 1480,
    stars: 48,
    streakDays: 11,
    juzProgress: 75,
    currentSurah: 'An-Nazi\'at',
    parentName: 'Bapak Khalid Walid',
    parentPhone: '0812-7788-9900',
    status: 'Aktif'
  }
];

export const mockClassRoster: AttendanceRecord[] = [
  { id: 'att_01', studentId: 'std_01', studentName: 'Ahmad Fauzi Mubarak', nis: 'MI240201', grade: 'Kelas 2', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:48', note: 'Tepat waktu, murajaah mandiri' },
  { id: 'att_02', studentId: 'std_03', studentName: 'Bilal Habasyi Putra', nis: 'MI240202', grade: 'Kelas 2', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:55' },
  { id: 'att_03', studentId: 'std_04', studentName: 'Zahra Humaira', nis: 'MI240203', grade: 'Kelas 2', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:50' },
  { id: 'att_04', studentId: 'std_06', studentName: 'Muhammad Rayyan', nis: 'MI240204', grade: 'Kelas 2', date: '2026-11-04', status: 'Sakit', note: 'Demam hari ke-2 (surat dokter via WA)' },
  { id: 'att_05', studentId: 'std_07', studentName: 'Maryam Syakira', nis: 'MI240205', grade: 'Kelas 2', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:42' },
  { id: 'att_06', studentId: 'std_08', studentName: 'Ibrahim Al-Fatih', nis: 'MI240206', grade: 'Kelas 2', date: '2026-11-04', status: 'Izin', note: 'Acara keluarga di luar kota' },
  { id: 'att_07', studentId: 'std_02', studentName: 'Fatimah Az-Zahra', nis: 'MI210512', grade: 'Kelas 5', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:35', note: 'Petugas piket masjid' },
  { id: 'att_08', studentId: 'std_05', studentName: 'Hamzah Asadullah', nis: 'MI210513', grade: 'Kelas 5', date: '2026-11-04', status: 'Hadir', arrivalTime: '06:40' }
];

export const mockSubjects: Subject[] = [
  // --- KEMENAG SUBJECTS ---
  {
    id: 'sbj_qurdis',
    name: "Al-Qur'an Hadis",
    arabicName: "القرآن والحديث",
    category: 'kemenag',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'BookOpen',
    color: 'emerald',
    description: "Kajian tajwid, menghafal surat pendek Juz 'Amma, dan memahami hadis keutamaan akhlak.",
    teacherName: "Ustadz Ridwan, S.Pd.I",
    teachingHours: 4
  },
  {
    id: 'sbj_aqidah',
    name: "Aqidah Akhlak",
    arabicName: "العقيدة والأخلاق",
    category: 'kemenag',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'HeartHandshake',
    color: 'teal',
    description: "Mempelajari Asmaul Husna, rukun iman, serta adab mulia kepada orang tua dan sesama.",
    teacherName: "Ustadzah Fatimah Nur, M.Pd",
    teachingHours: 4
  },
  {
    id: 'sbj_fikih',
    name: "Fikih Ibadah",
    arabicName: "الفقه الإسلامي",
    category: 'kemenag',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'Sparkles',
    color: 'cyan',
    description: "Tata cara bersuci (thaharah), wudhu, rukun shalat fardhu, dan ibadah puasa.",
    teacherName: "Ustadz Hilman Hakim, Lc.",
    teachingHours: 4
  },
  {
    id: 'sbj_ski',
    name: "Sejarah Kebudayaan Islam",
    arabicName: "تاريخ الحضارة الإسلامية",
    category: 'kemenag',
    gradeLevels: [3, 4, 5, 6],
    iconName: 'Compass',
    color: 'amber',
    description: "Kisah teladan Rasulullah SAW, ketabahan para sahabat, dan keemasan Khulafaur Rasyidin.",
    teacherName: "Ustadz Syamsul Hadi, S.Hum",
    teachingHours: 2
  },
  {
    id: 'sbj_arab',
    name: "Bahasa Arab",
    arabicName: "اللغة العربية",
    category: 'kemenag',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'Languages',
    color: 'emerald',
    description: "Penguasaan mufradat (kosakata), istima' (menyimak), dan percakapan dasar sehari-hari.",
    teacherName: "Ustadzah Aminah, S.Pd",
    teachingHours: 4
  },

  // --- UMUM (KEMENDIKBUD) SUBJECTS ---
  {
    id: 'sbj_matematika',
    name: "Matematika",
    category: 'umum',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'Calculator',
    color: 'indigo',
    description: "Konsep berhitung logika terapan, pecahan, bangun datar ruang, dan pemecahan masalah.",
    teacherName: "Ibu Ratna Dewi, S.Pd",
    teachingHours: 5
  },
  {
    id: 'sbj_indo',
    name: "Bahasa Indonesia",
    category: 'umum',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'Feather',
    color: 'rose',
    description: "Keterampilan literasi, membaca terpadu, menulis karangan, dan berbicara santun.",
    teacherName: "Ibu Nurul Hidayati, M.Pd",
    teachingHours: 6
  },
  {
    id: 'sbj_ipas',
    name: "IPAS (Sains & Sosial)",
    category: 'umum',
    gradeLevels: [3, 4, 5, 6],
    iconName: 'Globe',
    color: 'sky',
    description: "Eksplorasi alam semesta ciptaan Allah SWT, rantai makanan, dan kenampakan geografis.",
    teacherName: "Bapak Arif Wicaksono, M.Si",
    teachingHours: 5
  },
  {
    id: 'sbj_pancasila',
    name: "Pendidikan Pancasila",
    category: 'umum',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'ShieldCheck',
    color: 'red',
    description: "Penanaman cinta tanah air, Bhinneka Tunggal Ika, dan gotong royong bermasyarakat.",
    teacherName: "Bapak Tri Wahyudi, S.Pd",
    teachingHours: 4
  },
  {
    id: 'sbj_pjok',
    name: "PJOK & Seni Budaya",
    category: 'umum',
    gradeLevels: [1, 2, 3, 4, 5, 6],
    iconName: 'Activity',
    color: 'orange',
    description: "Kebugaran fisik Islami, ketangkasan gerak, dan kreasi seni kaligrafi.",
    teacherName: "Coach Bagus Prasetyo, S.Or",
    teachingHours: 4
  }
];

export const mockSurahs: Surah[] = [
  { number: 108, name: "Al-Kautsar", arabicName: "الكوثر", totalAyah: 3, juz: 30, translation: "Nikmat yang Berlimpah", revelation: "Makkiyah" },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", totalAyah: 4, juz: 30, translation: "Keesaan Allah", revelation: "Makkiyah" },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", totalAyah: 5, juz: 30, translation: "Waktu Subuh", revelation: "Makkiyah" },
  { number: 114, name: "An-Nas", arabicName: "الناس", totalAyah: 6, juz: 30, translation: "Manusia", revelation: "Makkiyah" },
  { number: 110, name: "An-Nasr", arabicName: "النصر", totalAyah: 3, juz: 30, translation: "Pertolongan", revelation: "Madaniyah" },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون", totalAyah: 6, juz: 30, translation: "Orang-orang Kafir", revelation: "Makkiyah" },
  { number: 107, name: "Al-Ma'un", arabicName: "الماعون", totalAyah: 7, juz: 30, translation: "Barang-barang yang Berguna", revelation: "Makkiyah" },
  { number: 95, name: "At-Tin", arabicName: "التين", totalAyah: 8, juz: 30, translation: "Buah Tin", revelation: "Makkiyah" },
  { number: 78, name: "An-Naba", arabicName: "النبأ", totalAyah: 40, juz: 30, translation: "Berita Besar", revelation: "Makkiyah" }
];

export const mockSurahVerses: Record<number, Array<{ ayah: number; arabic: string; latin: string; translation: string }>> = {
  108: [
    { ayah: 1, arabic: "إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ", latin: "Inna a'tainakal-kausar", translation: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak." },
    { ayah: 2, arabic: "فَصَلِّ لِرَبِّكَ وَٱنْحَرْ", latin: "Fa salli li rabbika wanhar", translation: "Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah." },
    { ayah: 3, arabic: "إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ", latin: "Inna syani'aka huwal-abtar", translation: "Sungguh, orang yang membencimu dialah yang terputus (dari rahmat Allah)." }
  ],
  112: [
    { ayah: 1, arabic: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", latin: "Qul huwallahu ahad", translation: "Katakanlah (Muhammad), 'Dialah Allah, Yang Maha Esa.'" },
    { ayah: 2, arabic: "ٱللَّهُ ٱلصَّمَدُ", latin: "Allahus-samad", translation: "Allah tempat meminta segala sesuatu." },
    { ayah: 3, arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ", latin: "Lam yalid wa lam yulad", translation: "Dia tidak beranak dan tidak pula diperanakkan." },
    { ayah: 4, arabic: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", latin: "Wa lam yakul lahu kufuwan ahad", translation: "Dan tidak ada sesuatu yang setara dengan Dia." }
  ],
  95: [
    { ayah: 1, arabic: "وَٱلتِّينِ وَٱلزَّيْتُونِ", latin: "Wat-tini waz-zaitun", translation: "Demi (buah) Tin dan (buah) Zaitun," },
    { ayah: 2, arabic: "وَطُورِ سِينِينَ", latin: "Wa turi sinin", translation: "Demi gunung Sinai," },
    { ayah: 3, arabic: "وَهَـٰذَا ٱلْبَلَدِ ٱلْأَمِينِ", latin: "Wa hazal-baladil-amin", translation: "Dan demi negeri (Mekkah) yang aman ini." },
    { ayah: 4, arabic: "لَقَدْ خَلَقْنَا ٱلْإِنسَـٰنَ فِىٓ أَحْسَنِ تَقْوِيمٍ", latin: "Laqad khalaqnal-insana fi ahsani taqwim", translation: "Sungguh, Kami telah menciptakan manusia dalam bentuk yang sebaik-baiknya." }
  ]
};

export const mockTahfizSubmissions: TahfizSubmission[] = [
  {
    id: 'thz_01',
    studentId: 'std_01',
    studentName: 'Ahmad Fauzi Mubarak',
    studentGrade: 'Kelas 2',
    surahNumber: 112,
    surahName: "Al-Ikhlas",
    ayahRange: "Ayat 1-4 (Khatam)",
    date: '2026-11-03',
    audioDurationSeconds: 24,
    status: 'dinilai',
    predicate: 'Mumtaz',
    score: 96,
    tajwidNotes: "MasyaAllah tabarakallah! Qalqalah kubra pada huruf Dal (أَحَدٌ) sangat mantap dan jelas. Nafas teratur dan makhraj fasih.",
    teacherName: "Ustadz Ridwan, S.Pd.I",
    evaluatedAt: '2026-11-03 14:20'
  },
  {
    id: 'thz_02',
    studentId: 'std_01',
    studentName: 'Ahmad Fauzi Mubarak',
    studentGrade: 'Kelas 2',
    surahNumber: 108,
    surahName: "Al-Kautsar",
    ayahRange: "Ayat 1-3",
    date: '2026-11-04',
    audioDurationSeconds: 18,
    status: 'menunggu'
  },
  {
    id: 'thz_03',
    studentId: 'std_02',
    studentName: 'Fatimah Az-Zahra',
    studentGrade: 'Kelas 5',
    surahNumber: 78,
    surahName: "An-Naba",
    ayahRange: "Ayat 1-20",
    date: '2026-11-02',
    audioDurationSeconds: 78,
    status: 'dinilai',
    predicate: 'Jayyid Jiddan',
    score: 92,
    tajwidNotes: "Ghunnah musyaddadah sangat baik di ayat 1-5. Sedikit evaluasi pada panjang mad wajib muttashil di ayat 14 agar konsisten 4-5 harakat.",
    teacherName: "Ustadzah Fatimah Nur, M.Pd",
    evaluatedAt: '2026-11-02 16:45'
  }
];

export const mockMutabaahToday: MutabaahEntry = {
  id: 'mut_today_01',
  studentId: 'std_01',
  date: '2026-11-04',
  shalat: {
    subuh: 'masjid',
    dzuhur: 'masjid',
    ashar: 'munfarid',
    maghrib: 'masjid',
    isya: 'munfarid'
  },
  sunnah: {
    dhuha: true,
    tahajjud: false,
    sedekahSubuh: true,
    rawatib: true
  },
  tilawah: {
    completed: true,
    type: "Al-Qur'an",
    detail: "Juz 30: Surah Al-Kautsar & Al-Kafirun"
  },
  akhlakHarian: {
    bantuOrangTua: true,
    doaHarian: true,
    adabMakan: true
  },
  parentSignature: true,
  parentNotes: "Alhamdulillah Ahmad bangun subuh ceria ke masjid bersama Ayah. Hafalannya semakin lancar.",
  teacherValidated: true,
  teacherValidatorName: "Ustadz Ridwan, S.Pd.I",
  teacherValidatedAt: "2026-11-04 07:10"
};

export const mockAssignments: Assignment[] = [
  {
    id: 'asg_01',
    title: "Membaca & Rekam Surat Al-Kautsar",
    subjectId: 'sbj_qurdis',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    grade: 2,
    dueDate: '2026-11-06',
    points: 100,
    instructions: "Rekam hafalan Surat Al-Kautsar ayat 1 sampai 3 dengan tajwid makhraj yang tartil.",
    submissionFormat: 'audio',
    status: 'sudah_dikumpulkan',
    studentSubmission: {
      submittedAt: '2026-11-04 07:15',
      audioRecorded: true,
      grade: 95,
      feedback: "Luar biasa Ahmad, bacaan mad thabi'i sudah pas!"
    }
  },
  {
    id: 'asg_02',
    title: "Praktik Doa Masuk & Keluar Masjid",
    subjectId: 'sbj_aqidah',
    subjectName: "Aqidah Akhlak",
    category: 'kemenag',
    grade: 2,
    dueDate: '2026-11-07',
    points: 100,
    instructions: "Pilih jawaban benar atau rekam suara saat membaca doa masuk dan keluar masjid beserta artinya.",
    submissionFormat: 'interaktif',
    status: 'belum_selesai'
  },
  {
    id: 'asg_03',
    title: "Penjumlahan Bersusun & Cerita Angka",
    subjectId: 'sbj_matematika',
    subjectName: "Matematika",
    category: 'umum',
    grade: 2,
    dueDate: '2026-11-08',
    points: 100,
    instructions: "Kerjakan 5 soal cerita penjumlahan hewan kurban dan sedekah di buku latihan lalu foto hasilnya.",
    submissionFormat: 'dokumen',
    status: 'belum_selesai'
  },
  {
    id: 'asg_04',
    title: "Analisis Ketentuan Shalat Jamak & Qashar",
    subjectId: 'sbj_fikih',
    subjectName: "Fikih Ibadah",
    category: 'kemenag',
    grade: 5,
    dueDate: '2026-11-09',
    points: 100,
    instructions: "Tuliskan ringkasan syarat sah shalat jamak takdim dan jamak takhir beserta contoh kasus safar.",
    submissionFormat: 'dokumen',
    status: 'sudah_dikumpulkan',
    studentSubmission: {
      submittedAt: '2026-11-03 19:30',
      fileName: 'Fatimah_Fikih_Shalat_Jamak.pdf',
      grade: 94,
      feedback: "Penjelasan dalil dan pembagian shalat sangat sistematis!"
    }
  },
  {
    id: 'asg_05',
    title: "Laporan Pengamatan Ekosistem Kebun Madrasah",
    subjectId: 'sbj_ipas',
    subjectName: "IPAS (Sains & Sosial)",
    category: 'umum',
    grade: 5,
    dueDate: '2026-11-10',
    points: 100,
    instructions: "Buat bagan rantai makanan produsen, konsumen tingkat 1, dan pengurai yang kalian temukan di kebun madrasah.",
    submissionFormat: 'dokumen',
    status: 'belum_selesai'
  },
  {
    id: 'asg_06',
    title: "Mufrodat & Kalimat Bahasa Arab Waktu Shalat",
    subjectId: 'sbj_arab',
    subjectName: "Bahasa Arab",
    category: 'kemenag',
    grade: 5,
    dueDate: '2026-11-11',
    points: 100,
    instructions: "Tuliskan 5 kalimat bahasa Arab yang menggunakan kosakata jam (As-Saa'ah) saat shalat lima waktu.",
    submissionFormat: 'dokumen',
    status: 'belum_selesai'
  },
  {
    id: 'asg_07',
    title: "Latihan Soal Cerita Operasi Pecahan & Skala",
    subjectId: 'sbj_matematika',
    subjectName: "Matematika",
    category: 'umum',
    grade: 5,
    dueDate: '2026-11-12',
    points: 100,
    instructions: "Selesaikan 4 soal cerita penjumlahan pecahan dan hitung jarak sebenarnya pada peta madrasah.",
    submissionFormat: 'dokumen',
    status: 'belum_selesai'
  },
  {
    id: 'asg_08',
    title: "Infografis Nilai Karakter Khulafaur Rasyidin",
    subjectId: 'sbj_ski',
    subjectName: "Sejarah Kebudayaan Islam",
    category: 'kemenag',
    grade: 5,
    dueDate: '2026-11-13',
    points: 100,
    instructions: "Rangkum sifat kepemimpinan Khalifah Abu Bakar Ash-Shiddiq dan Umar bin Khattab dalam sebuah bagan ringkas.",
    submissionFormat: 'dokumen',
    status: 'belum_selesai'
  }
];

export const mockLowGradeQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: "Berapakah jumlah ayat dalam Surat Al-Kautsar?",
    arabicPrompt: "سُورَةُ الْكَوْثَرِ",
    options: ["2 Ayat", "3 Ayat", "4 Ayat", "5 Ayat"],
    correctAnswerIndex: 1,
    explanation: "Surat Al-Kautsar memiliki 3 ayat dan merupakan surat terpendek di dalam Al-Qur'an."
  },
  {
    id: 'q2',
    question: "Huruf 'Qaf' (ق) pada ayat 'Khalaqa' termasuk bacaan tajwid apa jika sukun?",
    arabicPrompt: "خَلَقَ",
    options: ["Idzhar", "Qalqalah (Memantul)", "Ikhfa", "Ghunnah"],
    correctAnswerIndex: 1,
    explanation: "Huruf Qaf adalah salah satu dari 5 huruf Qalqalah (Ba, Jim, Dal, Tha, Qaf)."
  },
  {
    id: 'q3',
    question: "Apa arti dari 'Al-Kautsar'?",
    arabicPrompt: "الْكَوْثَرُ",
    options: ["Waktu Subuh", "Nikmat yang Banyak", "Pertolongan", "Manusia"],
    correctAnswerIndex: 1,
    explanation: "Al-Kautsar artinya nikmat yang melimpah ruah dan juga nama telaga Rasulullah di surga."
  }
];

export const mockLiaisonMessages: LiaisonMessage[] = [
  {
    id: 'msg_01',
    studentId: 'std_01',
    senderRole: 'guru',
    senderName: "Ustadz Ridwan, S.Pd.I",
    timestamp: '2026-11-03 14:30',
    tag: 'Hafalan',
    content: "Assalamu'alaikum Bunda Aisyah. Alhamdulillah hafalan Surat Al-Ikhlas Ahmad sudah mutqin (Mumtaz 96). Besok InsyaAllah mulai istiqomah lanjut Surat Al-Kautsar ya.",
    isRead: true
  },
  {
    id: 'msg_02',
    studentId: 'std_01',
    senderRole: 'orang_tua',
    senderName: "Bunda Aisyah",
    timestamp: '2026-11-03 15:10',
    tag: 'Hafalan',
    content: "Wa'alaikumussalam Ustadz. Alhamdulillah, terima kasih atas bimbingan sabar Ustadz. Di rumah Ahmad senang sekali memutar audio rekaman setoran dan mencocokkan tajwidnya.",
    isRead: true
  },
  {
    id: 'msg_03',
    studentId: 'std_01',
    senderRole: 'guru',
    senderName: "Ustadz Ridwan, S.Pd.I",
    timestamp: '2026-11-04 06:55',
    tag: 'Pengumuman',
    content: "Pengumuman: Hari Kamis besok ada agenda Shalat Dhuha berjamaah dan latihan Manasik Haji Cilik di aula madrasah. Mohon ananda membawa pakaian ihram/baju putih bersih.",
    isRead: false
  }
];

export const mockClassMappings: ClassMapping[] = [
  {
    id: 'cls_01',
    className: 'Kelas 2 Ali bin Abi Thalib',
    grade: 2,
    homeroomTeacher: 'Ustadz Ridwan, S.Pd.I',
    roomNumber: 'Gedung A - Ruang 201',
    totalStudents: 28,
    subjectsAssigned: [
      { subjectId: 'sbj_qurdis', subjectName: "Al-Qur'an Hadis", category: 'kemenag', teacherName: 'Ustadz Ridwan, S.Pd.I', schedule: 'Senin, 07:30 - 09:00' },
      { subjectId: 'sbj_aqidah', subjectName: 'Aqidah Akhlak', category: 'kemenag', teacherName: 'Ustadzah Fatimah Nur, M.Pd', schedule: 'Selasa, 08:00 - 09:30' },
      { subjectId: 'sbj_fikih', subjectName: 'Fikih Ibadah', category: 'kemenag', teacherName: 'Ustadz Hilman Hakim, Lc.', schedule: 'Rabu, 07:30 - 09:00' },
      { subjectId: 'sbj_arab', subjectName: 'Bahasa Arab', category: 'kemenag', teacherName: 'Ustadzah Aminah, S.Pd', schedule: 'Kamis, 09:30 - 11:00' },
      { subjectId: 'sbj_matematika', subjectName: 'Matematika', category: 'umum', teacherName: 'Ibu Ratna Dewi, S.Pd', schedule: 'Jumat, 07:30 - 09:00' }
    ]
  },
  {
    id: 'cls_02',
    className: 'Kelas 5 Siti Khadijah',
    grade: 5,
    homeroomTeacher: 'Ustadzah Fatimah Nur, M.Pd',
    roomNumber: 'Gedung B - Ruang 502',
    totalStudents: 30,
    subjectsAssigned: [
      { subjectId: 'sbj_qurdis', subjectName: "Al-Qur'an Hadis", category: 'kemenag', teacherName: 'Ustadz Ridwan, S.Pd.I', schedule: 'Senin, 09:30 - 11:00' },
      { subjectId: 'sbj_fikih', subjectName: 'Fikih Ibadah', category: 'kemenag', teacherName: 'Ustadz Hilman Hakim, Lc.', schedule: 'Selasa, 07:30 - 09:00' },
      { subjectId: 'sbj_ski', subjectName: 'Sejarah Kebudayaan Islam', category: 'kemenag', teacherName: 'Ustadz Syamsul Hadi, S.Hum', schedule: 'Rabu, 09:30 - 11:00' },
      { subjectId: 'sbj_ipas', subjectName: 'IPAS (Sains & Sosial)', category: 'umum', teacherName: 'Bapak Arif Wicaksono, M.Si', schedule: 'Kamis, 07:30 - 09:30' },
      { subjectId: 'sbj_matematika', subjectName: 'Matematika', category: 'umum', teacherName: 'Ibu Ratna Dewi, S.Pd', schedule: 'Jumat, 09:00 - 10:30' }
    ]
  }
];

export const mockRDMGrades: RDMGradeRecord[] = [
  {
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    className: 'Kelas 2 Ali bin Abi Thalib',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    nilaiHarian: 96,
    nilaiPTS: 94,
    nilaiPAS: 95,
    nilaiAkhir: 95,
    predikat: 'A',
    deskripsiCapaian: 'Sangat baik dalam menghafal surat pendek Juz 30 dan hukum bacaan qalqalah.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Sangat Baik (A)'
  },
  {
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    className: 'Kelas 2 Ali bin Abi Thalib',
    subjectName: 'Aqidah Akhlak',
    category: 'kemenag',
    nilaiHarian: 94,
    nilaiPTS: 92,
    nilaiPAS: 95,
    nilaiAkhir: 94,
    predikat: 'A',
    deskripsiCapaian: 'Menguasai pemahaman 10 Asmaul Husna serta adab kepada orang tua dan guru.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Sangat Baik (A)'
  },
  {
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    className: 'Kelas 2 Ali bin Abi Thalib',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    nilaiHarian: 92,
    nilaiPTS: 90,
    nilaiPAS: 93,
    nilaiAkhir: 92,
    predikat: 'A',
    deskripsiCapaian: 'Tertib dalam mempraktikkan tata cara wudhu dan rukun shalat fardhu lima waktu.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Baik (B)'
  },
  {
    studentNis: 'MI240201',
    studentName: 'Ahmad Fauzi Mubarak',
    className: 'Kelas 2 Ali bin Abi Thalib',
    subjectName: 'Matematika',
    category: 'umum',
    nilaiHarian: 90,
    nilaiPTS: 88,
    nilaiPAS: 92,
    nilaiAkhir: 90,
    predikat: 'A',
    deskripsiCapaian: 'Mampu menyelesaikan soal cerita penjumlahan dan pengurangan bersusun ratusan.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Sangat Baik (A)'
  },
  {
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    className: 'Kelas 5 Siti Khadijah',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    nilaiHarian: 95,
    nilaiPTS: 94,
    nilaiPAS: 96,
    nilaiAkhir: 95,
    predikat: 'A',
    deskripsiCapaian: 'Hafalan Surah An-Naba sangat lancar dan menguasai hukum mad wajib muttashil.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Sangat Baik (A)'
  },
  {
    studentNis: 'MI210512',
    studentName: 'Fatimah Az-Zahra',
    className: 'Kelas 5 Siti Khadijah',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    nilaiHarian: 94,
    nilaiPTS: 95,
    nilaiPAS: 93,
    nilaiAkhir: 94,
    predikat: 'A',
    deskripsiCapaian: 'Sangat mahir menganalisis ketentuan shalat jamak qashar dan sujud sahwi.',
    nilaiSikapSpiritual: 'Sangat Baik (A)',
    nilaiSikapSosial: 'Sangat Baik (A)'
  }
];

export const mockExamSchedules: ExamSchedule[] = [
  {
    id: 'ex_01',
    subjectName: "Al-Qur'an Hadis & Ujian Tahfiz",
    category: 'kemenag',
    examType: 'Penilaian Harian (PH)',
    date: '2026-11-10',
    time: '07:30 - 09:00 WIB',
    room: 'Aula Masjid Madrasah',
    supervisor: 'Ustadz Ridwan, S.Pd.I',
    grade: 2
  },
  {
    id: 'ex_02',
    subjectName: 'Fikih Ibadah (Praktik Shalat)',
    category: 'kemenag',
    examType: 'Penilaian Harian (PH)',
    date: '2026-11-12',
    time: '08:00 - 09:30 WIB',
    room: 'Laboratorium PAI',
    supervisor: 'Ustadz Hilman Hakim, Lc.',
    grade: 2
  },
  {
    id: 'ex_03',
    subjectName: 'Matematika Terpadu',
    category: 'umum',
    examType: 'Penilaian Tengah Semester (PTS)',
    date: '2026-11-16',
    time: '07:30 - 09:00 WIB',
    room: 'Ruang Kelas 201',
    supervisor: 'Ibu Ratna Dewi, S.Pd',
    grade: 2
  },
  {
    id: 'ex_04',
    subjectName: 'Fikih & Shalat Jamak Qashar',
    category: 'kemenag',
    examType: 'Penilaian Harian (PH)',
    date: '2026-11-11',
    time: '09:30 - 11:00 WIB',
    room: 'Ruang Multimedia CBT',
    supervisor: 'Ustadzah Fatimah Nur, M.Pd',
    grade: 5
  }
];

export const mockLearningMaterials: LearningMaterial[] = [
  {
    id: 'mat_01',
    title: 'Video Animasi Makharijul Huruf: Huruf Halqiyah & Lisaniyah',
    subjectId: 'sbj_qurdis',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    grade: 2,
    format: 'Video',
    scheduledDate: '2026-11-03',
    scheduledTime: '07:00 WIB',
    status: 'Diterbitkan',
    description: 'Video interaktif mengenal tempat keluarnya huruf hijaiyah dari tenggorokan dan lidah disertai contoh ayat.',
    teacherName: 'Ustadz Ridwan, S.Pd.I',
    videoDuration: '14:20',
    documentFileName: 'Makharijul_Huruf_Halqiyah.mp4',
    documentFileSize: '48.5 MB',
    contentBody: 'Makharijul huruf adalah tempat-tempat keluarnya huruf hijaiyah pada saat huruf tersebut dibunyikan. Untuk melafalkan Al-Qur\'an dengan fasih, seorang santri harus membiasakan makhraj yang benar, khususnya huruf Halqiyah (tenggorokan) dan Lisaniyah (lidah).',
    keyTakeaways: [
      'Huruf Halqiyah berjumlah 6: Hamzah (ء), Ha (هـ), \'Ain (ع), Ha (ح), Ghain (غ), Kha (خ).',
      'Huruf Lisaniyah keluar dari area lidah, seperti Qaf (ق), Kaf (ك), Jim (ج), Syin (ش), Ya (ي).',
      'Setiap membaca Al-Qur\'an, pastikan tenggorokan rileks dan makhraj tidak tertukar antara huruf Ha tipis (هـ) dan Ha bersih (ح).'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Pengenalan Makhraj Huruf Halqiyah',
        subheading: 'Enam Huruf yang Keluar dari Tenggorokan (Al-Halaq)',
        paragraphs: [
          'Tenggorokan (Al-Halaq) terbagi menjadi tiga bagian utama: Aqshal Halaq (pangkal bawah dekat pita suara), Wasthul Halaq (tenggorokan bagian tengah), dan Adnal Halaq (tenggorokan bagian atas dekat langit-langit).',
          'Dari pangkal bawah keluar huruf Hamzah (ء) dan Ha (هـ). Dari bagian tengah keluar huruf \'Ain (ع) dan Ha (ح). Dari bagian atas keluar huruf Ghain (غ) dan Kha (خ).'
        ],
        arabicText: 'ء - هـ - ع - ح - غ - خ',
        verseTranslation: 'Contoh dalam Surah Al-Ikhlas: قُلْ هُوَ اللَّهُ أَحَدٌ (Perhatikan huruf Ha pada "Huwa" dan Ha pada "Ahad")',
        keyPoints: [
          'Idzhar Halqi: Jika Nun Sukun atau Tanwin bertemu salah satu dari 6 huruf ini, dibaca jelas tanpa dengung.',
          'Jangan menekan suara terlalu keras pada huruf Kha (خ) agar tidak terdengar serak berlebihan.'
        ],
        exercisePrompt: 'Huruf apakah yang keluar dari tenggorokan bagian tengah (Wasthul Halaq)?',
        exerciseAnswer: 'Huruf \'Ain (ع) dan Ha (ح).'
      },
      {
        pageNumber: 2,
        heading: 'Latihan Praktik Membaca Ayat',
        subheading: 'Penerapan pada Surat Pendek Juz 30',
        paragraphs: [
          'Mari kita latih pengucapan dengan membaca potongan surat pendek berikut ini secara tartil dan bersuara merdu.',
          'Perhatikan letak makhraj saat huruf dalam kondisi berharakat fathah, kasrah, dhammah, maupun sukun.'
        ],
        arabicText: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ * فَصَلِّ لِرَبِّكَ وَانْحَرْ',
        verseTranslation: 'Sungguh Kami telah memberimu nikmat yang banyak. Maka laksanakanlah shalat karena Tuhanmu dan berkurbanlah. (Q.S. Al-Kautsar: 1-2)',
        keyPoints: [
          'Pada kata "A\'thainaaka" huruf \'Ain berada di tengah tenggorokan.',
          'Pada kata "Wanhar" huruf Ha sukun keluar bersih dari tenggorokan tengah.'
        ],
        exercisePrompt: 'Apa bunyi hukum tajwid pada "Wanhar" (Nun sukun bertemu Ha)?',
        exerciseAnswer: 'Hukumnya Idzhar Halqi (dibaca jelas tanpa mendengung).'
      }
    ]
  },
  {
    id: 'mat_02',
    title: 'Modul PDF Rukun Shalat & Bacaan Tasyahhud Bergambar',
    subjectId: 'sbj_fikih',
    subjectName: 'Fikih Ibadah',
    category: 'kemenag',
    grade: 2,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-04',
    scheduledTime: '07:30 WIB',
    status: 'Diterbitkan',
    description: 'Panduan lengkap bergambar tata cara tasyahhud awal dan akhir beserta doa keselamatan.',
    teacherName: 'Ustadz Hilman Hakim, Lc.',
    documentFileName: 'Modul_Fikih_Rukun_Shalat_Bergambar.pdf',
    documentFileSize: '3.8 MB',
    contentBody: 'Shalat adalah tiang agama Islam. Ibadah shalat memiliki rukun-rukun yang wajib dipenuhi dari awal niat hingga salam penutup. Jika salah satu rukun sengaja ditinggalkan, shalat menjadi tidak sah.',
    keyTakeaways: [
      'Rukun shalat berjumlah 13 perkara menurut Mazhab Syafi\'i.',
      'Duduk Tasyahhud Awal hukumnya sunnah mu\'akkad (sunnah ab\'adh), sedangkan Tasyahhud Akhir adalah rukun wajib.',
      'Posisi kaki saat tasyahhud awal disebut duduk Iftirasy, dan pada tasyahhud akhir disebut duduk Tawarruk.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: '13 Rukun Shalat Fardhu',
        subheading: 'Hal-Hal Wajib yang Harus Dikerjakan dalam Shalat',
        paragraphs: [
          'Rukun shalat adalah amalan pokok yang menentukan sah atau tidaknya ibadah shalat kita di hadapan Allah SWT.',
          'Rukun terbagi menjadi rukun qauliyah (ucapan lisan) seperti membaca Al-Fatihah, takbiratul ihram, tasyahhud akhir, shalawat, dan salam; serta rukun fi\'liyah (gerakan tubuh) seperti berdiri, ruku\', i\'tidal, sujud, dan duduk di antara dua sujud.'
        ],
        keyPoints: [
          '1. Niat ikhlas karena Allah di dalam hati bersamaan dengan Takbiratul Ihram.',
          '2. Berdiri bagi yang mampu (qiyam).',
          '3. Takbiratul Ihram melafalkan "Allahu Akbar".',
          '4. Membaca Surat Al-Fatihah di setiap rakaat shalat.',
          '5. Ruku\' disertai Thuma\'ninah (tenang sejenak sekadar bacaan tasbih).',
          '6. I\'tidal berdiri tegak disertai Thuma\'ninah.',
          '7. Sujud dua kali dengan menempelkan dahi dan 6 anggota sujud ke lantai.'
        ],
        exercisePrompt: 'Berapakah jumlah anggota tubuh yang wajib menempel ke tempat sujud?',
        exerciseAnswer: 'Tujuh anggota: dahi (termasuk hidung), kedua telapak tangan, kedua lutut, dan jari-jemari kedua kaki.'
      },
      {
        pageNumber: 2,
        heading: 'Bacaan Tasyahhud Awal & Akhir Lengkap',
        subheading: 'Teks Arab, Latin, dan Terjemahan Indonesia',
        paragraphs: [
          'Ketika sampai pada rakaat kedua pada shalat 3 atau 4 rakaat, santri duduk tasyahhud awal. Sedangkan pada rakaat terakhir, santri duduk tasyahhud akhir sambil melafalkan bacaan tahiyyat.',
          'Angkat jari telunjuk tangan kanan lurus ke depan saat mengucap lafal "Illallaah" sebagai tanda pengesaan tauhid kepada Allah SWT.'
        ],
        arabicText: 'التَّحِيَّاتُ الْمُبَارَكَاتُ الصَّلَوَاتُ الطَّيِّبَاتُ لِلَّهِ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ',
        verseTranslation: 'Segala kehormatan, keberkahan, kebahagiaan, dan kebaikan adalah milik Allah. Semoga keselamatan, rahmat Allah, dan berkah-Nya tetap tercurah kepadamu wahai Nabi (Muhammad). Semoga keselamatan tercurah kepada kami dan hamba-hamba Allah yang saleh. Aku bersaksi bahwa tiada tuhan selain Allah dan Muhammad adalah utusan Allah.',
        keyPoints: [
          'Lafalkan bacaan dengan tartil, tenang, dan tidak terburu-buru.',
          'Jari telunjuk tetap diarahkan ke kiblat hingga salam penutup.'
        ],
        exercisePrompt: 'Kapan jari telunjuk kanan diangkat saat membaca tahiyyat?',
        exerciseAnswer: 'Saat mengucap lafal syahadat: "Asyhadu an laa ilaaha illallaah".'
      },
      {
        pageNumber: 3,
        heading: 'Shalawat Ibrahimiyah & Salam Penutup',
        subheading: 'Rukun Penutup Pembawa Kedamaian',
        paragraphs: [
          'Setelah selesai membaca bacaan tasyahhud pada rakaat terakhir, rukun berikutnya adalah melafalkan Shalawat kepada Nabi Muhammad SAW dan keluarga beliau.',
          'Shalawat yang paling utama adalah Shalawat Ibrahimiyah, kemudian diakhiri dengan menolehkan wajah ke kanan mengucapkan salam pertama (rukun) dan ke kiri (sunnah).'
        ],
        arabicText: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ',
        verseTranslation: 'Ya Allah, limpahkanlah rahmat kepada Nabi Muhammad dan keluarga Nabi Muhammad, sebagaimana Engkau telah melimpahkan rahmat kepada Nabi Ibrahim dan keluarga Nabi Ibrahim. Sesungguhnya Engkau Maha Terpuji lagi Maha Mulia.',
        keyPoints: [
          'Salam pertama ke kanan adalah rukun shalat.',
          'Disunnahkan menoleh hingga pipi terlihat dari arah belakang.'
        ],
        exercisePrompt: 'Apakah salam kedua menoleh ke kiri termasuk rukun shalat?',
        exerciseAnswer: 'Tidak, salam kedua hukumnya sunnah. Yang menjadi rukun wajib adalah salam pertama ke arah kanan.'
      }
    ]
  },
  {
    id: 'mat_03',
    title: 'Audio Murattal Tartil Surat Al-Kautsar & Terjemahan Kata per Kata',
    subjectId: 'sbj_qurdis',
    subjectName: "Al-Qur'an Hadis",
    category: 'kemenag',
    grade: 2,
    format: 'Audio MP3',
    scheduledDate: '2026-11-05',
    scheduledTime: '07:00 WIB',
    status: 'Terjadwal',
    description: 'Rekaman audio qari bersuara jernih untuk panduan hafalan santri di rumah.',
    teacherName: 'Ustadz Ridwan, S.Pd.I',
    audioDuration: '05:45',
    documentFileName: 'Murattal_Surat_AlKautsar_Tartil.mp3',
    documentFileSize: '6.2 MB',
    contentBody: 'Surat Al-Kautsar merupakan surat terpendek dalam Al-Qur\'an yang terdiri dari 3 ayat. Surat ini diturunkan di kota Makkah (Makkiyah) dan membawa kabar gembira mengenai anugerah telaga Al-Kautsar di surga bagi Rasulullah SAW dan umatnya yang istiqomah.',
    keyTakeaways: [
      'Al-Kautsar artinya nikmat yang sangat banyak dan berlimpah ruah.',
      'Perintah shalat dan menyembelih kurban sebagai wujud syukur kepada Allah SWT.',
      'Orang-orang kafir yang membenci dakwah Islam dipastikan terputus dari rahmat Allah.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Mendengarkan & Menghafal Surat Al-Kautsar',
        subheading: 'Panduan Tajwid Ayat per Ayat',
        paragraphs: [
          'Dengarkan lantunan tartil dari Ustadz, perhatikan panjang pendek bacaan (mad), ghunnah pada huruf nun bertasydid, dan qalqalah pada huruf Tha.',
          'Putar ulang audio sesering mungkin saat mengulang hafalan di rumah bersama ayah dan bunda.'
        ],
        arabicText: 'إِنَّآ أَعْطَيْنَـٰكَ ٱلْكَوْثَرَ (١) فَصَلِّ لِرَبِّكَ وَٱنْحَرْ (٢) إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ (٣)',
        verseTranslation: '1. Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.\n2. Maka laksanakanlah shalat karena Tuhanmu, dan berkurbanlah.\n3. Sungguh, orang yang membencimu dialah yang terputus (dari rahmat Allah).',
        keyPoints: [
          'Ayat 1: "Innaa" dibaca ghunnah mendengung 2 harakat.',
          'Ayat 2: "Wanhar" huruf Nun mati bertemu Huruf Ha dibaca Idzhar (jelas).',
          'Ayat 3: "Al-Abtar" huruf Ba sukun dipantulkan dengan Qalqalah Sughra.'
        ],
        exercisePrompt: 'Berapa ayat jumlah Surat Al-Kautsar?',
        exerciseAnswer: 'Tiga ayat (merupakan surat paling ringkas di dalam Al-Qur\'an).'
      }
    ]
  },
  {
    id: 'mat_04',
    title: 'Slide Presentasi: Kisah Teladan Khulafaur Rasyidin',
    subjectId: 'sbj_ski',
    subjectName: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    grade: 5,
    format: 'Slide Interaktif',
    scheduledDate: '2026-11-06',
    scheduledTime: '08:00 WIB',
    status: 'Terjadwal',
    description: 'Infografis kepemimpinan Khalifah Abu Bakar Ash-Shiddiq dan Umar bin Khattab.',
    teacherName: 'Ustadz Syamsul Hadi, S.Hum',
    documentFileName: 'Slide_SKI_Khulafaur_Rasyidin.pptx',
    documentFileSize: '5.1 MB',
    contentBody: 'Khulafaur Rasyidin adalah para pemimpin penerus perjuangan Rasulullah SAW yang mendapat petunjuk langsung dari Allah SWT. Terdiri dari empat sahabat utama: Abu Bakar Ash-Shiddiq, Umar bin Khattab, Utsman bin Affan, dan Ali bin Abi Thalib.',
    keyTakeaways: [
      'Khulafaur Rasyidin memimpin dengan musyawarah (syura) dan keadilan merata.',
      'Abu Bakar berjasa memerangi kaum murtad serta memprakarsai pembukuan mushaf Al-Qur\'an.',
      'Umar bin Khattab berjasa menetapkan kalender Hijriyah dan mendirikan lembaga administrasi Baitul Mal.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Mengenal Khulafaur Rasyidin',
        subtitle: 'Empat Sahabat Agung Penerus Kepemimpinan Umat Islam',
        bullets: [
          'Khulafaur Rasyidin berarti para pengganti yang mendapatkan bimbingan dan petunjuk lurus.',
          'Masa kepemimpinan berlangsung selama kurang lebih 30 tahun (11 H - 40 H).',
          'Sistem pemilihan khalifah dijalankan melalui musyawarah mufakat di antara para sahabat terkemuka.'
        ],
        highlightText: 'Hadits Nabi: "Wajib atas kalian berpegang teguh pada sunnahku dan sunnah para Khulafaur Rasyidin setelahku."'
      },
      {
        slideNumber: 2,
        title: 'Khalifah Abu Bakar Ash-Shiddiq (11-13 H)',
        subtitle: 'Sahabat Paling Setia & Penyelamat Akidah Umat',
        bullets: [
          'Gelar "Ash-Shiddiq" diberikan karena beliau selalu membenarkan peristiwa Isra Mi\'raj tanpa ragu.',
          'Menumpas nabi-nabi palsu (seperti Musailamah Al-Kadzdzab) dan menindak pembangkang zakat.',
          'Menerima usulan Umar bin Khattab untuk mengumpulkan lembaran ayat Al-Qur\'an menjadi satu mushaf resmi yang dipimpin oleh Zaid bin Tsabit.'
        ],
        reflectionQuestion: 'Mengapa pengumpulan mushaf Al-Qur\'an menjadi sangat mendesak pada masa Khalifah Abu Bakar?'
      },
      {
        slideNumber: 3,
        title: 'Khalifah Umar bin Khattab (13-23 H)',
        subtitle: 'Al-Faruq: Pemimpin Adil, Berani, dan Rendah Hati',
        bullets: [
          'Gelar "Al-Faruq" bermakna sang pembeda antara kebenaran (haq) dan kebatilan.',
          'Menetapkan awal penanggalan Kalender Hijriyah yang dihitung sejak hijrah Nabi dari Makkah ke Madinah.',
          'Mendirikan Baitul Mal (kas negara), kantor pos, kepolisian, dan pengadilan Islam yang independen.',
          'Terkenal dengan kebiasaan "ronda malam" untuk memeriksa langsung santri dan rakyat jelata yang kelaparan.'
        ],
        highlightText: 'Umar berkata: "Seandainya ada seekor keledai yang terperosok di jalanan Irak, aku takut Allah akan menuntutku kelak."'
      },
      {
        slideNumber: 4,
        title: 'Nilai Karakter yang Dapat Diteladani',
        subtitle: 'Implementasi Adab Santri Madrasah Ibtidaiyah',
        bullets: [
          '1. Kejujuran Tinggi: Berani mengakui kesalahan dan membela kebenaran.',
          '2. Kesederhanaan Hidup: Tidak menyombongkan harta, pakaian, atau jabatan.',
          '3. Amanah dalam Belajar: Menuntaskan tugas madrasah dan mutaba\'ah tepat waktu.',
          '4. Musyawarah & Gotong Royong: Menghargai pendapat teman di kelas.'
        ],
        reflectionQuestion: 'Apa contoh perbuatan adil dan amanah yang bisa ananda lakukan di kelas hari ini?'
      }
    ]
  },
  {
    id: 'mat_05',
    title: 'Modul E-Book IPAS: Harmoni Ekosistem & Rantai Makanan Ciptaan Allah',
    subjectId: 'sbj_ipas',
    subjectName: 'IPAS (Sains & Sosial)',
    category: 'umum',
    grade: 5,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-07',
    scheduledTime: '08:30 WIB',
    status: 'Diterbitkan',
    description: 'Eksplorasi jaring-jaring makanan, produsen, konsumen, dan keseimbangan alam semesta ciptaan Allah SWT.',
    teacherName: 'Bapak Arif Wicaksono, M.Si',
    documentFileName: 'Modul_IPAS_Ekosistem_Rantai_Makanan.pdf',
    documentFileSize: '4.2 MB',
    contentBody: 'Ekosistem adalah kesatuan fungsional antara makhluk hidup (biotik) dengan lingkungannya yang tak hidup (abiotik). Di dalam ekosistem terjadi perpindahan energi melalui proses makan dan dimakan yang teratur rapi sesuai ketetapan (sunnatullah).',
    keyTakeaways: [
      'Tumbuhan bertindak sebagai Produsen yang menghasilkan makanan sendiri melalui fotosintesis dengan bantuan cahaya matahari.',
      'Konsumen terdiri dari Herbivora (pemakan tumbuhan), Karnivora (pemakan daging), dan Omnivora (pemakan segala).',
      'Pengurai (dekomposer) seperti jamur dan bakteri mengembalikan unsur hara ke dalam tanah untuk diserap kembali oleh tumbuhan.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Komponen Rantai Makanan di Alam',
        subheading: 'Produsen, Konsumen, dan Pengurai',
        paragraphs: [
          'Rantai makanan adalah jalur perpindahan energi makanan dari satu organisme ke organisme lain melalui peristiwa makan dan dimakan dengan urutan tertentu.',
          'Matahari merupakan sumber energi primer bagi seluruh kehidupan di bumi. Tumbuhan hijau menyerap energi matahari untuk membuat zat gula dan oksigen.'
        ],
        keyPoints: [
          'Tingkat Trofik 1: Produsen (Padi, Rumput, Alga).',
          'Tingkat Trofik 2: Konsumen I / Herbivora (Belalang, Ulat, Kelinci).',
          'Tingkat Trofik 3: Konsumen II / Karnivora Kecil (Katak, Burung pipit).',
          'Tingkat Trofik 4: Konsumen Puncak (Elang, Singa, Harimau).'
        ],
        exercisePrompt: 'Organisme apakah yang menduduki tingkat trofik pertama dalam rantai makanan darat?',
        exerciseAnswer: 'Tumbuhan hijau (produsen) yang mampu menghasilkan makanan sendiri.'
      },
      {
        pageNumber: 2,
        heading: 'Keseimbangan Ekosistem & Tanggung Jawab Khalifah di Bumi',
        subheading: 'Menjaga Kelestarian Lingkungan Sesuai Ajaran Islam',
        paragraphs: [
          'Allah SWT telah menciptakan seluruh alam semesta dalam keadaan seimbang (mizan). Jika salah satu populasi hewan atau tumbuhan punah karena keserakahan manusia, rantai makanan akan terganggu.',
          'Sebagai khalifah di muka bumi, santri madrasah diajarkan untuk tidak merusak tanaman, tidak menyiksa hewan, serta membuang sampah pada tempatnya.'
        ],
        arabicText: 'ظَهَرَ الْفَسَادُ فِي الْبَرِّ وَالْبَحْرِ بِمَا كَسَبَتْ أَيْدِي النَّاسِ',
        verseTranslation: '"Telah tampak kerusakan di darat dan di laut disebabkan karena perbuatan tangan manusia..." (Q.S. Ar-Rum: 41)',
        keyPoints: [
          'Penggunaan pestisida berlebihan dapat membunuh serangga penyerbuk yang bermanfaat.',
          'Menjaga kebersihan madrasah adalah bagian integral dari iman dan pelestarian ekosistem.'
        ],
        exercisePrompt: 'Apa akibatnya jika populasi katak di sawah dibasmi secara besar-besaran?',
        exerciseAnswer: 'Populasi hama serangga (seperti belalang dan wereng) akan melonjak drastis dan merusak tanaman padi milik petani.'
      }
    ]
  },
  {
    id: 'mat_06',
    title: 'Modul Digital: Mengenal Asmaul Husna Al-Adl & Al-Bashir',
    subjectId: 'sbj_aqidah',
    subjectName: 'Aqidah Akhlak',
    category: 'kemenag',
    grade: 5,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-04',
    scheduledTime: '08:00 WIB',
    status: 'Diterbitkan',
    description: 'Meneladani sifat Allah Yang Maha Adil dan Maha Melihat dalam keseharian santri madrasah.',
    teacherName: 'Ustadzah Fatimah Nur, M.Pd',
    documentFileName: 'Modul_Aqidah_Asmaul_Husna.pdf',
    documentFileSize: '3.6 MB',
    contentBody: 'Asmaul Husna adalah nama-nama terbaik dan teragung milik Allah SWT. Mempelajari dan meresapi maknanya akan menumbuhkan rasa muraqabah (merasa selalu diawasi oleh Allah) serta mendorong santri berperilaku jujur dan adil.',
    keyTakeaways: [
      'Al-Adl berarti Allah Maha Adil menempatkan segala sesuatu sesuai hikmah dan takaran yang sempurna.',
      'Al-Bashir berarti Allah Maha Melihat segala perbuatan lahiriah maupun bisikan dalam sanubari.',
      'Santri yang mengimani Al-Bashir tidak akan berbuat curang atau mencontek saat ujian meskipun tanpa pengawas.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Hakikat Makna Al-Adl (Allah Maha Adil)',
        subheading: 'Keadilan Allah yang Maha Sempurna',
        paragraphs: [
          'Allah SWT adalah Al-Adl, tidak pernah menzalimi hamba-Nya walau seberat biji zarrah. Keadilan Allah melingkupi pembagian rezeki, syariat ibadah, dan pembalasan amal kelak di akhirat.',
          'Sebagai bukti keimanan, santri wajib bersikap adil kepada diri sendiri, orang tua, teman sekelas, serta tidak membeda-bedakan kawan bermain.'
        ],
        arabicText: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ',
        verseTranslation: '"Sesungguhnya Allah menyuruh (kamu) berlaku adil dan berbuat kebajikan..." (Q.S. An-Nahl: 90)',
        keyPoints: [
          'Berlaku adil di kelas: membagi tugas piket secara merata.',
          'Tidak memihak pada kesalahan meskipun pelakunya sahabat dekat.'
        ],
        exercisePrompt: 'Apa arti Asmaul Husna Al-Adl?',
        exerciseAnswer: 'Allah Maha Adil dan bijaksana dalam segala ketetapan-Nya.'
      },
      {
        pageNumber: 2,
        heading: 'Hakikat Makna Al-Bashir (Allah Maha Melihat)',
        subheading: 'Menumbuhkan Sifat Muraqabah di Madrasah',
        paragraphs: [
          'Pandangan Allah SWT menembus kegelapan malam terdalam, dasar samudra, dan setiap helai daun yang gugur. Tiada rahasia yang tersembunyi dari pandangan-Nya.',
          'Sikap seorang muslim sejati adalah berbuat jujur di mana pun berada, karena Allah senantiasa menyaksikan setiap langkah dan gerak-gerik kita.'
        ],
        arabicText: 'وَاللَّهُ بَصِيرٌ بِمَا تَعْمَلُونَ',
        verseTranslation: '"Dan Allah Maha Melihat apa yang kamu kerjakan." (Q.S. Al-Hujurat: 18)',
        keyPoints: [
          'Jujur saat mengerjakan soal CBT tanpa berniat mencontek jawaban teman.',
          'Menjaga lisan dan perbuatan baik saat sendiri maupun di keramaian.'
        ],
        exercisePrompt: 'Mengapa santri tidak boleh mencontek meskipun guru tidak melihat?',
        exerciseAnswer: 'Karena Allah Maha Melihat (Al-Bashir) dan para malaikat senantiasa mencatat seluruh amal perbuatan kita.'
      }
    ]
  },
  {
    id: 'mat_07',
    title: 'Audio & Kosakata: Percakapan Bahasa Arab di Kelas (Fil Fashli)',
    subjectId: 'sbj_arab',
    subjectName: 'Bahasa Arab',
    category: 'kemenag',
    grade: 5,
    format: 'Audio MP3',
    scheduledDate: '2026-11-05',
    scheduledTime: '09:00 WIB',
    status: 'Diterbitkan',
    description: 'Panduan audio percakapan ta\'aruf dan kosakata benda-benda ruang kelas madrasah.',
    teacherName: 'Ustadzah Aminah, S.Pd',
    audioDuration: '06:15',
    documentFileName: 'Audio_Hiwar_Fil_Fashli.mp3',
    documentFileSize: '5.8 MB',
    contentBody: 'Bahasa Arab adalah bahasa Al-Qur\'an dan bahasa komunikasi umat Islam sedunia. Dalam modul ini, santri melatih kelancaran mendengar (istima\') dan berbicara (kalam) seputar aktivitas di ruang kelas.',
    keyTakeaways: [
      'Memahami kosakata benda: Maktabun (meja), Kursiyyun (kursi), Sabbuuratun (papan tulis).',
      'Mengenal kata tunjuk (Isim Isyarah): Hadza (ini - mudzakkar) dan Hadzihi (ini - muannats).',
      'Praktik dialog sapaan pagi: Shabahul khair dijawab Shabahun nur.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Hiwar Singkat di Ruang Kelas (الْحِوَارُ فِي الْفَصْلِ)',
        subheading: 'Percakapan antara Ahmad dan Hasan',
        paragraphs: [
          'Dengarkan percakapan ramah antara santri saat memasuki ruang belajar di pagi hari.',
          'Tirukan intonasi pelafalan makhraj huruf Arab dengan jelas dan percaya diri.'
        ],
        arabicText: 'أَحْمَدُ: صَبَاحُ الْخَيْرِ يَا حَسَنُ!\nحَسَنُ: صَبَاحُ النُّورِ يَا أَخِي!\nأَحْمَدُ: مَا هَذَا؟\nحَسَنُ: هَذَا كِتَابُ اللُّغَةِ الْعَرَبِيَّةِ.',
        verseTranslation: 'Ahmad: Selamat pagi wahai Hasan!\nHasan: Selamat pagi juga saudaraku!\nAhmad: Apakah ini?\nHasan: Ini adalah buku pelajaran Bahasa Arab.',
        keyPoints: [
          'Shabahul Khair (صَبَاحُ الْخَيْرِ) dijawab dengan Shabahun Nur (صَبَاحُ النُّورِ).',
          'Hadza (هَذَا) digunakan untuk benda yang tidak berakhiran ta\' marbuthah.'
        ],
        exercisePrompt: 'Apa jawaban dari sapaan "Shabahul Khair"?',
        exerciseAnswer: 'Jawabannya adalah "Shabahun Nur" (صَبَاحُ النُّورِ).'
      }
    ]
  },
  {
    id: 'mat_08',
    title: 'Modul Interaktif: Pecahan & Luas Bangun Datar Madrasah',
    subjectId: 'sbj_matematika',
    subjectName: 'Matematika',
    category: 'umum',
    grade: 5,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-06',
    scheduledTime: '07:30 WIB',
    status: 'Diterbitkan',
    description: 'Konsep pecahan senilai, penjumlahan pecahan berbeda penyebut, dan luas ruang kelas.',
    teacherName: 'Ibu Ratna Dewi, S.Pd',
    documentFileName: 'Modul_Matematika_Pecahan_Bangun_Datar.pdf',
    documentFileSize: '4.5 MB',
    contentBody: 'Matematika mengasah ketelitian, keteraturan berpikir, dan kemampuan pemecahan masalah sehari-hari. Mulai dari menghitung pembagian zakat, infak, hingga merencanakan ukuran bangunan madrasah.',
    keyTakeaways: [
      'Menjumlahkan pecahan berbeda penyebut harus disamakan penyebutnya menggunakan KPK.',
      'Luas persegi panjang dihitung dengan mengalikan panjang dan lebar (L = p × l).',
      'Keliling persegi dihitung dengan 4 × panjang sisi.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Penjumlahan & Pengurangan Pecahan Berbeda Penyebut',
        subheading: 'Menyamakan Penyebut dengan KPK',
        paragraphs: [
          'Untuk menjumlahkan pecahan dengan penyebut tidak sama, langkah pertama adalah menentukan KPK dari kedua penyebut tersebut.',
          'Contoh: 1/2 + 1/4. KPK dari 2 dan 4 adalah 4. Maka 1/2 diubah menjadi 2/4. Hasilnya: 2/4 + 1/4 = 3/4.'
        ],
        keyPoints: [
          'Pecahan senilai: pembilang dan penyebut dikalikan dengan angka yang sama.',
          'Sederhanakan pecahan ke bentuk paling ringkas di akhir perhitungan.'
        ],
        exercisePrompt: 'Berapa hasil dari 2/5 + 1/10?',
        exerciseAnswer: 'KPK adalah 10. (4/10 + 1/10) = 5/10 = 1/2.'
      },
      {
        pageNumber: 2,
        heading: 'Menghitung Luas Bangun Datar Ruang Kelas',
        subheading: 'Penerapan Rumus Persegi Panjang',
        paragraphs: [
          'Ruang kelas 5 di MI Darul Ulum Sidareja memiliki panjang 12 meter dan lebar 8 meter.',
          'Luas ruangan dihitung dengan rumus: Luas = Panjang × Lebar = 12 m × 8 m = 96 m².'
        ],
        keyPoints: [
          'Satuan luas selalu menggunakan kuadrat / persegi (m² atau cm²).',
          'Keliling ruang kelas = 2 × (12 + 8) = 40 meter.'
        ],
        exercisePrompt: 'Berapa keliling ruang kelas jika panjang 10 m dan lebar 7 m?',
        exerciseAnswer: 'Keliling = 2 × (10 + 7) = 34 meter.'
      }
    ]
  },
  {
    id: 'mat_09',
    title: 'E-Modul Literasi: Menemukan Ide Pokok & Kaidah Ejaan PUEBI',
    subjectId: 'sbj_indo',
    subjectName: 'Bahasa Indonesia',
    category: 'umum',
    grade: 5,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-07',
    scheduledTime: '09:30 WIB',
    status: 'Diterbitkan',
    description: 'Teknik membaca intensif, menemukan kalimat utama, dan penerapan huruf kapital baku.',
    teacherName: 'Ibu Siti Rahmawati, M.Pd',
    documentFileName: 'Modul_Bahasa_Indonesia_Literasi.pdf',
    documentFileSize: '3.9 MB',
    contentBody: 'Membaca adalah gerbang ilmu pengetahuan (Iqra\'). Dengan menguasai teknik membaca intensif, santri dapat dengan cepat menyerap esensi artikel ilmiah, teks cerita teladan, dan teks laporan.',
    keyTakeaways: [
      'Ide pokok adalah gagasan pengembang inti yang terdapat pada kalimat utama paragraf.',
      'Huruf kapital wajib digunakan pada awal kalimat, nama orang, nama geografi, dan nama hari.',
      'Paragraf deduktif memiliki kalimat utama di awal, sedangkan paragraf induktif di akhir.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Teknik Menemukan Ide Pokok Paragraf',
        subheading: 'Membaca Kalimat Utama & Kalimat Pengembang',
        paragraphs: [
          'Dalam setiap paragraf yang baik, terdapat satu kalimat utama yang memuat ide pokok, didampingi beberapa kalimat penjelas yang menguraikan rincian informasi.',
          'Bacalah seluruh kalimat dengan tenang, lalu tanyakan: "Apa inti masalah yang sedang dibahas oleh paragraf ini?"'
        ],
        keyPoints: [
          'Kalimat utama tidak selalu berada di awal; bisa di awal (deduktif) atau di akhir (induktif).',
          'Ringkasan yang baik hanya menyatukan ide-ide pokok dari setiap paragraf.'
        ],
        exercisePrompt: 'Di mana letak kalimat utama pada paragraf deduktif?',
        exerciseAnswer: 'Terletak di awal paragraf.'
      }
    ]
  },
  {
    id: 'mat_10',
    title: 'Slide Interaktif: Gotong Royong & Musyawarah Karakter Santri',
    subjectId: 'sbj_pancasila',
    subjectName: 'Pendidikan Pancasila',
    category: 'umum',
    grade: 5,
    format: 'Slide Interaktif',
    scheduledDate: '2026-11-08',
    scheduledTime: '08:30 WIB',
    status: 'Diterbitkan',
    description: 'Implementasi nilai Sila ke-3 dan Sila ke-4 dalam tradisi musyawarah santri madrasah.',
    teacherName: 'Bapak Hendra Gunawan, S.Pd',
    documentFileName: 'Slide_Pancasila_Gotong_Royong.pptx',
    documentFileSize: '4.8 MB',
    contentBody: 'Nilai-nilai Pancasila selaras dengan akhlak Islam. Musyawarah (Syura), tolong-menolong (Ta\'awun), dan keadilan sosial adalah pilar kokoh dalam kehidupan bermasyarakat.',
    keyTakeaways: [
      'Sila ke-3 melandasi persatuan dan kerukunan tanpa membedakan latar belakang suku.',
      'Sila ke-4 menekankan pentingnya musyawarah mufakat dalam mengambil keputusan bersama.',
      'Gotong royong membersihkan madrasah mempererat ukhuwah islamiyah antar santri.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Makna Musyawarah untuk Mufakat',
        subtitle: 'Pengamalan Sila Keempat Pancasila di Madrasah',
        bullets: [
          'Musyawarah berasal dari bahasa Arab "Syura", yaitu bertukar pandangan untuk mencapai keputusan terbaik.',
          'Keputusan musyawarah wajib dihargai dan ditaati oleh seluruh santri dengan lapang dada.',
          'Tidak memaksakan kehendak pribadi kepada orang lain.'
        ],
        highlightText: 'Firman Allah: "Dan urusan mereka (diputuskan) dengan musyawarah antara mereka." (Q.S. Asy-Syura: 38)'
      },
      {
        slideNumber: 2,
        title: 'Tradisi Gotong Royong Santri',
        subtitle: 'Wujud Nyata Cinta Tanah Air dan Madrasah',
        bullets: [
          'Membersihkan aula madrasah menjelang peringatan hari besar Islam.',
          'Membantu kawan yang sedang tertinggal dalam pelajaran.',
          'Menjaga kebersihan dan kerindangan lingkungan sekolah bersama-sama.'
        ],
        reflectionQuestion: 'Apa kontribusi gotong royong yang telah kamu lakukan bersama teman-teman hari ini?'
      }
    ]
  },
  {
    id: 'mat_11',
    title: 'Video Panduan Senam Kesegaran Jasmani & Kebugaran Santri Sehat',
    subjectId: 'sbj_pjok',
    subjectName: 'PJOK & Kebugaran',
    category: 'umum',
    grade: 5,
    format: 'Video',
    scheduledDate: '2026-11-09',
    scheduledTime: '07:15 WIB',
    status: 'Diterbitkan',
    description: 'Gerakan pemanasan, senam kesegaran jasmani, dan pembiasaan hidup sehat kuat beribadah.',
    teacherName: 'Bapak Agus Prasetyo, S.Pd',
    videoDuration: '12:10',
    documentFileName: 'Video_Senam_Santri_Sehat.mp4',
    documentFileSize: '42.0 MB',
    contentBody: 'Mukmin yang kuat lebih dicintai Allah daripada mukmin yang lemah. Menjaga kebugaran jasmani melalui senam dan olahraga rutin membuat ibadah shalat dan belajar madrasah menjadi lebih berenergi.',
    keyTakeaways: [
      'Pemanasan dinamis dan statis selama 10 menit sebelum olahraga mencegah kram otot.',
      'Minum air putih cukup dan tidur tepat waktu setelah mutaba\'ah malam.',
      'Olahraga rutin 3 kali sepekan menjaga imunitas tubuh santri.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Pentingnya Kebugaran Fisik bagi Penuntut Ilmu',
        subheading: 'Akal yang Sehat Berada dalam Tubuh yang Kuat',
        paragraphs: [
          'Rasulullah SAW bersabda bahwa seorang mukmin yang kuat fisiknya, bersih jiwanya, dan teguh imannya sangat dicintai oleh Allah SWT.',
          'Senam jasmani santri melatih kelenturan sendi, kekuatan kaki, serta koordinasi gerak ritmik.'
        ],
        keyPoints: [
          'Lakukan peregangan kepala, pundak, pinggang, dan kaki sebelum berlari.',
          'Gunakan pakaian olahraga yang menutup aurat dan sepatu yang nyaman.'
        ],
        exercisePrompt: 'Mengapa pemanasan penting sebelum berolahraga?',
        exerciseAnswer: 'Untuk menaikkan suhu tubuh bertahap dan mencegah terjadinya kram serta cedera otot.'
      }
    ]
  },
  {
    id: 'mat_12',
    title: 'Modul Digital: Mengenal Kalimat Thayyibah Basmalah & Hamdalah',
    subjectId: 'sbj_aqidah',
    subjectName: 'Aqidah Akhlak',
    category: 'kemenag',
    grade: 2,
    format: 'Dokumen PDF',
    scheduledDate: '2026-11-04',
    scheduledTime: '08:00 WIB',
    status: 'Diterbitkan',
    description: 'Membiasakan mengucap Bismillah sebelum berkegiatan dan Alhamdulillah setelah selesai agar mendapat berkah Allah.',
    teacherName: 'Ustadzah Siti Maryam, S.Ag',
    documentFileName: 'Kalimat_Thayyibah_Kelas2.pdf',
    documentFileSize: '12.4 MB',
    contentBody: 'Setiap perbuatan baik yang diawali dengan membaca Bismillah akan bernilai ibadah dan dijauhkan dari godaan setan. Setelah selesai, kita bersyukur dengan mengucap Alhamdulillah.',
    keyTakeaways: [
      'Ucapkan Bismillah sebelum makan, minum, belajar, dan melangkahkan kaki ke madrasah.',
      'Ucapkan Alhamdulillah saat selesai beraktivitas atau saat mendapatkan nikmat.',
      'Orang yang rajin bersyukur akan ditambah nikmatnya oleh Allah SWT.'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Lafal dan Keutamaan Kalimat Thayyibah',
        subheading: 'Kalimat-Kalimat Suci yang Dicintai Allah',
        paragraphs: [
          'Kalimat Thayyibah adalah kalimat-kalimat yang baik dan mulia yang mengandung pujian serta pengagungan kepada Allah SWT.',
          'Anak sholeh membiasakan lidahnya basah dengan zikir dan doa dalam setiap kegiatan sehari-hari.'
        ],
        arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ · الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        verseTranslation: 'Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam.',
        keyPoints: [
          'Memulai kebaikan dengan Basmalah mendatangkan pahala dan keberkahan.',
          'Mengucap Hamdalah melatih hati agar senantiasa bersyukur dan tidak sombong.'
        ],
        exercisePrompt: 'Kalimat apa yang kita ucapkan saat hendak mulai belajar di kelas?',
        exerciseAnswer: 'Membaca Basmalah: Bismillahir-Rahmaanir-Rahiim.'
      }
    ]
  },
  {
    id: 'mat_13',
    title: 'Audio & Kartu Bergambar: Kosakata Benda di Kelas (Fil Fashli)',
    subjectId: 'sbj_arab',
    subjectName: 'Bahasa Arab',
    category: 'kemenag',
    grade: 2,
    format: 'Audio MP3',
    scheduledDate: '2026-11-05',
    scheduledTime: '08:30 WIB',
    status: 'Diterbitkan',
    description: 'Mengenal sebutan meja, papan tulis, buku, dan pensil dalam bahasa Arab dengan lagu ceria anak santri.',
    teacherName: 'Ustadz Ahmad Fauzi, Lc',
    audioDuration: '04:15',
    documentFileName: 'Fil_Fashli_Bahasa_Arab_Kls2.mp3',
    documentFileSize: '6.2 MB',
    contentBody: 'Belajar kosakata bahasa Arab di ruang kelas menjadi sangat menyenangkan dengan bernyanyi dan menunjuk benda langsung di ruang kelas.',
    keyTakeaways: [
      'Maktabun (مَكْتَبٌ) = Meja',
      'Kursiyyun (كُرْسِيٌّ) = Kursi',
      'Sabbuuratun (سَبُّوْرَةٌ) = Papan Tulis',
      'Qolamun (قَلَمٌ) = Pulpen / Pensil'
    ],
    pages: [
      {
        pageNumber: 1,
        heading: 'Koleksi Kosakata Benda Ruang Kelas',
        subheading: 'Al-Adawatul Madrosiyyah (Peralatan Sekolah)',
        paragraphs: [
          'Perhatikan benda-benda yang ada di dalam kelas 2 kita. Setiap benda memiliki nama dalam bahasa Arab.',
          'Dengarkan pelafalan ustadz dan ikuti bersama-sama dengan suara lantang dan gembira.'
        ],
        arabicText: 'مَكْتَبٌ - كُرْسِيٌّ - سَبُّوْرَةٌ - قَلَمٌ - كِتَابٌ',
        verseTranslation: 'Meja - Kursi - Papan Tulis - Pensil - Buku',
        keyPoints: [
          'Gunakan kata "Haadza" (هَذَا) untuk benda mudzakkar (seperti: Haadza maktabun).',
          'Gunakan kata "Haadzihi" (هَذِهِ) untuk benda berakhiran ta marbuthah (seperti: Haadzihi sabbuuratun).'
        ],
        exercisePrompt: 'Apa bahasa Arab dari kata "Meja"?',
        exerciseAnswer: 'Maktabun (مَكْتَبٌ).'
      }
    ]
  },
  {
    id: 'mat_14',
    title: 'Slide Ceria: Berhitung Cepat Penjumlahan & Pengurangan Cilik',
    subjectId: 'sbj_matematika',
    subjectName: 'Matematika',
    category: 'umum',
    grade: 2,
    format: 'Slide Interaktif',
    scheduledDate: '2026-11-06',
    scheduledTime: '09:00 WIB',
    status: 'Diterbitkan',
    description: 'Petualangan berhitung buah kurma dan pensil warna dengan metode visual penjumlahan ceria.',
    teacherName: 'Ustadzah Tri Wahyuni, S.Pd',
    documentFileName: 'Matematika_Ceria_Kelas2.pptx',
    documentFileSize: '15.8 MB',
    contentBody: 'Matematika adalah ilmu logika yang mengasyikkan. Dengan benda konkret seperti buah kurma dan kelereng, santri kelas 2 belajar menjumlahkan dan mengurangkan angka sampai 50.',
    keyTakeaways: [
      'Menjumlahkan artinya menggabungkan dua kelompok benda menjadi lebih banyak.',
      'Mengurangkan artinya mengambil sebagian benda sehingga jumlahnya berkurang.',
      'Gunakan jari tangan dan garis bilangan untuk mempermudah hitungan.'
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'Mengenal Penjumlahan dengan Buah Kurma',
        subtitle: 'Konsep Dasar Menggabungkan Angka',
        bullets: [
          'Ahmad memiliki 8 butir kurma manis.',
          'Ustadz memberi hadiah 7 butir kurma lagi.',
          'Maka kurma Ahmad sekarang adalah 8 + 7 = 15 butir kurma.'
        ],
        highlightText: 'Penjumlahan membuat jumlah benda bertambah banyak!',
        reflectionQuestion: 'Jika kamu punya 6 buku dan dibelikan ayah 4 buku, berapa total bukumu?'
      },
      {
        slideNumber: 2,
        title: 'Operasi Pengurangan Ramah Santri',
        subtitle: 'Konsep Mengambil dan Berbagi',
        bullets: [
          'Fatimah membawa 12 kue donat ke madrasah.',
          'Fatimah membagikan 5 donat kepada sahabatnya.',
          'Maka sisa donat Fatimah adalah 12 - 5 = 7 kue donat.'
        ],
        highlightText: 'Berbagi itu indah dan melatih keikhlasan hati santri.',
        reflectionQuestion: 'Berapakah hasil dari 20 dikurangi 8?'
      }
    ]
  }
];

export const mockDailyLessonSchedules: Record<number, DayLessonSchedule[]> = {
  // JADWAL KELAS 2 (Fase A - Kelas Rendah: Ahmad Fauzi Mubarak)
  2: [
    {
      dayName: 'Senin',
      dayArabic: 'الإثنين',
      morningHabit: '07:00 - 07:30 WIB · Upacara Bendera & Doa Belajar Pagi Bersama',
      sessions: [
        {
          id: 'sch_2_mon_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: "Al-Qur'an Hadis",
          subjectArabic: 'القرآن والحديث',
          category: 'kemenag',
          teacherName: 'Ustadz Ridwan, S.Pd.I',
          room: 'Gedung A - Ruang 201',
          iconName: 'BookOpen',
          color: 'emerald',
          focusTopic: 'Membaca & Menghafal Surat Al-Kautsar beserta Terjemahan'
        },
        {
          id: 'sch_2_mon_2',
          timeSlot: '09:30 - 11:00 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Bahasa Indonesia',
          subjectArabic: 'اللغة الإندونيسية',
          category: 'umum',
          teacherName: 'Ibu Nurul Hidayati, M.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'Feather',
          color: 'rose',
          focusTopic: 'Membaca Nyaring dengan Lafal & Intonasi Santun'
        }
      ]
    },
    {
      dayName: 'Selasa',
      dayArabic: 'الثلاثاء',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha Berjamaah & Asmaul Husna',
      sessions: [
        {
          id: 'sch_2_tue_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Aqidah Akhlak',
          subjectArabic: 'العقيدة والأخلاق',
          category: 'kemenag',
          teacherName: 'Ustadzah Fatimah Nur, M.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'HeartHandshake',
          color: 'teal',
          focusTopic: 'Mengenal Sifat Wajib Allah SWT & Berbakti pada Orang Tua'
        },
        {
          id: 'sch_2_tue_2',
          timeSlot: '09:30 - 11:00 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Matematika',
          subjectArabic: 'الرياضيات',
          category: 'umum',
          teacherName: 'Ibu Ratna Dewi, S.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'Calculator',
          color: 'indigo',
          focusTopic: 'Penjumlahan Bilangan 1 sampai 100 dengan Benda Konkret'
        }
      ]
    },
    {
      dayName: 'Rabu',
      dayArabic: 'الأربعاء',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha & Muraja\'ah Juz 30 Bersama Wali Kelas',
      sessions: [
        {
          id: 'sch_2_wed_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Fikih Ibadah',
          subjectArabic: 'الفقه الإسلامي',
          category: 'kemenag',
          teacherName: 'Ustadz Hilman Hakim, Lc.',
          room: 'Gedung A - Ruang 201',
          iconName: 'Sparkles',
          color: 'cyan',
          focusTopic: 'Praktik Gerakan Rukun Shalat & Bacaan Tasyahhud Bergambar'
        },
        {
          id: 'sch_2_wed_2',
          timeSlot: '09:30 - 11:00 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Pendidikan Pancasila',
          subjectArabic: 'التربية الوطنية',
          category: 'umum',
          teacherName: 'Bapak Tri Wahyudi, S.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'ShieldCheck',
          color: 'red',
          focusTopic: 'Menghargai Perbedaan & Hidup Rukun Sesama Teman'
        }
      ]
    },
    {
      dayName: 'Kamis',
      dayArabic: 'الخميس',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha & Pembiasaan Adab Santri (Makan, Minum, Berbicara)',
      sessions: [
        {
          id: 'sch_2_thu_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Bahasa Arab',
          subjectArabic: 'اللغة العربية',
          category: 'kemenag',
          teacherName: 'Ustadzah Aminah, S.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'Languages',
          color: 'emerald',
          focusTopic: 'Mufradat (Kosakata) Anggota Keluarga & Peralatan Belajar'
        },
        {
          id: 'sch_2_thu_2',
          timeSlot: '09:30 - 11:00 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Seni Budaya & Prakarya',
          subjectArabic: 'الفنون الإسلامية',
          category: 'umum',
          teacherName: 'Coach Bagus Prasetyo, S.Or',
          room: 'Gedung A - Ruang 201',
          iconName: 'Activity',
          color: 'orange',
          focusTopic: 'Mewarnai Huruf Hijaiyah & Kreasi Kolase Biji-Bijian'
        }
      ]
    },
    {
      dayName: 'Jumat',
      dayArabic: 'الجمعة',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha Akbar & Dzikir Pagi Sayyidul Istighfar',
      sessions: [
        {
          id: 'sch_2_fri_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Tahfiz Intensif Juz 30',
          subjectArabic: 'تحفيظ القرآن الكريم',
          category: 'kemenag',
          teacherName: 'Ustadz Ridwan, S.Pd.I',
          room: 'Masjid Baitul Ulum',
          iconName: 'BookOpen',
          color: 'emerald',
          focusTopic: 'Tasmi\' Setoran Hafalan Surat Pendek & Uji Makharijul Huruf'
        },
        {
          id: 'sch_2_fri_2',
          timeSlot: '09:00 - 10:30 WIB',
          periodLabel: 'Jam Ke-3',
          subjectName: 'Kisah Teladan Rasulullah (Sirah Cilik)',
          subjectArabic: 'السيرة النبوية',
          category: 'kemenag',
          teacherName: 'Ustadzah Fatimah Nur, M.Pd',
          room: 'Gedung A - Ruang 201',
          iconName: 'Compass',
          color: 'amber',
          focusTopic: 'Kisah Kejujuran Nabi Muhammad SAW Bergelar Al-Amin'
        }
      ]
    },
    {
      dayName: 'Sabtu',
      dayArabic: 'السبت',
      morningHabit: '07:00 - 07:30 WIB · Senam Santri Bugar & Apel Sabtu Bersih',
      sessions: [
        {
          id: 'sch_2_sat_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'PJOK Olahraga Santri',
          subjectArabic: 'التربية البدنية',
          category: 'umum',
          teacherName: 'Coach Bagus Prasetyo, S.Or',
          room: 'Lapangan Olahraga MI',
          iconName: 'Activity',
          color: 'orange',
          focusTopic: 'Gerak Lokomotor & Senam Kesegaran Jasmani Cilik'
        },
        {
          id: 'sch_2_sat_2',
          timeSlot: '09:30 - 11:00 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Pramuka Siaga & Ekstrakurikuler',
          subjectArabic: 'الكشافة الإسلامية',
          category: 'umum',
          teacherName: 'Ustadz Hilman Hakim, Lc.',
          room: 'Aula Madrasah',
          iconName: 'Compass',
          color: 'blue',
          focusTopic: 'Latihan Kedisiplinan Siaga & Tali Temali Sederhana'
        }
      ]
    }
  ],

  // JADWAL KELAS 5 (Fase C - Kelas Tinggi: Fatimah Az-Zahra)
  5: [
    {
      dayName: 'Senin',
      dayArabic: 'الإثنين',
      morningHabit: '07:00 - 07:30 WIB · Upacara Bendera & Penguatan Nilai Keagamaan Kemenag',
      sessions: [
        {
          id: 'sch_5_mon_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: "Al-Qur'an Hadis",
          subjectArabic: 'القرآن والحديث',
          category: 'kemenag',
          teacherName: 'Ustadz Ridwan, S.Pd.I',
          room: 'Gedung B - Ruang 502',
          iconName: 'BookOpen',
          color: 'emerald',
          focusTopic: 'Kandungan Surah Al-Bayyinah & Hukum Bacaan Mim/Nun Sukun'
        },
        {
          id: 'sch_5_mon_2',
          timeSlot: '09:30 - 11:30 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'IPAS (Sains & Sosial)',
          subjectArabic: 'العلوم والاجتماع',
          category: 'umum',
          teacherName: 'Bapak Arif Wicaksono, M.Si',
          room: 'Laboratorium Sains MI',
          iconName: 'Globe',
          color: 'sky',
          focusTopic: 'Sistem Pernafasan Manusia & Hubungannya dengan Kebugaran'
        }
      ]
    },
    {
      dayName: 'Selasa',
      dayArabic: 'الثلاثاء',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha Berjamaah & Tadarus Surah An-Naba',
      sessions: [
        {
          id: 'sch_5_tue_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Fikih Ibadah & Muamalah',
          subjectArabic: 'الفقه الإسلامي',
          category: 'kemenag',
          teacherName: 'Ustadz Hilman Hakim, Lc.',
          room: 'Gedung B - Ruang 502',
          iconName: 'Sparkles',
          color: 'cyan',
          focusTopic: 'Ketentuan Shalat Jamak & Qashar Beserta Syarat Sah Musafir'
        },
        {
          id: 'sch_5_tue_2',
          timeSlot: '09:30 - 11:30 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Matematika Terpadu',
          subjectArabic: 'الرياضيات',
          category: 'umum',
          teacherName: 'Ibu Ratna Dewi, S.Pd',
          room: 'Gedung B - Ruang 502',
          iconName: 'Calculator',
          color: 'indigo',
          focusTopic: 'Operasi Hitung Pecahan Campuran & Perkalian Desimal'
        }
      ]
    },
    {
      dayName: 'Rabu',
      dayArabic: 'الأربعاء',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha & Pembacaan Asmaul Husna Terpadu',
      sessions: [
        {
          id: 'sch_5_wed_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Sejarah Kebudayaan Islam (SKI)',
          subjectArabic: 'تاريخ الثقافة الإسلامية',
          category: 'kemenag',
          teacherName: 'Ustadz Syamsul Hadi, S.Hum',
          room: 'Gedung B - Ruang 502',
          iconName: 'Compass',
          color: 'amber',
          focusTopic: 'Strategi Dakwah & Kepemimpinan Khalifah Abu Bakar Ash-Shiddiq'
        },
        {
          id: 'sch_5_wed_2',
          timeSlot: '09:30 - 11:30 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Bahasa Indonesia',
          subjectArabic: 'اللغة الإندونيسية',
          category: 'umum',
          teacherName: 'Ibu Nurul Hidayati, M.Pd',
          room: 'Gedung B - Ruang 502',
          iconName: 'Feather',
          color: 'rose',
          focusTopic: 'Menulis Teks Eksplanasi Ilmiah & Menyusun Karangan Narasi'
        }
      ]
    },
    {
      dayName: 'Kamis',
      dayArabic: 'الخميس',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha & Kajian Hadis Adab Penuntut Ilmu',
      sessions: [
        {
          id: 'sch_5_thu_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Bahasa Arab',
          subjectArabic: 'اللغة العربية',
          category: 'kemenag',
          teacherName: 'Ustadzah Aminah, S.Pd',
          room: 'Gedung B - Ruang 502',
          iconName: 'Languages',
          color: 'emerald',
          focusTopic: 'Tarkib Fi\'il Mudhari\' & Hiwar Percakapan Sehari-hari'
        },
        {
          id: 'sch_5_thu_2',
          timeSlot: '09:30 - 11:30 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Pendidikan Pancasila',
          subjectArabic: 'التربية الوطنية',
          category: 'umum',
          teacherName: 'Bapak Tri Wahyudi, S.Pd',
          room: 'Gedung B - Ruang 502',
          iconName: 'ShieldCheck',
          color: 'red',
          focusTopic: 'Penerapan Sila Pancasila dalam Menjaga Keutuhan NKRI'
        }
      ]
    },
    {
      dayName: 'Jumat',
      dayArabic: 'الجمعة',
      morningHabit: '07:00 - 07:30 WIB · Shalat Dhuha & Pembacaan Surah Al-Kahfi Ayat 1-10',
      sessions: [
        {
          id: 'sch_5_fri_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'Aqidah Akhlak',
          subjectArabic: 'العقيدة والأخلاق',
          category: 'kemenag',
          teacherName: 'Ustadzah Fatimah Nur, M.Pd',
          room: 'Gedung B - Ruang 502',
          iconName: 'HeartHandshake',
          color: 'teal',
          focusTopic: 'Adab Bertetangga Islami & Menghindari Perilaku Tercela'
        },
        {
          id: 'sch_5_fri_2',
          timeSlot: '09:00 - 10:30 WIB',
          periodLabel: 'Jam Ke-3',
          subjectName: 'Tahfiz Intensif Juz 30',
          subjectArabic: 'تحفيظ القرآن الكريم',
          category: 'kemenag',
          teacherName: 'Ustadz Ridwan, S.Pd.I',
          room: 'Masjid Baitul Ulum',
          iconName: 'BookOpen',
          color: 'emerald',
          focusTopic: 'Penyetoran Hafalan Surah An-Naba s/d At-Takwir & Mutqin'
        }
      ]
    },
    {
      dayName: 'Sabtu',
      dayArabic: 'السبت',
      morningHabit: '07:00 - 07:30 WIB · Senam Kesegaran Santri & Apel Kepanduan',
      sessions: [
        {
          id: 'sch_5_sat_1',
          timeSlot: '07:30 - 09:00 WIB',
          periodLabel: 'Jam Ke-1 & 2',
          subjectName: 'PJOK Olahraga & Kebugaran',
          subjectArabic: 'التربية البدنية',
          category: 'umum',
          teacherName: 'Coach Bagus Prasetyo, S.Or',
          room: 'Gelanggang Olahraga MI',
          iconName: 'Activity',
          color: 'orange',
          focusTopic: 'Kombinasi Gerak Dasar Permainan Bola Voli & Daya Tahan Jantung'
        },
        {
          id: 'sch_5_sat_2',
          timeSlot: '09:30 - 11:30 WIB',
          periodLabel: 'Jam Ke-3 & 4',
          subjectName: 'Pramuka Penggalang & Kaligrafi',
          subjectArabic: 'الكشافة والخط العربي',
          category: 'umum',
          teacherName: 'Ustadz Hilman Hakim, Lc.',
          room: 'Aula & Ruang Seni Madrasah',
          iconName: 'Compass',
          color: 'blue',
          focusTopic: 'Kaidah Penulisan Khat Naskhi & Keterampilan Sandi Semaphore'
        }
      ]
    }
  ]
};

