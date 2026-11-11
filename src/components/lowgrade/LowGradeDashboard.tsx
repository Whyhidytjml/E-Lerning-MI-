import React, { useState, useEffect } from 'react';
import { Student, LearningMaterial, DayLessonSchedule, LessonSession } from '../../types/lms';
import { mockDailyLessonSchedules } from '../../data/mockData';
import { soundEngine, speakInstruction } from '../../utils/audio';
import { getStoredMaterials, MATERIALS_UPDATED_EVENT } from '../../utils/materialsStorage';
import { GamifiedQuizModal } from './GamifiedQuizModal';
import { MaterialReaderModal } from '../common/MaterialReaderModal';
import { CbtExamModal } from '../cbt/CbtExamModal';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Star, 
  Volume2, 
  BookOpen, 
  HeartHandshake, 
  Trophy, 
  Flame, 
  Mic, 
  CheckCircle2, 
  Play, 
  ChevronRight, 
  Award, 
  SunMedium,
  Film,
  Music,
  FileText,
  Download,
  X,
  Eye,
  Calendar,
  Clock,
  MapPin,
  Compass,
  FileCheck,
  Shuffle
} from 'lucide-react';

interface LowGradeDashboardProps {
  student: Student;
  onNavigateTab: (tab: string) => void;
  onUpdateStats: (stars: number, points: number) => void;
}

