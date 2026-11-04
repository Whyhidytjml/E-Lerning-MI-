import React, { useState } from 'react';
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
  Table
} from 'lucide-react';

interface AdminDashboardProps {
  initialTab?: 'rekap' | 'admin_pengguna' | 'admin_pemetaan' | 'admin_rdm' | 'pengumuman';
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialTab = 'rekap' }) => {
  const [activeTab, setActiveTab] = useState<'rekap' | 'admin_pengguna' | 'admin_pemetaan' | 'admin_rdm' | 'pengumuman'>(initialTab);
  const [userSubTab, setUserSubTab] = useState<'siswa' | 'guru' | 'akun'>('siswa');

  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [classMappings, setClassMappings] = useState<ClassMapping[]>(mockClassMappings);
  const [rdmGrades, setRdmGrades] = useState<RDMGradeRecord[]>(mockRDMGrades);
  const [announcements, setAnnouncements] = useState<MadrasahAnnouncement[]>(mockAnnouncements);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number | 'semua'>('semua');
  const [rdmCategoryFilter, setRdmCategoryFilter] = useState<'semua' | 'kemenag' | 'umum'>('semua');

  // Modals
  const [newStudentModal, setNewStudentModal] = useState(false);
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentNis, setNewStudentNis] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState(2);
  const [newStudentParent, setNewStudentParent] = useState('');

  const [newMappingModal, setNewMappingModal] = useState(false);
  const [mapClassName, setMapClassName] = useState('Kelas 1 Abu Bakar Ash-Shiddiq');
  const [mapGrade, setMapGrade] = useState(1);
  const [mapTeacher, setMapTeacher] = useState('Ustadz Ridwan, S.Pd.I');

  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName || !newStudentNis) return;
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    const newStd: Student = {
      id: `std_${Date.now()}`,
      nis: newStudentNis,
      name: newStudentName,
      nickname: newStudentName.split(' ')[0],
      grade: newStudentGrade,
      gradeLabel: `Kelas ${newStudentGrade} ${newStudentGrade === 2 ? 'Ali bin Abi Thalib' : 'Siti Khadijah'}`,
      avatar: '👦🏻',
      points: 100,
      stars: 5,
      streakDays: 1,
      juzProgress: 10,
      currentSurah: 'An-Nas',
      parentName: newStudentParent || 'Orang Tua Santri',
      parentPhone: '0812-0000-0000',
      status: 'Aktif'
    };

    setStudents([newStd, ...students]);
    setNewStudentModal(false);
    setNewStudentName('');
    setNewStudentNis('');
    setNewStudentParent('');
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
              Drs. KH. Ahmad Mansur, M.Pd.I · Tahun Ajaran {mockMadrasahStats.activeAcademicYear} ({mockMadrasahStats.activeSemester})
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
                <button
                  onClick={() => setNewStudentModal(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Santri</span>
                </button>
              )}
            </div>
          </div>

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
                    <th className="py-3 px-4">NIP</th>
                    <th className="py-3 px-4">Nama Pendidik</th>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Tugas Tambahan</th>
                    <th className="py-3 px-4">Beban JTM</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {teachers.map((tch) => (
                    <tr key={tch.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{tch.nip}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{tch.avatar}</span>
                        <span>{tch.name}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-800">{tch.specialty}</td>
                      <td className="py-3 px-4 text-slate-600">{tch.homeroomClass || 'Guru Mapel'}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{tch.teachingHoursPerWeek} Jam / Pekan</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                          {tch.status}
                        </span>
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
                  Pemetaan Rombel Kelas & Alokasi Mata Pelajaran
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penetapan wali kelas, pembagian ruang, serta jadwal mengajar guru mapel umum & Kemenag.
              </p>
            </div>

            <button
              onClick={() => setNewMappingModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Petakan Rombel Baru</span>
            </button>
          </div>

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
    </div>
  );
};
