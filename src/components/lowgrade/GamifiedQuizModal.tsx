import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine, speakInstruction } from '../../utils/audio';
import { Sparkles, Trophy, Award, CheckCircle2, RotateCcw, X, Volume2, Star } from 'lucide-react';

interface QuizPair {
  id: string;
  left: string;
  right: string;
  arabic?: string;
  matched?: boolean;
}

const quizStages = [
  {
    title: "Misi 1: Pasangkan Rukun Islam Sesuai Urutan",
    instruction: "Tarik atau klik nomor dan rukun islam yang sesuai ya!",
    voiceText: "Ayo pasangkan nomor urut dengan rukun Islam yang benar!",
    pairs: [
      { id: '1', left: 'Rukun 1', right: 'Mengucapkan Dua Kalimat Syahadat', arabic: 'الشهادتان' },
      { id: '2', left: 'Rukun 2', right: 'Mendirikan Shalat 5 Waktu', arabic: 'إقام الصلاة' },
      { id: '3', left: 'Rukun 3', right: 'Membayar Zakat', arabic: 'إيتاء الزكاة' },
      { id: '4', left: 'Rukun 4', right: 'Berpuasa di Bulan Ramadhan', arabic: 'صوم رمضان' },
      { id: '5', left: 'Rukun 5', right: 'Ibadah Haji bagi yang Mampu', arabic: 'حج البيت' }
    ]
  },
  {
    title: "Misi 2: Mengenal Asmaul Husna",
    instruction: "Pasangkan Nama Indah Allah dengan artinya!",
    voiceText: "Hebat! Sekarang pasangkan nama indah Allah dengan artinya yang tepat!",
    pairs: [
      { id: 'a', left: 'Ar-Rahmaan', right: 'Maha Pengasih kepada seluruh makhluk', arabic: 'الرَّحْمٰنُ' },
      { id: 'b', left: 'Ar-Rahiim', right: 'Maha Penyayang kepada hamba yang beriman', arabic: 'الرَّحِيْمُ' },
      { id: 'c', left: 'Al-Malik', right: 'Maha Merajai alam semesta', arabic: 'الْمَلِكُ' },
      { id: 'd', left: 'Al-Quddus', right: 'Maha Suci dari segala kekurangan', arabic: 'الْقُدُّوْسُ' }
    ]
  }
];

interface GamifiedQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardClaim: (stars: number, points: number) => void;
}

export const GamifiedQuizModal: React.FC<GamifiedQuizModalProps> = ({
  isOpen,
  onClose,
  onRewardClaim
}) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStage = quizStages[currentStageIdx];
  const allMatched = matchedIds.length === currentStage.pairs.length;

  const handleSelectLeft = (id: string) => {
    soundEngine.playClick();
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
    setWrongPair(false);

    if (selectedRight) {
      checkMatch(id, selectedRight);
    }
  };

  const handleSelectRight = (id: string) => {
    soundEngine.playClick();
    if (matchedIds.includes(id)) return;
    setSelectedRight(id);
    setWrongPair(false);

    if (selectedLeft) {
      checkMatch(selectedLeft, id);
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // Match found!
      soundEngine.playSuccess();
      const newMatched = [...matchedIds, leftId];
      setMatchedIds(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check if stage complete
      if (newMatched.length === currentStage.pairs.length) {
        soundEngine.playReward();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        if (currentStageIdx < quizStages.length - 1) {
          setTimeout(() => {
            setCurrentStageIdx(prev => prev + 1);
            setMatchedIds([]);
            setSelectedLeft(null);
            setSelectedRight(null);
          }, 1200);
        } else {
          setCompleted(true);
          speakInstruction("MasyaAllah luar biasa! Kamu berhasil menyelesaikan semua kuis bintang!");
        }
      }
    } else {
      // Wrong match
      setWrongPair(true);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setWrongPair(false);
      }, 700);
    }
  };

  const resetQuiz = () => {
    setCurrentStageIdx(0);
    setMatchedIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-gradient-to-b from-amber-50/70 via-white to-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!completed ? (
          <div>
            {/* Header with Stars & Voice Prompt */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold border border-amber-300 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
                <span>Gamifikasi Siswa Rendah · Level {currentStageIdx + 1} / {quizStages.length}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                {currentStage.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {currentStage.instruction}
              </p>

              {/* Sound prompt button */}
              <button
                onClick={() => speakInstruction(currentStage.voiceText)}
                className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>Dengarkan Petunjuk Suara</span>
              </button>
            </div>

            {/* Error indicator */}
            {wrongPair && (
              <div className="mb-4 text-center py-1.5 px-3 bg-rose-100 text-rose-800 text-xs font-bold rounded-xl animate-shake">
                Coba lagi ya, pasangannya belum tepat! Semangat! 💪
              </div>
            )}

            {/* Interactive Matching Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 my-6">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                  Kolom A (Nomor / Lafaz)
                </div>
                {currentStage.pairs.map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <button
                      key={`left-${item.id}`}
                      disabled={isMatched}
                      onClick={() => handleSelectLeft(item.id)}
                      className={`w-full p-4 rounded-2xl text-left font-bold transition-all flex items-center justify-between cursor-pointer border-2 ${
                        isMatched
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                          : isSelected
                          ? 'bg-amber-100 border-amber-500 text-amber-950 scale-102 shadow-md ring-2 ring-amber-400'
                          : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800 shadow-2xs hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center text-xs font-black">
                          {item.id}
                        </span>
                        <span className="text-sm">{item.left}</span>
                      </div>
                      {item.arabic && (
                        <span className="font-arabic text-base text-emerald-800 font-bold" dir="rtl">
                          {item.arabic}
                        </span>
                      )}
                      {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
                  Kolom B (Pasangan / Makna)
                </div>
                {/* Permute or display items */}
                {[...currentStage.pairs].reverse().map((item) => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedRight === item.id;
                  return (
                    <button
                      key={`right-${item.id}`}
                      disabled={isMatched}
                      onClick={() => handleSelectRight(item.id)}
                      className={`w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between cursor-pointer border-2 ${
                        isMatched
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900 opacity-80 cursor-default'
                          : isSelected
                          ? 'bg-amber-100 border-amber-500 text-amber-950 scale-102 shadow-md ring-2 ring-amber-400'
                          : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800 shadow-2xs hover:border-amber-300'
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-semibold">{item.right}</span>
                      {isMatched && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Progress */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Terpasang: {matchedIds.length} dari {currentStage.pairs.length}</span>
              </div>
              <button
                onClick={resetQuiz}
                className="flex items-center gap-1 text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Misi</span>
              </button>
            </div>
          </div>
        ) : (
          /* Completion Celebration Card */
          <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-300 flex items-center justify-center text-white shadow-lg animate-bounce">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1 text-amber-600 font-bold text-sm">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <Star className="w-6 h-6 fill-amber-400 text-amber-500 -mt-2" />
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              MasyaAllah, Hebat Sekali!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Kamu berhasil menyelesaikan tantangan kuis interaktif Rukun Islam dan Asmaul Husna dengan sempurna!
            </p>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 max-w-xs mx-auto flex items-center justify-around">
              <div>
                <div className="text-2xl font-black text-amber-600">+3</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Bintang Emas</div>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <div className="text-2xl font-black text-emerald-600">+150</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Poin Madrasah</div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundEngine.playReward();
                  onRewardClaim(3, 150);
                  onClose();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer text-sm"
              >
                Klaim Hadiah Bintang & Simpan! 🌟
              </button>
              <button
                onClick={resetQuiz}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-all cursor-pointer text-xs"
              >
                Main Lagi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
