import React, { useState } from 'react';
import { Student } from '../../types/lms';
import { soundEngine, speakInstruction } from '../../utils/audio';
import { GamifiedQuizModal } from './GamifiedQuizModal';
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
  SunMedium
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

  const handleVoiceGuide = () => {
    soundEngine.playClick();
    speakInstruction(
      `Assalamu'alaikum ${student.nickname}! Selamat datang di MadrasahKu. Hari ini kamu punya 3 misi utama: Pertama, setor hafalan surat Al-Kautsar. Kedua, centang shalat lima waktu di Mutaba'ah. Dan ketiga, mainkan kuis bintang untuk dapat hadiah! Semangat ya!`
    );
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

          {/* Tile 4: Struktur Pelajaran Tematik & Bahasa Arab */}
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
                Kemenag & Umum
              </div>
              <h3 className="text-lg font-black text-indigo-950">
                Pelajaran Tematik & Arab
              </h3>
              <p className="text-xs text-indigo-800 font-medium mt-1">
                Belajar mufradat Bahasa Arab, Aqidah Akhlak, dan Matematika.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-indigo-200/80 flex items-center justify-between text-xs font-black text-indigo-800">
              <span>Buka Semua Pelajaran</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Lencana Penghargaan (Badges) Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">
              Koleksi Lencana & Prestasi Ahmad
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

      {/* Gamified Quiz Modal */}
      <GamifiedQuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        onRewardClaim={onUpdateStats}
      />
    </div>
  );
};