export const LowGradeDashboard: React.FC<LowGradeDashboardProps> = ({
  student,
  onNavigateTab,
  onUpdateStats
}) => {
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [cbtModalOpen, setCbtModalOpen] = useState(false);
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => getStoredMaterials());
  const [selectedMaterial, setSelectedMaterial] = useState<LearningMaterial | null>(null);

  // Students can ONLY access learning materials belonging to their own class / grade
  const classMaterials = materials.filter(m => m.grade === student.grade);

  // Determine current day of week (in Indonesian)
  const getTodayDayName = (): string => {
    const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const current = dayNames[new Date().getDay()];
    return current === 'Minggu' ? 'Senin' : current;
  };

  const [selectedDay, setSelectedDay] = useState<string>(getTodayDayName());

  // Schedules for student's grade (default to grade 2)
  const classSchedules: DayLessonSchedule[] = 
    mockDailyLessonSchedules[student.grade] || 
    mockDailyLessonSchedules[2] || 
    [];

  const activeDaySchedule = 
    classSchedules.find(s => (s.day || s.dayName || '').toLowerCase() === selectedDay.toLowerCase()) || 
    classSchedules[0];

  const handleListenDaySchedule = (sched: DayLessonSchedule) => {
    soundEngine.playReward();
    const dayLabel = sched.day || sched.dayName || 'ini';
    const sessionDetails = sched.sessions
      .map(s => `Jam ke-${s.period ?? s.periodLabel ?? ''}, ${s.subjectName} bersama ${s.teacherName.split(',')[0]} di ${s.room}.`)
      .join(' ');
    speakInstruction(
      `Jadwal hari ${dayLabel} untuk santri cilik kelas dua: Kegiatan pagi: ${sched.morningHabit}. Selanjutnya, ${sessionDetails} Semangat belajar ya!`
    );
  };

  const handleListenSingleSession = (s: LessonSession) => {
    soundEngine.playClick();
    speakInstruction(
      `Jam ke-${s.period ?? s.periodLabel ?? ''}, pukul ${s.time ?? s.timeSlot ?? ''}. Pelajaran ${s.subjectName} bersama ${s.teacherName.split(',')[0]} di ${s.room}. Materi: ${s.focusTopic ?? 'Pembahasan tematik'}.`
    );
  };

  // Sync materials with real-time teacher uploads
  useEffect(() => {
    const handleSync = () => {
      setMaterials(getStoredMaterials());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleSync);
    };
  }, []);

  const handleVoiceGuide = () => {
    soundEngine.playClick();
    speakInstruction(
      `Assalamu'alaikum ${student.nickname}! Selamat datang di MadrasahKu. Ada ${classMaterials.length} modul belajar dari Ustadz khusus untuk kelas ${student.grade} yang siap kamu buka hari ini. Ayo belajar dengan gembira dan raih bintang emasmu!`
    );
  };

  const handleOpenMaterialForKid = (mat: LearningMaterial) => {
    soundEngine.playSuccess();
    setSelectedMaterial(mat);
    speakInstruction(`Membuka materi ${mat.title}. Ayo dengarkan dan pelajari bersama Ustadz ya!`);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Child-friendly Welcome Hero */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30 shrink-0">
              {student.avatar}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400 text-amber-950 rounded-full text-xs font-black shadow-xs mb-1.5">
                <SunMedium className="w-3.5 h-3.5" />
                <span>Semangat Pagi Santri Cilik!</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ahlan wa Sahlan, {student.nickname}!
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {student.gradeLabel} · NIS: {student.nis}
              </p>
            </div>
          </div>

          {/* Voice Prompt Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={handleVoiceGuide}
              className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95 text-xs sm:text-sm"
            >
              <Volume2 className="w-5 h-5 text-amber-900 animate-pulse" />
              <span>🔊 Dengarkan Suara Ustadz!</span>
            </button>
          </div>
        </div>

        {/* Daily Stats Pill strip */}
        <div className="mt-6 pt-5 border-t border-emerald-500/40 grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center border border-white/20">
            <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-lg sm:text-2xl">
              <Star className="w-5 h-5 fill-amber-300" />
              <span>{student.stars}</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-100">Bintang Emas</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center border border-white/20">
            <div className="flex items-center justify-center gap-1 text-cyan-200 font-black text-lg sm:text-2xl">
              <Sparkles className="w-5 h-5" />
              <span>{student.points}</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-100">Poin Belajar</div>
          </div>

          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3 text-center border border-white/20">
            <div className="flex items-center justify-center gap-1 text-rose-300 font-black text-lg sm:text-2xl">
              <Flame className="w-5 h-5 fill-rose-300" />
              <span>{student.streakDays} Hari</span>
            </div>
            <div className="text-[11px] font-bold text-emerald-100">Istiqomah Berdoa</div>
          </div>
        </div>
      </div>

      {/* Big Visual Nav Cards (Child-friendly navigation) */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <span>Ayo Pilih Petualangan Belajarmu Hari Ini:</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1: Setoran Tahfiz */}
          <div
            onClick={() => {
              soundEngine.playClick();
              onNavigateTab('tahfiz');
            }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border-3 border-emerald-300 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <Mic className="w-8 h-8" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black uppercase tracking-wider mb-1">
                Khas Madrasah
              </div>
              <h3 className="text-lg font-black text-emerald-950">
                Setoran Hafalan Al-Qur'an
              </h3>
              <p className="text-xs text-emerald-800 font-medium mt-1">
                Rekam suaramu membaca Surat Al-Kautsar untuk Ustadz!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs font-black text-emerald-800">
              <span>Mulai Rekam Suara</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 2: Mutaba'ah Ibadah */}
          <div
            onClick={() => {
              soundEngine.playClick();
              onNavigateTab('mutabaah');
            }}
            className="bg-gradient-to-br from-teal-50 to-cyan-50 border-3 border-teal-300 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-teal-500 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-8 h-8" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-teal-200 text-teal-900 text-[10px] font-black uppercase tracking-wider mb-1">
                Jurnal Harian
              </div>
              <h3 className="text-lg font-black text-teal-950">
                Mutaba'ah Shalat & Dhuha
              </h3>
              <p className="text-xs text-teal-800 font-medium mt-1">
                Centang shalat 5 waktu dan tadarus Qur'anmu hari ini.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-teal-200/80 flex items-center justify-between text-xs font-black text-teal-800">
              <span>Buka Jurnal Ibadah</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 3: Kuis Gamifikasi Seru */}
          <div
            onClick={() => {
              soundEngine.playReward();
              setQuizModalOpen(true);
            }}
            className="bg-gradient-to-br from-amber-50 to-orange-50 border-3 border-amber-300 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-amber-500 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black uppercase tracking-wider mb-1">
                Tantangan Bintang
              </div>
              <h3 className="text-lg font-black text-amber-950">
                Kuis Bintang & Pasangan Kata
              </h3>
              <p className="text-xs text-amber-800 font-medium mt-1">
                Mainkan tebak Asmaul Husna & Rukun Islam, raih 3 bintang!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs font-black text-amber-800">
              <span>Ayo Mainkan Sekarang!</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 4: Modul Materi dari Guru */}
          <div
            onClick={() => {
              soundEngine.playClick();
              onNavigateTab('kurikulum');
            }}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 border-3 border-indigo-300 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-200 text-indigo-900 text-[10px] font-black uppercase tracking-wider mb-1">
                Tersedia {classMaterials.length} Modul
              </div>
              <h3 className="text-lg font-black text-indigo-950">
                Modul & Video Kelas {student.grade}
              </h3>
              <p className="text-xs text-indigo-800 font-medium mt-1">
                Buka video pembelajaran, buku cerita Islami, dan materi tematik kelas {student.grade}.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-200/80 flex items-center justify-between text-xs font-black text-indigo-800">
              <span>Buka Modul Ajar</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 5: Simulasi CBT Madrasah */}
          <div
            onClick={() => {
              soundEngine.playClick();
              setCbtModalOpen(true);
            }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 border-3 border-emerald-400 rounded-3xl p-6 shadow-2xs hover:shadow-lg hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between group transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                <FileCheck className="w-8 h-8" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 text-[10px] font-black uppercase tracking-wider mb-1 flex items-center gap-1 w-fit">
                <Shuffle className="w-3 h-3 text-emerald-800" />
                <span>Per Mata Pelajaran & Timer</span>
              </div>
              <h3 className="text-lg font-black text-emerald-950">
                Simulasi Asesmen CBT
              </h3>
              <p className="text-xs text-emerald-800 font-medium mt-1">
                Pilih mata pelajaran (Fikih, Qurdis, Matematika, dll) dengan penghitung waktu aktif.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-emerald-300 flex items-center justify-between text-xs font-black text-emerald-900">
              <span>Mulai Ujian CBT</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION: JADWAL PELAJARAN SANTRI CILIK (KELAS 2 ALI BIN ABI THALIB) */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/60 rounded-3xl border-2 border-emerald-300 p-6 sm:p-7 shadow-sm space-y-5">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-2xl shadow-sm shrink-0">
              📅
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Jadwal Harian · {student.gradeLabel}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>Jadwal Belajar Santri Cilik</span>
                <span className="text-sm font-bold text-emerald-700 bg-white px-2.5 py-0.5 rounded-xl border border-emerald-200 shadow-2xs">
                  {activeDaySchedule ? (activeDaySchedule.day || activeDaySchedule.dayName || 'Hari Ini') : 'Hari Ini'}
                </span>
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Lihat mata pelajaran, asatidz pengampu, dan ruangan kelasmu setiap hari.
              </p>
            </div>
          </div>

          {/* Voice read-aloud button for today's schedule */}
          {activeDaySchedule && (
            <button
              onClick={() => handleListenDaySchedule(activeDaySchedule)}
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-2xl font-black text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-center active:scale-95 border border-amber-300"
            >
              <Volume2 className="w-4 h-4 text-amber-950 animate-pulse" />
              <span>🔊 Dengarkan Jadwal {activeDaySchedule.day || activeDaySchedule.dayName}</span>
            </button>
          )}
        </div>

        {/* Day of Week Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {classSchedules.map((item, dIdx) => {
            const dayLabel = item.day || item.dayName || `Hari ${dIdx + 1}`;
            const isSelected = dayLabel.toLowerCase() === selectedDay.toLowerCase();
            const isToday = dayLabel.toLowerCase() === getTodayDayName().toLowerCase();

            return (
              <button
                key={dayLabel}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedDay(dayLabel);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer shrink-0 flex flex-col items-center gap-0.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-slate-200'
                }`}
              >
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
                <span className={`text-[10px] font-amiri font-normal ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                  {item.dayArabic}
                </span>
              </button>
            );
          })}
        </div>

        {/* Morning Habit Card (Pembiasaan Islami Pagi) */}
        {activeDaySchedule?.morningHabit && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-100/70 border border-amber-300/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl shrink-0">🕌</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                  Pembiasaan Pagi Madrasah
                </span>
                <p className="text-xs sm:text-sm font-bold text-amber-950 mt-0.5">
                  {activeDaySchedule.morningHabit}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-amber-800 hidden sm:inline-flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-xl">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Wajib Diikuti
            </span>
          </div>
        )}

        {/* Lesson Session Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeDaySchedule?.sessions.map((session, idx) => (
            <div
              key={session.id || session.period || idx}
              className="bg-white rounded-2xl border-2 border-emerald-100 hover:border-emerald-400 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Period & Time */}
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-2xs">
                    Jam Ke-{session.period ?? session.periodLabel ?? (idx + 1)}
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{session.time || session.timeSlot || '08.00 WIB'}</span>
                  </span>
                </div>

                {/* Subject Name with Large Icon */}
                <div className="flex items-start gap-3 mb-2.5">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center text-xl shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
                    {session.icon || '📖'}
                  </div>
                  <div className="min-w-0">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      session.category === 'kemenag' 
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-indigo-100 text-indigo-900 border border-indigo-200'
                    }`}>
                      {session.category === 'kemenag' ? 'Khas Kemenag' : 'Mapel Umum'}
                    </span>
                    <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug mt-1 group-hover:text-emerald-700 transition-colors">
                      {session.subjectName}
                    </h3>
                  </div>
                </div>

                {/* Focus Topic */}
                <div className="bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 text-xs mb-3">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Fokus Materi:</span>
                  <span className="font-semibold text-slate-800 line-clamp-2">{session.focusTopic}</span>
                </div>

                {/* Teacher and Room info */}
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="text-slate-400 font-bold">Guru:</span>
                    <span className="font-bold text-emerald-900">{session.teacherName}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{session.room}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons: Read aloud & Quick view */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleListenSingleSession(session)}
                  className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-xl text-[11px] font-bold transition-colors flex items-center gap-1 cursor-pointer border border-amber-200"
                  title="Dengarkan rincian pelajaran ini"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Dengar</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    onNavigateTab('kurikulum');
                  }}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Buka Modul</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION: MODUL & BACAAN TERBARU LANGSUNG DARI USTADZ (KHUSUS KELAS SISWA) */}
      <div className="bg-white rounded-3xl border border-emerald-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              📖
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-200">
                  Khusus {student.gradeLabel}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  🔒 Akses Terkunci Sesuai Kelas Anda
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Modul Ajar dari Ustadz ({classMaterials.length} Modul Kelas {student.grade})
              </h3>
              <p className="text-xs text-slate-500">
                Materi resmi Kelas {student.grade} yang siap kamu baca dan dengarkan langsung online tanpa perlu unduh.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('kurikulum')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
          >
            <span>Lihat Semua Pelajaran ({classMaterials.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {classMaterials.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            Belum ada modul yang diterbitkan khusus untuk Kelas {student.grade}. Modul baru akan muncul otomatis saat ustadz mengunggahnya.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classMaterials.map((mat) => (
              <div
                key={mat.id}
                onClick={() => handleOpenMaterialForKid(mat)}
                className="p-4 rounded-2xl border-2 border-emerald-100 hover:border-emerald-400 bg-emerald-50/20 hover:bg-emerald-50/50 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-200">
                      {mat.subjectName}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                      {mat.format === 'Video' && <Film className="w-3 h-3 text-rose-500" />}
                      {mat.format === 'Dokumen PDF' && <FileText className="w-3 h-3 text-red-500" />}
                      {mat.format === 'Audio MP3' && <Music className="w-3 h-3 text-emerald-500" />}
                      <span>{mat.format}</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors line-clamp-1">
                    {mat.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="text-[11px] text-slate-500 font-normal">Guru: {mat.teacherName.split(',')[0]}</span>
                  <span className="flex items-center gap-1 text-emerald-700 group-hover:translate-x-0.5 transition-transform">
                    <span>Baca Langsung Online</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lencana Penghargaan (Badges) Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Koleksi Lencana & Prestasi {student.nickname}
            </h3>
            <p className="text-xs text-slate-500">
              Kumpulkan lencana dengan istiqomah belajar, shalat, dan menghafal Al-Qur'an.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            3 Lencana Terbuka
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-white flex items-center justify-center text-xl mb-2 shadow-xs">
              🕌
            </div>
            <div className="font-bold text-xs text-slate-800">Bintang Subuh</div>
            <div className="text-[10px] text-amber-800 font-medium mt-0.5">7 hari shalat subuh di masjid</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl mb-2 shadow-xs">
              📖
            </div>
            <div className="font-bold text-xs text-slate-800">Hafiz Cilik</div>
            <div className="text-[10px] text-emerald-800 font-medium mt-0.5">Mutqin 5 Surat Juz 30</div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xl mb-2 shadow-xs">
              🤲🏻
            </div>
            <div className="font-bold text-xs text-slate-800">Santri Beradab</div>
            <div className="text-[10px] text-teal-800 font-medium mt-0.5">Selalu berbakti ke orang tua</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center flex flex-col items-center opacity-60">
            <div className="w-12 h-12 rounded-xl bg-slate-200 text-slate-400 flex items-center justify-center text-xl mb-2">
              🔒
            </div>
            <div className="font-bold text-xs text-slate-500">Juara Tajwid</div>
            <div className="text-[10px] text-slate-400 font-medium mt-0.5">Hafal Surat Al-Balad</div>
          </div>
        </div>
      </div>

      {/* Interactive In-App Material Reader Modal (Akses Langsung Tanpa Unduh) */}
      {selectedMaterial && (
        <MaterialReaderModal
          material={selectedMaterial}
          isOpen={Boolean(selectedMaterial)}
          studentGrade={student.grade}
          onClose={() => setSelectedMaterial(null)}
          onComplete={(earnedStars, earnedPoints) => {
            onUpdateStats(earnedStars, earnedPoints);
            setSelectedMaterial(null);
          }}
        />
      )}

      {/* Gamified Quiz Modal */}
      {quizModalOpen && (
        <GamifiedQuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          onRewardClaim={onUpdateStats}
        />
      )}

      {/* CBT Exam Simulator Modal */}
      {cbtModalOpen && (
        <CbtExamModal
          student={student}
          isOpen={cbtModalOpen}
          onClose={() => setCbtModalOpen(false)}
          onComplete={(score) => onUpdateStats(2, 25)}
        />
      )}
    </div>
  );
};
