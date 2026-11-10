import React, { useState, useEffect } from 'react';
import { 
  mockMadrasahStats, 
  mockStudents, 
  mockTeachers, 
  mockSubjects, 
  mockAnnouncements,
  mockClassMappings,
  mockRDMGrades,
  mockUserAccounts
} from '../../data/mockData';
import { Student, Teacher, Subject, MadrasahAnnouncement, ClassMapping, RDMGradeRecord, UserAccount } from '../../types/lms';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { getStoredSubjects, saveStoredSubjects, SUBJECTS_UPDATED_EVENT } from '../../utils/subjectsStorage';
import { getStoredTeachers, saveStoredTeachers, TEACHERS_UPDATED_EVENT } from '../../utils/teachersStorage';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  CheckCircle2, 
  Download, 
  Building2, 
  MapPin, 
  FileSpreadsheet, 
  Award, 
  Layers, 
  Check, 
  Calendar, 
  X,
  FileCheck2,
  Table,
  Trash2,
  RefreshCw,
  Save,
  Compass,
  Sparkles,
  HeartHandshake,
  Languages,
  Calculator,
  Feather,
  Globe,
  Activity,
  Trophy
} from 'lucide-react';

interface AdminDashboardProps {
  initialTab?: 'rekap' | 'admin_pengguna' | 'admin_pemetaan' | 'admin_rdm' | 'pengumuman';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialTab = 'rekap' }) => {
  const [activeTab, setActiveTab] = useState<'rekap' | 'admin_pengguna' | 'admin_pemetaan' | 'admin_rdm' | 'pengumuman'>(initialTab);
  const [userSubTab, setUserSubTab] = useState<'siswa' | 'guru' | 'akun'>('siswa');
  const [mappingSubTab, setMappingSubTab] = useState<'mapel' | 'rombel'>('mapel');

  // Load students from localStorage or fallback to mockStudents
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('madrasahku_students');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error loading students from localStorage:', e);
    }
    return mockStudents;
  });

  // Load subjects from localStorage or fallback to mockSubjects
  const [subjects, setSubjects] = useState<Subject[]>(() => getStoredSubjects());

  const [teachers, setTeachers] = useState<Teacher[]>(() => getStoredTeachers());
  const [classMappings, setClassMappings] = useState<ClassMapping[]>(mockClassMappings);
  const [rdmGrades, setRdmGrades] = useState<RDMGradeRecord[]>(mockRDMGrades);
  const [announcements, setAnnouncements] = useState<MadrasahAnnouncement[]>(mockAnnouncements);

  // Sync activeTab when initialTab changes from parent Header
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync across browser storage and custom events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'madrasahku_students' && e.newValue) {
        try {
          setStudents(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'madrasahku_subjects' && e.newValue) {
        try {
          setSubjects(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'madrasahku_teachers' && e.newValue) {
        try {
          setTeachers(JSON.parse(e.newValue));
        } catch {}
      }
    };
    const handleSubjectsSync = () => {
      setSubjects(getStoredSubjects());
    };
    const handleTeachersSync = () => {
      setTeachers(getStoredTeachers());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);
    window.addEventListener(TEACHERS_UPDATED_EVENT, handleTeachersSync);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);
      window.removeEventListener(TEACHERS_UPDATED_EVENT, handleTeachersSync);
    };
  }, []);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'semua'>('semua');
  const [rdmCategoryFilter, setRdmCategoryFilter] = useState<'semua' | 'kemenag' | 'umum'>('semua');

  // Modals: Santri
  const [newStudentModal, setNewStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNis, setNewStudentNis] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState(2);
  const [newStudentParent, setNewStudentParent] = useState('');

  // Modals: Pemetaan Rombel
  const [newMappingModal, setNewMappingModal] = useState(false);
  const [mapClassName, setMapClassName] = useState('Kelas 1 Abu Bakar Ash-Shiddiq');
  const [mapGrade, setMapGrade] = useState(1);
  const [mapTeacher, setMapTeacher] = useState('Ustadz Ridwan, S.Pd.I');

  // Modals: Mata Pelajaran (Mapel) Baru
  const [newSubjectModal, setNewSubjectModal] = useState(false);
  const [subName, setSubName] = useState('');
  const [subArabicName, setSubArabicName] = useState('');
  const [subCategory, setSubCategory] = useState<'kemenag' | 'umum'>('kemenag');
  const [subGradeLevels, setSubGradeLevels] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [subTeacherName, setSubTeacherName] = useState('Ustadz Ridwan, S.Pd.I');
  const [subTeachingHours, setSubTeachingHours] = useState<number>(4);
  const [subIconName, setSubIconName] = useState<string>('BookOpen');
  const [subDescription, setSubDescription] = useState('');

  // Modals: Guru / Ustadz Baru
  const [newTeacherModal, setNewTeacherModal] = useState(false);
  const [tchName, setTchName] = useState('');
  const [tchNip, setTchNip] = useState('');
  const [tchTitle, setTchTitle] = useState('Guru Bidang Studi');
  const [tchSpecialty, setTchSpecialty] = useState("Al-Qur'an Hadis & Fikih");
  const [tchHomeroom, setTchHomeroom] = useState('Guru Mapel');
  const [tchTeachingHours, setTchTeachingHours] = useState(24);
  const [tchStatus, setTchStatus] = useState<'PNS' | 'PPPK' | 'Guru Tetap Yayasan'>('Guru Tetap Yayasan');
  const [tchPhone, setTchPhone] = useState('0812-');
  const [tchEmail, setTchEmail] = useState('');
  const [tchAvatar, setTchAvatar] = useState('👳🏻‍♂️');

  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);
  const [studentSaveSuccessToast, setStudentSaveSuccessToast] = useState(false);
  const [subjectSaveSuccessToast, setSubjectSaveSuccessToast] = useState(false);
  const [teacherSaveSuccessToast, setTeacherSaveSuccessToast] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentNis) return;
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    const newStd: Student = {
      id: `std_${Date.now()}`,
      nis: newStudentNis.trim(),
      name: newStudentName.trim(),
      nickname: newStudentName.trim().split(' ')[0],
      grade: newStudentGrade,
      gradeLabel: `Kelas ${newStudentGrade} ${newStudentGrade === 2 ? 'Ali bin Abi Thalib' : 'Siti Khadijah'}`,
      avatar: '👦🏻',
      points: 100,
      stars: 5,
      streakDays: 1,
      juzProgress: 10,
      currentSurah: 'An-Nas',
      parentName: newStudentParent.trim() || 'Orang Tua Santri',
      parentPhone: '0812-0000-0000',
      status: 'Aktif'
    };

    const updatedStudents = [newStd, ...students];
    setStudents(updatedStudents);
    try {
      localStorage.setItem('madrasahku_students', JSON.stringify(updatedStudents));
    } catch (err) {
      console.error('Failed to save students to localStorage:', err);
    }

    setStudentSaveSuccessToast(true);
    setTimeout(() => setStudentSaveSuccessToast(false), 3500);

    setNewStudentModal(false);
    setNewStudentName('');
    setNewStudentNis('');
    setNewStudentParent('');
  };

  const handleDeleteStudent = (id: string, name: string) => {
    soundEngine.playClick();
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    try {
      localStorage.setItem('madrasahku_students', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetStudents = () => {
    soundEngine.playClick();
    if (window.confirm('Kembalikan data santri ke data bawaan madrasah?')) {
      setStudents(mockStudents);
      try {
        localStorage.setItem('madrasahku_students', JSON.stringify(mockStudents));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim()) return;
    soundEngine.playReward();
    confetti({ particleCount: 60, spread: 65, origin: { y: 0.6 } });

    const newSub: Subject = {
      id: `sbj_${Date.now()}`,
      name: subName.trim(),
      arabicName: subArabicName.trim() || undefined,
      category: subCategory,
      gradeLevels: subGradeLevels.length > 0 ? subGradeLevels : [1, 2, 3, 4, 5, 6],
      iconName: subIconName,
      color: subCategory === 'kemenag' ? 'emerald' : 'indigo',
      description: subDescription.trim() || 'Mata pelajaran terpadu kurikulum madrasah.',
      teacherName: subTeacherName,
      teachingHours: subTeachingHours
    };

    const updated = [...subjects, newSub];
    setSubjects(updated);
    saveStoredSubjects(updated);

    setSubjectSaveSuccessToast(true);
    setTimeout(() => setSubjectSaveSuccessToast(false), 3500);

    setNewSubjectModal(false);
    setSubName('');
    setSubArabicName('');
    setSubDescription('');
    setSubTeachingHours(4);
    setSubGradeLevels([1, 2, 3, 4, 5, 6]);
  };

  const handleDeleteSubject = (id: string, name: string) => {
    soundEngine.playClick();
    if (window.confirm(`Hapus mata pelajaran "${name}"? Data kurikulum terkait akan diperbarui di akun Guru & Siswa.`)) {
      const updated = subjects.filter(s => s.id !== id);
      setSubjects(updated);
      saveStoredSubjects(updated);
    }
  };

  const handleResetSubjects = () => {
    soundEngine.playClick();
    if (window.confirm('Kembalikan seluruh mata pelajaran ke standar kurikulum bawaan madrasah?')) {
      setSubjects(mockSubjects);
      saveStoredSubjects(mockSubjects);
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tchName.trim()) return;
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    const newTch: Teacher = {
      id: `tch_${Date.now()}`,
      nip: tchNip.trim() || `199${Math.floor(1000000000000 + Math.random() * 9000000000000)}`,
      name: tchName.trim(),
      title: tchTitle.trim() || `Guru ${tchSpecialty}`,
      email: tchEmail.trim() || `${tchName.trim().toLowerCase().replace(/[^a-z0-9]/g, '.')}@madrasah.sch.id`,
      phone: tchPhone.trim() || '0812-3456-7890',
      avatar: tchAvatar,
      specialty: tchSpecialty.trim(),
      homeroomClass: tchHomeroom === 'none' || tchHomeroom === 'Guru Mapel' ? undefined : tchHomeroom,
      teachingHoursPerWeek: tchTeachingHours || 24,
      status: tchStatus
    };

    const updated = [...teachers, newTch];
    setTeachers(updated);
    saveStoredTeachers(updated);

    setTeacherSaveSuccessToast(true);
    setTimeout(() => setTeacherSaveSuccessToast(false), 3500);

    setNewTeacherModal(false);
    setTchName('');
    setTchNip('');
    setTchTitle('Guru Bidang Studi');
    setTchSpecialty("Al-Qur'an Hadis & Fikih");
    setTchHomeroom('Guru Mapel');
    setTchTeachingHours(24);
    setTchPhone('0812-');
    setTchEmail('');
  };

  const handleDeleteTeacher = (id: string, name: string) => {
    soundEngine.playClick();
    if (window.confirm(`Hapus guru / ustadz "${name}"? Data kepegawaian dan penugasan terkait akan diperbarui.`)) {
      const updated = teachers.filter(t => t.id !== id);
      setTeachers(updated);
      saveStoredTeachers(updated);
    }
  };

  const handleResetTeachers = () => {
    soundEngine.playClick();
    if (window.confirm('Kembalikan daftar pendidik (guru) ke data bawaan madrasah?')) {
      setTeachers(mockTeachers);
      saveStoredTeachers(mockTeachers);
    }
  };

  const handleAddMapping = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playSuccess();
    const newMap: ClassMapping = {
      id: `cls_${Date.now()}`,
      className: mapClassName,
      grade: mapGrade,
      homeroomTeacher: mapTeacher,
      roomNumber: `Gedung C - Ruang 10${mapGrade}`,
      totalStudents: 28,
      subjectsAssigned: [
        { subjectId: 'sbj_qurdis', subjectName: "Al-Qur'an Hadis", category: 'kemenag', teacherName: mapTeacher, schedule: 'Senin, 07:30 - 09:00' },
        { subjectId: 'sbj_fikih', subjectName: 'Fikih Ibadah', category: 'kemenag', teacherName: 'Ustadz Hilman Hakim, Lc.', schedule: 'Selasa, 07:30 - 09:00' }
      ]
    };
    setClassMappings([...classMappings, newMap]);
    setNewMappingModal(false);
  };

  // Export to Rapor Digital Madrasah (RDM Kemenag Format) CSV
  const handleExportRDM = () => {
    soundEngine.playReward();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });

    // Build standard CSV compatible with Kemenag RDM import
    const headers = ["NIS", "Nama Santri", "Kelas", "Mata Pelajaran", "Kelompok Kurikulum", "Nilai PH", "Nilai PTS", "Nilai PAS", "Nilai Akhir", "Predikat", "Deskripsi Capaian", "Sikap Spiritual", "Sikap Sosial"];
    const rows = rdmGrades.map(g => [
      `"${g.studentNis}"`,
      `"${g.studentName}"`,
      `"${g.className}"`,
      `"${g.subjectName}"`,
      `"${g.category === 'kemenag' ? 'PAI Kemenag' : 'Umum Kemendikbud'}"`,
      g.nilaiHarian,
      g.nilaiPTS,
      g.nilaiPAS,
      g.nilaiAkhir,
      `"${g.predikat}"`,
      `"${g.deskripsiCapaian}"`,
      `"${g.nilaiSikapSpiritual}"`,
      `"${g.nilaiSikapSosial}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rekap_Nilai_RDM_Kemenag_${mockMadrasahStats.activeAcademicYear.replace('/', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessToast(true);
    setTimeout(() => setDownloadSuccessToast(false), 4000);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.nis.includes(searchQuery);
    const matchesGrade = gradeFilter === 'semua' || s.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const filteredTeachers = teachers.filter(t => {
    return t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           t.nip.includes(searchQuery) || 
           t.specialty.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredRDM = rdmGrades.filter(g => {
    if (rdmCategoryFilter === 'semua') return true;
    return g.category === rdmCategoryFilter;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Administrator Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-300 uppercase mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>Hak Akses Administrator / Kepala Madrasah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Sistem Manajemen Madrasah & Integrasi RDM
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Drs. KH. Ahmad Mansur, M.Pd.I · Kepala MI Darul Ulum Sidareja · Tahun Ajaran {mockMadrasahStats.activeAcademicYear} ({mockMadrasahStats.activeSemester})
            </p>
          </div>

          {/* Quick RDM Status Badge */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-xs text-right">
            <div className="text-emerald-300 font-bold flex items-center justify-end gap-1.5">
              <FileCheck2 className="w-4 h-4" />
              <span>Sinkronisasi RDM Siap</span>
            </div>
            <div className="text-slate-300 text-[11px] mt-0.5">Rapor Digital Madrasah Kemenag RI</div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('rekap'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rekap' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            📊 Rekapitulasi & Statistik Madrasah
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('admin_pengguna'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'admin_pengguna' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            👥 Manajemen Akun Pengguna
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('admin_pemetaan'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'admin_pemetaan' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pemetaan Kelas & Mata Pelajaran</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('admin_rdm'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'admin_rdm' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span>Ekspor Rapor Digital Madrasah (RDM)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: REKAPITULASI & STATISTIK */}
      {activeTab === 'rekap' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Total Santri</div>
              <div className="text-2xl font-black text-slate-900 font-mono">{mockMadrasahStats.totalStudents}</div>
              <div className="text-[11px] text-emerald-700 font-semibold mt-1">12 Rombel Aktif</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dewan Asatidz</div>
              <div className="text-2xl font-black text-slate-900 font-mono">{mockMadrasahStats.totalTeachers}</div>
              <div className="text-[11px] text-blue-700 font-semibold mt-1">100% Bersertifikasi</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kehadiran Hari Ini</div>
              <div className="text-2xl font-black text-teal-700 font-mono">{mockMadrasahStats.averageAttendanceToday}%</div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">328 Hadir Tepat Waktu</div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Kelulusan Juz 30</div>
              <div className="text-2xl font-black text-amber-600 font-mono">{mockMadrasahStats.juz30CompletionRate}%</div>
              <div className="text-[11px] text-amber-800 font-semibold mt-1">254 Santri Mutqin</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MANAJEMEN AKUN PENGGUNA */}
      {activeTab === 'admin_pengguna' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-serif">
                Manajemen Data Akun Pengguna Madrasah
              </h3>
              <p className="text-xs text-slate-500">
                Data master santri, asatidz, dan akun wali santri yang terhubung ke sistem.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setUserSubTab('siswa')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userSubTab === 'siswa' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Santri ({students.length})
                </button>
                <button
                  onClick={() => setUserSubTab('guru')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userSubTab === 'guru' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Guru ({teachers.length})
                </button>
                <button
                  onClick={() => setUserSubTab('akun')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    userSubTab === 'akun' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Hak Akses Login ({mockUserAccounts.length})
                </button>
              </div>

              {userSubTab === 'siswa' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetStudents}
                    title="Reset ke data bawaan madrasah"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Default</span>
                  </button>
                  <button
                    onClick={() => setNewStudentModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Santri</span>
                  </button>
                </div>
              )}

              {userSubTab === 'guru' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetTeachers}
                    title="Reset ke data bawaan madrasah"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Default</span>
                  </button>
                  <button
                    onClick={() => setNewTeacherModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Guru / Ustadz</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Persistence status banner */}
          {userSubTab === 'siswa' && (
            <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-2 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Penyimpanan Otomatis Aktif:</strong> Setiap santri yang ditambahkan tersimpan permanen di perangkat Anda dan <strong>tidak akan hilang ketika halaman di-refresh</strong>.
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-700 font-bold shrink-0">
                Total: {students.length} Santri
              </span>
            </div>
          )}

          {/* Persistence status banner for Teachers */}
          {userSubTab === 'guru' && (
            <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-2 text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Save className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  <strong>Penyimpanan Otomatis Aktif:</strong> Setiap pendidik (guru/ustadz) yang ditambahkan tersimpan permanen dan <strong>langsung terhubung ke penugasan mapel & rombel</strong>.
                </span>
              </div>
              <span className="font-mono text-[11px] text-emerald-700 font-bold shrink-0">
                Total: {teachers.length} Dewan Asatidz
              </span>
            </div>
          )}

          {/* Table for Students */}
          {userSubTab === 'siswa' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">NIS</th>
                    <th className="py-3 px-4">Nama Lengkap</th>
                    <th className="py-3 px-4">Kelas & Rombel</th>
                    <th className="py-3 px-4">Capaian Tahfiz</th>
                    <th className="py-3 px-4">Wali Santri & Telepon</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-slate-600">{std.nis}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{std.avatar}</span>
                        <span>{std.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{std.gradeLabel}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800">{std.currentSurah} ({std.juzProgress}%)</td>
                      <td className="py-3 px-4 text-slate-600">
                        <div>{std.parentName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{std.parentPhone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">
                          {std.status || 'Aktif'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteStudent(std.id, std.name)}
                          title={`Hapus santri ${std.name}`}
                          className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table for Teachers */}
          {userSubTab === 'guru' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">NIP / NUPTK</th>
                    <th className="py-3 px-4">Nama Pendidik</th>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Tugas Tambahan</th>
                    <th className="py-3 px-4">Beban JTM</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTeachers.map((tch) => (
                    <tr key={tch.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{tch.nip}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{tch.avatar}</span>
                        <div>
                          <div>{tch.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{tch.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-800">{tch.specialty}</td>
                      <td className="py-3 px-4 text-slate-600">{tch.homeroomClass || tch.title || 'Guru Mapel'}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{tch.teachingHoursPerWeek} Jam / Pekan</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                          tch.status === 'PNS' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                          tch.status === 'PPPK' ? 'bg-blue-100 text-blue-900 border-blue-200' :
                          'bg-amber-100 text-amber-900 border-amber-200'
                        }`}>
                          {tch.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteTeacher(tch.id, tch.name)}
                          title={`Hapus pendidik ${tch.name}`}
                          className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table for All User Accounts & Permissions */}
          {userSubTab === 'akun' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">ID Akun</th>
                    <th className="py-3 px-4">Nama Pengguna</th>
                    <th className="py-3 px-4">Hak Akses Role</th>
                    <th className="py-3 px-4">Email Terdaftar</th>
                    <th className="py-3 px-4">Identitas (NIS/NIP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockUserAccounts.map((acc) => (
                    <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-400">{acc.id}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{acc.avatar}</span>
                        <span>{acc.name}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                          {acc.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600">{acc.email}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{acc.identifier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PEMETAAN KELAS & MATA PELAJARAN */}
      {activeTab === 'admin_pemetaan' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Kurikulum Mata Pelajaran & Pemetaan Rombel
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kelola master mata pelajaran Kemenag & Umum serta penetapan wali kelas dan jadwal mengajar.
              </p>
            </div>

            {/* Sub-tab Switcher: Mapel vs Rombel */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setMappingSubTab('mapel')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mappingSubTab === 'mapel' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Mata Pelajaran ({subjects.length})
                </button>
                <button
                  onClick={() => setMappingSubTab('rombel')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    mappingSubTab === 'rombel' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Pemetaan Rombel ({classMappings.length})
                </button>
              </div>

              {mappingSubTab === 'mapel' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleResetSubjects}
                    title="Reset seluruh mapel ke standar madrasah"
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset Default</span>
                  </button>
                  <button
                    onClick={() => setNewSubjectModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Mapel Baru</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setNewMappingModal(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Petakan Rombel Baru</span>
                </button>
              )}
            </div>
          </div>

          {/* SUB-VIEW 1: MATA PELAJARAN MASTER TABLE */}
          {mappingSubTab === 'mapel' && (
            <div className="space-y-4">
              {/* Persistence and sync banner */}
              <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200/80 rounded-xl px-4 py-2.5 text-xs text-emerald-950">
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Penyimpanan Otomatis & Sinkronisasi Aktif:</strong> Mata pelajaran yang ditambahkan di sini otomatis tersimpan permanen dan <strong>langsung muncul di form unggah materi Guru serta portal belajar Siswa</strong>.
                  </span>
                </div>
                <span className="font-mono text-[11px] text-emerald-800 font-bold shrink-0">
                  {subjects.length} Mapel Aktif
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Kode ID</th>
                      <th className="py-3 px-4">Nama Mata Pelajaran</th>
                      <th className="py-3 px-4">Kelompok Kurikulum</th>
                      <th className="py-3 px-4">Tingkat Kelas</th>
                      <th className="py-3 px-4">Ustadz / Guru Pengampu</th>
                      <th className="py-3 px-4">Beban JTM</th>
                      <th className="py-3 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subjects.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-4 font-mono text-slate-400 font-medium">{sub.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{sub.name}</span>
                            {sub.arabicName && (
                              <span className="font-arabic text-emerald-800 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100" dir="rtl">
                                {sub.arabicName}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {sub.description}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            sub.category === 'kemenag' 
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200' 
                              : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                          }`}>
                            {sub.category === 'kemenag' ? 'PAI Kemenag' : 'Umum Kemendikbud'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">
                          {sub.gradeLevels.length === 6 
                            ? 'Semua Kelas (1–6)' 
                            : `Kelas ${sub.gradeLevels.join(', ')}`}
                        </td>
                        <td className="py-3 px-4 text-slate-800 font-semibold">{sub.teacherName}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-700">{sub.teachingHours || 4} JP / Pekan</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDeleteSubject(sub.id, sub.name)}
                            title={`Hapus mapel "${sub.name}"`}
                            className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: PEMETAAN ROMBEL & JADWAL */}
          {mappingSubTab === 'rombel' && (
            <div className="space-y-6">
              {classMappings.map((cls) => (
                <div key={cls.id} className="p-6 rounded-2xl border border-slate-200 bg-[#FCFDFD] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Rombel Tingkat {cls.grade}</span>
                      <h4 className="text-lg font-bold text-slate-900 font-serif">{cls.className}</h4>
                      <div className="text-xs text-slate-500 flex items-center gap-3 mt-0.5">
                        <span>Wali Kelas: <strong className="text-slate-800">{cls.homeroomTeacher}</strong></span>
                        <span>·</span>
                        <span>Lokasi: {cls.roomNumber}</span>
                        <span>·</span>
                        <span>Kapasitas: {cls.totalStudents} Santri</span>
                      </div>
                    </div>

                    <span className="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200">
                      {cls.subjectsAssigned.length} Mata Pelajaran Terpetakan
                    </span>
                  </div>

                  {/* Sub-table: Mata Pelajaran Assigned */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Mata Pelajaran</th>
                          <th className="py-2.5 px-3">Kelompok</th>
                          <th className="py-2.5 px-3">Guru / Ustadz Pengampu</th>
                          <th className="py-2.5 px-3">Jadwal Tatap Muka</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {cls.subjectsAssigned.map((s, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="py-2.5 px-3 font-bold text-slate-900">{s.subjectName}</td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                s.category === 'kemenag' ? 'bg-emerald-50 text-emerald-800' : 'bg-indigo-50 text-indigo-800'
                              }`}>
                                {s.category === 'kemenag' ? 'Kemenag' : 'Umum'}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-slate-700">{s.teacherName}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">{s.schedule}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: EKSPOR RAPOR DIGITAL MADRASAH (RDM KEMENAG) */}
      {activeTab === 'admin_rdm' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Ekspor Rekapitulasi Nilai Kompatibel RDM Kemenag
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Format baku Kementerian Agama: Penilaian Harian (PH), PTS, PAS, Nilai Akhir (NA), dan Deskripsi Sikap.
              </p>
            </div>

            <button
              onClick={handleExportRDM}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Rapor RDM Kemenag (.CSV / Excel)</span>
            </button>
          </div>

          {/* Formula RDM Notice */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-950 flex-wrap gap-2">
            <div>
              <span className="font-bold">Formula Perhitungan Nilai Rapor Digital Madrasah (RDM): </span>
              <span className="font-mono font-bold bg-white px-2 py-0.5 rounded-md border border-amber-300">
                NA = (2 × PH + PTS + PAS) / 4
              </span>
            </div>
            <span className="text-[11px] text-amber-800">Standar Juknis Dirjen Pendis Kemenag RI</span>
          </div>

          {downloadSuccessToast && (
            <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold text-center animate-in fade-in">
              Alhamdulillah! Berkas rekapitulasi nilai kompatibel RDM Kemenag berhasil diekspor dan diunduh.
            </div>
          )}

          {/* Filter Group */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setRdmCategoryFilter('semua')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  rdmCategoryFilter === 'semua' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Semua Mapel ({rdmGrades.length})
              </button>
              <button
                onClick={() => setRdmCategoryFilter('kemenag')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  rdmCategoryFilter === 'kemenag' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                PAI Kemenag
              </button>
              <button
                onClick={() => setRdmCategoryFilter('umum')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  rdmCategoryFilter === 'umum' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                Umum Kemendikbud
              </button>
            </div>

            <span className="text-slate-400 font-mono">Tahun Ajaran {mockMadrasahStats.activeAcademicYear}</span>
          </div>

          {/* RDM Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">NIS</th>
                  <th className="py-3 px-4">Nama Santri</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Mata Pelajaran</th>
                  <th className="py-3 px-4 text-center">PH (Bobot 2)</th>
                  <th className="py-3 px-4 text-center">PTS (Bobot 1)</th>
                  <th className="py-3 px-4 text-center">PAS (Bobot 1)</th>
                  <th className="py-3 px-4 text-center font-black text-emerald-800">Nilai Akhir (NA)</th>
                  <th className="py-3 px-4 text-center">Predikat</th>
                  <th className="py-3 px-4">Sikap Spiritual & Sosial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRDM.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-500">{row.studentNis}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{row.studentName}</td>
                    <td className="py-3 px-4 text-slate-600">{row.className}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{row.subjectName}</td>
                    <td className="py-3 px-4 font-mono text-center">{row.nilaiHarian}</td>
                    <td className="py-3 px-4 font-mono text-center">{row.nilaiPTS}</td>
                    <td className="py-3 px-4 font-mono text-center">{row.nilaiPAS}</td>
                    <td className="py-3 px-4 font-mono font-black text-center text-emerald-700 bg-emerald-50/50">
                      {row.nilaiAkhir}
                    </td>
                    <td className="py-3 px-4 font-bold text-center">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 inline-flex items-center justify-center">
                        {row.predikat}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-slate-600">
                      <div>Spiritual: <strong className="text-emerald-800">{row.nilaiSikapSpiritual}</strong></div>
                      <div>Sosial: <strong className="text-blue-800">{row.nilaiSikapSosial}</strong></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Tambah Santri */}
      {newStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">Tambah Data Santri Baru</h3>
              <button onClick={() => setNewStudentModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nomor Induk Siswa (NIS):</label>
                <input
                  type="text"
                  required
                  value={newStudentNis}
                  onChange={(e) => setNewStudentNis(e.target.value)}
                  placeholder="Contoh: MI240209"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap Santri:</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Nama santri"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rombel Tingkat:</label>
                <select
                  value={newStudentGrade}
                  onChange={(e) => setNewStudentGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value={1}>Kelas 1 (Fase A)</option>
                  <option value={2}>Kelas 2 (Fase A)</option>
                  <option value={3}>Kelas 3 (Fase B)</option>
                  <option value={4}>Kelas 4 (Fase B)</option>
                  <option value={5}>Kelas 5 (Fase C)</option>
                  <option value={6}>Kelas 6 (Fase C)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Wali Santri:</label>
                <input
                  type="text"
                  value={newStudentParent}
                  onChange={(e) => setNewStudentParent(e.target.value)}
                  placeholder="Nama ayah atau bunda"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewStudentModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Simpan Santri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Pemetaan Rombel */}
      {newMappingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">Petakan Rombel Kelas & Wali Kelas</h3>
              <button onClick={() => setNewMappingModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddMapping} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Rombel:</label>
                <input
                  type="text"
                  required
                  value={mapClassName}
                  onChange={(e) => setMapClassName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tingkat Kelas:</label>
                <select
                  value={mapGrade}
                  onChange={(e) => setMapGrade(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  <option value={1}>Kelas 1 (Fase A)</option>
                  <option value={2}>Kelas 2 (Fase A)</option>
                  <option value={3}>Kelas 3 (Fase B)</option>
                  <option value={4}>Kelas 4 (Fase B)</option>
                  <option value={5}>Kelas 5 (Fase C)</option>
                  <option value={6}>Kelas 6 (Fase C)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Wali Kelas yang Ditugaskan:</label>
                <select
                  value={mapTeacher}
                  onChange={(e) => setMapTeacher(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                >
                  {teachers.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.specialty})</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewMappingModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Simpan Pemetaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Mata Pelajaran Baru */}
      {newSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">Tambah Mata Pelajaran Baru</h3>
                  <p className="text-[11px] text-slate-500">Otomatis tersinkronisasi ke Dashboard Guru & Siswa</p>
                </div>
              </div>
              <button 
                onClick={() => setNewSubjectModal(false)} 
                className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubject} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Nama Mata Pelajaran <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subName}
                    onChange={(e) => setSubName(e.target.value)}
                    placeholder="Contoh: Tajwid Praktis, Bahasa Inggris MI..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Tulisan Arab (Opsional)
                  </label>
                  <input
                    type="text"
                    value={subArabicName}
                    onChange={(e) => setSubArabicName(e.target.value)}
                    placeholder="Contoh: التجويد العملي"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-right font-serif"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Kelompok Kurikulum <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value as 'kemenag' | 'umum')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="kemenag">Khas Kemenag (Agama Islam)</option>
                    <option value="umum">Umum Nasional (Kemendikbud)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">
                  Tingkat Sasaran Kelas:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((grade) => {
                    const isSelected = subGradeLevels.includes(grade);
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => {
                          if (isSelected) {
                            if (subGradeLevels.length > 1) {
                              setSubGradeLevels(subGradeLevels.filter(g => g !== grade));
                            }
                          } else {
                            setSubGradeLevels([...subGradeLevels, grade].sort());
                          }
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        Kelas {grade}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => setSubGradeLevels([1, 2, 3, 4, 5, 6])}
                    className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                  >
                    Pilih Semua
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Guru Pengampu:
                  </label>
                  <select
                    value={subTeacherName}
                    onChange={(e) => setSubTeacherName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.name}>{t.name} ({t.specialty})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Alokasi JP / Pekan:
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={subTeachingHours}
                    onChange={(e) => setSubTeachingHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pilihan Ikon Visual Mapel:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { id: 'BookOpen', label: 'Buku', icon: <BookOpen className="w-4 h-4" /> },
                    { id: 'Sparkles', label: 'Bintang', icon: <Sparkles className="w-4 h-4" /> },
                    { id: 'HeartHandshake', label: 'Akhlak', icon: <HeartHandshake className="w-4 h-4" /> },
                    { id: 'Languages', label: 'Bahasa', icon: <Languages className="w-4 h-4" /> },
                    { id: 'Compass', label: 'Sejarah', icon: <Compass className="w-4 h-4" /> },
                    { id: 'Calculator', label: 'Hitung', icon: <Calculator className="w-4 h-4" /> },
                    { id: 'Feather', label: 'Sastra', icon: <Feather className="w-4 h-4" /> },
                    { id: 'Globe', label: 'Sains', icon: <Globe className="w-4 h-4" /> },
                    { id: 'Trophy', label: 'Prestasi', icon: <Trophy className="w-4 h-4" /> },
                    { id: 'Activity', label: 'PJOK', icon: <Activity className="w-4 h-4" /> }
                  ].map((ic) => (
                    <button
                      key={ic.id}
                      type="button"
                      onClick={() => setSubIconName(ic.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        subIconName === ic.id 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-bold ring-1 ring-emerald-500' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {ic.icon}
                      <span className="text-[10px]">{ic.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Keterangan & Ruang Lingkup Materi:
                </label>
                <textarea
                  rows={2}
                  value={subDescription}
                  onChange={(e) => setSubDescription(e.target.value)}
                  placeholder="Ringkasan kompetensi dasar dan capaian pembelajaran..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewSubjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan & Sinkronkan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Guru / Ustadz Baru */}
      {newTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">Tambah Guru / Asatidz Baru</h3>
                  <p className="text-[11px] text-slate-500">Tersimpan permanen & terhubung ke penugasan mapel & rombel</p>
                </div>
              </div>
              <button 
                onClick={() => setNewTeacherModal(false)} 
                className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">
                    Nama Lengkap & Gelar Pendidik <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tchName}
                    onChange={(e) => setTchName(e.target.value)}
                    placeholder="Contoh: Ustadz Ahmad Baihaqi, S.Pd.I, M.Pd"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    NIP / NUPTK / PegID
                  </label>
                  <input
                    type="text"
                    value={tchNip}
                    onChange={(e) => setTchNip(e.target.value)}
                    placeholder="Nomor Induk Pegawai / NUPTK"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400">Kosongkan jika otomatis digenerate</span>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Status Kepegawaian <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={tchStatus}
                    onChange={(e) => setTchStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="Guru Tetap Yayasan">Guru Tetap Yayasan (GTY)</option>
                    <option value="PPPK">PPPK Kemenag</option>
                    <option value="PNS">PNS Kemenag</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Bidang Keahlian / Mapel Utama <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tchSpecialty}
                    onChange={(e) => setTchSpecialty(e.target.value)}
                    placeholder="Contoh: Al-Qur'an Hadis & Tahfiz"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Beban Jam Tatap Muka (JTM / Pekan):
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={40}
                    value={tchTeachingHours}
                    onChange={(e) => setTchTeachingHours(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Tugas Tambahan / Wali Kelas:
                  </label>
                  <select
                    value={tchHomeroom}
                    onChange={(e) => setTchHomeroom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Guru Mapel">Guru Mapel (Non-Wali Kelas)</option>
                    <option value="Kelas 1 Abu Bakar Ash-Shiddiq">Wali Kelas 1 Abu Bakar</option>
                    <option value="Kelas 2 Ali bin Abi Thalib">Wali Kelas 2 Ali bin Abi Thalib</option>
                    <option value="Kelas 3 Utsman bin Affan">Wali Kelas 3 Utsman bin Affan</option>
                    <option value="Kelas 4 Umar bin Khattab">Wali Kelas 4 Umar bin Khattab</option>
                    <option value="Kelas 5 Siti Khadijah">Wali Kelas 5 Siti Khadijah</option>
                    <option value="Kelas 6 Siti Aisyah">Wali Kelas 6 Siti Aisyah</option>
                    <option value="Koordinator Tahfiz & Mutabaah">Koordinator Tahfiz & Mutabaah</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Pilihan Avatar Profil:
                  </label>
                  <div className="flex items-center gap-2 pt-0.5">
                    {[
                      { val: '👳🏻‍♂️', label: 'Ustadz Peci' },
                      { val: '🧕🏻', label: 'Ustadzah Hijab' },
                      { val: '👨🏻‍🏫', label: 'Guru Pria' },
                      { val: '👩🏻‍🏫', label: 'Guru Wanita' }
                    ].map((av) => (
                      <button
                        key={av.val}
                        type="button"
                        onClick={() => setTchAvatar(av.val)}
                        className={`px-2.5 py-1.5 rounded-xl border text-base transition-all cursor-pointer flex items-center gap-1 ${
                          tchAvatar === av.val
                            ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                        title={av.label}
                      >
                        <span>{av.val}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    No. WhatsApp / Kontak:
                  </label>
                  <input
                    type="text"
                    value={tchPhone}
                    onChange={(e) => setTchPhone(e.target.value)}
                    placeholder="0812-3456-7890"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Email Madrasah:
                  </label>
                  <input
                    type="email"
                    value={tchEmail}
                    onChange={(e) => setTchEmail(e.target.value)}
                    placeholder="guru@madrasah.sch.id"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewTeacherModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Guru Baru</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notifikasi Sukses Simpan Guru */}
      {teacherSaveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold">Guru / Ustadz Berhasil Ditambahkan & Disimpan!</div>
            <div className="text-emerald-200 text-[11px]">
              Data otomatis tersimpan dan langsung terhubung ke penugasan mapel & rombel madrasah.
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifikasi Sukses Simpan Santri */}
      {studentSaveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold">Santri Berhasil Ditambahkan & Disimpan!</div>
            <div className="text-emerald-200 text-[11px]">Data otomatis tersimpan dan tidak akan hilang saat di-refresh.</div>
          </div>
        </div>
      )}

      {/* Toast Notifikasi Sukses Simpan Mata Pelajaran */}
      {subjectSaveSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-950 text-white px-5 py-3 rounded-2xl shadow-xl border border-emerald-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="font-bold">Mata Pelajaran Berhasil Ditambahkan & Disinkronkan!</div>
            <div className="text-emerald-200 text-[11px]">
              Otomatis langsung tersedia di form unggah materi Guru dan portal belajar Siswa.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
