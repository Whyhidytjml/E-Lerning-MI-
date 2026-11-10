import React, { useState, useEffect } from 'react';
import { LearningMaterial } from '../../types/lms';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  X,
  BookOpen,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Star,
  Download,
  FileText,
  Video,
  Music,
  Presentation,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Clock,
  User,
  GraduationCap,
  BookmarkCheck,
  Maximize2
} from 'lucide-react';

interface MaterialReaderModalProps {
  material: LearningMaterial | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (earnedStars: number, earnedPoints: number) => void;
  isCompleted?: boolean;
}

export const MaterialReaderModal: React.FC<MaterialReaderModalProps> = ({
  material,
  isOpen,
  onClose,
  onComplete,
  isCompleted = false
}) => {
  // Pagination for pages / slides (always declared unconditionally)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSlide, setCurrentSlide] = useState<number>(1);

  // Font size state (sm, base, lg)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Interactive self-check answer reveal state per page
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  // Video / Audio player simulated playback state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // TTS Read Aloud state
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Completion state
  const [completedState, setCompletedState] = useState<boolean>(isCompleted);
  const [downloadNoteVisible, setDownloadNoteVisible] = useState<boolean>(false);

  // Reset state when a new material is opened
  useEffect(() => {
    setCurrentPage(1);
    setCurrentSlide(1);
    setShowAnswer(false);
    setIsPlaying(false);
    setPlaybackSeconds(0);
    setIsSpeaking(false);
    setCompletedState(isCompleted);
    setDownloadNoteVisible(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [material, isCompleted]);

  // Video timer simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => (prev >= 600 ? 0 : prev + 1));
      }, 1000 / playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Handle Stop Speech when closing
  const handleClose = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    soundEngine.playClick();
    onClose();
  };

  // Text-To-Speech reader for lower grade students and easy listening
  const handleToggleSpeak = () => {
    if (!material) return;
    if (!('speechSynthesis' in window)) {
      alert('Fitur suara tidak didukung pada peramban ini.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    let textToSpeak = '';
    if (material.pages && material.pages[currentPage - 1]) {
      const page = material.pages[currentPage - 1];
      textToSpeak = `${page.heading}. ${page.subheading || ''}. ${page.paragraphs.join(' ')}. ${page.keyPoints ? 'Poin penting: ' + page.keyPoints.join('. ') : ''}`;
    } else if (material.slides && material.slides[currentSlide - 1]) {
      const slide = material.slides[currentSlide - 1];
      textToSpeak = `${slide.title}. ${slide.subtitle || ''}. ${slide.bullets.join('. ')}`;
    } else {
      textToSpeak = `${material.title}. ${material.description || ''}. ${material.contentBody || ''}`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'id-ID';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
    soundEngine.playSuccess();
  };

  const handleCompleteReading = () => {
    soundEngine.playReward();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    setCompletedState(true);
    if (onComplete) {
      onComplete(1, 15);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Return null ONLY after all hooks have been unconditionally called
  if (!isOpen || !material) return null;

  const totalPages = material.pages?.length || 1;
  const totalSlides = material.slides?.length || 1;
  const activePage = material.pages ? material.pages[currentPage - 1] : null;
  const activeSlide = material.slides ? material.slides[currentSlide - 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        
        {/* ================= HEADER MODAL ================= */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-emerald-50/70 via-teal-50/40 to-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] tracking-wide uppercase flex items-center gap-1 shadow-2xs">
                <Sparkles className="w-3 h-3" />
                <span>Akses Langsung Online (Tanpa Perlu Unduh)</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[11px] border border-emerald-200">
                {material.subjectName}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold text-[10px]">
                Kelas {material.grade}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center gap-1">
                {material.format === 'Video' && <Video className="w-3 h-3" />}
                {material.format === 'Dokumen PDF' && <FileText className="w-3 h-3" />}
                {material.format === 'Audio MP3' && <Music className="w-3 h-3" />}
                {material.format === 'Slide Interaktif' && <Presentation className="w-3 h-3" />}
                <span>{material.format}</span>
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-xl font-bold font-serif text-slate-900 truncate">
              {material.title}
            </h2>

            {/* Teacher Meta */}
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium text-emerald-900">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span>Guru Pengampu: <strong>{material.teacherName}</strong></span>
              </span>
              <span>·</span>
              <span className="text-slate-400 font-mono text-[11px]">
                Jadwal: {material.scheduledDate} ({material.scheduledTime})
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs">
              <button
                onClick={() => { soundEngine.playClick(); setFontSize('normal'); }}
                title="Ukuran Tulisan Standar"
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  fontSize === 'normal' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                A
              </button>
              <button
                onClick={() => { soundEngine.playClick(); setFontSize('large'); }}
                title="Ukuran Tulisan Lebih Besar"
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  fontSize === 'large' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => { soundEngine.playClick(); setFontSize('xlarge'); }}
                title="Ukuran Tulisan Ekstra Besar (Ramah Anak)"
                className={`px-2 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  fontSize === 'xlarge' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                A++
              </button>
            </div>

            {/* Audio Read Aloud */}
            <button
              onClick={handleToggleSpeak}
              title={isSpeaking ? 'Hentikan Suara Membaca' : 'Dengarkan Teks Dibacakan'}
              className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isSpeaking
                  ? 'bg-amber-400 border-amber-500 text-amber-950 animate-pulse'
                  : 'bg-white hover:bg-emerald-50 border-slate-200 text-emerald-800'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isSpeaking ? 'Hentikan Suara' : 'Baca Teks'}</span>
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT VIEWER (DIRECT ONLINE ACCESS) ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Teacher's Introductory Guidance Note */}
          {material.description && (
            <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-slate-800 flex items-start gap-3 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                👳🏻‍♂️
              </div>
              <div className="flex-1">
                <div className="font-bold text-emerald-950 text-xs flex items-center gap-2">
                  <span>Petunjuk Belajar dari {material.teacherName}:</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    Wajib Disimak
                  </span>
                </div>
                <p className="mt-1 leading-relaxed text-slate-700">
                  {material.description}
                </p>
              </div>
            </div>
          )}

          {/* ================= CASE 1: DOKUMEN PDF / DIGITAL E-MODUL ================= */}
          {(material.format === 'Dokumen PDF' || (material.pages && material.pages.length > 0)) && (
            <div className="space-y-4">
              {/* Digital Reader Toolbar & Page Tabs */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between bg-slate-100/80 p-2 rounded-2xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 font-bold px-2">Halaman:</span>
                    {material.pages?.map((p, idx) => (
                      <button
                        key={p.pageNumber}
                        onClick={() => { soundEngine.playClick(); setCurrentPage(idx + 1); setShowAnswer(false); }}
                        className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                          currentPage === idx + 1
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        Hal. {p.pageNumber}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentPage(prev => Math.max(1, prev - 1));
                        setShowAnswer(false);
                      }}
                      disabled={currentPage <= 1}
                      className="p-1.5 rounded-xl bg-white disabled:opacity-40 text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-bold text-slate-700 px-1 font-mono text-[11px]">
                      {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        setShowAnswer(false);
                      }}
                      disabled={currentPage >= totalPages}
                      className="p-1.5 rounded-xl bg-white disabled:opacity-40 text-slate-700 hover:bg-slate-50 border border-slate-200 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Active Page Card */}
              {activePage ? (
                <div className="bg-[#FCFDFD] p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
                      Bab Pembelajaran Digital · Halaman {activePage.pageNumber}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                      {activePage.heading}
                    </h3>
                    {activePage.subheading && (
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                        {activePage.subheading}
                      </p>
                    )}
                  </div>

                  {/* Arabic Text Card (if available) */}
                  {activePage.arabicText && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-xs space-y-3">
                      <div className="flex items-center justify-between text-xs text-emerald-300">
                        <span className="font-bold">Lafal Arab & Dalil:</span>
                        <button
                          onClick={() => {
                            soundEngine.playSuccess();
                            if ('speechSynthesis' in window) {
                              const u = new SpeechSynthesisUtterance(activePage.arabicText);
                              u.lang = 'ar-SA';
                              u.rate = 0.8;
                              window.speechSynthesis.speak(u);
                            }
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-200 flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Lafalkan</span>
                        </button>
                      </div>
                      <div className="text-center font-['Amiri',serif] text-2xl sm:text-3xl leading-loose tracking-wide py-2 text-amber-200">
                        {activePage.arabicText}
                      </div>
                      {activePage.verseTranslation && (
                        <div className="text-xs sm:text-sm text-slate-200 italic border-t border-white/10 pt-2 text-center">
                          "{activePage.verseTranslation}"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Paragraphs with Font Size */}
                  <div className={`space-y-3 text-slate-700 leading-relaxed ${
                    fontSize === 'normal' ? 'text-xs sm:text-sm' :
                    fontSize === 'large' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                  }`}>
                    {activePage.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Key Points Checklist */}
                  {activePage.keyPoints && activePage.keyPoints.length > 0 && (
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wide">
                        <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                        <span>Poin Inti yang Harus Dipahami:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {activePage.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Interactive Self-Check (Cek Pemahaman Mandiri) */}
                  {activePage.exercisePrompt && (
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-amber-950">
                          <HelpCircle className="w-4 h-4 text-amber-700" />
                          <span>Kuis Kilat Pemahaman Santri:</span>
                        </div>
                        <button
                          onClick={() => { soundEngine.playClick(); setShowAnswer(!showAnswer); }}
                          className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{showAnswer ? 'Sembunyikan Jawaban' : 'Buka Kunci Jawaban'}</span>
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-800">
                        ❓ {activePage.exercisePrompt}
                      </p>

                      {showAnswer && (
                        <div className="p-3 bg-white rounded-xl border border-emerald-300 text-xs text-emerald-950 font-medium animate-in fade-in flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div>
                            <strong>Kunci Jawaban Ustadz:</strong> {activePage.exerciseAnswer}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Fallback if no page array: show contentBody */
                <div className="bg-[#FCFDFD] p-5 sm:p-7 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Ringkasan Modul Pembelajaran
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {material.contentBody || 'Silakan pelajari materi ini dengan saksama dan catat poin-poin penting untuk persiapan kuis madrasah.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ================= CASE 2: VIDEO PEMBELAJARAN ================= */}
          {material.format === 'Video' && (
            <div className="space-y-4">
              {/* Simulated Interactive Video Screen */}
              <div className="bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-lg text-white">
                {/* Video Stage Canvas */}
                <div className="aspect-video w-full bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 relative flex flex-col items-center justify-center p-6 text-center select-none">
                  {/* Decorative Islamic Background Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Play Center Overlay */}
                  <button
                    onClick={() => {
                      soundEngine.playSuccess();
                      setIsPlaying(!isPlaying);
                    }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl ${
                      isPlaying
                        ? 'bg-emerald-600/80 hover:bg-emerald-600 text-white'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-emerald-950 scale-105 animate-pulse'
                    }`}
                  >
                    {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
                  </button>

                  <div className="mt-4 relative z-10">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                      Video Materi Resmi Madrasah Ibtidaiyah
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white max-w-md">
                      {material.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Narasumber: {material.teacherName}
                    </p>
                  </div>

                  {/* Live Simulation Ticker */}
                  {isPlaying && (
                    <div className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-white" />
                      <span>Sedang Memutar Online (0 MB Terpakai)</span>
                    </div>
                  )}

                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-emerald-200 text-[11px] font-mono px-2.5 py-1 rounded-xl border border-white/10">
                    HD 1080p · {material.videoDuration || '14:20'}
                  </div>
                </div>

                {/* Video Player Controls Bar */}
                <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 space-y-2">
                  {/* Scrubber Timeline */}
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-slate-400">{formatTime(playbackSeconds)}</span>
                    <div
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pos = (e.clientX - rect.left) / rect.width;
                        setPlaybackSeconds(Math.floor(pos * 600));
                      }}
                      className="flex-1 h-2 bg-slate-700 rounded-full cursor-pointer relative overflow-hidden group"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
                        style={{ width: `${Math.min(100, (playbackSeconds / 600) * 100)}%` }}
                      />
                    </div>
                    <span className="text-slate-400">10:00</span>
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => setPlaybackSeconds(0)}
                        title="Ulangi dari Awal"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px] hidden sm:inline">Kecepatan:</span>
                      {[1, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => { soundEngine.playClick(); setPlaybackSpeed(spd); }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Chapter Timestamps */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <span>Daftar Bab & Topik Bahasan (Klik untuk Langsung Lompat):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    { t: 0, time: '00:00', label: 'Pengantar Makharijul Huruf' },
                    { t: 165, time: '02:45', label: 'Huruf Halqiyah (Tenggorokan: ء، هـ، ع، ح، غ، خ)' },
                    { t: 370, time: '06:10', label: 'Huruf Lisaniyah (Area Lidah & Gigi)' },
                    { t: 630, time: '10:30', label: 'Praktik Bacaan Surat Al-Kautsar & Evaluasi' }
                  ].map((ch) => (
                    <button
                      key={ch.time}
                      onClick={() => {
                        soundEngine.playClick();
                        setPlaybackSeconds(ch.t);
                        setIsPlaying(true);
                      }}
                      className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <span className="font-semibold text-slate-800 group-hover:text-emerald-900 truncate">
                        {ch.label}
                      </span>
                      <span className="font-mono text-emerald-700 font-bold text-[11px] shrink-0 ml-2">
                        {ch.time}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= CASE 3: AUDIO MP3 / MURATTAL ================= */}
          {material.format === 'Audio MP3' && (
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-emerald-950 via-teal-950 to-slate-900 text-white shadow-md space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Pemutar Audio Murattal Digital MI
                    </span>
                    <h3 className="text-lg font-bold font-serif text-white mt-0.5">
                      {material.title}
                    </h3>
                    <p className="text-xs text-emerald-200/80">
                      Qari / Guru: {material.teacherName}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20 text-xs font-mono text-emerald-300 self-start sm:self-auto">
                    Durasi: {material.audioDuration || '05:45'}
                  </div>
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="flex items-center justify-center gap-1.5 h-16 py-2">
                  {[40, 75, 90, 60, 85, 100, 70, 95, 45, 80, 65, 90, 50, 70, 85, 40].map((h, i) => (
                    <div
                      key={i}
                      className={`w-1.5 rounded-full transition-all duration-300 ${
                        isPlaying
                          ? 'bg-gradient-to-t from-emerald-400 to-teal-200 animate-pulse'
                          : 'bg-white/30'
                      }`}
                      style={{ height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.7)))}%` : '25%' }}
                    />
                  ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setPlaybackSeconds(0);
                    }}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playSuccess();
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold cursor-pointer transition-all shadow-lg active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 translate-x-0.5" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Ayat per Ayat Interactive Sync Text */}
              {activePage?.arabicText && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    Teks Ayat & Panduan Tajwid Tartil:
                  </div>
                  <div className="p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
                    <div className="font-['Amiri',serif] text-2xl sm:text-3xl text-emerald-950 py-1">
                      {activePage.arabicText}
                    </div>
                    <div className="text-xs text-slate-600 italic whitespace-pre-line">
                      {activePage.verseTranslation}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= CASE 4: SLIDE PRESENTASI INTERAKTIF ================= */}
          {material.format === 'Slide Interaktif' && (
            <div className="space-y-4">
              {/* Slide Navigation Header */}
              <div className="flex items-center justify-between bg-slate-100 p-2.5 rounded-2xl border border-slate-200 text-xs">
                <span className="font-bold text-slate-700">
                  Slide {currentSlide} dari {totalSlides}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setCurrentSlide(prev => Math.max(1, prev - 1));
                    }}
                    disabled={currentSlide <= 1}
                    className="px-3 py-1.5 rounded-xl bg-white disabled:opacity-40 text-slate-700 hover:bg-slate-50 border border-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setCurrentSlide(prev => Math.min(totalSlides, prev + 1));
                    }}
                    disabled={currentSlide >= totalSlides}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 disabled:opacity-40 text-white font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Active Slide Canvas */}
              {activeSlide ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 text-white shadow-md space-y-5 min-h-[300px] flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                      Materi Presentasi Kelas {material.grade} · Slide {activeSlide.slideNumber}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {activeSlide.title}
                    </h3>
                    {activeSlide.subtitle && (
                      <p className="text-xs sm:text-sm text-blue-200 mt-1">
                        {activeSlide.subtitle}
                      </p>
                    )}

                    <div className="mt-5 space-y-2.5">
                      {activeSlide.bullets.map((b, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-200">
                          <span className="w-5 h-5 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{b}</span>
                        </div>
                      ))}
                    </div>

                    {activeSlide.highlightText && (
                      <div className="mt-4 p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs italic">
                        ⭐ {activeSlide.highlightText}
                      </div>
                    )}
                  </div>

                  {activeSlide.reflectionQuestion && (
                    <div className="pt-4 border-t border-white/10 text-xs text-blue-200 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Refleksi Santri: {activeSlide.reflectionQuestion}</span>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* ================= KEY TAKEAWAYS (RINGKASAN CEPAT) ================= */}
          {material.keyTakeaways && material.keyTakeaways.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Rangkuman Intisari Materi (Langsung Terserap):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {material.keyTakeaways.map((k, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-emerald-800 text-[11px]">Poin #{idx + 1}</div>
                    <p className="leading-snug">{k}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ================= FOOTER ACTIONS ================= */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Optional Download Note */}
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playSuccess();
                setDownloadNoteVisible(true);
                setTimeout(() => setDownloadNoteVisible(false), 3000);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Simpan Salinan Offline (Opsional)</span>
            </button>
            {downloadNoteVisible && (
              <span className="text-[11px] text-emerald-700 font-medium animate-in fade-in">
                ✓ Salinan tersimpan di memori perangkat!
              </span>
            )}
          </div>

          {/* Primary Action Button: Selesai Mempelajari */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              Tutup Materi
            </button>

            <button
              onClick={handleCompleteReading}
              className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 ${
                completedState
                  ? 'bg-emerald-700 text-white'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>
                {completedState ? '✓ Telah Dipelajari (+1 Bintang Emas)' : 'Selesai Belajar (+1 Bintang & 15 Poin)'}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
