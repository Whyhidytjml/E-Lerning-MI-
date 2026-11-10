import React, { useState, useEffect } from 'react';
import { Subject, SubjectCategory, LearningMaterial } from '../types/lms';
import { getStoredMaterials, MATERIALS_UPDATED_EVENT } from '../utils/materialsStorage';
import { getStoredSubjects, SUBJECTS_UPDATED_EVENT } from '../utils/subjectsStorage';
import { MaterialReaderModal } from './common/MaterialReaderModal';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Languages, 
  HeartHandshake, 
  Calculator, 
  Feather, 
  Globe, 
  ShieldCheck, 
  Activity,
  Play,
  FileText,
  Clock,
  User,
  CheckCircle2,
  X,
  Eye,
  Download,
  Film,
  Music,
  FileCheck2,
  FolderOpen,
  Calendar,
  Layers
} from 'lucide-react';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';

interface SubjectCurriculumViewProps {
  studentGrade?: number;
  studentName?: string;
  isStudent?: boolean;
}

export const SubjectCurriculumView: React.FC<SubjectCurriculumViewProps> = ({
  studentGrade,
  studentName,
  isStudent = false
}) => {
  const [activeCategory, setActiveCategory] = useState<SubjectCategory | 'semua'>('semua');
  const [gradeFilter, setGradeFilter] = useState<number | 'semua'>(() => {
    return isStudent && studentGrade ? studentGrade : 'semua';
  });
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  // Synchronized subjects from Admin Master Table
  const [subjects, setSubjects] = useState<Subject[]>(() => getStoredSubjects());

  // Synchronized materials directly from teacher's uploads
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => getStoredMaterials());
  const [selectedModule, setSelectedModule] = useState<LearningMaterial | null>(null);

  // Keep gradeFilter strictly locked if isStudent is true
  useEffect(() => {
    if (isStudent && studentGrade) {
      setGradeFilter(studentGrade);
    }
  }, [isStudent, studentGrade]);

  useEffect(() => {
    const handleMaterialsSync = () => {
      setMaterials(getStoredMaterials());
    };
    const handleSubjectsSync = () => {
      setSubjects(getStoredSubjects());
    };

    window.addEventListener('storage', (e) => {
      if (e.key === 'madrasahku_materials') {
        setMaterials(getStoredMaterials());
      }
      if (e.key === 'madrasahku_subjects') {
        setSubjects(getStoredSubjects());
      }
    });
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleMaterialsSync);
    window.addEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);

    return () => {
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleMaterialsSync);
      window.removeEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);
    };
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-600" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-600" />;
      case 'Languages': return <Languages className="w-6 h-6 text-emerald-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'Feather': return <Feather className="w-6 h-6 text-rose-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-red-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-orange-600" />;
      default: return <BookOpen className="w-6 h-6 text-emerald-600" />;
    }
  };

  const filteredSubjects = subjects.filter((subject) => {
    const matchesCat = activeCategory === 'semua' || subject.category === activeCategory;
    const matchesGrade = gradeFilter === 'semua' || subject.gradeLevels.includes(gradeFilter as number);
    return matchesCat && matchesGrade;
  });

  const kemenagSubjects = filteredSubjects.filter(s => s.category === 'kemenag');
  const umumSubjects = filteredSubjects.filter(s => s.category === 'umum');

  // Filter materials based on category and grade filter
  const effectiveGrade = isStudent && studentGrade ? studentGrade : gradeFilter;
  const filteredTeacherMaterials = materials.filter(m => {
    const matchesCat = activeCategory === 'semua' || m.category === activeCategory;
    const matchesGrade = effectiveGrade === 'semua' ? true : m.grade === effectiveGrade;
    return matchesCat && matchesGrade;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase mb-3">
            <span>Kurikulum Terpadu Madrasah Ibtidaiyah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white mb-3">
            Struktur Mata Pelajaran Keagamaan & Umum
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Mengharmonisasikan standar kurikulum Kementerian Agama (Kemenag) untuk fondasi akidah dan spiritualitas, dengan kurikulum Nasional Kemendikbud untuk kompetensi sains, literasi, dan logika berpikir.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-emerald-950/40 rounded-xl backdrop-blur-xs">
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('semua'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'semua'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Semua Pelajaran ({subjects.length})
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('kemenag'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'kemenag'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Khas Kemenag ({subjects.filter(s => s.category === 'kemenag').length})
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('umum'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'umum'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Umum Nasional ({subjects.filter(s => s.category === 'umum').length})
            </button>
          </div>

          {/* Grade Level Display / Selector */}
          <div className="flex items-center gap-2 text-xs text-emerald-100">
            <span>Tingkat Kelas:</span>
            {isStudent && studentGrade ? (
              <div className="bg-emerald-950/80 border border-emerald-400 text-emerald-200 rounded-lg px-3 py-1 font-bold flex items-center gap-1.5 shadow-2xs">
                <span>🔒 Kelas {studentGrade} (Akses Khusus Terkunci)</span>
              </div>
            ) : (
              <select
                value={gradeFilter}
                onChange={(e) => {
                  soundEngine.playClick();
                  setGradeFilter(e.target.value === 'semua' ? 'semua' : Number(e.target.value));
                }}
                className="bg-emerald-950/60 border border-emerald-700/60 text-white rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-hidden"
              >
                <option value="semua">Semua Tingkat (1–6)</option>
                <option value="1">Kelas 1 (Fase A)</option>
                <option value="2">Kelas 2 (Fase A)</option>
                <option value="3">Kelas 3 (Fase B)</option>
                <option value="4">Kelas 4 (Fase B)</option>
                <option value="5">Kelas 5 (Fase C)</option>
                <option value="6">Kelas 6 (Fase C)</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* SECTION 0: MATERI & MODUL PEMBELAJARAN DARI GURU (TERINTEGRASI & REAL-TIME) */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Modul & Materi Ajar Dari Ustadz / Guru (Real-Time Sync)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              Materi & Berkas Pembelajaran Siswa
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Santri dapat langsung membuka modul bacaan, video ajar, audio murattal, dan lembar materi yang diunggah oleh bapak/ibu guru.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 self-start sm:self-auto">
            {filteredTeacherMaterials.length} Modul Siap Diakses
          </span>
        </div>

        {filteredTeacherMaterials.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            Belum ada modul yang diunggah untuk kategori atau tingkat kelas yang dipilih.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTeacherMaterials.map((mat) => (
              <div
                key={mat.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-400 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      mat.category === 'kemenag' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}>
                      {mat.subjectName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {mat.format === 'Video' && <Film className="w-3 h-3 text-rose-500" />}
                      {mat.format === 'Dokumen PDF' && <FileText className="w-3 h-3 text-red-500" />}
                      {mat.format === 'Audio MP3' && <Music className="w-3 h-3 text-emerald-500" />}
                      <span>{mat.format}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {mat.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pengampu:</span>
                      <span className="font-bold text-slate-800">{mat.teacherName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Sasaran:</span>
                      <span className="font-semibold text-emerald-700">
                        {mat.grade === 0 ? 'Semua Kelas (1–6)' : `Kelas ${mat.grade}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedModule(mat);
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka & Pelajari Modul</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Section 1: Mata Pelajaran Kemenag */}
      {(activeCategory === 'semua' || activeCategory === 'kemenag') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-serif">
                <span>01. Mata Pelajaran Keagamaan (Kemenag)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pendidikan agama Islam terstruktur mencakup aspek Qur'an, akidah, ibadah syariah, sejarah, dan bahasa Al-Qur'an.
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {kemenagSubjects.length} Mata Pelajaran
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kemenagSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSubject(sub);
                }}
                className="bg-white rounded-xl border border-emerald-100 p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(sub.iconName)}
                    </div>
                    {sub.arabicName && (
                      <span className="font-arabic text-base text-emerald-800 font-bold" dir="rtl">
                        {sub.arabicName}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sub.teacherName}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold group-hover:underline">
                    Lihat Modul &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Mata Pelajaran Umum (Kemendikbud) */}
      {(activeCategory === 'semua' || activeCategory === 'umum') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg font-serif">
                <span>02. Mata Pelajaran Umum (Kemendikbudristek)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penguatan literasi, numerasi logika, pemahaman alam sekitar ciptaan Allah, dan kebangsaan Indonesia.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {umumSubjects.length} Mata Pelajaran
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {umumSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSubject(sub);
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(sub.iconName)}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      Kelas {sub.gradeLevels.join(', ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sub.teacherName}</span>
                  </div>
                  <span className="text-indigo-600 font-semibold group-hover:underline">
                    Lihat Modul &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {getIcon(selectedSubject.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 font-serif">
                      {selectedSubject.name}
                    </h2>
                    {selectedSubject.arabicName && (
                      <span className="font-arabic text-emerald-800 font-bold text-lg">
                        {selectedSubject.arabicName}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{selectedSubject.category === 'kemenag' ? 'Kurikulum Kemenag' : 'Kurikulum Nasional'}</span>
                    <span>·</span>
                    <span>Guru Pengampu: {selectedSubject.teacherName}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Overview */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Deskripsi & Capaian Pembelajaran
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {selectedSubject.description} Materi pembelajaran didesain dengan integrasi nilai-nilai keislaman, ramah tumbuh kembang anak usia SD/MI, serta menyertakan latihan interaktif audio dan visual.
              </p>
            </div>

            {/* Modules Uploaded by Teacher for this Subject */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {isStudent && studentGrade
                    ? `Modul & Materi Kelas ${studentGrade} (${materials.filter(m => (m.subjectName === selectedSubject.name || m.subjectId === selectedSubject.id) && m.grade === studentGrade).length})`
                    : `Modul & Materi Unggahan Guru (${materials.filter(m => (m.subjectName === selectedSubject.name || m.subjectId === selectedSubject.id) && (gradeFilter === 'semua' || m.grade === gradeFilter)).length})`
                  }
                </h4>
                <span className="text-[11px] text-slate-400">
                  {isStudent && studentGrade ? `🔒 Terkunci Kelas ${studentGrade}` : 'Tersinkronisasi Langsung'}
                </span>
              </div>

              {materials.filter(m => (m.subjectName === selectedSubject.name || m.subjectId === selectedSubject.id) && (isStudent && studentGrade ? m.grade === studentGrade : (gradeFilter === 'semua' || m.grade === gradeFilter))).length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                  {isStudent && studentGrade
                    ? `Belum ada modul resmi khusus untuk Kelas ${studentGrade} pada mata pelajaran ini.`
                    : 'Belum ada berkas unggahan khusus untuk mata pelajaran ini.'}
                </div>
              ) : (
                <div className="space-y-2.5">
                  {materials
                    .filter(m => (m.subjectName === selectedSubject.name || m.subjectId === selectedSubject.id) && (isStudent && studentGrade ? m.grade === studentGrade : (gradeFilter === 'semua' || m.grade === gradeFilter)))
                    .map((mat) => (
                      <div
                        key={mat.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                            {mat.format === 'Video' ? <Film className="w-4 h-4" /> : mat.format === 'Audio MP3' ? <Music className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              {mat.title}
                            </div>
                            <div className="text-xs text-slate-500 flex items-center gap-2">
                              <span>{mat.format}</span>
                              <span>·</span>
                              <span>{mat.teacherName}</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            soundEngine.playSuccess();
                            setSelectedModule(mat);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Pelajari</span>
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Sample Chapters */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Daftar Bab & Silabus Interaktif
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Pengenalan Konsep & Dalil Pokok
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> 2 Jam Pelajaran (JP)
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">Video Ajar Interaktif</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      soundEngine.playSuccess();
                      alert(`Memulai modul pembelajaran "${selectedSubject.name}: Bab 1"`);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Buka
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        Praktik Mandiri & Pembiasaan Adab
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> 2 JP
                        <span>·</span>
                        <span className="text-blue-700 font-medium">Lembar Kerja & Audio</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      soundEngine.playSuccess();
                      alert(`Membuka Lembar Kerja "${selectedSubject.name}: Bab 2"`);
                    }}
                    className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Lembar Kerja
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive In-App Material Reader Modal (Akses Langsung Tanpa Unduh) */}
      {selectedModule && (
        <MaterialReaderModal
          material={selectedModule}
          isOpen={Boolean(selectedModule)}
          onClose={() => setSelectedModule(null)}
          onComplete={() => {
            setSelectedModule(null);
          }}
        />
      )}
    </div>
  );
};
