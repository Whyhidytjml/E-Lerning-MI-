import React, { useState, useRef, useEffect } from 'react';
import { 
  mockClassRoster, 
  mockTahfizSubmissions, 
  mockMutabaahToday, 
  mockAssignments,
  mockLearningMaterials,
  mockLiaisonMessages
} from '../../data/mockData';
import { AttendanceRecord, TahfizSubmission, MutabaahEntry, Assignment, LearningMaterial, LiaisonMessage } from '../../types/lms';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  UserCheck, 
  Users, 
  BookOpen, 
  Plus, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Download, 
  Clock, 
  Search, 
  Filter, 
  Check, 
  Award,
  Video,
  UploadCloud,
  FileCheck2,
  Calendar,
  Layers,
  Scale,
  Flame,
  BarChart3,
  FolderOpen,
  Edit3,
  MessageSquare,
  Send,
  Share2
} from 'lucide-react';

interface TeacherDashboardProps {
  initialTab?: 'presensi' | 'grading_center' | 'kelola_materi' | 'bank_soal' | 'penghubung';
  messages?: LiaisonMessage[];
  onSendMessage?: (msg: LiaisonMessage) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  initialTab = 'presensi',
  messages: externalMessages,
  onSendMessage: externalOnSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'presensi' | 'grading_center' | 'kelola_materi' | 'bank_soal' | 'penghubung'>(initialTab);
  
  // Grading Center Subtab: 1. Tugas Siswa, 2. Validasi Mutabaah, 3. Setoran Tahfiz
  const [gradingSubTab, setGradingSubTab] = useState<'tugas' | 'mutabaah' | 'tahfiz'>('tugas');

  const [roster, setRoster] = useState<AttendanceRecord[]>(mockClassRoster);
  const [tahfizList, setTahfizList] = useState<TahfizSubmission[]>(mockTahfizSubmissions);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [materials, setMaterials] = useState<LearningMaterial[]>(mockLearningMaterials);

  // Selected for evaluation
  const [selectedSubmission, setSelectedSubmission] = useState<TahfizSubmission | null>(null);
  const [selectedAssignmentToGrade, setSelectedAssignmentToGrade] = useState<Assignment | null>(mockAssignments[0]);
  const [assignedGradeInput, setAssignedGradeInput] = useState<number>(95);
  const [assignedFeedbackInput, setAssignedFeedbackInput] = useState<string>('Analisis tajwid sudah sangat baik dan terstruktur.');

  // Mutabaah Validation State
  const [mutabaahEntry, setMutabaahEntry] = useState<MutabaahEntry>(mockMutabaahToday);
  const [teacherFeedbackNote, setTeacherFeedbackNote] = useState('Alhamdulillah Ahmad sangat istiqomah shalat subuh ke masjid. Pertahankan ya nak.');
  const [isValidated, setIsValidated] = useState(mutabaahEntry.teacherValidated || false);

  // Tahfiz Evaluation Form State
  const [evalPredicate, setEvalPredicate] = useState<'Mumtaz' | 'Jayyid Jiddan' | 'Jayyid' | 'Perlu Muraja\'ah'>('Mumtaz');
  const [evalScore, setEvalScore] = useState<number>(96);
  const [evalNotes, setEvalNotes] = useState<string>('Qalqalah kubra pada huruf Dal sangat mantap dan jelas.');
  const [evalSuccess, setEvalSuccess] = useState(false);

