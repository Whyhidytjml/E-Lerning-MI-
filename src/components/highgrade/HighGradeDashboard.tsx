import React, { useState, useRef, useEffect } from 'react';
import { Student, Assignment, LearningMaterial, DayLessonSchedule, LessonSession } from '../../types/lms';
import { mockAssignments, mockLearningMaterials, mockDailyLessonSchedules } from '../../data/mockData';
import { getStoredMaterials, MATERIALS_UPDATED_EVENT } from '../../utils/materialsStorage';
import { MaterialReaderModal } from '../common/MaterialReaderModal';
import { CbtExamModal } from '../cbt/CbtExamModal';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  UploadCloud, 
  Mic, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  X, 
  Play, 
  BookOpen, 
  Award, 
  Calendar,
  Sparkles,
  ChevronRight,
  FileCheck,
  FolderOpen,
  Download,
  Eye,
  File,
  Film,
  Music,
  MapPin,
  CalendarDays
} from 'lucide-react';

interface HighGradeDashboardProps {
  student: Student;
  onNavigateTab: (tab: string) => void;
}

export const HighGradeDashboard: React.FC<HighGradeDashboardProps> = ({
  student,
  onNavigateTab
}) => {
  const [activeView, setActiveView] = useState<'tugas' | 'modul_guru' | 'jadwal'>('tugas');
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

  // Determine current day for schedule
  const getTodayDayName = (): string => {
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const current = dayNames[new Date().getDay()];
    return current === 'Minggu' ? 'Senin' : current;
  };

  const [selectedScheduleDay, setSelectedScheduleDay] = useState<string>(getTodayDayName());
  const [scheduleViewMode, setScheduleViewMode] = useState<'harian' | 'pekanan'>('harian');

  // Class schedules for grade 5
  const classSchedules: DayLessonSchedule[] = 
    mockDailyLessonSchedules[student.grade] || 
    mockDailyLessonSchedules[5] || 
    [];

  const activeDaySchedule = 
    classSchedules.find(s => (s.day || s.dayName || '').toLowerCase() === selectedScheduleDay.toLowerCase()) || 
    classSchedules[0];

  // Materials loaded from localStorage so students can view teacher's uploaded materials
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => getStoredMaterials());

  // Sync materials when switching to modul_guru or on storage/custom events
  useEffect(() => {
    const syncMaterials = () => {
      setMaterials(getStoredMaterials());
    };
    syncMaterials();
    window.addEventListener('storage', syncMaterials);
    window.addEventListener(MATERIALS_UPDATED_EVENT, syncMaterials);
    return () => {
      window.removeEventListener('storage', syncMaterials);
      window.removeEventListener(MATERIALS_UPDATED_EVENT, syncMaterials);
    };
  }, [activeView]);
  
  // Submission Form State
  const [submissionType, setSubmissionType] = useState<'teks' | 'audio' | 'dokumen'>('dokumen');
  const [textSubmission, setTextSubmission] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [cbtModalOpen, setCbtModalOpen] = useState(false);

  // Hidden File Input Ref for native file manager access
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Module Viewer Modal State
  const [selectedModule, setSelectedModule] = useState<LearningMaterial | null>(null);
  const [moduleFilterCategory, setModuleFilterCategory] = useState<'semua' | 'kemenag' | 'umum'>('semua');

  const handleOpenSubmit = (asg: Assignment) => {
    soundEngine.playClick();
    setSelectedAssignment(asg);
    setTextSubmission('');
    setUploadedFileName(null);
    setUploadedFileSize(null);
    setAudioRecorded(false);
  };

  const handleTriggerFileInput = () => {
    soundEngine.playClick();
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundEngine.playSuccess();
      setUploadedFileName(file.name);
      setUploadedFileSize((file.size / 1024).toFixed(1) + ' KB');
    }
  };

  const handleConfirmSubmit = () => {
    if (!selectedAssignment) return;
    soundEngine.playReward();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    const updated = assignments.map(a => {
      if (a.id === selectedAssignment.id) {
        return {
          ...a,
          status: 'sudah_dikumpulkan' as const,
          studentSubmission: {
            submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
            textResponse: textSubmission || undefined,
            fileName: uploadedFileName || (submissionType === 'dokumen' ? 'Dokumen_Tugas_Siswa.pdf' : undefined),
            audioRecorded: audioRecorded
          }
        };
      }
      return a;
    });

    setAssignments(updated);
    setSelectedAssignment(null);
  };

  // Students can ONLY access learning materials belonging to their own class / grade
  const classMaterials = materials.filter(m => m.grade === student.grade);

  const filteredMaterials = classMaterials.filter(m => {
    if (moduleFilterCategory === 'semua') return true;
    return m.category === moduleFilterCategory;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Hidden File Input for Native File Manager */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.xlsx,.txt" 
      />

      {/* High Grade Header */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-400 uppercase mb-2">
              <span>Portal E-Learning Terpadu · Kelas Tinggi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Assalamu'alaikum, {student.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              {student.gradeLabel} · NIS: {student.nis} · Target Hafalan: Juz 30 ({student.juzProgress}% Selesai)
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveView('jadwal');
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              <span>Jadwal Pelajaran</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveView('modul_guru');
              }}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all flex items-center gap-2 cursor-pointer text-xs"
            >
              <BookOpen className="w-4 h-4 text-emerald-300" />
              <span>Lihat Modul Guru</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setCbtModalOpen(true);
              }}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs"
            >
              <FileCheck className="w-4 h-4 text-slate-950" />
              <span>Simulasi Ujian CBT (30 Soal & Timer)</span>
            </button>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Jadwal Hari Ini ({activeDaySchedule ? (activeDaySchedule.day || activeDaySchedule.dayName || 'Hari Ini') : 'Hari Ini'})</div>
            <div className="text-sm font-bold text-amber-300 mt-0.5 truncate">
              {activeDaySchedule ? activeDaySchedule.sessions.length : 0} Jam Pelajaran
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Tugas Aktif</div>
            <div className="text-lg font-bold text-white mt-0.5">{assignments.length} Tugas</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Modul Kelas {student.grade}</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{classMaterials.length} Modul Terbit</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Presensi Kehadiran</div>
            <div className="text-lg font-bold text-teal-400 mt-0.5">100% (Hadir Tepat)</div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher: Tugas vs Modul Guru vs Jadwal Pelajaran */}
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => { soundEngine.playClick(); setActiveView('tugas'); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'tugas' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Tugas & Penyerahan Mandiri</span>
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setActiveView('modul_guru'); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'modul_guru' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Melihat Modul dari Guru ({classMaterials.length})</span>
        </button>

        <button
          onClick={() => { soundEngine.playClick(); setActiveView('jadwal'); }}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeView === 'jadwal' 
              ? 'bg-emerald-600 text-white shadow-sm' 
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Jadwal Pelajaran Harian (Kelas 5)</span>
        </button>
      </div>

      {/* VIEW 1: ASSIGNMENTS & MULTI-FORMAT SUBMISSIONS */}
      {activeView === 'tugas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 font-serif">
                Daftar Tugas & Penyerahan Mandiri
              </h2>
              <p className="text-xs text-slate-500">
                Pilih berkas langsung dari file manager perangkat atau kirim rekaman suara & uraian.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {assignments.map((asg) => (
              <div
                key={asg.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      asg.category === 'kemenag'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                    }`}>
                      {asg.subjectName} ({asg.category === 'kemenag' ? 'Kemenag' : 'Umum'})
                    </span>

                    {asg.status === 'sudah_dikumpulkan' ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Terkumpul
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-200">
                        <Clock className="w-3.5 h-3.5" /> Tenggat: {asg.dueDate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {asg.instructions}
                  </p>

                  {asg.studentSubmission && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1 my-3">
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span>Lampiran Terkirim:</span>
                        <span className="text-emerald-700 font-bold">
                          {asg.studentSubmission.grade ? `Nilai: ${asg.studentSubmission.grade}/100` : 'Menunggu Penilaian Guru'}
                        </span>
                      </div>
                      {asg.studentSubmission.fileName && (
                        <div className="text-[11px] text-slate-700 font-mono bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                          <span className="truncate">📎 {asg.studentSubmission.fileName}</span>
                          <span className="text-emerald-600 font-bold text-[10px]">Tersimpan</span>
                        </div>
                      )}
                      {asg.studentSubmission.feedback && (
                        <div className="text-[11px] text-emerald-800 italic pt-1 border-t border-slate-200">
                          Catatan Guru: "{asg.studentSubmission.feedback}"
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Format: {asg.submissionFormat}
                  </span>

                  {asg.status === 'belum_selesai' ? (
                    <button
                      onClick={() => handleOpenSubmit(asg)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Kirim Dokumen / Tugas</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenSubmit(asg)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      Kirim Ulang
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: MELIHAT MODUL DARI GURU */}
      {activeView === 'modul_guru' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] border border-emerald-200">
                  Khusus {student.gradeLabel}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  🔒 Akses Terkunci: Hanya Menampilkan Materi Kelas {student.grade}
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-serif flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Bahan Ajar & Modul Kelas {student.grade} ({classMaterials.length} Modul)</span>
              </h2>
              <p className="text-xs text-slate-500">
                Akses materi resmi Kelas {student.grade} yang diterbitkan oleh ustadz & ustadzah pengampu.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setModuleFilterCategory('semua')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  moduleFilterCategory === 'semua' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Semua ({classMaterials.length})
              </button>
              <button
                onClick={() => setModuleFilterCategory('kemenag')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  moduleFilterCategory === 'kemenag' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Agama Kemenag ({classMaterials.filter(m => m.category === 'kemenag').length})
              </button>
              <button
                onClick={() => setModuleFilterCategory('umum')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  moduleFilterCategory === 'umum' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Mapel Umum ({classMaterials.filter(m => m.category === 'umum').length})
              </button>
            </div>
          </div>

          {filteredMaterials.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
              Belum ada modul yang diterbitkan untuk kategori ini pada Kelas {student.grade}.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMaterials.map((modul) => (
              <div 
                key={modul.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      modul.category === 'kemenag'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}>
                      {modul.subjectName}
                    </span>

                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      {modul.format === 'Video' && <Film className="w-3 h-3 text-rose-500" />}
                      {modul.format === 'Dokumen PDF' && <FileText className="w-3 h-3 text-red-500" />}
                      {modul.format === 'Audio MP3' && <Music className="w-3 h-3 text-emerald-500" />}
                      <span>{modul.format}</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1">
                    {modul.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {modul.description}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pengampu:</span>
                      <span className="font-bold text-slate-800">{modul.teacherName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Jadwal Rilis:</span>
                      <span>{modul.scheduledDate} ({modul.scheduledTime})</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedModule(modul);
                    }}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Materi (Akses Langsung Online)</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )}

      {/* VIEW 3: JADWAL PELAJARAN HARIAN & PEKANAN (KELAS 5 SITI KHADIJAH) */}
      {activeView === 'jadwal' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Section Header */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
                  📅
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-700" />
                    <span>Kurikulum Merdeka Madrasah · {student.gradeLabel}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                    Jadwal Pelajaran & Kalender Akademik Harian
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    MI Darul Ulum Sidareja · Tahun Ajaran 2026/2027 · Semester Genap
                  </p>
                </div>
              </div>

              {/* View Mode Toggle: Harian vs Matriks Sepekan */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl self-start sm:self-auto text-xs font-bold">
                <button
                  type="button"
                  onClick={() => { soundEngine.playClick(); setScheduleViewMode('harian'); }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    scheduleViewMode === 'harian'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Jadwal Harian</span>
                </button>
                <button
                  type="button"
                  onClick={() => { soundEngine.playClick(); setScheduleViewMode('pekanan'); }}
                  className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    scheduleViewMode === 'pekanan'
                      ? 'bg-white text-emerald-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Matriks Sepekan</span>
                </button>
              </div>
            </div>

            {/* Day Selector Pills for Daily Mode */}
            {scheduleViewMode === 'harian' && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {classSchedules.map((item, dIdx) => {
                  const dayLabel = item.day || item.dayName || `Hari ${dIdx + 1}`;
                  const isSelected = dayLabel.toLowerCase() === selectedScheduleDay.toLowerCase();
                  const isToday = dayLabel.toLowerCase() === getTodayDayName().toLowerCase();

                  return (
                    <button
                      key={dayLabel}
                      type="button"
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedScheduleDay(dayLabel);
                      }}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span>{dayLabel}</span>
                          {isToday && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                              isSelected ? 'bg-amber-400 text-amber-950' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              Hari Ini
                            </span>
                          )}
                        </div>
                        <span className={`text-[10px] font-amiri ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                          {item.dayArabic}
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                        isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {item.sessions.length} Jam
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* VIEW MODE 1: DAILY DETAIL */}
          {scheduleViewMode === 'harian' && (
            <div className="space-y-4">
              {/* Morning Habit Banner */}
              {activeDaySchedule?.morningHabit && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl shrink-0">🕌</span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                        Pembiasaan Pagi Karakter Madrasah
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                        {activeDaySchedule.morningHabit}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-800 hidden sm:inline-flex items-center gap-1 bg-white px-3 py-1 rounded-xl border border-amber-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Wajib Hadir Pagi
                  </span>
                </div>
              )}

              {/* Sessions List */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {activeDaySchedule?.sessions.map((session, idx) => (
                  <div
                    key={session.id || session.period || idx}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Period & Time Slot */}
                      <div className="flex items-center justify-between text-xs mb-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-white shadow-2xs">
                          Jam Ke-{session.period ?? session.periodLabel ?? (idx + 1)}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{session.time || session.timeSlot || '08.00 WIB'}</span>
                        </span>
                      </div>

                      {/* Subject Name & Category */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
                          {session.icon || '📖'}
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            session.category === 'kemenag' 
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          }`}>
                            {session.category === 'kemenag' ? 'Kurikulum Kemenag' : 'Mata Pelajaran Umum'}
                          </span>
                          <h3 className="font-bold text-slate-900 text-base leading-snug mt-1 group-hover:text-emerald-700 transition-colors">
                            {session.subjectName}
                          </h3>
                        </div>
                      </div>

                      {/* Focus Topic / Capaian Pembelajaran */}
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs mb-4">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                          Fokus Pembelajaran / CP:
                        </span>
                        <p className="font-semibold text-slate-800 leading-relaxed">
                          {session.focusTopic}
                        </p>
                      </div>

                      {/* Teacher & Room Location */}
                      <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400 font-medium">Asatidz:</span>
                          <span className="font-bold text-emerald-950 truncate">{session.teacherName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{session.room}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Access to Modul Guru */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium">Semester Genap 2026</span>
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setActiveView('modul_guru');
                          if (session.category === 'kemenag') setModuleFilterCategory('kemenag');
                          else setModuleFilterCategory('umum');
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Akses Modul Guru</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: WEEKLY TIMETABLE MATRIX (SENIN - SABTU) */}
          {scheduleViewMode === 'pekanan' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4 overflow-x-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Matriks Jadwal Pelajaran Sepekan Penuh (Senin – Sabtu)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Struktur kurikulum terpadu: 10 Asatidz Pemetaan Mapel Kemenag & Umum.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSuccess();
                    alert('Jadwal pelajaran sepekan siap dicetak atau disimpan.');
                  }}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh / Cetak Jadwal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classSchedules.map((dayPlan, pIdx) => {
                  const dayTitle = dayPlan.day || dayPlan.dayName || `Hari ${pIdx + 1}`;
                  return (
                    <div
                      key={dayTitle}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{dayTitle}</span>
                          <span className="text-xs font-amiri text-slate-400 ml-1.5">{dayPlan.dayArabic}</span>
                        </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {dayPlan.sessions.length} Pelajaran
                      </span>
                    </div>

                    <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-xl border border-amber-200 font-medium">
                      🕌 {dayPlan.morningHabit.split('(')[0]}
                    </div>

                    <div className="space-y-2">
                      {dayPlan.sessions.map((s, sIdx) => (
                        <div
                          key={s.id || s.period || sIdx}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-emerald-900 text-[11px]">
                              Jam {s.period ?? s.periodLabel ?? (sIdx + 1)} · {s.subjectName}
                            </span>
                            <span className="text-[10px] text-slate-400">{(s.time || s.timeSlot || '08.00').split(' ')[0]}</span>
                          </div>
                          <div className="text-[11px] text-slate-600 font-medium">
                            {s.teacherName.split(',')[0]}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            📍 {s.room}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
          )}
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

      {/* SUBMISSION MODAL WITH DIRECT NATIVE FILE MANAGER */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                  Pengumpulan Tugas Siswa
                </span>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {selectedAssignment.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Format Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Pilih Format Penyerahan:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSubmissionType('dokumen')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    submissionType === 'dokumen'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UploadCloud className="w-4 h-4 text-emerald-600" />
                  <span>Dokumen File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('teks')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    submissionType === 'teks'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Teks Uraian</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSubmissionType('audio')}
                  className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    submissionType === 'audio'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Mic className="w-4 h-4 text-emerald-600" />
                  <span>Rekaman Suara</span>
                </button>
              </div>
            </div>

            {/* Format Content */}
            {submissionType === 'dokumen' && (
              <div 
                onClick={handleTriggerFileInput}
                className="p-6 border-2 border-dashed border-emerald-300 rounded-2xl text-center space-y-3 bg-emerald-50/30 hover:bg-emerald-50/60 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700 group-hover:scale-105 transition-transform">
                  <FolderOpen className="w-6 h-6" />
                </div>
                <div>
                  {uploadedFileName ? (
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-900 block text-sm">
                        📁 Berkas Terpilih: {uploadedFileName}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-mono">
                        Ukuran: {uploadedFileSize || '245 KB'} · Siap Dikirimkan
                      </span>
                    </div>
                  ) : (
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">
                        Klik di sini untuk membuka File Manager HP / Komputer
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Mendukung PDF, Word (.docx), Excel, Powerpoint, dan Gambar JPG/PNG
                      </span>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTriggerFileInput();
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>{uploadedFileName ? 'Ganti Berkas dari File Manager' : 'Buka File Manager Perangkat'}</span>
                </button>
              </div>
            )}

            {submissionType === 'teks' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Tuliskan Jawaban Uraian:</label>
                <textarea
                  rows={5}
                  value={textSubmission}
                  onChange={(e) => setTextSubmission(e.target.value)}
                  placeholder="Ketikkan dalil, jawaban, atau kesimpulan laporan ananda di sini..."
                  className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            )}

            {submissionType === 'audio' && (
              <div className="p-6 border border-emerald-200 rounded-2xl text-center space-y-3 bg-emerald-50/40">
                <Mic className="w-8 h-8 text-emerald-600 mx-auto" />
                <div className="text-xs text-emerald-950 font-semibold">
                  {audioRecorded ? 'Audio bacaan tugas siap dikirim!' : 'Rekam suara penjelasan atau hafalan doa.'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playSuccess();
                    setAudioRecorded(!audioRecorded);
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  {audioRecorded ? 'Rekam Ulang' : 'Mulai Rekam Suara'}
                </button>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Kirimkan Tugas Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CBT / Try Out Exam Simulator Modal with Active Countdown Timer & Anti-Cheat Shuffling */}
      {cbtModalOpen && (
        <CbtExamModal
          student={student}
          isOpen={cbtModalOpen}
          onClose={() => setCbtModalOpen(false)}
        />
      )}
    </div>
  );
};
