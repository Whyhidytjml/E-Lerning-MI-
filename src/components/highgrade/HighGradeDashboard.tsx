import React, { useState, useRef } from 'react';
import { Student, Assignment, LearningMaterial } from '../../types/lms';
import { mockAssignments, mockLearningMaterials } from '../../data/mockData';
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
  Music
} from 'lucide-react';

interface HighGradeDashboardProps {
  student: Student;
  onNavigateTab: (tab: string) => void;
}

export const HighGradeDashboard: React.FC<HighGradeDashboardProps> = ({
  student,
  onNavigateTab
}) => {
  const [activeView, setActiveView] = useState<'tugas' | 'modul_guru'>('tugas');
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  
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

  // CBT State
  const [cbtCurrentQuestion, setCbtCurrentQuestion] = useState(0);
  const [cbtAnswers, setCbtAnswers] = useState<Record<number, number>>({});
  const [cbtFinished, setCbtFinished] = useState(false);
  const [cbtScore, setCbtScore] = useState(0);

  const cbtQuestions = [
    {
      q: "Menurut ketentuan fikih, shalat jamak takdim adalah...",
      options: [
        "Menggabungkan dua shalat fardhu dan dikerjakan pada waktu shalat yang kedua",
        "Menggabungkan dua shalat fardhu dan dikerjakan pada waktu shalat yang pertama",
        "Meringkas shalat empat rakaat menjadi dua rakaat",
        "Mengerjakan shalat sunnah setelah shalat fardhu"
      ],
      correct: 1
    },
    {
      q: "Pada rantai makanan di ekosistem sawah, peran padi adalah sebagai...",
      options: [
        "Konsumen tingkat 1 (Herbivora)",
        "Pengurai (Dekomposer)",
        "Produsen (Autotrof)",
        "Konsumen puncak"
      ],
      correct: 2
    },
    {
      q: "Berikut adalah huruf ikhfa haqiqi dalam hukum tajwid nun mati/tanwin, KECUALI...",
      options: [
        "Ta (ت)",
        "Jim (ج)",
        "Khaf (ك)",
        "Hamzah (ء)"
      ],
      correct: 3
    }
  ];

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

  const handleAnswerCbt = (qIdx: number, optIdx: number) => {
    soundEngine.playClick();
    setCbtAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleFinishCbt = () => {
    soundEngine.playReward();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    let correctCount = 0;
    cbtQuestions.forEach((q, idx) => {
      if (cbtAnswers[idx] === q.correct) correctCount++;
    });
    const finalScore = Math.round((correctCount / cbtQuestions.length) * 100);
    setCbtScore(finalScore);
    setCbtFinished(true);
  };

  const filteredMaterials = mockLearningMaterials.filter(m => {
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
                setCbtFinished(false);
                setCbtAnswers({});
              }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer text-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>Simulasi Ujian CBT</span>
            </button>
          </div>
        </div>

        {/* Metric Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Tugas Aktif</div>
            <div className="text-lg font-bold text-white mt-0.5">{assignments.length} Tugas</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Modul Guru</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{mockLearningMaterials.length} Modul Terbit</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Rata-rata Nilai</div>
            <div className="text-lg font-bold text-white mt-0.5">94.5 / 100</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-slate-400">Presensi Kehadiran</div>
            <div className="text-lg font-bold text-teal-400 mt-0.5">100% (Hadir Tepat)</div>
          </div>
        </div>
      </div>

      {/* Navigation Switcher: Tugas vs Modul dari Guru */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
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
          <span>Melihat Modul dari Guru ({mockLearningMaterials.length})</span>
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
              <h2 className="text-xl font-bold text-slate-800 font-serif flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Bahan Ajar & Modul dari Guru</span>
              </h2>
              <p className="text-xs text-slate-500">
                Akses modul PDF, ringkasan fikih/tajwid, video ajar, dan audio murattal yang diunggah oleh ustadz & ustadzah.
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
                Semua
              </button>
              <button
                onClick={() => setModuleFilterCategory('kemenag')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  moduleFilterCategory === 'kemenag' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Agama Kemenag
              </button>
              <button
                onClick={() => setModuleFilterCategory('umum')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  moduleFilterCategory === 'umum' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Mapel Umum
              </button>
            </div>
          </div>

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
                      <span className="font-bold text-slate-800">Ustadz Ridwan, S.Pd.I</span>
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
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka & Pelajari Modul</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE DETAIL MODAL */}
      {selectedModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {selectedModule.subjectName} · {selectedModule.category.toUpperCase()}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    {selectedModule.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedModule(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <span className="font-bold text-emerald-950 block">Uraian & Petunjuk Guru:</span>
                <p className="text-slate-700 leading-relaxed">
                  {selectedModule.description}
                </p>
                <p className="text-slate-600 leading-relaxed pt-2 border-t border-emerald-200/50">
                  Pelajari setiap bab secara runtut. Catat dalil naqli dan contoh praktiknya untuk persiapan tugas dan kuis madrasah pekanan.
                </p>
              </div>

              {/* Media Preview Box */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">
                      Berkas: {selectedModule.title.replace(/\s+/g, '_')}.pdf
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">2.4 MB</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 text-center space-y-1">
                  <p className="text-slate-600 text-[11px]">
                    Dokumen materi lengkap kurikulum madrasah terverifikasi.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  alert(`Mengunduh berkas: ${selectedModule.title}.pdf`);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Dokumen</span>
              </button>
              <button
                onClick={() => {
                  soundEngine.playReward();
                  confetti({ particleCount: 40, spread: 50 });
                  setSelectedModule(null);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Tandai Selesai Membaca</span>
              </button>
            </div>
          </div>
        </div>
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

      {/* CBT / Try Out Exam Simulator Modal */}
      {cbtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {!cbtFinished ? (
              <div className="space-y-6">
                {/* CBT Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                      Simulasi Asesmen CBT Madrasah
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">
                      Try Out Fikih & Sains Terpadu
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-xl font-mono text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Sisa Waktu: 18:45</span>
                  </div>
                </div>

                {/* Question Item */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>Soal Nomor {cbtCurrentQuestion + 1} dari {cbtQuestions.length}</span>
                    <span>Bobot: 10 Poin</span>
                  </div>

                  <p className="text-base font-semibold text-slate-800 leading-relaxed">
                    {cbtQuestions[cbtCurrentQuestion].q}
                  </p>

                  <div className="space-y-2.5">
                    {cbtQuestions[cbtCurrentQuestion].options.map((opt, optIdx) => {
                      const isSelected = cbtAnswers[cbtCurrentQuestion] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerCbt(cbtCurrentQuestion, optIdx)}
                          className={`w-full p-3.5 rounded-xl text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer border ${
                            isSelected
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300'
                              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={cbtCurrentQuestion === 0}
                    onClick={() => {
                      soundEngine.playClick();
                      setCbtCurrentQuestion(prev => Math.max(0, prev - 1));
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 disabled:opacity-40 cursor-pointer"
                  >
                    ← Soal Sebelumnya
                  </button>

                  {cbtCurrentQuestion < cbtQuestions.length - 1 ? (
                    <button
                      onClick={() => {
                        soundEngine.playClick();
                        setCbtCurrentQuestion(prev => prev + 1);
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Soal Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleFinishCbt}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 cursor-pointer shadow-md"
                    >
                      Selesai & Kumpulkan Ujian
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* CBT Result Screen */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-serif">Alhamdulillah, Simulasi Ujian Selesai!</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Hasil telah dicatat dan terintegrasi otomatis ke Rapor Digital Siswa.
                  </p>
                </div>

                <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 max-w-xs mx-auto">
                  <div className="text-xs font-bold text-emerald-800 uppercase">Skor Simulasi CBT</div>
                  <div className="text-4xl font-extrabold text-emerald-950 font-mono mt-1">{cbtScore} / 100</div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-1">Predikat: Mumtaz (Istimewa)</div>
                </div>

                <button
                  onClick={() => setCbtModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Tutup Hasil Ujian
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
