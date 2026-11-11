export interface CbtQuestionItem {
  id: string;
  number?: number;
  subjectKey: 'fikih' | 'qurdis' | 'aqidah' | 'arab' | 'ski' | 'matematika' | 'ipas' | 'indo' | 'pancasila' | 'sbdp';
  subject: string;
  category: 'kemenag' | 'umum';
  q: string;
  arabicPrompt?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface CbtSubjectItem {
  id: string;
  name: string;
  shortName: string;
  category: 'kemenag' | 'umum';
  teacherName: string;
  durationMinutes: number;
  questionCount: number;
  description: string;
  gradient: string;
  borderColor: string;
  iconBg: string;
  badgeBg: string;
}

export const cbtSubjectList: CbtSubjectItem[] = [
  {
    id: 'fikih',
    name: 'Fikih Ibadah',
    shortName: 'Fikih',
    category: 'kemenag',
    teacherName: 'Ustadz Hilman Hakim, Lc.',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Tata cara shalat, jamak-qashar, rukun wudhu, makmum masbuq, dan hukum zakat fitrah.',
    gradient: 'from-emerald-600 to-teal-700',
    borderColor: 'border-emerald-300',
    iconBg: 'bg-emerald-100 text-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800'
  },
  {
    id: 'qurdis',
    name: "Al-Qur'an Hadis",
    shortName: 'Qurdis',
    category: 'kemenag',
    teacherName: 'Ustadz Ridwan, S.Pd.I',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Hukum tajwid (Ikhfa, Idzhar, Qalqalah), pemahaman surat pendek, dan hafalan hadis.',
    gradient: 'from-teal-600 to-cyan-700',
    borderColor: 'border-teal-300',
    iconBg: 'bg-teal-100 text-teal-800',
    badgeBg: 'bg-teal-100 text-teal-800'
  },
  {
    id: 'aqidah',
    name: 'Aqidah Akhlak',
    shortName: 'Aqidah',
    category: 'kemenag',
    teacherName: 'Ustadzah Fatimah Nur, M.Pd',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Rukun iman, Asmaul Husna, adab birrul walidain, sifat wajib Rasul, dan sikap tawadhu.',
    gradient: 'from-blue-600 to-indigo-700',
    borderColor: 'border-blue-300',
    iconBg: 'bg-blue-100 text-blue-800',
    badgeBg: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'arab',
    name: 'Bahasa Arab',
    shortName: 'B. Arab',
    category: 'kemenag',
    teacherName: 'Ustadzah Aminah, S.Pd',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Mufradat madrasah, dhamir kata ganti, waktu/jam Arab, profesi, dan struktur kalimat.',
    gradient: 'from-amber-600 to-orange-700',
    borderColor: 'border-amber-300',
    iconBg: 'bg-amber-100 text-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800'
  },
  {
    id: 'ski',
    name: 'Sejarah Kebudayaan Islam',
    shortName: 'SKI',
    category: 'kemenag',
    teacherName: 'Ustadz Syamsul Hadi, S.Hum',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Dakwah Rasulullah di Madinah, Khulafaur Rasyidin, Perang Badar, dan Piagam Madinah.',
    gradient: 'from-purple-600 to-violet-700',
    borderColor: 'border-purple-300',
    iconBg: 'bg-purple-100 text-purple-800',
    badgeBg: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'matematika',
    name: 'Matematika',
    shortName: 'MTK',
    category: 'umum',
    teacherName: 'Ibu Ratna Dewi, S.Pd',
    durationMinutes: 20,
    questionCount: 8,
    description: 'Pecahan, luas & keliling bangun datar, skala peta, FPB-KPK, dan operasi hitung bilangan.',
    gradient: 'from-indigo-600 to-blue-800',
    borderColor: 'border-indigo-300',
    iconBg: 'bg-indigo-100 text-indigo-800',
    badgeBg: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'ipas',
    name: 'IPAS (Sains & Sosial)',
    shortName: 'IPAS',
    category: 'umum',
    teacherName: 'Bapak Arif Wicaksono, M.Si',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Rantai makanan, organ pernapasan, perubahan wujud benda, gaya gravitasi, dan sejarah lokal.',
    gradient: 'from-emerald-700 to-green-800',
    borderColor: 'border-green-300',
    iconBg: 'bg-green-100 text-green-800',
    badgeBg: 'bg-green-100 text-green-800'
  },
  {
    id: 'indo',
    name: 'Bahasa Indonesia',
    shortName: 'B. Indo',
    category: 'umum',
    teacherName: 'Ustadzah Siti Maryam, S.Pd',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Gagasan pokok, teks eksplanasi, kaidah PUEBI huruf kapital, kosakata baku, dan simpulan.',
    gradient: 'from-rose-600 to-pink-700',
    borderColor: 'border-rose-300',
    iconBg: 'bg-rose-100 text-rose-800',
    badgeBg: 'bg-rose-100 text-rose-800'
  },
  {
    id: 'pancasila',
    name: 'Pendidikan Pancasila',
    shortName: 'Pancasila',
    category: 'umum',
    teacherName: 'Bapak Bambang Sutrisno, S.Pd',
    durationMinutes: 15,
    questionCount: 8,
    description: 'Nilai-nilai luhur sila 1-5, musyawarah mufakat, hak & kewajiban warga madrasah.',
    gradient: 'from-red-600 to-amber-700',
    borderColor: 'border-red-300',
    iconBg: 'bg-red-100 text-red-800',
    badgeBg: 'bg-red-100 text-red-800'
  },
  {
    id: 'sbdp',
    name: 'Seni Budaya & Kaligrafi',
    shortName: 'SBdP',
    category: 'umum',
    teacherName: 'Ustadz M. Yusuf, S.Sn',
    durationMinutes: 15,
    questionCount: 6,
    description: 'Khat kaligrafi Naskhi, teknik kolase/mozaik, pola irama musik, dan kerajinan tangan.',
    gradient: 'from-violet-600 to-fuchsia-700',
    borderColor: 'border-violet-300',
    iconBg: 'bg-violet-100 text-violet-800',
    badgeBg: 'bg-violet-100 text-violet-800'
  }
];

export const masterCbtQuestions: CbtQuestionItem[] = [
  // ================= FIKIH IBADAH =================
  {
    id: 'fikih_01',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Menurut ketentuan fikih madzhab Syafi\'i, pengertian shalat jamak takdim yang benar adalah...',
    options: [
      'Menggabungkan dua shalat fardhu dan dikerjakan pada waktu shalat yang kedua',
      'Menggabungkan dua shalat fardhu dan dikerjakan pada waktu shalat yang pertama',
      'Meringkas shalat empat rakaat menjadi dua rakaat ketika bepergian jauh',
      'Mengerjakan shalat sunnah rawatib sebelum shalat fardhu'
    ],
    correct: 1,
    explanation: 'Jamak Takdim adalah mengumpulkan dua shalat fardhu (seperti Zhuhur dengan Ashar, atau Maghrib dengan Isya) dan melaksanakannya pada waktu shalat yang pertama (di waktu Zhuhur atau waktu Maghrib).'
  },
  {
    id: 'fikih_02',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Di antara perkara berikut, manakah yang termasuk ke dalam RUKUN Wudhu yang wajib dikerjakan?',
    options: [
      'Membaca basmalah di awal wudhu',
      'Membasuh kedua telapak tangan',
      'Membasuh muka disertai niat di dalam hati',
      'Berkumur-kumur sebanyak tiga kali'
    ],
    correct: 2,
    explanation: 'Rukun wudhu ada 6: Niat saat membasuh muka, membasuh muka, membasuh kedua tangan sampai siku, mengusap sebagian kepala, membasuh kedua kaki sampai mata kaki, dan tertib.'
  },
  {
    id: 'fikih_03',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Makmum yang terlambat datang saat imam sudah memulai shalat dan belum sempat membaca Surat Al-Fatihah bersama imam disebut sebagai...',
    options: [
      'Makmum Muwafiq',
      'Makmum Masbuq',
      'Makmum Munfarid',
      'Makmum Jamak'
    ],
    correct: 1,
    explanation: 'Makmum Masbuq adalah makmum yang datang terlambat dan tidak mendapati waktu yang cukup untuk membaca Al-Fatihah secara sempurna bersama imam sebelum imam ruku\'.'
  },
  {
    id: 'fikih_04',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Kewajiban mengeluarkan zakat fitrah bagi setiap jiwa muslim pada bulan Ramadhan adalah sebesar...',
    options: [
      '1 sha\' atau setara 2,5 kg (3,5 liter) beras/makanan pokok',
      '5 kg makanan pokok atau beras',
      '1/2 sha\' atau setara 1,5 kg beras',
      '2 sha\' atau setara 5 kg beras'
    ],
    correct: 0,
    explanation: 'Kadar zakat fitrah yang wajib dikeluarkan per jiwa muslim adalah satu sha\' (sekitar 2,5 kg atau 3,5 liter) makanan pokok di daerah masing-masing.'
  },
  {
    id: 'fikih_05',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Shalat sunnah yang dikerjakan pada pagi hari setelah matahari terbit setinggi tombak (sekitar pukul 07.00) hingga sebelum waktu zhuhur disebut shalat...',
    options: [
      'Shalat Tahajjud',
      'Shalat Witir',
      'Shalat Dhuha',
      'Shalat Istikharah'
    ],
    correct: 2,
    explanation: 'Shalat Dhuha adalah shalat sunnah yang dikerjakan saat waktu dhuha (mulai matahari naik setinggi tombak hingga sebelum tergelincir matahari waktu zhuhur), bernilai sedekah bagi seluruh persendian.'
  },
  {
    id: 'fikih_06',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Najis air kencing bayi laki-laki yang belum berumur dua tahun dan belum makan apapun selain air susu ibu (ASI) termasuk jenis najis...',
    options: [
      'Najis Mukhaffafah (Ringan)',
      'Najis Mutawassithah (Sedang)',
      'Najis Mughalazhah (Berat)',
      'Najis Hukmiyah'
    ],
    correct: 0,
    explanation: 'Najis air kencing bayi laki-laki berusia di bawah 2 tahun yang hanya minum ASI adalah Najis Mukhaffafah, cara mensucikannya cukup dengan memercikkan air bersih ke bagian yang terkena najis.'
  },
  {
    id: 'fikih_07',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Salah satu syarat sah shalat fardhu yang harus dipenuhi sebelum takbiratul ihram adalah...',
    options: [
      'Membaca surat pendek setelah Al-Fatihah',
      'Menghadap ke arah kiblat dan suci dari hadas serta najis',
      'Mengerjakan sujud sahwi di akhir shalat',
      'Mengangkat kedua tangan saat takbir'
    ],
    correct: 1,
    explanation: 'Syarat sah shalat harus terpenuhi sebelum shalat, di antaranya: suci dari hadas besar dan kecil, suci badan, pakaian, dan tempat dari najis, menutup aurat, masuk waktu shalat, dan menghadap kiblat.'
  },
  {
    id: 'fikih_08',
    subjectKey: 'fikih',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Pemberian harta sukarela dari seorang muslim kepada orang lain yang membutuhkan semata-mata mengharap ridha Allah tanpa batasan jumlah dinamakan...',
    options: [
      'Zakat Maal',
      'Shadaqah / Infaq',
      'Riba',
      'Pajak'
    ],
    correct: 1,
    explanation: 'Shadaqah atau infaq adalah sedekah sukarela yang diberikan dengan ikhlas tanpa ketentuan haul maupun nishab seperti zakat wajib.'
  },

  // ================= AL-QUR'AN HADIS =================
  {
    id: 'qurdis_01',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Berikut ini adalah huruf-huruf Ikhfa Haqiqi dalam hukum bacaan Nun Sukun dan Tanwin, KECUALI...',
    arabicPrompt: 'حُرُوْفُ الْإِخْفَاءِ الْحَقِيقِيِّ',
    options: [
      'Ta (ت) dan Jim (ج)',
      'Kaf (ك) dan Qaf (ق)',
      'Dal (د) dan Dzal (ذ)',
      'Hamzah (ء) dan Ha (هـ)'
    ],
    correct: 3,
    explanation: 'Huruf Hamzah (ء) dan Ha (هـ) adalah huruf Idzhar Halqi (dibaca jelas tanpa mendengung), bukan huruf Ikhfa Haqiqi yang berjumlah 15 huruf.'
  },
  {
    id: 'qurdis_02',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Huruf Qaf (ق) yang dibaca sukun atau waqaf pada akhir ayat sehingga bunyi pantulannya terdengar tebal dan kuat dinamakan bacaan...',
    arabicPrompt: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
    options: [
      'Qalqalah Sughra (Kecil)',
      'Qalqalah Kubra (Besar)',
      'Idzhar Syafawi',
      'Mad Wajib Muttashil'
    ],
    correct: 1,
    explanation: 'Qalqalah Kubra terjadi apabila huruf qalqalah (baju di thoko: ب ج د ط ق) berada di akhir kata dan dibaca sukun karena berhenti (waqaf), seperti pada akhir ayat surat Al-Falaq.'
  },
  {
    id: 'qurdis_03',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Hukum bacaan Ikhfa Syafawi terjadi apabila ada huruf Mim Sukun (مْ) bertemu dengan huruf hijaiyah...',
    arabicPrompt: 'تَرْمِيهِم بِحِجَارَةٍ',
    options: [
      'Huruf Ba (ب)',
      'Huruf Mim (م)',
      'Huruf Wawu (و)',
      'Huruf Fa (ف)'
    ],
    correct: 0,
    explanation: 'Ikhfa Syafawi terjadi bila Mim Sukun bertemu huruf Ba (ب), dibaca samar di bibir dengan mendengung (ghunnah), seperti pada lafal: تَرْمِيهِم بِحِجَارَةٍ.'
  },
  {
    id: 'qurdis_04',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Dalam surat Al-Ma\'un, di antara orang-orang yang disebut sebagai pendusta agama (mukadzdzibu bid-din) adalah mereka yang...',
    arabicPrompt: 'أَرَأَيْتَ الَّذِي يُكَذِّبُ بِالدِّينِ',
    options: [
      'Menghardik anak yatim dan enggan menolong orang miskin',
      'Membayar zakat tepat waktu',
      'Mendirikan shalat berjamaah di masjid',
      'Membaca Al-Qur\'an setiap hari'
    ],
    correct: 0,
    explanation: 'Surat Al-Ma\'un ayat 1-3 menegaskan bahwa pendusta agama adalah orang yang menghardik anak yatim (fadzaalikalladzii yadu\'\'ul yatiim) dan tidak menganjurkan memberi makan orang miskin.'
  },
  {
    id: 'qurdis_05',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Hukum bacaan Idgham Bighunnah terjadi jika Nun Sukun atau Tanwin bertemu dengan salah satu dari empat huruf yaitu...',
    options: [
      'Ya (ي), Nun (ن), Mim (م), Wawu (و)',
      'Lam (ل) dan Ra (ر)',
      'Hamzah (ء), Ha (هـ), \'Ain (ع), Ghain (غ)',
      'Kaf (ك) dan Qaf (ق)'
    ],
    correct: 0,
    explanation: 'Huruf Idgham Bighunnah ada empat disingkat Ya-Na-Ma-Wa (ي ن م و), dibaca melebur disertai dengungan selama 2 harakat.'
  },
  {
    id: 'qurdis_06',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Perhatikan potongan hadits: "الطُّهُورُ شَطْرُ الإِيمَانِ". Pesan yang terkandung dalam hadits riwayat Imam Muslim tersebut adalah...',
    arabicPrompt: 'الطُّهُورُ شَطْرُ الإِيمَانِ',
    options: [
      'Kebersihan dan bersuci adalah separuh dari keimanan',
      'Menuntut ilmu hukumnya wajib bagi setiap muslim',
      'Shalat adalah tiang agama Islam',
      'Surga berada di bawah telapak kaki ibu'
    ],
    correct: 0,
    explanation: 'Hadits "Ath-thuhuuru syathrul iimaan" menegaskan bahwa kesucian fisik dan batin merupakan separuh dari kesempurnaan iman seorang muslim.'
  },
  {
    id: 'qurdis_07',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Panjang bacaan hukum Mad Thabi\'i (Mad Asli) dalam kaidah ilmu tajwid dibaca sepanjang...',
    options: [
      '1 Harakat (Cepat)',
      '2 Harakat / 1 Alif',
      '4 Harakat / 2 Alif',
      '6 Harakat / 3 Alif'
    ],
    correct: 1,
    explanation: 'Mad Thabi\'i atau Mad Asli terjadi ketika huruf Alif sesudah Fathah, Ya sukun sesudah Kasrah, atau Wawu sukun sesudah Dhammah, dibaca panjang 2 harakat (1 alif).'
  },
  {
    id: 'qurdis_08',
    subjectKey: 'qurdis',
    subject: "Al-Qur'an Hadis",
    category: 'kemenag',
    q: 'Huruf Idzhar Halqi yang dibaca jelas tanpa dengung ketika bertemu Nun Sukun atau Tanwin berjumlah...',
    options: [
      '4 Huruf',
      '6 Huruf (ء, هـ, ع, ح, غ, خ)',
      '15 Huruf',
      '2 Huruf'
    ],
    correct: 1,
    explanation: 'Huruf Idzhar Halqi ada 6 yang keluar dari tenggorokan (halq): Hamzah, Ha, \'Ain, Ha, Ghain, dan Kha.'
  },

  // ================= AQIDAH AKHLAK =================
  {
    id: 'aqidah_01',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Allah SWT memiliki Asmaul Husna "Al-Bashir" (الْبَصِيرُ), yang artinya Allah Maha...',
    arabicPrompt: 'الْبَصِيرُ جَلَّ جَلَالُهُ',
    options: [
      'Mendengar segala bisikan hamba-Nya',
      'Melihat segala perbuatan tampak maupun tersembunyi',
      'Bijaksana dan Adil dalam membagi rezeki',
      'Mengetahui hal-hal yang gaib'
    ],
    correct: 1,
    explanation: 'Al-Bashir artinya Allah Maha Melihat segala sesuatu di alam semesta, baik yang tampak di tempat terang maupun yang tersembunyi di kegelapan malam tanpa ada yang luput.'
  },
  {
    id: 'aqidah_02',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Meyakini dengan sepenuh hati bahwa seluruh alam semesta beserta isinya akan mengalami kehancuran dan manusia akan dibangkitkan untuk dihisab amalannya adalah rukun iman ke-...',
    options: [
      'Rukun Iman ke-3 (Kepada Kitab-Kitab Allah)',
      'Rukun Iman ke-4 (Kepada Rasul-Rasul Allah)',
      'Rukun Iman ke-5 (Kepada Hari Akhir / Kiamat)',
      'Rukun Iman ke-6 (Kepada Qadha dan Qadar)'
    ],
    correct: 2,
    explanation: 'Rukun Iman ke-5 adalah Beriman kepada Hari Akhir (Hari Kiamat), di mana seluruh amal perbuatan manusia di dunia akan dipertanggungjawabkan.'
  },
  {
    id: 'aqidah_03',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Sikap santri yang rendah hati, tidak sombong atas kepintaran atau hartanya, serta menghormati orang lain disebut dengan sikap...',
    arabicPrompt: 'التَّوَاضُعُ لِلَّهِ',
    options: [
      'Takabur (Sombong)',
      'Tawadhu\' (Rendah Hati)',
      'Riya\' (Pamer Amal)',
      'Ananiah (Egois)'
    ],
    correct: 1,
    explanation: 'Tawadhu\' adalah sikap rendah hati yang menyadari bahwa semua kelebihan, kecerdasan, dan nikmat hanyalah titipan dari Allah SWT semata.'
  },
  {
    id: 'aqidah_04',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Kalimat thayyibah "Laa hawla wa laa quwwata illa billahil \'aliyyil \'azhim" (Hauqalah) diucapkan ketika seorang santri...',
    arabicPrompt: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    options: [
      'Menghadapi kesulitan atau kepasrahan bahwa tiada daya upaya melainkan dengan pertolongan Allah',
      'Melihat pemandangan alam yang sangat indah',
      'Mendengar berita kelahiran adik baru',
      'Mendapatkan hadiah juara kelas'
    ],
    correct: 0,
    explanation: 'Kalimat Hauqalah adalah pengakuan kelemahan diri bahwa manusia tidak mempunyai kekuatan untuk berbuat kebaikan atau menghindari keburukan tanpa izin dan pertolongan Allah.'
  },
  {
    id: 'aqidah_05',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Nabi dan Rasul Allah memiliki 4 sifat wajib, salah satunya adalah "Fathanah" yang bermakna...',
    options: [
      'Selalu benar dan jujur perkataannya (Shiddiq)',
      'Cerdas dan bijaksana dalam memecahkan persoalan umat (Fathanah)',
      'Dapat dipercaya dan amanah (Amanah)',
      'Menyampaikan wahyu tanpa menyembunyikan (Tabligh)'
    ],
    correct: 1,
    explanation: 'Fathanah artinya cerdas. Para Rasul dikaruniai kecerdasan luar biasa untuk membimbing manusia dan membantah argumen orang-orang yang ingkar.'
  },
  {
    id: 'aqidah_06',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Sikap berbakti, patuh, dan berbuat baik kepada kedua orang tua dalam ajaran Islam dinamakan...',
    arabicPrompt: 'بِرُّ الْوَالِدَيْنِ',
    options: [
      'Birrul Walidain',
      'Uququl Walidain',
      'Silaturahmi',
      'Tasamuh'
    ],
    correct: 0,
    explanation: 'Birrul Walidain adalah kebaktian kepada orang tua yang merupakan amalan paling dicintai Allah setelah shalat tepat pada waktunya.'
  },
  {
    id: 'aqidah_07',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Malaikat yang bertugas membagikan rezeki, menurunkan air hujan, dan mengatur kesuburan tanaman di bumi atas perintah Allah adalah Malaikat...',
    options: [
      'Malaikat Jibril a.s.',
      'Malaikat Mikail a.s.',
      'Malaikat Israfil a.s.',
      'Malaikat Izrail a.s.'
    ],
    correct: 1,
    explanation: 'Malaikat Mikail a.s. bertugas mengurus pembagian rezeki dan mengatur fenomena alam seperti hujan dan tumbuhnya tanaman bagi seluruh makhluk hidup.'
  },
  {
    id: 'aqidah_08',
    subjectKey: 'aqidah',
    subject: 'Aqidah Akhlak',
    category: 'kemenag',
    q: 'Penyakit hati berupa rasa tidak senang melihat orang lain memperoleh nikmat dan berharap nikmat tersebut hilang dari orang tersebut disebut sifat...',
    options: [
      'Hasad (Dengki)',
      'Ghadhab (Pemarah)',
      'Kadzib (Bohong)',
      'Namimah (Adu Domba)'
    ],
    correct: 0,
    explanation: 'Hasad (dengki) dapat memakan kebaikan sebagaimana api memakan kayu bakar. Seorang santri harus membiasakan sifat bersyukur dan gembira atas nikmat temannya.'
  },

  // ================= BAHASA ARAB =================
  {
    id: 'arab_01',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Perhatikan kalimat bahasa Arab berikut: "هَذَا مَكْتَبٌ وَتِلْكَ سَبُّوْرَةٌ". Arti dari kata yang digarisbawahi (مَكْتَبٌ dan سَبُّوْرَةٌ) adalah...',
    arabicPrompt: 'هَذَا مَكْتَبٌ وَتِلْكَ سَبُّوْرَةٌ',
    options: [
      'Meja dan Papan Tulis',
      'Kursi dan Lemari Buku',
      'Pintu dan Jendela Kelas',
      'Buku Tulis dan Pensil'
    ],
    correct: 0,
    explanation: 'Maktabun (مَكْتَبٌ) artinya meja, dan Sabbuuratun (سَبُّوْرَةٌ) artinya papan tulis.'
  },
  {
    id: 'arab_02',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Dhamir (kata ganti) dalam bahasa Arab yang digunakan untuk menunjuk orang kedua tunggal laki-laki ("Kamu seorang laki-laki") adalah...',
    arabicPrompt: 'الضَّمِائِرُ الْمُنْفَصِلَةُ',
    options: [
      'Huwa (هُوَ)',
      'Anta (أَنْتَ)',
      'Anti (أَنْتِ)',
      'Nahnu (نَحْنُ)'
    ],
    correct: 1,
    explanation: 'Anta (أَنْتَ) berarti kamu (seorang laki-laki). Anti (أَنْتِ) untuk perempuan, Huwa (هُوَ) untuk dia laki-laki, dan Nahnu (نَحْنُ) artinya kami/kita.'
  },
  {
    id: 'arab_03',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Perhatikan kalimat: "أُصَلِّي الظُّهْرَ فِي السَّاعَةِ الثَّانِيَةَ عَشْرَةَ". Arti dari kata yang digarisbawahi (السَّاعَةِ الثَّانِيَةَ عَشْرَةَ) adalah...',
    arabicPrompt: 'السَّاعَةُ الثَّانِيَةَ عَشْرَةَ',
    options: [
      'Pukul sepuluh tepat',
      'Pukul sebelas tepat',
      'Pukul dua belas tepat',
      'Pukul satu siang'
    ],
    correct: 2,
    explanation: 'As-saa\'atu ats-tsaaniyata \'asyrata (السَّاعَةُ الثَّانِيَةَ عَشْرَةَ) artinya pukul 12.00 tepat.'
  },
  {
    id: 'arab_04',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Kata tanya dalam bahasa Arab yang digunakan untuk menanyakan tempat ("Di mana?") adalah...',
    arabicPrompt: 'أَدَوَاتُ الِاسْتِفْهَامِ',
    options: [
      'Aina (أَيْنَ)',
      'Maa (مَا)',
      'Man (مَنْ)',
      'Kaifa (كَيْفَ)'
    ],
    correct: 0,
    explanation: 'Aina (أَيْنَ) berarti di mana. Man (مَنْ) siapa, Maa (مَا) apa, dan Kaifa (كَيْفَ) bagaimana.'
  },
  {
    id: 'arab_05',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Jika temanmu mengucapkan salam sapaan pagi "صَبَاحَ الْخَيْرِ" (Shabaahal khair), maka jawaban balasan yang tepat dan santun adalah...',
    arabicPrompt: 'صَبَاحُ الْخَيْرِ',
    options: [
      'Shabaahan Nuur (صَبَاحَ النُّوْرِ)',
      'Masaa\'al Khair (مَسَاءَ الْخَيْرِ)',
      'Ahlan wa Sahlan (أَهْلًا وَسَهْلًا)',
      'Ilad-diqaa\' (إِلَى اللِّقَاءِ)'
    ],
    correct: 0,
    explanation: 'Jawaban dari sapaan pagi "Shabaahal khair" (Selamat pagi) adalah "Shabaahan nuur" (Selamat pagi penuh cahaya).'
  },
  {
    id: 'arab_06',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Terjemahan bahasa Arab dari kata "Guru laki-laki" dan "Murid laki-laki" secara berturut-turut adalah...',
    options: [
      'Mudarrisun (مُدَرِّسٌ) dan Tilmiidzun (تِلْمِيْذٌ)',
      'Thabiibun (طَبِيْبٌ) dan Fallahun (فَلَّاحٌ)',
      'Muhandisun (مُهَنْدِسٌ) dan Syurthiyyun (شُرْطِيٌّ)',
      'Taajirun (تَاجِرٌ) dan Saa\'iqun (سَائِقٌ)'
    ],
    correct: 0,
    explanation: 'Mudarrisun (مُدَرِّسٌ) artinya bapak guru, dan Tilmiidzun (تِلْمِيْذٌ) artinya murid/santri.'
  },
  {
    id: 'arab_07',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Bilangan angka lima (5) dan sembilan (9) dalam bahasa Arab adalah...',
    arabicPrompt: 'الْأَعْدَادُ الْعَرَبِيَّةُ',
    options: [
      'Khamsah (خَمْسَةٌ) dan Tis\'ah (تِسْعَةٌ)',
      'Wahid (وَاحِدٌ) dan Sab\'ah (سَبْعَةٌ)',
      'Arba\'ah (أَرْبَعَةٌ) dan \'Asyarah (عَشَرَةٌ)',
      'Tsalatsah (ثَلَاثَةٌ) dan Tsamaniyah (ثَمَانِيَةٌ)'
    ],
    correct: 0,
    explanation: 'Khamsah (خَمْسَةٌ) = 5, Tis\'ah (تِسْعَةٌ) = 9.'
  },
  {
    id: 'arab_08',
    subjectKey: 'arab',
    subject: 'Bahasa Arab',
    category: 'kemenag',
    q: 'Isim Isyarah (kata tunjuk dekat) untuk benda muannats (perempuan/yang diakhiri ta marbuthah) adalah...',
    options: [
      'Hadzihi (هَذِهِ)',
      'Hadza (هَذَا)',
      'Dzalika (ذَلِكَ)',
      'Tilka (تِلْكَ)'
    ],
    correct: 0,
    explanation: 'Hadzihi (هَذِهِ) digunakan untuk menunjuk benda dekat berjenis muannats, contohnya "هَذِهِ حَقِيْبَةٌ" (Ini tas).'
  },

  // ================= SEJARAH KEBUDAYAAN ISLAM (SKI) =================
  {
    id: 'ski_01',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Khalifah dari Khulafaur Rasyidin yang memprakarsai pengumpulan dan pembukuan lembaran Al-Qur\'an menjadi satu mushaf atas usulan Umar bin Khattab adalah...',
    options: [
      'Abu Bakar Ash-Shiddiq r.a.',
      'Utsman bin Affan r.a.',
      'Ali bin Abi Thalib r.a.',
      'Muawiyah bin Abu Sufyan'
    ],
    correct: 0,
    explanation: 'Setelah gugurnya banyak penghafal Al-Qur\'an pada Perang Yamamah, Umar mengusulkan kepada Khalifah Abu Bakar Ash-Shiddiq untuk mengumpulkan lembaran ayat Al-Qur\'an menjadi satu mushaf, yang dipimpin oleh Zaid bin Tsabit.'
  },
  {
    id: 'ski_02',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Nama kota tujuan hijrah Nabi Muhammad SAW dan kaum muslimin Makkah yang semula bernama Yatsrib kemudian diubah namanya menjadi...',
    options: [
      'Madinah Al-Munawwarah (Kota yang Bercahaya)',
      'Thaif Al-Khadra',
      'Kufah',
      'Damaskus'
    ],
    correct: 0,
    explanation: 'Rasulullah SAW mengganti nama kota Yatsrib menjadi Madinatur Rasul atau Madinah Al-Munawwarah yang bermakna Kota yang penuh pancaran cahaya peradaban.'
  },
  {
    id: 'ski_03',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Perang besar pertama antara kaum muslimin Madinah melawan kaum kafir Quraisy Makkah yang terjadi pada tanggal 17 Ramadhan tahun 2 Hijriyah adalah...',
    options: [
      'Perang Badar Al-Kubra',
      'Perang Uhud',
      'Perang Khandaq (Ahzab)',
      'Perang Hunain'
    ],
    correct: 0,
    explanation: 'Perang Badar terjadi pada 17 Ramadhan tahun ke-2 H. Pasukan muslimin berjumlah 313 orang dengan pertolongan Allah berhasil meraih kemenangan atas 1000 pasukan Quraisy.'
  },
  {
    id: 'ski_04',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Piagam Madinah yang disusun oleh Rasulullah SAW di Madinah merupakan piagam perjanjian penting yang bertujuan untuk...',
    options: [
      'Menyatukan dan mengatur kerukunan hidup bersama antara kaum Muhajirin, Anshar, serta kaum Yahudi Madinah',
      'Membagi harta rampasan perang secara merata',
      'Mewajibkan seluruh penduduk Madinah untuk berperang ke luar jazirah Arab',
      'Menghukum kaum kafir Quraisy yang ada di Makkah'
    ],
    correct: 0,
    explanation: 'Piagam Madinah (Shahifatul Madinah) adalah konstitusi tertulis pertama di dunia yang menjamin hak asasi, kebebasan beragama, dan persatuan warga Madinah dalam membela kota.'
  },
  {
    id: 'ski_05',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Sahabat Nabi Muhammad SAW yang mendapat gelar "Dzun Nurain" (Pemilik Dua Cahaya) karena menikahi dua putri Rasulullah secara berurutan adalah...',
    options: [
      'Utsman bin Affan r.a.',
      'Ali bin Abi Thalib r.a.',
      'Umar bin Khattab r.a.',
      'Zubair bin Awwam r.a.'
    ],
    correct: 0,
    explanation: 'Utsman bin Affan r.a. bergelar Dzun Nurain karena menikahi putri Rasulullah, Sayyidah Ruqayyah, dan setelah Ruqayyah wafat beliau menikahi Sayyidah Ummu Kultsum.'
  },
  {
    id: 'ski_06',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Peristiwa pembebasan kota Makkah oleh Rasulullah SAW bersama 10.000 pasukan muslimin tanpa pertumpahan darah pada tahun 8 Hijriyah dikenal dengan...',
    options: [
      'Fathu Makkah',
      'Perjanjian Hudaibiyah',
      'Haji Wada\'',
      'Isra\' Mi\'raj'
    ],
    correct: 0,
    explanation: 'Fathu Makkah (Kemenangan Agung Makkah) terjadi pada tahun 8 H. Rasulullah memaafkan penduduk Makkah dan membersihkan Ka\'bah dari berhala-berhala.'
  },
  {
    id: 'ski_07',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Kaum muslimin Madinah yang dengan tulus menyambut, menolong, dan membagikan tempat tinggal serta hartanya kepada kaum Muhajirin Makkah disebut kaum...',
    options: [
      'Kaum Anshar',
      'Kaum Quraisy',
      'Kaum Khazraj',
      'Kaum Aus'
    ],
    correct: 0,
    explanation: 'Kaum Anshar (para penolong) adalah penduduk asli Madinah yang menerima dan menolong saudara mereka kaum Muhajirin yang berhijrah dari Makkah.'
  },
  {
    id: 'ski_08',
    subjectKey: 'ski',
    subject: 'Sejarah Kebudayaan Islam',
    category: 'kemenag',
    q: 'Gelar kehormatan "Al-Faruq" (Pembeda antara yang haq dan yang bathil) diberikan oleh Rasulullah SAW kepada sahabat...',
    options: [
      'Umar bin Khattab r.a.',
      'Abu Bakar Ash-Shiddiq r.a.',
      'Ali bin Abi Thalib r.a.',
      'Bilal bin Rabah r.a.'
    ],
    correct: 0,
    explanation: 'Umar bin Khattab r.a. bergelar Al-Faruq karena ketegasannya dalam membedakan antara kebenaran Islam dan kebatilan kekufuran.'
  },

  // ================= MATEMATIKA =================
  {
    id: 'mtk_01',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Hasil dari operasi penjumlahan pecahan 3/4 + 1/2 adalah...',
    options: [
      '4/6 (atau 2/3)',
      '5/4 (atau 1 1/4)',
      '4/8 (atau 1/2)',
      '7/4 (atau 1 3/4)'
    ],
    correct: 1,
    explanation: 'Samakan penyebut menjadi 4: 1/2 = 2/4. Maka 3/4 + 2/4 = 5/4 = 1 1/4.'
  },
  {
    id: 'mtk_02',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Sebuah ruang kelas di MI Darul Ulum Sidareja berbentuk persegi panjang dengan panjang 12 meter dan lebar 8 meter. Luas lantai ruang kelas tersebut adalah...',
    options: [
      '40 meter persegi',
      '80 meter persegi',
      '96 meter persegi',
      '120 meter persegi'
    ],
    correct: 2,
    explanation: 'Rumus luas persegi panjang adalah Panjang × Lebar. Maka 12 meter × 8 meter = 96 meter persegi.'
  },
  {
    id: 'mtk_03',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Jarak antara MI Darul Ulum Sidareja dengan Kantor Kecamatan pada peta adalah 4 cm. Jika skala peta adalah 1 : 50.000, maka jarak sebenarnya di lapangan adalah...',
    options: [
      '200 meter',
      '2 kilometer',
      '20 kilometer',
      '0,2 kilometer'
    ],
    correct: 1,
    explanation: 'Jarak sebenarnya = Jarak pada peta × Skala = 4 cm × 50.000 = 200.000 cm = 2.000 meter = 2 kilometer.'
  },
  {
    id: 'mtk_04',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Faktor Persekutuan Terbesar (FPB) dari bilangan 24 dan 36 adalah...',
    options: [
      '6',
      '12',
      '18',
      '72'
    ],
    correct: 1,
    explanation: 'Faktorisasi prima 24 = 2³ × 3. Faktorisasi prima 36 = 2² × 3². FPB diambil faktor sama dengan pangkat terkecil: 2² × 3 = 4 × 3 = 12.'
  },
  {
    id: 'mtk_05',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Hasil dari operasi hitung campuran: (-15) + (25 × 2) - 10 adalah...',
    options: [
      '15',
      '25',
      '35',
      '45'
    ],
    correct: 1,
    explanation: 'Dahulukan perkalian: 25 × 2 = 50. Kemudian (-15) + 50 = 35. Lalu 35 - 10 = 25.'
  },
  {
    id: 'mtk_06',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Sebuah kolam wudhu berbentuk kubus memiliki panjang rusuk bagian dalam 10 dm (1 meter). Volume air maksimal kolam wudhu tersebut adalah...',
    options: [
      '100 liter',
      '600 liter',
      '1.000 liter',
      '10.000 liter'
    ],
    correct: 2,
    explanation: 'Volume kubus = s × s × s = 10 dm × 10 dm × 10 dm = 1.000 dm³ = 1.000 liter (karena 1 dm³ = 1 liter).'
  },
  {
    id: 'mtk_07',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Keliling sebuah lapangan madrasah yang berbentuk persegi dengan panjang sisi 25 meter adalah...',
    options: [
      '50 meter',
      '75 meter',
      '100 meter',
      '625 meter'
    ],
    correct: 2,
    explanation: 'Keliling persegi = 4 × sisi = 4 × 25 meter = 100 meter.'
  },
  {
    id: 'mtk_08',
    subjectKey: 'matematika',
    subject: 'Matematika',
    category: 'umum',
    q: 'Nilai ulangan matematika Fatimah adalah 80, 85, 90, dan 95. Nilai rata-rata (mean) dari keempat ulangan tersebut adalah...',
    options: [
      '85',
      '87,5',
      '90',
      '92,5'
    ],
    correct: 1,
    explanation: 'Rata-rata = (80 + 85 + 90 + 95) / 4 = 350 / 4 = 87,5.'
  },

  // ================= IPAS (SAINS & SOSIAL) =================
  {
    id: 'ipas_01',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Pada rantai makanan di ekosistem sawah madrasah, peran tanaman padi adalah sebagai...',
    options: [
      'Konsumen tingkat 1 (Herbivora)',
      'Pengurai (Dekomposer)',
      'Produsen (Autotrof yang menghasilkan makanan sendiri)',
      'Konsumen puncak (Karnivora)'
    ],
    correct: 2,
    explanation: 'Padi berperan sebagai produsen karena memiliki klorofil dan mampu melakukan fotosintesis menghasilkan zat makanan sendiri (autotrof) dengan bantuan cahaya matahari.'
  },
  {
    id: 'ipas_02',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Munculnya titik-titik air di dinding luar gelas yang berisi es teh manis merupakan contoh peristiwa perubahan wujud benda yaitu...',
    options: [
      'Mengembun (Kondensasi gas uap air menjadi cair)',
      'Menyublim (Padat menjadi gas)',
      'Membeku (Cair menjadi padat)',
      'Menguap (Cair menjadi gas)'
    ],
    correct: 0,
    explanation: 'Mengembun adalah perubahan wujud dari gas ke cair. Udara di sekitar gelas yang hangat bersentuhan dengan dinding gelas dingin sehingga uap air di udara terkondensasi menjadi butiran air.'
  },
  {
    id: 'ipas_03',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Organ pernapasan pada manusia yang di dalamnya terdapat alveolus sebagai tempat terjadinya pertukaran gas oksigen (O2) dan karbon dioksida (CO2) adalah...',
    options: [
      'Tenggorokan (Trakea)',
      'Hidung dan Rongga Sinus',
      'Paru-paru (Pulmo)',
      'Kerongkongan (Esofagus)'
    ],
    correct: 2,
    explanation: 'Paru-paru memiliki gelembung-gelembung halus bernama alveolus yang diselimuti pembuluh darah kapiler tempat difusi pertukaran gas O2 dengan CO2.'
  },
  {
    id: 'ipas_04',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Buah kelapa yang matang jatuh dari pohonnya menuju ke permukaan tanah disebabkan oleh adanya pengaruh gaya...',
    options: [
      'Gaya Gesek udara',
      'Gaya Magnet bumi',
      'Gaya Gravitasi bumi',
      'Gaya Pegas'
    ],
    correct: 2,
    explanation: 'Gaya gravitasi bumi adalah gaya tarik bumi yang menarik setiap benda bermassa menuju ke pusat bumi sehingga benda yang jatuh akan mengarah ke bawah.'
  },
  {
    id: 'ipas_05',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Bagian tumbuhan yang berfungsi menyerap air dan garam-garam mineral dari dalam tanah serta memperkokoh berdirinya tanaman adalah...',
    options: [
      'Akar (Radix)',
      'Batang (Caulis)',
      'Daun (Folium)',
      'Bunga (Flos)'
    ],
    correct: 0,
    explanation: 'Akar memiliki bulu-bulu akar yang berfungsi menyerap air dan zat hara mineral dari dalam tanah untuk disalurkan ke daun melalui pembuluh xilem.'
  },
  {
    id: 'ipas_06',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Contoh sumber daya energi terbarukan yang ramah lingkungan dan tidak akan habis jika dimanfaatkan secara terus menerus adalah...',
    options: [
      'Minyak bumi dan bensin',
      'Batu bara dan gas alam',
      'Sinar matahari, angin, dan aliran air',
      'Bahan bakar solar'
    ],
    correct: 2,
    explanation: 'Energi terbarukan seperti tenaga surya (matahari), angin, air, dan panas bumi selalu tersedia secara alami dan tidak menghasilkan polusi gas emisi.'
  },
  {
    id: 'ipas_07',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Tumbuhan kaktus mampu bertahan hidup di padang pasir yang sangat kering dan panas karena bentuk adaptasi morfologinya berupa...',
    options: [
      'Daun berbentuk duri untuk mengurangi penguapan air dan batang tebal penyimpan air',
      'Akar pendek dan daun sangat lebar',
      'Batang yang berongga dan bunganya selalu mekar di siang hari',
      'Menggugurkan daunnya di musim hujan'
    ],
    correct: 0,
    explanation: 'Kaktus beradaptasi di habitat xerofit dengan memodifikasi daunnya menjadi duri halus guna mencegah penguapan dan batang berlilin untuk menampung cadangan air.'
  },
  {
    id: 'ipas_08',
    subjectKey: 'ipas',
    subject: 'IPAS (Sains & Sosial)',
    category: 'umum',
    q: 'Kerajaan Islam pertama di pulau Jawa yang didirikan oleh Raden Patah dengan bantuan para Wali Songo adalah...',
    options: [
      'Kesultanan Demak Bintoro',
      'Kesultanan Mataram Islam',
      'Kesultanan Banten',
      'Kesultanan Cirebon'
    ],
    correct: 0,
    explanation: 'Kesultanan Demak didirikan pada akhir abad ke-15 oleh Raden Patah dengan dukungan Wali Songo sebagai pusat penyebaran Islam pertama di pulau Jawa.'
  },

  // ================= BAHASA INDONESIA =================
  {
    id: 'indo_01',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Gagasan pokok atau pesan utama yang menjadi dasar pengembangan sebuah paragraf disebut...',
    options: [
      'Ide pokok / Gagasan utama',
      'Kalimat penjelas',
      'Kata penghubung (konjungsi)',
      'Kesimpulan penutup'
    ],
    correct: 0,
    explanation: 'Ide pokok (gagasan utama) adalah inti pembahasan dalam suatu paragraf yang biasanya dituangkan dalam kalimat utama dan diperjelas oleh kalimat-kalimat pengembang.'
  },
  {
    id: 'indo_02',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Manakah penulisan kalimat yang menggunakan huruf kapital secara tepat sesuai Pedoman Umum Ejaan Bahasa Indonesia (PUEBI)?',
    options: [
      'setiap hari senin, kami upacara bendera di mi darul ulum sidareja.',
      'Setiap hari Senin, kami upacara bendera di MI Darul Ulum Sidareja.',
      'Setiap Hari senin, kami Upacara bendera Di MI darul ulum.',
      'setiap Hari Senin, Kami upacara bendera di Mi Darul Ulum.'
    ],
    correct: 1,
    explanation: 'Huruf kapital digunakan pada awal kalimat, nama hari (Senin), serta nama resmi lembaga/sekolah (MI Darul Ulum Sidareja).'
  },
  {
    id: 'indo_03',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Teks yang berisi pemaparan tentang fakta-fakta proses terjadinya suatu fenomena alam atau fenomena sosial (seperti proses terjadinya pelangi atau gempa) disebut teks...',
    options: [
      'Teks Dongeng / Fabel',
      'Teks Eksplanasi Ilmiah',
      'Teks Narasi Fiksi',
      'Teks Puisi Bebas'
    ],
    correct: 1,
    explanation: 'Teks eksplanasi adalah teks yang menjelaskan sebab-akibat proses terjadinya fenomena alam, sosial, ilmu pengetahuan, atau budaya dengan struktur pernyataan umum, deretan penjelas, dan simpulan.'
  },
  {
    id: 'indo_04',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Manakah di bawah ini kelompok kata yang semuanya merupakan KATA BAKU sesuai Kamus Besar Bahasa Indonesia (KBBI)?',
    options: [
      'Izin, Praktik, Jadwal, Antre',
      'Ijin, Praktek, Jadual, Antri',
      'Ijin, Praktik, Jadwal, Antri',
      'Izin, Praktek, Jadual, Antre'
    ],
    correct: 0,
    explanation: 'Bentuk baku yang benar adalah: izin (bukan ijin), praktik (bukan praktek), jadwal (bukan jadual), dan antre (bukan antri).'
  },
  {
    id: 'indo_05',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Kata penghubung (konjungsi) yang digunakan untuk menyatakan hubungan sebab-akibat dalam kalimat adalah...',
    options: [
      'Karena dan sehingga',
      'Atau dan jika',
      'Tetapi dan melainkan',
      'Sambil dan seraya'
    ],
    correct: 0,
    explanation: 'Konjungsi kausalitas (sebab-akibat) menghubungkan peristiwa penyebab dengan akibat yang timbul, seperti kata "karena", "sebab", "sehingga", dan "akibatnya".'
  },
  {
    id: 'indo_06',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Dongeng yang tokoh-tokoh utamanya diperankan oleh hewan yang memiliki sifat dan perilaku seperti manusia dinamakan...',
    options: [
      'Fabel',
      'Mite (Mitos)',
      'Legenda',
      'Sage'
    ],
    correct: 0,
    explanation: 'Fabel adalah cerita fiksi yang mendidik dengan tokoh binatang yang dapat berbicara dan bertindak seperti manusia, mengandung pesan moral bagi anak-anak.'
  },
  {
    id: 'indo_07',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Kalimat berikut yang merupakan kalimat saran yang santun untuk teman sekelas adalah...',
    options: [
      'Sebaiknya kamu belajar lebih giat agar nilai evaluasimu meningkat.',
      'Kamu harus belajar sekarang juga tanpa alasan!',
      'Jangan malas kamu, bikin malu kelas saja!',
      'Terserah kamu mau belajar atau tidak.'
    ],
    correct: 0,
    explanation: 'Kalimat saran santun ditandai oleh kata-kata rekomendasi yang lembut seperti "sebaiknya", "seharusnya", atau "alangkah baiknya".'
  },
  {
    id: 'indo_08',
    subjectKey: 'indo',
    subject: 'Bahasa Indonesia',
    category: 'umum',
    q: 'Antonim (lawan kata) dari kata "Jujur" dan "Hemat" berturut-turut adalah...',
    options: [
      'Dusta (Bohong) dan Boros',
      'Rajin dan Cermat',
      'Pintar dan Kikir',
      'Sopan dan Irit'
    ],
    correct: 0,
    explanation: 'Antonim adalah perlawanan arti kata: lawan kata jujur adalah dusta/bohong, dan lawan kata hemat adalah boros.'
  },

  // ================= PENDIDIKAN PANCASILA =================
  {
    id: 'pancasila_01',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Sikap santri madrasah yang menghormati keragaman suku, bahasa daerah, dan tidak membeda-bedakan teman di kelas merupakan pengamalan Pancasila sila ke-...',
    options: [
      'Sila ke-1: Ketuhanan Yang Maha Esa',
      'Sila ke-2: Kemanusiaan yang Adil dan Beradab',
      'Sila ke-3: Persatuan Indonesia',
      'Sila ke-5: Keadilan Sosial bagi Seluruh Rakyat Indonesia'
    ],
    correct: 2,
    explanation: 'Menjaga kerukunan, persatuan, toleransi, dan tidak membeda-bedakan latar belakang sesama teman mencerminkan pengamalan Sila ke-3: Persatuan Indonesia.'
  },
  {
    id: 'pancasila_02',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Ketika kelas 5 MI Darul Ulum Sidareja mengadakan pemilihan ketua kelas, keputusan terbaik diambil melalui cara...',
    options: [
      'Ditentukan sepihak oleh siswa yang paling pintar',
      'Musyawarah mufakat atau pemungutan suara (voting) secara adil',
      'Dipilih berdasarkan siapa yang membawa uang jajan paling banyak',
      'Ditunjuk secara acak tanpa kesepakatan bersama'
    ],
    correct: 1,
    explanation: 'Pengambilan keputusan bersama di lingkungan madrasah harus didasarkan pada musyawarah mufakat atau voting adil sesuai pengamalan Sila ke-4 Pancasila.'
  },
  {
    id: 'pancasila_03',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Semboyan negara Indonesia "Bhinneka Tunggal Ika" yang tertulis pada pita burung Garuda Pancasila memiliki arti...',
    options: [
      'Berbeda-beda tetapi tetap satu jua',
      'Bersatu kita teguh bercerai kita runtuh',
      'Maju terus pantang mundur',
      'Negara makmur rakyat sejahtera'
    ],
    correct: 0,
    explanation: 'Bhinneka Tunggal Ika berasal dari Kitab Sutasoma karangan Mpu Tantular yang bermakna meskipun bangsa Indonesia terdiri dari beragam suku, agama, dan budaya, namun tetap satu kesatuan utuh.'
  },
  {
    id: 'pancasila_04',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Kewajiban utama seorang santri ketika berada di lingkungan madrasah adalah...',
    options: [
      'Menaati tata tertib madrasah, menghormati guru, dan menjaga fasilitas belajar',
      'Menuntut nilai sempurna tanpa belajar',
      'Bermain di kantin sepanjang jam pelajaran',
      'Menyerahkan semua tugas kepada orang tua'
    ],
    correct: 0,
    explanation: 'Kewajiban siswa meliputi mematuhi tata tertib, hadir tepat waktu, menghormati ustadz/ustadzah, dan menjaga kebersihan kelas.'
  },
  {
    id: 'pancasila_05',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Simbol lambang sila ke-2 Pancasila "Kemanusiaan yang Adil dan Beradab" adalah...',
    options: [
      'Bintang Emas',
      'Rantai Emas',
      'Pohon Beringin',
      'Kepala Banteng'
    ],
    correct: 1,
    explanation: 'Sila ke-1 Bintang, Sila ke-2 Rantai Emas (mata rantai bulat dan persegi melambangkan hubungan timbal balik persaudaraan manusia), Sila ke-3 Pohon Beringin, Sila ke-4 Kepala Banteng, Sila ke-5 Padi dan Kapas.'
  },
  {
    id: 'pancasila_06',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Sikap toleransi antarumat beragama yang paling tepat ditunjukkan dengan cara...',
    options: [
      'Memberikan kebebasan dan rasa aman kepada pemeluk agama lain untuk beribadah sesuai keyakinannya',
      'Memaksa teman agar mengikuti agama kita',
      'Mengganggu teman yang sedang beribadah',
      'Melarang perayaan hari besar agama orang lain'
    ],
    correct: 0,
    explanation: 'Toleransi beragama tercermin dalam sikap saling menghargai, menjaga ketenangan ibadah tetangga dan teman, tanpa saling mencampuri urusan akidah masing-masing (lakum diinukum waliyadiin).'
  },
  {
    id: 'pancasila_07',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Norma yang bersumber dari hati nurani manusia yang mendorong untuk selalu berbuat baik dan merasa bersalah jika berbuat jahat disebut norma...',
    options: [
      'Norma Kesusilaan / Hati Nurani',
      'Norma Kesopanan',
      'Norma Hukum Pidana',
      'Norma Kebiasaan Adat'
    ],
    correct: 0,
    explanation: 'Norma kesusilaan bersumber dari suara hati nurani manusia, sanksinya adalah penyesalan diri dan rasa bersalah mendalam jika melanggarnya.'
  },
  {
    id: 'pancasila_08',
    subjectKey: 'pancasila',
    subject: 'Pendidikan Pancasila',
    category: 'umum',
    q: 'Gotong royong membersihkan mushola dan halaman madrasah setiap hari Jumat merupakan penerapan nilai Pancasila yang melatih santri untuk memiliki sikap...',
    options: [
      'Kepedulian, kebersamaan, dan rasa tanggung jawab sosial',
      'Sikap individualis dan pamrih',
      'Mencari pujian dari kepala madrasah',
      'Menghindari jam belajar di kelas'
    ],
    correct: 0,
    explanation: 'Tradisi gotong royong memupuk rasa persaudaraan, meringankan beban bersama, dan menanamkan kepedulian terhadap lingkungan.'
  },

  // ================= SENI BUDAYA & KALIGRAFI =================
  {
    id: 'sbdp_01',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Jenis khat kaligrafi Arab yang paling sering digunakan untuk penulisan mushaf Al-Qur\'an dan buku pelajaran madrasah karena karakternya yang jelas dan mudah dibaca adalah...',
    arabicPrompt: 'خَطُّ النَّسْخِ الْعَرَبِيُّ',
    options: [
      'Khat Kufi',
      'Khat Naskhi',
      'Khat Riq\'ah',
      'Khat Diwani'
    ],
    correct: 1,
    explanation: 'Khat Naskhi adalah jenis tulisan kaligrafi Arab yang paling umum dipakai menyalin Al-Qur\'an dan buku pelajaran karena bentuk hurufnya yang luwes, jelas, dan mudah dipelajari oleh santri.'
  },
  {
    id: 'sbdp_02',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Karya seni rupa yang dibuat dengan cara menempelkan pecahan atau potongan bahan seperti biji-bijian, cangkang telur, atau potongan kertas warna-warni pada bidang gambar disebut teknik...',
    options: [
      'Kolase / Mozaik',
      'Anyaman',
      'Pahat Ukir',
      'Sablon Digital'
    ],
    correct: 0,
    explanation: 'Kolase dan mozaik adalah teknik menempel potongan-potongan bahan (seperti biji-bijian atau pecahan kertas) pada pola gambar untuk menghasilkan tekstur dan warna artistik.'
  },
  {
    id: 'sbdp_03',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Lagu mars madrasah yang dinyanyikan dengan ketukan yang tegas, semangat, dan berirama 4/4 bertempo marcia bertujuan untuk...',
    options: [
      'Membangkitkan semangat belajar, kebanggaan, dan cinta pada madrasah',
      'Menidurkan santri di kelas',
      'Menghibur penonton pertunjukan sulap',
      'Mengurangi rasa lapar di siang hari'
    ],
    correct: 0,
    explanation: 'Lagu mars bertempo marcia dinyanyikan dengan penuh ketegasan dan semangat membara untuk memupuk patriotisme dan kecintaan santri terhadap madrasah.'
  },
  {
    id: 'sbdp_04',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Alat musik tradisional Jawa Tengah seperti gamelan yang dimainkan dengan cara dipukul untuk mengiringi tembang macapat di antaranya adalah...',
    options: [
      'Saron, Bonang, dan Gong',
      'Gitar dan Biola',
      'Pianika dan Rekorder',
      'Harmonika dan Terompet'
    ],
    correct: 0,
    explanation: 'Gamelan Jawa terdiri dari instrumen perkusi bilah perunggu/besi seperti Saron, Bonang, Kenong, dan Gong yang dipukul dengan tabuh khusus.'
  },
  {
    id: 'sbdp_05',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Warna primer (warna pokok) dalam seni rupa yang tidak dapat dihasilkan dari campuran warna lain adalah...',
    options: [
      'Merah, Kuning, dan Biru',
      'Hijau, Oranye, dan Ungu',
      'Hitam, Putih, dan Abu-abu',
      'Cokelat dan Emas'
    ],
    correct: 0,
    explanation: 'Warna primer adalah Merah, Kuning, dan Biru. Pencampuran warna primer akan menghasilkan warna sekunder (seperti merah + kuning = oranye, biru + kuning = hijau).'
  },
  {
    id: 'sbdp_06',
    subjectKey: 'sbdp',
    subject: 'Seni Budaya & Kaligrafi',
    category: 'umum',
    q: 'Dalam seni tari tradisional, gerakan tangan dan langkah kaki santri yang selaras dengan tempo ketukan musik pengiring disebut telah memenuhi unsur...',
    options: [
      'Wirama (Irama)',
      'Wiraga (Raga fisik)',
      'Wirasa (Penghayatan rasa)',
      'Kostum busana'
    ],
    correct: 0,
    explanation: 'Wirama adalah keselarasan antara gerak tari dengan ritme, tempo, dan ketukan musik pengiring tari.'
  }
];

/**
 * Deterministically shuffles questions for a specific student and subject.
 * - When subjectKey is 'all', selects 30 balanced questions across all subjects.
 * - When subjectKey is a specific subject, selects all questions for that subject.
 * All students receive the exact same questions for that subject, but uniquely
 * randomized in order/number per student identifier.
 */
export function getShuffledQuestionsForStudent(
  studentNisOrId: string,
  sessionSalt: number = 0,
  subjectKey: string = 'all'
): CbtQuestionItem[] {
  let pool: CbtQuestionItem[] = [];

  if (!subjectKey || subjectKey === 'all') {
    // For 'all', we take a balanced set of 30 questions (3 from each subject)
    const subjects = ['fikih', 'qurdis', 'aqidah', 'arab', 'ski', 'matematika', 'ipas', 'indo', 'pancasila', 'sbdp'];
    subjects.forEach((subj) => {
      const match = masterCbtQuestions.filter((q) => q.subjectKey === subj);
      pool.push(...match.slice(0, 3));
    });
    // Ensure we have 30 questions
    if (pool.length < 30) {
      const remaining = masterCbtQuestions.filter((q) => !pool.includes(q));
      pool.push(...remaining.slice(0, 30 - pool.length));
    }
  } else {
    pool = masterCbtQuestions.filter((q) => q.subjectKey === subjectKey);
    // Fallback if none matched
    if (pool.length === 0) {
      pool = [...masterCbtQuestions];
    }
  }

  // Compute positive 32-bit integer hash from student identifier, subject, and salt
  let seedHash = 0;
  const str = `${studentNisOrId}_${subjectKey}_${sessionSalt}`;
  for (let i = 0; i < str.length; i++) {
    seedHash = (seedHash << 5) - seedHash + str.charCodeAt(i);
    seedHash |= 0;
  }
  let seed = Math.abs(seedHash) || 12345;

  // Linear congruential pseudo-random generator strictly yielding [0, 1)
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return Math.abs(seed) / 233280;
  };

  // Shallow copy and Fisher-Yates shuffle with strictly bounded positive indices
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    if (j >= 0 && j <= i) {
      const temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
  }

  return shuffled.filter(Boolean).map((item, idx) => ({
    ...item,
    number: idx + 1
  }));
}