  // New Material Modal
  const [newMaterialModal, setNewMaterialModal] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState("Al-Qur'an Hadis");
  const [matCategory, setMatCategory] = useState<'kemenag' | 'umum'>('kemenag');
  const [matFormat, setMatFormat] = useState<LearningMaterial['format']>('Video');
  const [matDate, setMatDate] = useState('2026-11-06');
  const [matTime, setMatTime] = useState('07:30 WIB');
  const [matDesc, setMatDesc] = useState('');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);
  const [uploadedDocSize, setUploadedDocSize] = useState<string | null>(null);
  const teacherFileInputRef = useRef<HTMLInputElement>(null);

  // Liaison Messages State (Buku Penghubung)
  const [liaisonMessages, setLiaisonMessages] = useState<LiaisonMessage[]>(externalMessages || mockLiaisonMessages);
  const [teacherReplyText, setTeacherReplyText] = useState('');
  const [teacherReplyTag, setTeacherReplyTag] = useState<LiaisonMessage['tag']>('Hafalan');
  const [liaisonFilterTag, setLiaisonFilterTag] = useState<'semua' | LiaisonMessage['tag']>('semua');
  const [liaisonToast, setLiaisonToast] = useState<string | null>(null);
  const liaisonMessagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalMessages) {
      setLiaisonMessages(externalMessages);
    }
  }, [externalMessages]);

  useEffect(() => {
    if (activeTab === 'penghubung') {
      liaisonMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liaisonMessages, activeTab]);

  const handleTeacherSendReply = () => {
    if (!teacherReplyText.trim()) return;
    soundEngine.playSuccess();
    const newMsg: LiaisonMessage = {
      id: `msg_tch_${Date.now()}`,
      studentId: 'std_01',
      senderRole: 'guru',
      senderName: 'Ustadz Ridwan, S.Pd.I',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tag: teacherReplyTag,
      content: teacherReplyText.trim(),
      isRead: true
    };

    const updated = [...liaisonMessages, newMsg];
    setLiaisonMessages(updated);
    if (externalOnSendMessage) {
      externalOnSendMessage(newMsg);
    }
    setTeacherReplyText('');
    setLiaisonToast('Balasan berhasil dikirimkan ke Orang Tua (Bunda Aisyah)!');
    setTimeout(() => setLiaisonToast(null), 4000);
  };

  const handleTeacherQuickTemplate = (text: string, tag: LiaisonMessage['tag']) => {
    soundEngine.playClick();
    setTeacherReplyText(text);
    setTeacherReplyTag(tag);
  };

  // Question Bank Generator State
  const [subjectTopic, setSubjectTopic] = useState("Hukum Tajwid Nun Mati & Tanwin");
  const [generatedQuestions, setGeneratedQuestions] = useState<Array<{ id: string; q: string; answer: string; type: string }>>([
    { id: '1', q: "Jelaskan perbedaan antara Idzhar Halqi dan Idgham Bighunnah beserta masing-masing 2 hurufnya!", answer: "Idzhar dibaca jelas tanpa dengung, Idgham melebur dengan dengung 2 harakat.", type: "Uraian Singkat" },
    { id: '2', q: "Berapakah jumlah rakaat shalat Idul Fitri dan berapakah takbir pada rakaat pertama?", answer: "2 rakaat, 7 kali takbir di rakaat pertama.", type: "Pilihan Ganda" },
    { id: '3', q: "Sebutkan nama gelar yang diberikan kepada Sahabat Abu Bakar?", answer: "Ash-Shiddiq (Yang membenarkan).", type: "Isian" }
  ]);

  // Attendance Handlers
  const handleMarkAllPresent = () => {
    soundEngine.playSuccess();
    setRoster(prev => prev.map(r => ({ ...r, status: 'Hadir' as const })));
  };

  const handleUpdateStatus = (id: string, status: AttendanceRecord['status']) => {
    soundEngine.playClick();
    setRoster(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleUpdateNote = (id: string, note: string) => {
    setRoster(prev => prev.map(r => r.id === id ? { ...r, note } : r));
  };

  const handleTriggerTeacherFile = () => {
    soundEngine.playClick();
    teacherFileInputRef.current?.click();
  };

  const handleMaterialFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundEngine.playSuccess();
      setUploadedDocName(file.name);
      setUploadedDocSize((file.size / 1024).toFixed(1) + ' KB');
      if (!matTitle) {
        setMatTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
      }
      if (file.name.endsWith('.pdf')) setMatFormat('Dokumen PDF');
      else if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) setMatFormat('Video');
      else if (file.name.endsWith('.mp3') || file.name.endsWith('.wav')) setMatFormat('Audio MP3');
      else if (file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) setMatFormat('Slide Interaktif');
    }
  };

  const presentCount = roster.filter(r => r.status === 'Hadir').length;
  const sickCount = roster.filter(r => r.status === 'Sakit').length;
  const permitCount = roster.filter(r => r.status === 'Izin').length;

  const handleGradeAssignment = () => {
    if (!selectedAssignmentToGrade) return;
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    setAssignments(prev => prev.map(a => {
      if (a.id === selectedAssignmentToGrade.id) {
        return {
          ...a,
          status: 'dinilai' as const,
          studentSubmission: {
            ...a.studentSubmission,
            submittedAt: a.studentSubmission?.submittedAt || '2026-11-04 07:15',
            grade: assignedGradeInput,
            feedback: assignedFeedbackInput
          }
        };
      }
      return a;
    }));
    alert("Nilai tugas berhasil disimpan dan langsung diperbarui di Rapor Siswa & Dashboard Orang Tua!");
  };

  const handleValidateMutabaah = () => {
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setIsValidated(true);
    setMutabaahEntry(prev => ({
      ...prev,
      teacherValidated: true,
      teacherValidatorName: "Ustadz Ridwan, S.Pd.I",
      teacherValidatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    }));
  };

  const handleSaveTahfizEval = () => {
    if (!selectedSubmission) return;
    soundEngine.playReward();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    setTahfizList(prev => prev.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          status: 'dinilai',
          predicate: evalPredicate,
          score: evalScore,
          tajwidNotes: evalNotes,
          teacherName: "Ustadz Ridwan, S.Pd.I",
          evaluatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
      }
      return sub;
    }));

    setEvalSuccess(true);
    setTimeout(() => {
      setEvalSuccess(false);
      setSelectedSubmission(null);
    }, 1200);
  };

  const handleCreateMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle) return;
    soundEngine.playSuccess();
    const newM: LearningMaterial = {
      id: `mat_${Date.now()}`,
      title: matTitle,
      subjectId: 'sbj_custom',
      subjectName: matSubject,
      category: matCategory,
      grade: 2,
      format: matFormat,
      scheduledDate: matDate,
      scheduledTime: matTime,
      status: 'Terjadwal',
      description: uploadedDocName 
        ? `${matDesc || 'Materi pembelajaran terintegrasi kurikulum madrasah.'} (Lampiran: ${uploadedDocName} - ${uploadedDocSize || '2.4 MB'})`
        : (matDesc || 'Materi pembelajaran terintegrasi kurikulum madrasah.'),
      teacherName: 'Ustadz Ridwan, S.Pd.I'
    };
    setMaterials([newM, ...materials]);
    setNewMaterialModal(false);
    setMatTitle('');
    setMatDesc('');
    setUploadedDocName(null);
    setUploadedDocSize(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hidden Native File Input for Teacher File Manager */}
      <input
        type="file"
        ref={teacherFileInputRef}
        onChange={handleMaterialFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.zip,.png,.jpg"
      />
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-blue-300 uppercase mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Hak Akses Guru / Pendidik Madrasah</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Ruang Kerja Ustadz Ridwan, S.Pd.I
            </h1>
            <p className="text-xs sm:text-sm text-blue-100/80 mt-1 max-w-xl">
              Wali Kelas 2 Ali bin Abi Thalib · Guru Al-Qur'an Hadis & Koordinator Tahfiz Juz 30
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-2 rounded-2xl border border-white/10 text-xs">
            <div className="px-3 py-1 text-center">
              <div className="font-bold text-white text-base">{roster.length}</div>
              <div className="text-[10px] text-blue-200">Santri Binaan</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="px-3 py-1 text-center">
              <div className="font-bold text-amber-300 text-base">
                {tahfizList.filter(t => t.status === 'menunggu').length}
              </div>
              <div className="text-[10px] text-blue-200">Antrean Setoran</div>
            </div>
          </div>
        </div>

        {/* Feature Tabs Bar */}
        <div className="mt-6 pt-5 border-t border-slate-700 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('presensi'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'presensi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            📋 Presensi Digital & Keaktifan
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('grading_center'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'grading_center' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Pusat Penilaian (Grading Center)</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('kelola_materi'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'kelola_materi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            📚 Pembuatan & Penjadwalan Materi
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('bank_soal'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bank_soal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            ⚡ Bank Soal & Rapor
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('penghubung'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'penghubung' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
            <span>📖 Buku Penghubung Wali Santri</span>
            <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full font-bold ml-1">
              {liaisonMessages.filter(m => m.senderRole === 'orang_tua').length}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: PRESENSI DIGITAL & REKAP KEAKTIFAN */}
      {activeTab === 'presensi' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Presensi Kehadiran Santri (Kelas 2 Ali bin Abi Thalib)
                </h3>
                <p className="text-xs text-slate-500">
                  Tanggal: Rabu, 4 November 2026 · Otomatis tersinkronisasi ke Dashboard Orang Tua & WA.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMarkAllPresent}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-4 h-4" />
                  <span>Tandai Semua Hadir</span>
                </button>
              </div>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-800 font-bold block">Hadir</span>
                <span className="text-xl font-bold text-emerald-950 font-mono">{presentCount} Santri</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <span className="text-amber-800 font-bold block">Sakit</span>
                <span className="text-xl font-bold text-amber-950 font-mono">{sickCount} Santri</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                <span className="text-blue-800 font-bold block">Izin</span>
                <span className="text-xl font-bold text-blue-950 font-mono">{permitCount} Santri</span>
              </div>
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
                <span className="text-teal-800 font-bold block">Persentase</span>
                <span className="text-xl font-bold text-teal-950 font-mono">92.8%</span>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">NIS</th>
                    <th className="py-3 px-4">Nama Santri</th>
                    <th className="py-3 px-4">Waktu Tiba</th>
                    <th className="py-3 px-4">Status Kehadiran</th>
                    <th className="py-3 px-4">Catatan Harian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roster.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{student.nis}</td>
                      <td className="py-3 px-4 font-bold text-slate-800">{student.studentName}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{student.arrivalTime || '—'}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {(['Hadir', 'Sakit', 'Izin', 'Alpa'] as const).map(st => (
                            <button
                              key={st}
                              onClick={() => handleUpdateStatus(student.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                student.status === st
                                  ? st === 'Hadir'
                                    ? 'bg-emerald-600 text-white'
                                    : st === 'Sakit'
                                    ? 'bg-amber-500 text-white'
                                    : st === 'Izin'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-rose-600 text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 min-w-[220px]">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={student.note || ''}
                            onChange={(e) => handleUpdateNote(student.id, e.target.value)}
                            placeholder="Ketik catatan harian di sini..."
                            className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 bg-white placeholder:text-slate-300"
                          />
                          {student.note ? (
                            <span title="Tersimpan otomatis" className="text-emerald-600 text-xs font-bold shrink-0">✓</span>
                          ) : (
                            <Edit3 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rekap Keaktifan Siswa */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Rekap Keaktifan Pembelajaran & Kedisiplinan Ibadah</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Kelas 2 (28 Santri)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-950 block">Partisipasi Kuis Gamifikasi</span>
                <div className="text-2xl font-black text-emerald-800 font-mono">94%</div>
                <p className="text-[11px] text-emerald-700">26 santri telah menyelesaikan Kuis Bintang Rukun Islam.</p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-1">
                <span className="font-bold text-teal-950 block">Kepatuhan Jurnal Mutaba'ah</span>
                <div className="text-2xl font-black text-teal-800 font-mono">91%</div>
                <p className="text-[11px] text-teal-700">Orang tua telah memverifikasi shalat 5 waktu dan dhuha.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950 block">Kelancaran Setoran Tahfiz</span>
                <div className="text-2xl font-black text-amber-800 font-mono">88%</div>
                <p className="text-[11px] text-amber-700">Santri telah menyetor hafalan Surat Al-Kautsar & Al-Ikhlas.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PUSAT PENILAIAN (GRADING CENTER) */}
      {activeTab === 'grading_center' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Pusat Penilaian Guru (Grading Center)
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluasi tugas multi-format, validasi Jurnal Mutaba'ah ibadah, dan penilaian rekaman audio/video setoran hafalan santri.
              </p>
            </div>

            {/* Grading Center Subtabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => { soundEngine.playClick(); setGradingSubTab('tugas'); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  gradingSubTab === 'tugas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                1. Tugas Siswa ({assignments.length})
              </button>
              <button
                onClick={() => { soundEngine.playClick(); setGradingSubTab('mutabaah'); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  gradingSubTab === 'mutabaah' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                2. Validasi Mutaba'ah
              </button>
              <button
                onClick={() => { soundEngine.playClick(); setGradingSubTab('tahfiz'); }}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  gradingSubTab === 'tahfiz' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                3. Audio Setoran ({tahfizList.length})
              </button>
            </div>
          </div>

          {/* Subtab 1: Tugas Siswa Multi-Format */}
          {gradingSubTab === 'tugas' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Daftar Tugas Masuk
                </h4>
                {assignments.map((asg) => (
                  <div
                    key={asg.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedAssignmentToGrade(asg);
                      setAssignedGradeInput(asg.studentSubmission?.grade || 95);
                      setAssignedFeedbackInput(asg.studentSubmission?.feedback || 'Tugas telah diperiksa dengan sangat baik.');
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedAssignmentToGrade?.id === asg.id
                        ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-blue-900">{asg.subjectName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        asg.status === 'sudah_dikumpulkan' || asg.status === 'dinilai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {asg.status === 'dinilai' ? 'Sudah Dinilai' : 'Perlu Diperiksa'}
                      </span>
                    </div>
                    <div className="font-bold text-slate-800 text-sm">{asg.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Format: {asg.submissionFormat} · Santri: Ahmad Fauzi Mubarak (Kelas 2)
                    </div>
                  </div>
                ))}
              </div>

              {/* Grading Form Pane */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
                {selectedAssignmentToGrade ? (
                  <>
                    <div className="border-b border-slate-200 pb-3">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Pusat Penilaian Tugas</span>
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {selectedAssignmentToGrade.title}
                      </h4>
                      <p className="text-slate-600 text-[11px] mt-0.5">
                        Santri: Ahmad Fauzi Mubarak · Tenggat: {selectedAssignmentToGrade.dueDate}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="font-bold text-slate-700">Lampiran Jawaban Siswa:</div>
                      <div className="font-mono text-emerald-800 text-[11px]">
                        📎 {selectedAssignmentToGrade.studentSubmission?.fileName || 'Rekaman_Suara_Hafalan_AlKautsar.webm'}
                      </div>
                      <p className="text-slate-600 italic text-[11px]">
                        "{selectedAssignmentToGrade.studentSubmission?.textResponse || 'Assalamu\'alaikum Ustadz, berikut rekaman bacaan surat Al-Kautsar ayat 1-3.'}"
                      </p>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Input Nilai Angka (0–100):
                      </label>
                      <input
                        type="number"
                        value={assignedGradeInput}
                        onChange={(e) => setAssignedGradeInput(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-sm"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">
                        Catatan Evaluasi & Masukan Ustadz:
                      </label>
                      <textarea
                        rows={3}
                        value={assignedFeedbackInput}
                        onChange={(e) => setAssignedFeedbackInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white resize-none"
                      />
                    </div>

                    <button
                      onClick={handleGradeAssignment}
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simpan & Kirim Nilai Tugas</span>
                    </button>
                  </>
                ) : (
                  <div className="text-center py-10 text-slate-400">Pilih tugas di sebelah kiri untuk menilai.</div>
                )}
              </div>
            </div>
          )}

          {/* Subtab 2: Validasi Jurnal Mutabaah */}
          {gradingSubTab === 'mutabaah' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-[#FCFDFD] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Jurnal Santri:</span>
                    <h4 className="text-base font-bold text-slate-900">Ahmad Fauzi Mubarak (Kelas 2)</h4>
                  </div>
                  {isValidated ? (
                    <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Telah Divalidasi oleh Ustadz Ridwan</span>
                    </span>
                  ) : (
                    <button
                      onClick={handleValidateMutabaah}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FileCheck2 className="w-4 h-4" />
                      <span>Beri Cap Validasi Ustadz</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-slate-500 block">Subuh</span>
                    <span className="font-bold text-emerald-900">🕌 Masjid</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-slate-500 block">Dzuhur</span>
                    <span className="font-bold text-emerald-900">🕌 Masjid</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-center">
                    <span className="text-slate-500 block">Ashar</span>
                    <span className="font-bold text-teal-900">🏠 Rumah</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                    <span className="text-slate-500 block">Maghrib</span>
                    <span className="font-bold text-emerald-900">🕌 Masjid</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-center">
                    <span className="text-slate-500 block">Isya</span>
                    <span className="font-bold text-teal-900">🏠 Rumah</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="font-bold">Capaian Tambahan Santri:</div>
                  <div>• Shalat Dhuha: Sudah ditunaikan berjamaah di madrasah</div>
                  <div>• Tadarus Al-Qur'an: {mutabaahEntry.tilawah.detail}</div>
                  <div>• Catatan Orang Tua: "{mutabaahEntry.parentNotes}"</div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Catatan Spiritual Guru / Asatidz:
                  </label>
                  <textarea
                    rows={2}
                    value={teacherFeedbackNote}
                    onChange={(e) => setTeacherFeedbackNote(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Subtab 3: Penilaian Audio Setoran Tahfiz */}
          {gradingSubTab === 'tahfiz' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Antrean Audio/Video Setoran
                </h4>
                {tahfizList.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedSubmission(sub);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      selectedSubmission?.id === sub.id
                        ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-900">{sub.studentName} ({sub.studentGrade})</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        sub.status === 'dinilai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {sub.status === 'dinilai' ? sub.predicate : 'Menunggu Dinilai'}
                      </span>
                    </div>
                    <div className="font-bold text-emerald-800 text-sm">Surah {sub.surahName} · {sub.ayahRange}</div>
                    <div className="text-[11px] text-slate-400 mt-1">Durasi: {sub.audioDurationSeconds} detik · {sub.date}</div>
                  </div>
                ))}
              </div>

              {/* Evaluation Card */}
              <div className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4 text-xs">
                {selectedSubmission ? (
                  <>
                    <div className="border-b border-slate-200 pb-3">
                      <span className="text-slate-400 font-bold uppercase text-[10px]">Evaluasi Audio Setoran</span>
                      <h4 className="text-base font-bold text-slate-900 font-serif">
                        {selectedSubmission.studentName} — Surah {selectedSubmission.surahName}
                      </h4>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                      <div className="text-xs font-bold text-emerald-950">Rekaman Suara {selectedSubmission.ayahRange}</div>
                      <button
                        onClick={() => { soundEngine.playSuccess(); alert(`Memutar audio rekaman hafalan ${selectedSubmission.studentName}`); }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-2 mx-auto cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>Putar Audio Setoran</span>
                      </button>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Predikat:</label>
                      <select
                        value={evalPredicate}
                        onChange={(e) => setEvalPredicate(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                      >
                        <option value="Mumtaz">Mumtaz (Istimewa - 95-100)</option>
                        <option value="Jayyid Jiddan">Jayyid Jiddan (Sangat Baik - 85-94)</option>
                        <option value="Jayyid">Jayyid (Baik - 75-84)</option>
                        <option value="Perlu Muraja'ah">Perlu Muraja'ah (&lt;75)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Nilai Angka (0–100):</label>
                      <input
                        type="number"
                        value={evalScore}
                        onChange={(e) => setEvalScore(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Catatan Tajwid & Makharijul Huruf:</label>
                      <textarea
                        rows={2}
                        value={evalNotes}
                        onChange={(e) => setEvalNotes(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSaveTahfizEval}
                      className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Simpan & Notifikasi Orang Tua</span>
                    </button>
                  </>
                ) : (
                  <div className="text-center py-10 text-slate-400">Pilih rekaman di sebelah kiri untuk menilai.</div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PEMBUATAN & PENJADWALAN MATERI */}
      {activeTab === 'kelola_materi' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-serif">
                Pembuatan & Penjadwalan Materi Pembelajaran
              </h3>
              <p className="text-xs text-slate-500">
                Jadwalkan rilis materi multimedia umum dan keagamaan Kemenag (Al-Qur'an Hadis, Aqidah Akhlak, Fikih, SKI, Bahasa Arab).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setNewMaterialModal(true);
                  setTimeout(() => handleTriggerTeacherFile(), 150);
                }}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FolderOpen className="w-4 h-4 text-emerald-400" />
                <span>Upload dari File Manager</span>
              </button>
              <button
                onClick={() => setNewMaterialModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Jadwalkan Materi Baru</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {materials.map((mat) => (
              <div key={mat.id} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      mat.category === 'kemenag' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                    }`}>
                      {mat.subjectName} ({mat.category === 'kemenag' ? 'Kemenag' : 'Umum'})
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      mat.status === 'Diterbitkan' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {mat.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5">{mat.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{mat.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Rilis: {mat.scheduledDate} ({mat.scheduledTime})</span>
                  </div>
                  <span className="font-semibold text-emerald-700">{mat.format}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: BANK SOAL & RAPOR */}
      {activeTab === 'bank_soal' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-lg font-serif">
                Bank Soal & Penilaian Otomatis
              </h3>
              <p className="text-xs text-slate-500">
                Penyusunan kisi-kisi soal asesmen madrasah dan kuis gamifikasi interaktif.
              </p>
            </div>
            <button
              onClick={() => {
                soundEngine.playReward();
                setGeneratedQuestions([
                  { id: String(Date.now()), q: `Sebutkan 3 contoh perbuatan adab makan yang diajarkan Rasulullah SAW!`, answer: "Membaca bismillah, menggunakan tangan kanan, dan tidak mencela makanan.", type: "Uraian Singkat" },
                  ...generatedQuestions
                ]);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Soal Otomatis</span>
            </button>
          </div>

          <div className="space-y-3">
            {generatedQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900">Butir #{idx + 1} · {q.type}</span>
                  <span className="text-slate-400">Bobot: 10 Poin</span>
                </div>
                <p className="text-sm font-semibold text-slate-800">{q.q}</p>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200/60">
                  <span className="font-bold">Kunci Jawaban: </span> {q.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: BUKU PENGHUBUNG DIGITAL & KONSULTASI WALI SANTRI */}
      {activeTab === 'penghubung' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Buku Penghubung Digital: Komunikasi Wali Kelas & Wali Santri
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Saluran komunikasi resmi dua arah untuk konsultasi perkembangan ibadah, hafalan, dan akademik santri.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundEngine.playSuccess();
                  const waText = `*LAPORAN WALI KELAS MADRASAH IBTIDAIYAH*\nDari: Ustadz Ridwan, S.Pd.I (Wali Kelas 2)\nKepada: Bunda Aisyah (Wali Santri Ahmad Fauzi Mubarak)\n\nAssalamu'alaikum Bunda, kami menginformasikan ananda Ahmad hari ini hadir tepat waktu, menuntaskan shalat dhuha dan setoran hafalan Surah Al-Kautsar dengan predikat Mumtaz (96). Terima kasih atas kerja samanya.`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`, '_blank');
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Kirim Ringkasan WA ke Wali Santri</span>
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {liaisonToast && (
            <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                <span>{liaisonToast}</span>
              </div>
              <button onClick={() => setLiaisonToast(null)} className="text-white/80 hover:text-white text-xs">✕</button>
            </div>
          )}

          {/* Active Consultation Context Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-2xl border border-blue-200 shrink-0">
                👦🏻
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-blue-900">
                  <span>Ahmad Fauzi Mubarak</span>
                  <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Kelas 2 Ali bin Abi Thalib</span>
                </div>
                <div className="text-slate-600 text-[11px] mt-0.5">
                  Wali Santri: <strong className="text-slate-800">Bunda Aisyah</strong> · NIS: 202602014
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Kehadiran</span>
                <span className="font-bold text-emerald-700">100% Hadir</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Hafalan</span>
                <span className="font-bold text-blue-700">Al-Kautsar (96)</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px]">Mutaba'ah</span>
                <span className="font-bold text-teal-700">5 Waktu + Dhuha</span>
              </div>
            </div>
          </div>

          {/* Filter & Templates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium">Filter Topik:</span>
                {(['semua', 'Hafalan', 'Ibadah', 'Akademik', 'Izin / Sakit', 'Pengumuman'] as const).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setLiaisonFilterTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      liaisonFilterTag === tag
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag === 'semua' ? 'Semua Topik' : tag}
                  </button>
                ))}
              </div>

              <span className="text-[11px] text-slate-400 font-mono">
                Total {liaisonMessages.length} Percakapan
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-slate-400 font-medium">Templat Balasan Ustadz:</span>
              <button
                onClick={() => handleTeacherQuickTemplate("Wa'alaikumussalam warahmatullah Bunda Aisyah. Alhamdulillah hafalan ananda hari ini sangat lancar dan makhraj tajwidnya tartil.", "Hafalan")}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium cursor-pointer"
              >
                + Puji Hafalan
              </button>
              <button
                onClick={() => handleTeacherQuickTemplate("Wa'alaikumussalam Bunda Aisyah. Baik dicatat, izin sakit/kontrol gigi ananda sudah kami perbarui di presensi digital madrasah. Syafakallahu khairan.", "Izin / Sakit")}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium cursor-pointer"
              >
                + Konfirmasi Izin
              </button>
              <button
                onClick={() => handleTeacherQuickTemplate("Wa'alaikumussalam Bunda Aisyah. Tugas ananda sudah kami nilai dengan hasil istimewa (95/100). Terima kasih pendampingannya di rumah.", "Akademik")}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-medium cursor-pointer"
              >
                + Konfirmasi Nilai
              </button>
            </div>
          </div>

          {/* Conversation Thread */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2 border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
            {liaisonMessages
              .filter(m => liaisonFilterTag === 'semua' || m.tag === liaisonFilterTag)
              .map((msg) => {
                const isTeacher = msg.senderRole === 'guru';
                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isTeacher
                        ? 'bg-blue-50/80 border-blue-200 ml-6 sm:ml-12 shadow-2xs'
                        : 'bg-rose-50/80 border-rose-200 mr-6 sm:mr-12 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{msg.senderName}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isTeacher ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {msg.tag}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          ({isTeacher ? 'Wali Kelas' : 'Orang Tua'})
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{msg.content}</p>
                  </div>
                );
              })}
            <div ref={liaisonMessagesEndRef} />
          </div>

          {/* Teacher Reply Input Box */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Kategori Balasan:</span>
                {(['Hafalan', 'Ibadah', 'Akademik', 'Izin / Sakit', 'Pengumuman'] as const).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setTeacherReplyTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      teacherReplyTag === tag ? 'bg-blue-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {teacherReplyText.trim() && (
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    const text = `*PESAN WALI KELAS MADRASAH IBTIDAIYAH*\nDari: Ustadz Ridwan, S.Pd.I\nKepada: Bunda Aisyah (Wali Ahmad Fauzi Mubarak)\nTopik: [${teacherReplyTag}]\n\n${teacherReplyText}`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer hover:underline text-[11px]"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Kirim juga via WhatsApp</span>
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={teacherReplyText}
                onChange={(e) => setTeacherReplyText(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleTeacherSendReply(); 
                  }
                }}
                placeholder="Tuliskan tanggapan, evaluasi santri, atau instruksi untuk Bunda Aisyah..."
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white shadow-inner"
              />
              <button
                onClick={handleTeacherSendReply}
                disabled={!teacherReplyText.trim()}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Balasan Wali Kelas</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Buat & Jadwalkan Materi Baru */}
      {newMaterialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 font-serif">Buat & Jadwalkan Materi Pelajaran</h3>
              <button onClick={() => setNewMaterialModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateMaterial} className="space-y-3 text-xs">
              {/* Native File Manager Upload Section */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Unggah Berkas dari File Manager (PDF / Video / MP3 / PPT):</label>
                <div
                  onClick={handleTriggerTeacherFile}
                  className="p-4 border-2 border-dashed border-emerald-300 rounded-2xl bg-emerald-50/40 hover:bg-emerald-50/80 transition-all text-center cursor-pointer space-y-2 group"
                >
                  <FolderOpen className="w-8 h-8 text-emerald-600 mx-auto group-hover:scale-105 transition-transform" />
                  {uploadedDocName ? (
                    <div>
                      <p className="font-bold text-emerald-900 text-xs">📎 Berkas Terpilih: {uploadedDocName}</p>
                      <p className="text-[10px] text-emerald-700 font-mono">Ukuran: {uploadedDocSize || '1.8 MB'} · Siap Dilampirkan</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-slate-700 text-xs">Klik untuk membuka File Manager HP / Komputer</p>
                      <p className="text-[10px] text-slate-500">Mendukung PDF, DOCX, PPTX, MP4, MP3</p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTriggerTeacherFile();
                    }}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 hover:bg-slate-800 cursor-pointer"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{uploadedDocName ? 'Ganti Berkas Dokumen' : 'Pilih Berkas dari File Manager'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul Materi:</label>
                <input
                  type="text"
                  required
                  value={matTitle}
                  onChange={(e) => setMatTitle(e.target.value)}
                  placeholder="Contoh: Video Interaktif Cara Wudhu yang Benar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mata Pelajaran:</label>
                  <select
                    value={matSubject}
                    onChange={(e) => {
                      setMatSubject(e.target.value);
                      const isKemenag = ['Al-Qur\'an Hadis', 'Aqidah Akhlak', 'Fikih Ibadah', 'Sejarah Kebudayaan Islam', 'Bahasa Arab'].includes(e.target.value);
                      setMatCategory(isKemenag ? 'kemenag' : 'umum');
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option>Al-Qur'an Hadis</option>
                    <option>Aqidah Akhlak</option>
                    <option>Fikih Ibadah</option>
                    <option>Sejarah Kebudayaan Islam</option>
                    <option>Bahasa Arab</option>
                    <option>Matematika</option>
                    <option>IPAS</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Format Pembelajaran:</label>
                  <select
                    value={matFormat}
                    onChange={(e) => setMatFormat(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Video">Video Interaktif MP4</option>
                    <option value="Dokumen PDF">Dokumen PDF / Buku Siswa</option>
                    <option value="Audio MP3">Audio Murattal MP3</option>
                    <option value="Slide Interaktif">Slide Presentasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Rilis:</label>
                  <input
                    type="date"
                    value={matDate}
                    onChange={(e) => setMatDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Waktu Tayang:</label>
                  <input
                    type="text"
                    value={matTime}
                    onChange={(e) => setMatTime(e.target.value)}
                    placeholder="07:30 WIB"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi & Capaian Belajar:</label>
                <textarea
                  rows={3}
                  value={matDesc}
                  onChange={(e) => setMatDesc(e.target.value)}
                  placeholder="Instruksi dan poin kompetensi materi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewMaterialModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl shadow-xs"
                >
                  Jadwalkan Materi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
