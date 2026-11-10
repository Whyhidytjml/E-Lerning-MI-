export interface CbtQuestionItem {
  id: string;
  number?: number;
  subject: string;
  category: 'kemenag' | 'umum';
  q: string;
  arabicPrompt?: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const masterCbtQuestions: CbtQuestionItem[] = [
  {
    id: 'cbt_01',
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
    id: 'cbt_02',
    subject: 'IPAS (Sains)',
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
    id: 'cbt_03',
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
    id: 'cbt_04',
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
    id: 'cbt_05',
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
    id: 'cbt_06',
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
    id: 'cbt_07',
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
    id: 'cbt_08',
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
    id: 'cbt_09',
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
    id: 'cbt_10',
    subject: 'PJOK & Kebugaran',
    category: 'umum',
    q: 'Tujuan utama melakukan gerakan pemanasan (stretching) sebelum melakukan aktivitas olahraga di madrasah adalah...',
    options: [
      'Mempercepat rasa lelah agar cepat istirahat',
      'Menaikkan suhu tubuh dan mencegah terjadinya kram serta cedera otot',
      'Menghabiskan waktu jam pelajaran olahraga',
      'Menurunkan detak jantung secara drastis'
    ],
    correct: 1,
    explanation: 'Pemanasan bertujuan melenturkan otot, melancarkan sirkulasi darah, menaikkan suhu tubuh secara bertahap, dan meminimalkan risiko cedera atau kram sendi.'
  },
  {
    id: 'cbt_11',
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
    id: 'cbt_12',
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
    explanation: 'Rukun wudhu ada 6: Niat membasuh muka, membasuh muka, membasuh kedua tangan sampai siku, mengusap sebagian kepala, membasuh kedua kaki sampai mata kaki, dan tertib. Basmalah, cuci tangan, dan kumur-kumur adalah sunnah wudhu.'
  },
  {
    id: 'cbt_13',
    subject: 'IPAS (Sains)',
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
    id: 'cbt_14',
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
    id: 'cbt_15',
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
    id: 'cbt_16',
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
    id: 'cbt_17',
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
    id: 'cbt_18',
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
    id: 'cbt_19',
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
    id: 'cbt_20',
    subject: 'IPAS (Sains)',
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
    id: 'cbt_21',
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
    id: 'cbt_22',
    subject: 'Fikih Ibadah',
    category: 'kemenag',
    q: 'Kewajiban mengeluarkan zakat fitrah bagi setiap jiwa muslim pada bulan Ramadhan adalah sebesar...',
    options: [
      '1 sha\' atau setara 2,5 kg (3,5 liter) makanan pokok',
      '5 kg makanan pokok atau beras',
      '1/2 sha\' atau setara 1,5 kg beras',
      '2 sha\' atau setara 5 kg beras'
    ],
    correct: 0,
    explanation: 'Kadar zakat fitrah yang wajib dikeluarkan per jiwa muslim adalah satu sha\' (sekitar 2,5 kg atau 3,5 liter) makanan pokok di daerah masing-masing, seperti beras di Indonesia.'
  },
  {
    id: 'cbt_23',
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
    id: 'cbt_24',
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
    id: 'cbt_25',
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
    id: 'cbt_26',
    subject: 'IPAS (Sains)',
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
    id: 'cbt_27',
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
    id: 'cbt_28',
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
    id: 'cbt_29',
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
    id: 'cbt_30',
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
  }
];

/**
 * Deterministically shuffles the master questions for a specific student
 * so that all students receive the exact same 20 questions, but with randomized
 * question numbers/orders.
 */
export function getShuffledQuestionsForStudent(
  studentNisOrId: string,
  sessionSalt: number = 0
): CbtQuestionItem[] {
  // Compute integer hash from student identifier
  let seed = 0;
  const str = `${studentNisOrId}_${sessionSalt}`;
  for (let i = 0; i < str.length; i++) {
    seed = (seed << 5) - seed + str.charCodeAt(i);
    seed |= 0;
  }

  // Linear congruential pseudo-random generator
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Shallow copy and Fisher-Yates shuffle
  const shuffled = [...masterCbtQuestions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.map((item, idx) => ({
    ...item,
    number: idx + 1
  }));
}
