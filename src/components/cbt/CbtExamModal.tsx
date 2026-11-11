import React, { useState, useEffect, useMemo } from 'react';
import { Student, CbtExamResult } from '../../types/lms';
import {
  cbtSubjectList,
  CbtSubjectItem,
  getShuffledQuestionsForStudent,
  CbtQuestionItem
} from '../../data/cbtQuestions';
import { saveCbtResult } from '../../utils/cbtStorage';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Flag,
  BookOpen,
  X,
  Shuffle,
  Send,
  Eye,
  Check,
  AlertTriangle,
  ArrowLeft,
  Layers,
  Sparkles,
  GraduationCap
} from 'lucide-react';

interface CbtExamModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (score: number) => void;
  initialSubjectId?: string | null;
}

export const CbtExamModal: React.FC<CbtExamModalProps> = ({
  student,
  isOpen,
  onClose,
  onComplete,
  initialSubjectId = null
}) => {
  // Currently selected subject (null means showing the Subject Selection Hub)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [subjectFilterCategory, setSubjectFilterCategory] = useState<'all' | 'kemenag' | 'umum'>('all');

  // Session seed/salt to allow re-taking the test with a fresh permutation if desired
  const [sessionSalt, setSessionSalt] = useState<number>(0);

  // Active Countdown Timer state
  const [secondsLeft, setSecondsLeft] = useState<number>(900);
  const [timerActive, setTimerActive] = useState<boolean>(true);

  // Exam state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Confirm finish modal & incomplete warning modal
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [showIncompleteAlert, setShowIncompleteAlert] = useState<boolean>(false);

  // Navigator drawer state (on mobile/desktop)
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);

  // Review mode after finishing
  const [showReview, setShowReview] = useState<boolean>(false);

  // Auto-submit alert message
  const [autoSubmitNotice, setAutoSubmitNotice] = useState<boolean>(false);

  // Identify active subject object
  const currentSubject: CbtSubjectItem | { id: string; name: string; shortName: string; category: 'kemenag'; teacherName: string; durationMinutes: number; questionCount: number; description: string; gradient: string; borderColor: string; iconBg: string; badgeBg: string; } | null = useMemo(() => {
    if (!selectedSubjectId) return null;
    if (selectedSubjectId === 'all') {
      return {
        id: 'all',
        name: 'Paket Terpadu (Semua Mapel)',
        shortName: 'Semua Mapel',
        category: 'kemenag',
        teacherName: 'Tim Kurikulum MI Darul Ulum',
        durationMinutes: 30,
        questionCount: 30,
        description: 'Simulasi ujian komprehensif gabungan seluruh mata pelajaran madrasah.',
        gradient: 'from-slate-900 via-emerald-950 to-slate-900',
        borderColor: 'border-emerald-500',
        iconBg: 'bg-emerald-500 text-slate-950',
        badgeBg: 'bg-emerald-500 text-slate-950'
      };
    }
    return cbtSubjectList.find((s) => s.id === selectedSubjectId) || null;
  }, [selectedSubjectId]);

  // Deterministically shuffled questions for this specific student and selected subject
  const questions: CbtQuestionItem[] = useMemo(() => {
    if (!selectedSubjectId) return [];
    const studentIdentifier = student.nis || student.id || 'std_default';
    return getShuffledQuestionsForStudent(studentIdentifier, sessionSalt, selectedSubjectId);
  }, [student.nis, student.id, sessionSalt, selectedSubjectId]);

  const totalQuestions = questions.length;
  const examDurationSeconds = (currentSubject?.durationMinutes || 15) * 60;

  // Reset state when modal opens or initialSubjectId changes
  useEffect(() => {
    if (isOpen) {
      if (initialSubjectId) {
        setSelectedSubjectId(initialSubjectId);
      } else {
        setSelectedSubjectId(null);
      }
      setCurrentIndex(0);
      setAnswers({});
      setFlagged({});
      setIsFinished(false);
      setShowConfirmSubmit(false);
      setShowIncompleteAlert(false);
      setShowReview(false);
      setAutoSubmitNotice(false);
    }
  }, [isOpen, initialSubjectId]);

  // Reset exam whenever a subject is picked or sessionSalt changes
  useEffect(() => {
    if (selectedSubjectId && currentSubject) {
      const dur = currentSubject.durationMinutes * 60;
      setSecondsLeft(dur);
      setTimerActive(true);
      setCurrentIndex(0);
      setAnswers({});
      setFlagged({});
      setIsFinished(false);
      setShowConfirmSubmit(false);
      setShowIncompleteAlert(false);
      setShowReview(false);
      setAutoSubmitNotice(false);
    }
  }, [selectedSubjectId, sessionSalt, currentSubject]);

  // Calculate score and finish
  const calculateAndFinish = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) {
        correct++;
      }
    });

    const finalScore = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;
    setCorrectCount(correct);
    setScore(finalScore);
    setIsFinished(true);
    setTimerActive(false);
    setShowConfirmSubmit(false);

    const predicate = finalScore >= 90 ? 'Mumtaz' :
      finalScore >= 80 ? 'Jayyid Jiddan' :
      finalScore >= 70 ? 'Jayyid' :
      finalScore >= 60 ? 'Maqbul' : 'Perlu Bimbingan';

    const durationSpent = Math.max(1, Math.round((examDurationSeconds - secondsLeft) / 60));

    // Save exam result to persistent storage so teachers can view and evaluate immediately
    const resultRecord: CbtExamResult = {
      id: `cbt_res_${Date.now()}`,
      studentId: student.id,
      studentNis: student.nis || student.id,
      studentName: student.name,
      studentGrade: student.grade,
      className: student.gradeLabel,
      subjectId: selectedSubjectId || 'all',
      subjectName: currentSubject?.name || 'Asesmen CBT',
      category: (currentSubject?.category as any) || 'kemenag',
      score: finalScore,
      totalQuestions,
      correctCount: correct,
      wrongCount: totalQuestions - correct,
      unansweredCount: 0,
      predicate,
      completedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB',
      timestamp: Date.now(),
      packageCode: studentPackageCode,
      durationSpentMinutes: durationSpent,
      isPassed: finalScore >= 70,
      answersSnapshot: { ...answers }
    };

    saveCbtResult(resultRecord);

    if (finalScore >= 70) {
      soundEngine.playReward();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } else {
      soundEngine.playSuccess();
    }

    if (onComplete) {
      onComplete(finalScore);
    }
  };

  const handleForceAutoSubmit = () => {
    setAutoSubmitNotice(true);
    calculateAndFinish();
  };

  // Active Timer Countdown Effect
  useEffect(() => {
    if (!isOpen || !selectedSubjectId || isFinished || !timerActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleForceAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, selectedSubjectId, isFinished, timerActive, answers, questions]);

  // Format seconds into MM:SS
  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Percentage of timer remaining
  const timeProgressPercent = Math.max(0, Math.min(100, (secondsLeft / examDurationSeconds) * 100));
  const isTimeCritical = secondsLeft <= 300 && secondsLeft > 0; // Less than 5 minutes

  // Handle answering a question
  const handleSelectOption = (optIdx: number) => {
    soundEngine.playClick();
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx
    }));
  };

  // Toggle flag / ragu-ragu
  const handleToggleFlag = () => {
    soundEngine.playClick();
    setFlagged((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex]
    }));
  };

  // Unique hash code for anti-cheat verification badge
  const studentPackageCode = useMemo(() => {
    const idStr = `${student.nis || student.id || 'STD'}-${selectedSubjectId || 'ALL'}-${sessionSalt}`;
    let hash = 0;
    for (let i = 0; i < idStr.length; i++) {
      hash = (hash << 5) - hash + idStr.charCodeAt(i);
      hash |= 0;
    }
    return `PKT-${Math.abs(hash).toString(16).toUpperCase().padStart(4, '0')}`;
  }, [student.nis, student.id, selectedSubjectId, sessionSalt]);

  // Answered stats
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = Math.max(0, totalQuestions - answeredCount);
  const flaggedCount = Object.values(flagged).filter(Boolean).length;
  const isAllAnswered = answeredCount === totalQuestions && totalQuestions > 0;

  // Find index of first unanswered question for fast jump
  const firstUnansweredIndex = useMemo(() => {
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] === undefined) return i;
    }
    return -1;
  }, [answers, totalQuestions]);

  // Handle submit attempt with strict completion check
  const handleSubmitAttempt = () => {
    soundEngine.playClick();
    if (!isAllAnswered) {
      setShowIncompleteAlert(true);
    } else {
      setShowConfirmSubmit(true);
    }
  };

  // Switch back to Subject Hub
  const handleBackToSubjectHub = () => {
    soundEngine.playClick();
    if (!isFinished && answeredCount > 0) {
      if (confirm('Ujian sedang berjalan. Jika Anda kembali ke daftar mapel, progres ujian saat ini akan dibatalkan. Lanjutkan?')) {
        setSelectedSubjectId(null);
      }
    } else {
      setSelectedSubjectId(null);
    }
  };

  // Filtered subject list based on category tab
  const filteredSubjects = useMemo(() => {
    if (subjectFilterCategory === 'all') return cbtSubjectList;
    return cbtSubjectList.filter((s) => s.category === subjectFilterCategory);
  }, [subjectFilterCategory]);

  // Early return if modal not open
  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        
        {/* ========================================================================= */}
        {/* VIEW 1: SUBJECT SELECTION HUB (When selectedSubjectId === null)           */}
        {/* ========================================================================= */}
        {!selectedSubjectId ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Hub Header */}
            <div className="p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wide uppercase flex items-center gap-1 shadow-xs">
                    <Shuffle className="w-3 h-3" />
                    <span>CBT Berbasis Mata Pelajaran</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-mono text-[10px]">
                    {student.name} ({student.gradeLabel})
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                  <span>Pusat Simulasi Asesmen CBT Madrasah</span>
                </h2>
                <p className="text-xs text-slate-300 max-w-xl">
                  Pilih mata pelajaran yang ingin Anda kerjakan. Setiap ujian memiliki soal, durasi waktu, dan penilaian tersendiri sesuai capaian kurikulum.
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 text-xs">
                <button
                  onClick={() => setSubjectFilterCategory('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    subjectFilterCategory === 'all'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semua Mapel ({cbtSubjectList.length})
                </button>
                <button
                  onClick={() => setSubjectFilterCategory('kemenag')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    subjectFilterCategory === 'kemenag'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  PAI & Kemenag (5)
                </button>
                <button
                  onClick={() => setSubjectFilterCategory('umum')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    subjectFilterCategory === 'umum'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Mata Pelajaran Umum (5)
                </button>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Sistem mengacak nomor soal secara otomatis untuk setiap santri
              </div>
            </div>

            {/* Subject Grid Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              
              {/* Optional: Comprehensive Multi-Subject Banner */}
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 text-white border border-emerald-500/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-slate-950" />
                      <span>Paket Ujian Terpadu</span>
                    </span>
                    <span className="text-xs text-emerald-300 font-medium">
                      30 Soal Campuran • Waktu 30 Menit
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                    Simulasi Asesmen Komprehensif (Semua Mapel)
                  </h3>
                  <p className="text-xs text-slate-300 max-w-lg">
                    Ujian latihan gabungan seluruh mata pelajaran (PAI, Bahasa, Matematika, IPAS, PPKn, & SBdP) untuk persiapan Asesmen Madrasah.
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedSubjectId('all');
                  }}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg transition-transform active:scale-95 shrink-0 flex items-center justify-center gap-2"
                >
                  <span>Mulai Ujian Terpadu</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Subject Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {filteredSubjects.map((subj) => (
                  <div
                    key={subj.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shadow-xs ${subj.iconBg}`}>
                            <BookOpen className="w-5 h-5" />
                          </div>
                          <div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${subj.badgeBg}`}>
                              {subj.category === 'kemenag' ? 'PAI & Kemenag' : 'Umum / Tematik'}
                            </span>
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                              {subj.name}
                            </h4>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs border border-slate-200 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" />
                            <span>{subj.durationMinutes} Menit</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed">
                        {subj.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="text-[11px] text-slate-500">
                        Guru: <strong className="text-slate-700 font-medium">{subj.teacherName}</strong>
                      </div>

                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedSubjectId(subj.id);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-all flex items-center gap-1.5 group-hover:bg-emerald-600"
                      >
                        <span>Mulai CBT ({subj.questionCount} Soal)</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Hub Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
                <span>LMS CBT MI Darul Ulum Sidareja • Tahun Ajaran 2024/2025</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW 2: ACTIVE EXAM SIMULATION (Specific Subject or Comprehensive)        */
          /* ========================================================================= */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Exam Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleBackToSubjectHub}
                    className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-200 hover:text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Kembali ke Pilihan Mata Pelajaran"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Ganti Mapel</span>
                  </button>

                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wide uppercase flex items-center gap-1 shadow-xs">
                    <Shuffle className="w-3 h-3" />
                    <span>CBT {currentSubject?.shortName}</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-mono text-[10px] border border-white/20">
                    Kode: {studentPackageCode}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold font-serif text-white flex items-center gap-2">
                  <span>Simulasi CBT: {currentSubject?.name}</span>
                  <span className="text-xs font-normal text-slate-300">({totalQuestions} Soal Terpilih)</span>
                </h2>
                <div className="text-[11px] text-emerald-300">
                  Pengampu: {currentSubject?.teacherName} • Santri: {student.name} ({student.gradeLabel})
                </div>
              </div>

              {/* Countdown Timer & Action Controls */}
              {!isFinished && (
                <div className="flex items-center gap-2.5 self-start sm:self-auto">
                  {/* Live Timer Card */}
                  <div
                    className={`px-3.5 py-1.5 rounded-2xl flex items-center gap-2 border font-mono transition-all ${
                      isTimeCritical
                        ? 'bg-rose-600/90 border-rose-400 text-white animate-pulse'
                        : 'bg-white/10 border-white/20 text-white'
                    }`}
                  >
                    <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-amber-200' : 'text-emerald-400'}`} />
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-wider text-slate-300 font-sans font-semibold">
                        Sisa Waktu
                      </div>
                      <div className="text-sm sm:text-base font-bold leading-none">
                        {formatTime(secondsLeft)}
                      </div>
                    </div>
                  </div>

                  {/* Toggle Question Grid Button */}
                  <button
                    onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      showQuestionGrid
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-white/10 hover:bg-white/20 text-emerald-200 border-white/20'
                    }`}
                    title="Buka / Tutup Daftar Nomor Soal"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Nomor Soal</span>
                    <span className="font-mono text-[11px]">({answeredCount}/{totalQuestions})</span>
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      if (!isFinished && answeredCount > 0) {
                        if (confirm('Ujian sedang berlangsung. Apakah Anda yakin ingin keluar? Jawaban sementara akan dibatalkan.')) {
                          onClose();
                        }
                      } else {
                        onClose();
                      }
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Timer Progress Bar */}
            {!isFinished && (
              <div className="w-full bg-slate-200 h-1 relative overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    isTimeCritical ? 'bg-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${timeProgressPercent}%` }}
                />
              </div>
            )}

            {/* Time Critical Warning Banner */}
            {isTimeCritical && !isFinished && (
              <div className="bg-rose-50 border-b border-rose-200 px-4 py-2 flex items-center gap-2 text-rose-800 text-xs font-semibold animate-pulse shrink-0">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Perhatian: Waktu pengerjaan tersisa kurang dari 5 menit! Mohon periksa kembali nomor yang masih ragu-ragu.</span>
              </div>
            )}

            {/* ================= MAIN CBT BODY ================= */}
            {!isFinished ? (
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                
                {/* Left/Main Question Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                  {!currentQ ? (
                    <div className="p-8 text-center space-y-3 bg-amber-50/50 rounded-2xl border border-amber-200">
                      <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                      <p className="text-sm font-semibold text-slate-700">Soal tidak dapat dimuat atau nomor di luar batas.</p>
                      <button
                        onClick={() => setCurrentIndex(0)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                      >
                        Kembali ke Soal Nomor 1
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Question Metadata Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center font-mono text-xs shadow-xs">
                            {currentIndex + 1}
                          </span>
                          <span className="font-bold text-slate-800">
                            Soal Nomor {currentIndex + 1} dari {totalQuestions}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium text-[11px] border border-slate-200">
                            {currentQ.subject}
                          </span>
                        </div>

                        {/* Ragu-Ragu Toggle Button */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleToggleFlag}
                            className={`px-3 py-1 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                              flagged[currentIndex]
                                ? 'bg-amber-100 border-amber-300 text-amber-900'
                                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                            }`}
                          >
                            <Flag className={`w-3.5 h-3.5 ${flagged[currentIndex] ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
                            <span>{flagged[currentIndex] ? 'Ragu-Ragu' : 'Tandai Ragu'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Arabic Prompt Card (if question contains Arabic verses / texts) */}
                      {currentQ.arabicPrompt && (
                        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                            Kutipan Teks Arab / Dalil
                          </span>
                          <div className="font-['Amiri',serif] text-2xl sm:text-3xl text-emerald-950 py-1 leading-relaxed">
                            {currentQ.arabicPrompt}
                          </div>
                        </div>
                      )}

                      {/* Question Text */}
                      <div className="text-slate-900 font-medium text-sm sm:text-base leading-relaxed">
                        {currentQ.q}
                      </div>

                      {/* Options List */}
                      <div className="space-y-3 pt-2">
                        {currentQ.options.map((opt, optIdx) => {
                          const isSelected = answers[currentIndex] === optIdx;
                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(optIdx)}
                              className={`w-full p-3.5 sm:p-4 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer border ${
                                isSelected
                                  ? 'bg-emerald-50/90 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400/40 shadow-xs'
                                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span
                                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 transition-colors ${
                                    isSelected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-slate-100 text-slate-600'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="leading-snug">{opt}</span>
                              </div>

                              {isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Question Anti-cheat Notice */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                        <Shuffle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          Sistem mengacak urutan soal secara unik untuk akun <strong>{student.name}</strong>. Soal sama dengan teman sekelas namun nomor soal berbeda.
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Right Question Drawer / Number Navigator */}
                <div
                  className={`w-full md:w-72 bg-slate-50 border-t md:border-t-0 md:border-l border-slate-200 p-4 flex flex-col shrink-0 overflow-y-auto ${
                    showQuestionGrid ? 'block' : 'hidden md:flex'
                  }`}
                >
                  <div className="pb-3 border-b border-slate-200">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>Nomor Soal {currentSubject?.shortName}</span>
                      <span className="font-mono text-emerald-700 text-[11px]">
                        {answeredCount} / {totalQuestions} Terisi
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block" /> Terjawab
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> Ragu
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-sm bg-white border border-slate-300 inline-block" /> Kosong
                      </span>
                    </div>
                  </div>

                  {/* Number Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 py-4">
                    {questions.map((_, idx) => {
                      const isAnswered = answers[idx] !== undefined;
                      const isFlag = flagged[idx];
                      const isCurrent = currentIndex === idx;

                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            soundEngine.playClick();
                            setCurrentIndex(idx);
                            setShowQuestionGrid(false);
                          }}
                          className={`h-9 rounded-xl font-bold font-mono text-xs transition-all relative flex items-center justify-center cursor-pointer ${
                            isCurrent
                              ? 'ring-2 ring-blue-600 ring-offset-1 font-black shadow-xs'
                              : ''
                          } ${
                            isFlag
                              ? 'bg-amber-400 text-amber-950 font-bold'
                              : isAnswered
                              ? 'bg-emerald-600 text-white'
                              : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                          }`}
                        >
                          <span>{idx + 1}</span>
                          {isFlag && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Status Stats */}
                  <div className="mt-auto pt-3 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Sudah Dijawab:</span>
                      <strong className="text-emerald-700">{answeredCount}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Ditandai Ragu:</span>
                      <strong className="text-amber-600">{flaggedCount}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Belum Dijawab:</span>
                      <strong className="text-slate-600">{unansweredCount}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ================= RESULT SCREEN ================= */
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                {autoSubmitNotice && (
                  <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-300 text-amber-900 text-xs font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Waktu ujian telah berakhir (00:00). Seluruh jawaban Anda telah otomatis terkumpul dan dinilai oleh sistem CBT.</span>
                  </div>
                )}

                <div className="text-center space-y-3">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
                    🏆
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                    Alhamdulillah, Simulasi CBT {currentSubject?.name} Selesai!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                    Santri <strong>{student.name}</strong> telah menyelesaikan <strong>{totalQuestions} soal</strong> evaluasi mata pelajaran {currentSubject?.name}.
                  </p>
                </div>

                {/* Score Showcase Card */}
                <div className="p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-3xl border border-emerald-200 max-w-md mx-auto shadow-xs text-center space-y-4">
                  <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Skor Akhir {currentSubject?.name}
                  </div>
                  <div className="text-5xl font-black font-mono text-emerald-950">
                    {score} <span className="text-2xl font-bold text-emerald-700">/ 100</span>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs">
                    {score >= 90 ? 'Mumtaz (Sangat Istimewa)' :
                     score >= 80 ? 'Jayyid Jiddan (Sangat Baik)' :
                     score >= 70 ? 'Jayyid (Baik)' :
                     score >= 60 ? 'Maqbul (Cukup)' : 'Perlu Bimbingan & Remidial'}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-100 text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                      <div className="text-emerald-700 font-bold text-lg font-mono">{correctCount}</div>
                      <div className="text-[10px] text-slate-500">Benar</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                      <div className="text-rose-600 font-bold text-lg font-mono">
                        {totalQuestions - correctCount}
                      </div>
                      <div className="text-[10px] text-slate-500">Salah</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-emerald-100">
                      <div className="text-slate-500 font-bold text-lg font-mono">{unansweredCount}</div>
                      <div className="text-[10px] text-slate-500">Kosong</div>
                    </div>
                  </div>
                </div>

                {/* Review Discussion Toggle */}
                <div className="text-center">
                  <button
                    onClick={() => setShowReview(!showReview)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Eye className="w-4 h-4 text-emerald-700" />
                    <span>{showReview ? 'Sembunyikan Pembahasan Soal' : `Lihat Pembahasan Lengkap ${currentSubject?.name}`}</span>
                  </button>
                </div>

                {/* Full Discussion Accordion */}
                {showReview && (
                  <div className="space-y-4 pt-2">
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <span>Kunci Jawaban & Pembahasan ({currentSubject?.teacherName}):</span>
                    </div>

                    <div className="space-y-3">
                      {questions.map((q, idx) => {
                        const studentChoice = answers[idx];
                        const isRight = studentChoice === q.correct;
                        const isSkipped = studentChoice === undefined;

                        return (
                          <div
                            key={q.id}
                            className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                              isRight
                                ? 'bg-emerald-50/60 border-emerald-200'
                                : isSkipped
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-rose-50/60 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-white border flex items-center justify-center font-mono">
                                  {idx + 1}
                                </span>
                                <span className="text-slate-800">{q.subject}</span>
                              </span>

                              <span
                                className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                                  isRight
                                    ? 'bg-emerald-600 text-white'
                                    : isSkipped
                                    ? 'bg-slate-300 text-slate-700'
                                    : 'bg-rose-600 text-white'
                                }`}
                              >
                                {isRight ? '✓ Benar' : isSkipped ? 'Tidak Dijawab' : '✗ Salah'}
                              </span>
                            </div>

                            <p className="font-semibold text-slate-900">{q.q}</p>

                            <div className="space-y-1 pl-2 border-l-2 border-slate-300">
                              <div>
                                Jawaban Santri:{' '}
                                <strong>
                                  {studentChoice !== undefined
                                    ? `${String.fromCharCode(65 + studentChoice)}. ${q.options[studentChoice]}`
                                    : 'Tidak dijawab'}
                                </strong>
                              </div>
                              <div>
                                Kunci Jawaban:{' '}
                                <strong className="text-emerald-800">
                                  {String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}
                                </strong>
                              </div>
                            </div>

                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                              <strong>Penjelasan Guru:</strong> {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= CBT FOOTER ================= */}
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              {!isFinished ? (
                <>
                  {/* Previous & Next */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      disabled={currentIndex === 0}
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex((prev) => Math.max(0, prev - 1));
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Sebelumnya</span>
                    </button>

                    <button
                      disabled={currentIndex >= totalQuestions - 1}
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={handleSubmitAttempt}
                      className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black cursor-pointer shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                        isAllAnswered
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-emerald-700/20'
                          : 'bg-amber-500 hover:bg-amber-600 text-slate-950 ring-2 ring-amber-300'
                      }`}
                      title={
                        isAllAnswered
                          ? 'Seluruh soal telah terisi. Klik untuk mengumpulkan ujian.'
                          : `Masih ada ${unansweredCount} soal belum terisi! Wajib diisi seluruhnya sebelum dikumpulkan.`
                      }
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isAllAnswered
                          ? `Selesai & Kumpulkan Ujian (${answeredCount}/${totalQuestions})`
                          : `Belum Lengkap (${answeredCount}/${totalQuestions} Terisi)`}
                      </span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* After Finished: Retake, Choose Other Subject, or Close */}
                  <div className="text-xs text-slate-500">
                    Nilai telah tercatat pada rapor simulasi akun santri.
                  </div>
                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setSessionSalt((prev) => prev + 1);
                      }}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Uji Ulang Mapel Ini</span>
                    </button>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setSelectedSubjectId(null);
                        setIsFinished(false);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Pilih Mapel Lain</span>
                    </button>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        onClose();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                    >
                      Tutup
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ================= INCOMPLETE EXAM ALERT MODAL ================= */}
            {showIncompleteAlert && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
                    <AlertCircle className="w-8 h-8 text-rose-600" />
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="text-base font-bold font-serif text-slate-900">
                      Ujian {currentSubject?.name} Belum Lengkap!
                    </h4>
                    <p className="text-xs text-rose-600 font-semibold">
                      Santri belum dapat mengumpulkan ujian.
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      Sesuai ketentuan asesmen CBT Madrasah, seluruh santri <strong>wajib menjawab seluruh {totalQuestions} pertanyaan</strong>. Saat ini Anda baru mengisi <strong>{answeredCount} soal</strong> (masih ada <strong>{unansweredCount} soal kosong</strong>).
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Gunakan sisa waktu ({formatTime(secondsLeft)}) untuk menjawab nomor soal yang belum terisi.</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {firstUnansweredIndex !== -1 && (
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setCurrentIndex(firstUnansweredIndex);
                          setShowIncompleteAlert(false);
                        }}
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98"
                      >
                        <span>👉 Lanjut Jawab Soal Kosong (Nomor {firstUnansweredIndex + 1})</span>
                      </button>
                    )}
                    <button
                      onClick={() => setShowIncompleteAlert(false)}
                      className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs cursor-pointer"
                    >
                      Tutup & Periksa Soal Mandiri
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ================= CONFIRM SUBMIT MODAL ================= */}
            {showConfirmSubmit && (
              <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl mx-auto">
                    <Check className="w-6 h-6 text-emerald-700" />
                  </div>

                  <div className="text-center space-y-1">
                    <h4 className="text-base font-bold font-serif text-slate-900">
                      Konfirmasi Pengumpulan Ujian {currentSubject?.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      Seluruh {totalQuestions} soal telah dijawab. Apakah Anda yakin ingin mengakhiri sesi dan melihat nilai sekarang?
                    </p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span>Mata Pelajaran:</span>
                      <strong>{currentSubject?.name}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Soal:</span>
                      <strong>{totalQuestions} Soal</strong>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Sudah Terjawab:</span>
                      <strong>{answeredCount} Soal (100% Lengkap)</strong>
                    </div>
                    {flaggedCount > 0 && (
                      <div className="flex justify-between text-amber-600">
                        <span>Masih Ditandai Ragu:</span>
                        <strong>{flaggedCount} Soal</strong>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => setShowConfirmSubmit(false)}
                      className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      Periksa Kembali
                    </button>
                    <button
                      disabled={!isAllAnswered}
                      onClick={calculateAndFinish}
                      className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-xs cursor-pointer shadow-md"
                    >
                      Ya, Kumpulkan Ujian
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
