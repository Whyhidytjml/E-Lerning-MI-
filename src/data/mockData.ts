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
  LearningMaterial
} from '../types/lms';

export const mockUserAccounts: UserAccount[] = [
  {
    id: 'usr_std_01',
    username: 'ahmad.fauzi',
    role: 'siswa_rendah',
    name: 'Ahmad Fauzi Mubarak',
    email: 'ahmad.fauzi@santri.madrasah.sch.id',
    avatar: '👦🏻',
    identifier: 'NIS: MI240201',
    title: 'Siswa Kelas 2 Ali bin Abi Thalib'
  },
  {
    id: 'usr_std_02',
    username: 'fatimah.zahra',
    role: 'siswa_tinggi',
    name: 'Fatimah Az-Zahra',
    email: 'fatimah.zahra@santri.madrasah.sch.id',
    avatar: '👧🏻',
    identifier: 'NIS: MI210512',
    title: 'Siswa Kelas 5 Siti Khadijah'
  },
  {
    id: 'usr_guru_01',
    username: 'ustadz.ridwan',
    role: 'guru',
    name: 'Ustadz Ridwan, S.Pd.I',
    email: 'ridwan@madrasah.sch.id',
    avatar: '👳🏻‍♂️',
    identifier: 'NIP: 198507122010011005',
    title: 'Wali Kelas 2 & Guru PAI Tahfiz'
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
    email: 'kepala@madrasah.sch.id',
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
    title: 'Wali Kelas 2 & Koordinator Tahfiz',
    email: 'ridwan@madrasah.sch.id',
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
    title: 'Guru PAI & Pembina Karakter',
    email: 'fatimah.nur@madrasah.sch.id',
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
    title: 'Guru Syariah & Bahasa Arab',
    email: 'hilman@madrasah.sch.id',
    phone: '0811-9988-7766',
    avatar: '👳🏻‍♂️',
    specialty: 'Fikih Ibadah & Muamalah',
    teachingHoursPerWeek: 24,
    status: 'Guru Tetap Yayasan'
  },
  {
    id: 'tch_04',
    nip: '199205202019031008',
    name: 'Ustadz Syamsul Hadi, S.Hum',
    title: 'Guru Sejarah & Peradaban',
    email: 'syamsul@madrasah.sch.id',
    phone: '0815-6677-8899',
    avatar: '👨🏻‍🏫',
    specialty: 'Sejarah Kebudayaan Islam (SKI)',
    teachingHoursPerWeek: 22,
    status: 'PPPK'
  },
  {
    id: 'tch_05',
    nip: '198402102009012004',
    name: 'Ibu Ratna Dewi, S.Pd',
    title: 'Koordinator Kurikulum Nasional & Guru Matematika',
    email: 'ratna.dewi@madrasah.sch.id',
    phone: '0812-8877-6655',
    avatar: '👩🏻‍🏫',
    specialty: 'Matematika Terpadu',
    teachingHoursPerWeek: 28,
    status: 'PNS'
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
    teacherName: 'Ustadz Ridwan, S.Pd.I'
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
    teacherName: 'Ustadz Hilman Hakim, Lc.'
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
    teacherName: 'Ustadz Ridwan, S.Pd.I'
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
    teacherName: 'Ustadz Syamsul Hadi, S.Hum'
  }
];
