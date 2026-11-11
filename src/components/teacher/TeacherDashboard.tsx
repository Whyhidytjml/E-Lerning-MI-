import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  mockClassRoster, 
  mockTahfizSubmissions, 
  mockMutabaahToday, 
  mockAssignments,
  mockLearningMaterials,
  mockLiaisonMessages,
  mockUserAccounts
} from '../../data/mockData';
import { AttendanceRecord, TahfizSubmission, MutabaahEntry, Assignment, LearningMaterial, LiaisonMessage, Subject, UserAccount, CbtExamResult } from '../../types/lms';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { getStoredMaterials, saveStoredMaterials, MATERIALS_UPDATED_EVENT } from '../../utils/materialsStorage';
import { getStoredSubjects, SUBJECTS_UPDATED_EVENT } from '../../utils/subjectsStorage';
import { getCbtResults, updateCbtTeacherNote, CBT_RESULTS_UPDATED_EVENT } from '../../utils/cbtStorage';
import { cbtSubjectList, getShuffledQuestionsForStudent, CbtQuestionItem } from '../../data/cbtQuestions';
import { MaterialReaderModal } from '../common/MaterialReaderModal';
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
  Share2,
  Trash2,
  Save,
  Shuffle,
  TrendingUp,
  Printer,
  XCircle,
  Eye,
  AlertTriangle,
  X,
  ChevronRight
} from 'lucide-react';

interface TeacherDashboardProps {
  initialTab?: 'presensi' | 'grading_center' | 'cbt_results' | 'kelola_materi' | 'bank_soal' | 'penghubung';
  messages?: LiaisonMessage[];
  onSendMessage?: (msg: LiaisonMessage) => void;
  currentUser?: UserAccount;
  onSwitchTeacher?: (teacher: UserAccount) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  initialTab = 'presensi',
  messages: externalMessages,
  onSendMessage: externalOnSendMessage,
  currentUser,
  onSwitchTeacher
}) => {
  const activeTeacherName = currentUser?.name || "Ustadz Ridwan, S.Pd.I";
  const activeTeacherTitle = currentUser?.title || "Wali Kelas 2 Ali bin Abi Thalib · Guru Al-Qur'an Hadis & Koordinator Tahfiz Juz 30";
  const activeTeacherAvatar = currentUser?.avatar || "👳🏻‍♂️";
  const teacherAccounts = mockUserAccounts.filter(u => u.role === 'guru');

  const [activeTab, setActiveTab] = useState<'presensi' | 'grading_center' | 'cbt_results' | 'kelola_materi' | 'bank_soal' | 'penghubung'>(initialTab);
  
  // Sync activeTab when initialTab changes from parent Header
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Grading Center Subtab: 1. Tugas Siswa, 2. Validasi Mutabaah, 3. Setoran Tahfiz
  const [gradingSubTab, setGradingSubTab] = useState<'tugas' | 'mutabaah' | 'tahfiz'>('tugas');

  const [roster, setRoster] = useState<AttendanceRecord[]>(mockClassRoster);
  const [tahfizList, setTahfizList] = useState<TahfizSubmission[]>(mockTahfizSubmissions);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);

  // Persistent Learning Materials stored in localStorage
  const [materials, setMaterials] = useState<LearningMaterial[]>(() => getStoredMaterials());
  const [previewMaterial, setPreviewMaterial] = useState<LearningMaterial | null>(null);

  // Persistent Subjects synchronized from Admin
  const [subjects, setSubjects] = useState<Subject[]>(() => getStoredSubjects());

  // Sync materials & subjects across browser tabs and same-window events
  useEffect(() => {
    const handleSync = () => {
      setMaterials(getStoredMaterials());
    };
    const handleSubjectsSync = () => {
      setSubjects(getStoredSubjects());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener(MATERIALS_UPDATED_EVENT, handleSync);
    window.addEventListener('storage', (e) => {
      if (e.key === 'madrasahku_subjects') {
        setSubjects(getStoredSubjects());
      }
    });
    window.addEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener(MATERIALS_UPDATED_EVENT, handleSync);
      window.removeEventListener(SUBJECTS_UPDATED_EVENT, handleSubjectsSync);
    };
  }, []);

  // Persistent CBT Exam Simulation Results
  const [cbtResults, setCbtResults] = useState<CbtExamResult[]>(() => getCbtResults());
  const [cbtClassFilter, setCbtClassFilter] = useState<string>('all');
  const [cbtSubjectFilter, setCbtSubjectFilter] = useState<string>('all');
  const [cbtStatusFilter, setCbtStatusFilter] = useState<'all' | 'tuntas' | 'remidial' | 'mumtaz'>('all');
  const [cbtSearchQuery, setCbtSearchQuery] = useState<string>('');
  const [selectedCbtDetail, setSelectedCbtDetail] = useState<CbtExamResult | null>(null);
  const [cbtDetailTeacherNote, setCbtDetailTeacherNote] = useState<string>('');
  const [cbtNoteSaveToast, setCbtNoteSaveToast] = useState<boolean>(false);

  // Sync CBT results across events and browser storage
  useEffect(() => {
    const handleCbtSync = () => {
      setCbtResults(getCbtResults());
    };
    window.addEventListener(CBT_RESULTS_UPDATED_EVENT, handleCbtSync);
    window.addEventListener('storage', handleCbtSync);
    return () => {
      window.removeEventListener(CBT_RESULTS_UPDATED_EVENT, handleCbtSync);
      window.removeEventListener('storage', handleCbtSync);
    };
  }, []);

  // Update local note state when selectedCbtDetail is opened
  useEffect(() => {
    if (selectedCbtDetail) {
      setCbtDetailTeacherNote(selectedCbtDetail.teacherNote || '');
    }
  }, [selectedCbtDetail]);

  const handleSaveCbtTeacherNote = () => {
    if (!selectedCbtDetail) return;
    soundEngine.playSuccess();
    updateCbtTeacherNote(selectedCbtDetail.id, cbtDetailTeacherNote);
    setSelectedCbtDetail((prev) => (prev ? { ...prev, teacherNote: cbtDetailTeacherNote } : null));
    setCbtNoteSaveToast(true);
    setTimeout(() => setCbtNoteSaveToast(false), 3000);
  };

  // Filtered CBT results
  const filteredCbtResults = useMemo(() => {
    return cbtResults.filter((r) => {
      const matchClass =
        cbtClassFilter === 'all' ||
        (cbtClassFilter === '2' && r.studentGrade === 2) ||
        (cbtClassFilter === '5' && r.studentGrade === 5);
      const matchSubject = cbtSubjectFilter === 'all' || r.subjectId === cbtSubjectFilter;
      const matchStatus =
        cbtStatusFilter === 'all' ||
        (cbtStatusFilter === 'tuntas' && r.isPassed) ||
        (cbtStatusFilter === 'remidial' && !r.isPassed) ||
        (cbtStatusFilter === 'mumtaz' && r.predicate === 'Mumtaz');
      const matchSearch =
        !cbtSearchQuery.trim() ||
        r.studentName.toLowerCase().includes(cbtSearchQuery.toLowerCase()) ||
        r.studentNis.toLowerCase().includes(cbtSearchQuery.toLowerCase()) ||
        r.subjectName.toLowerCase().includes(cbtSearchQuery.toLowerCase());

      return matchClass && matchSubject && matchStatus && matchSearch;
    });
  }, [cbtResults, cbtClassFilter, cbtSubjectFilter, cbtStatusFilter, cbtSearchQuery]);

  // CBT Summary Statistics
  const cbtStats = useMemo(() => {
    const total = cbtResults.length;
    if (total === 0) return { total: 0, avgScore: 0, passRate: 0, mumtazCount: 0, remidialCount: 0 };
    const sumScore = cbtResults.reduce((acc, curr) => acc + curr.score, 0);
    const passedCount = cbtResults.filter((r) => r.isPassed).length;
    const mumtazCount = cbtResults.filter((r) => r.predicate === 'Mumtaz').length;
    const remidialCount = total - passedCount;
    return {
      total,
      avgScore: Math.round(sumScore / total),
      passRate: Math.round((passedCount / total) * 100),
      mumtazCount,
      remidialCount
    };
  }, [cbtResults]);

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

  // New Material Modal State
  const [newMaterialModal, setNewMaterialModal] = useState(false);
  const [matTitle, setMatTitle] = useState('');
  const [matSubject, setMatSubject] = useState("Al-Qur'an Hadis");
  const [matCategory, setMatCategory] = useState<'kemenag' | 'umum'>('kemenag');
  const [matGrade, setMatGrade] = useState<number>(0); // 0 = Semua Tingkat Kelas (1-6)
  const [matFormat, setMatFormat] = useState<LearningMaterial['format']>('Video');
  const [matStatus, setMatStatus] = useState<'Diterbitkan' | 'Terjadwal'>('Diterbitkan');
  const [matDate, setMatDate] = useState('2026-11-07');
  const [matTime, setMatTime] = useState('07:30 WIB');
  const [matDesc, setMatDesc] = useState('');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);
  const [uploadedDocSize, setUploadedDocSize] = useState<string | null>(null);
  const teacherFileInputRef = useRef<HTMLInputElement>(null);
  const [materialSuccessToast, setMaterialSuccessToast] = useState(false);

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
      senderName: activeTeacherName,
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
      teacherValidatorName: activeTeacherName,
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
          teacherName: activeTeacherName,
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
      title: matTitle.trim(),
      subjectId: `sbj_${matSubject.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      subjectName: matSubject,
      category: matCategory,
      grade: matGrade,
      format: matFormat,
      scheduledDate: matDate || new Date().toISOString().split('T')[0],
      scheduledTime: matTime || '07:30 WIB',
      status: matStatus,
      description: uploadedDocName 
        ? `${matDesc || 'Materi pembelajaran terintegrasi kurikulum madrasah.'} (Lampiran: ${uploadedDocName} - ${uploadedDocSize || '2.4 MB'})`
        : (matDesc || 'Materi pembelajaran terintegrasi kurikulum madrasah.'),
      teacherName: activeTeacherName,
      documentFileName: uploadedDocName || (matFormat === 'Dokumen PDF' ? `${matTitle.trim().replace(/\s+/g, '_')}.pdf` : undefined),
      documentFileSize: uploadedDocSize || '2.4 MB',
      contentBody: matDesc || 'Silakan pelajari bab materi ini dan catat poin-poin penting untuk persiapan kuis dan tugas madrasah.',
      keyTakeaways: [
        `Materi ajar resmi ${matSubject} Kelas ${matGrade}.`,
        'Dapat diakses langsung di aplikasi tanpa harus mengunduh berkas.',
        'Mengacu pada kurikulum terpadu Madrasah Ibtidaiyah.'
      ],
      pages: [
        {
          pageNumber: 1,
          heading: `Pengantar Materi: ${matTitle.trim()}`,
          subheading: `Mata Pelajaran ${matSubject} · Kelas ${matGrade}`,
          paragraphs: [
            matDesc || 'Materi ajar resmi dari guru pengampu telah diterbitkan dan dapat langsung diakses oleh santri secara online.',
            'Pelajari setiap pembahasan dengan seksama dan catat kaidah-kaidah penting di buku tulis madrasah ananda masing-masing.'
          ],
          keyPoints: [
            'Dapat diakses langsung oleh siswa secara online tanpa perlu unduh.',
            'Tersedia tombol suara panduan untuk mendengarkan isi materi.'
          ],
          exercisePrompt: `Apa tujuan pembelajaran dari materi "${matTitle.trim()}"?`,
          exerciseAnswer: 'Memperkuat pemahaman materi ajar santri dan membangun akhlak mulia sesuai nilai-nilai madrasah.'
        }
      ]
    };
    
    const updated = [newM, ...materials];
    setMaterials(updated);
    saveStoredMaterials(updated);

    setNewMaterialModal(false);
    setMatTitle('');
    setMatDesc('');
    setUploadedDocName(null);
    setUploadedDocSize(null);
    setMaterialSuccessToast(true);
    setTimeout(() => setMaterialSuccessToast(false), 3500);
  };

  const handleDeleteMaterial = (id: string, title: string) => {
    soundEngine.playClick();
    if (window.confirm(`Hapus materi "${title}"?`)) {
      const updated = materials.filter(m => m.id !== id);
      setMaterials(updated);
      saveStoredMaterials(updated);
    }
  };

  const handleResetMaterials = () => {
    soundEngine.playClick();
    if (window.confirm('Kembalikan modul & materi ajar ke data bawaan madrasah?')) {
      setMaterials(mockLearningMaterials);
      saveStoredMaterials(mockLearningMaterials);
    }
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
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-blue-300 uppercase mb-2">
              <UserCheck className="w-4 h-4" />
              <span>Hak Akses Guru / Pendidik Madrasah</span>
            </div>
            <div className="flex items-center gap-3.5">
              <span className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {activeTeacherAvatar}
              </span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
                  Ruang Kerja {activeTeacherName}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100/80 mt-0.5 max-w-xl">
                  {activeTeacherTitle}
                </p>
              </div>
            </div>

            {onSwitchTeacher && (
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                <span className="text-xs text-blue-200 font-medium">Akun Guru Aktif (Sesuai Pemetaan):</span>
                <select
                  value={currentUser?.id || 'usr_guru_01'}
                  onChange={(e) => {
                    const targetUser = teacherAccounts.find(u => u.id === e.target.value);
                    if (targetUser) {
                      soundEngine.playReward();
                      onSwitchTeacher(targetUser);
                    }
                  }}
                  className="bg-blue-950/90 border border-blue-400/50 text-white rounded-xl px-3 py-1.5 text-xs cursor-pointer focus:outline-hidden focus:ring-1 focus:ring-blue-400 font-semibold"
                >
                  {teacherAccounts.map(tch => (
                    <option key={tch.id} value={tch.id} className="bg-slate-900 text-white">
                      {tch.avatar} {tch.name} ({tch.title})
                    </option>
                  ))}
                </select>
              </div>
            )}
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
            onClick={() => { soundEngine.playClick(); setActiveTab('cbt_results'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'cbt_results' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Shuffle className="w-3.5 h-3.5 text-emerald-400" />
            <span>📊 Hasil Simulasi CBT</span>
            <span className="px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[10px] rounded-full font-black ml-1">
              {cbtResults.length}
            </span>
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
                      <span>Telah Divalidasi oleh {mutabaahEntry.teacherValidatorName || activeTeacherName}</span>
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

      {/* TAB: HASIL SIMULASI CBT SANTRI */}
      {activeTab === 'cbt_results' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Shuffle className="w-4 h-4" />
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg font-serif">
                    Rekapitulasi & Analisis Hasil Simulasi CBT Santri
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Pantau perolehan nilai simulasi asesmen per mata pelajaran, tingkat ketuntasan KKM (70), serta lembar jawaban santri secara real-time.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    const headers = ['NIS', 'Nama Santri', 'Kelas', 'Mata Pelajaran', 'Skor', 'Benar', 'Salah', 'Predikat', 'Status KKM', 'Tanggal Selesai', 'Kode Paket'];
                    const rows = filteredCbtResults.map((r: CbtExamResult) => [
                      r.studentNis,
                      `"${r.studentName}"`,
                      `"${r.className}"`,
                      `"${r.subjectName}"`,
                      r.score,
                      r.correctCount,
                      r.wrongCount,
                      r.predicate,
                      r.isPassed ? 'Tuntas' : 'Remidial',
                      `"${r.completedAt}"`,
                      r.packageCode
                    ]);
                    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e: (string | number)[]) => e.join(','))].join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `Rekap_Hasil_CBT_MI_Darul_Ulum_${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Ekspor CSV</span>
                </button>
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    window.print();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Rekap</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 space-y-1">
                <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Total Sesi Ujian</span>
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-950">
                  {cbtStats.total} <span className="text-xs font-semibold text-emerald-700">Selesai</span>
                </div>
                <div className="text-[11px] text-emerald-700">
                  Tersimpan di sistem madrasah
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 space-y-1">
                <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Rata-Rata Nilai</span>
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-blue-950">
                  {cbtStats.avgScore} <span className="text-xs font-semibold text-blue-700">/ 100</span>
                </div>
                <div className="text-[11px] text-blue-700">
                  Rata-rata seluruh mapel
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100 space-y-1">
                <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Ketuntasan KKM (≥70)</span>
                  <Award className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-950">
                  {cbtStats.passRate}%
                </div>
                <div className="text-[11px] text-amber-700">
                  {cbtStats.total - cbtStats.remidialCount} santri tuntas KKM
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 space-y-1">
                <div className="text-[11px] font-bold text-purple-800 uppercase tracking-wider flex items-center justify-between">
                  <span>Predikat Mumtaz</span>
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-purple-950">
                  {cbtStats.mumtazCount} <span className="text-xs font-semibold text-purple-700">Santri</span>
                </div>
                <div className="text-[11px] text-purple-700">
                  Nilai sangat istimewa (≥ 90)
                </div>
              </div>
            </div>

            {/* Remedial Warning Notice if any student needs attention */}
            {cbtStats.remidialCount > 0 && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-rose-950 font-bold block">
                      Perhatian Guru: Ada {cbtStats.remidialCount} Hasil Ujian Di Bawah KKM (&lt; 70)
                    </strong>
                    <span className="text-rose-700">
                      Santri memerlukan pendampingan remidial dan pembahasan modul penguatan materi.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setCbtStatusFilter('remidial');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold cursor-pointer transition-colors self-start sm:self-auto shrink-0"
                >
                  Tampilkan Santri Remidial
                </button>
              </div>
            )}

            {/* Filter & Search Bar */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                {/* Search */}
                <div className="relative min-w-[200px] flex-1 sm:flex-none">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={cbtSearchQuery}
                    onChange={(e) => setCbtSearchQuery(e.target.value)}
                    placeholder="Cari santri / NIS / mapel..."
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Filter Kelas */}
                <select
                  value={cbtClassFilter}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setCbtClassFilter(e.target.value);
                  }}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Semua Kelas</option>
                  <option value="2">Kelas 2 Ali bin Abi Thalib</option>
                  <option value="5">Kelas 5 Siti Khadijah</option>
                </select>

                {/* Filter Mapel */}
                <select
                  value={cbtSubjectFilter}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setCbtSubjectFilter(e.target.value);
                  }}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Semua Mata Pelajaran</option>
                  {cbtSubjectList.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                  <option value="all_pkg">Paket Terpadu (Semua Mapel)</option>
                </select>

                {/* Filter Status */}
                <select
                  value={cbtStatusFilter}
                  onChange={(e) => {
                    soundEngine.playClick();
                    setCbtStatusFilter(e.target.value as any);
                  }}
                  className="px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Semua Status Kelulusan</option>
                  <option value="tuntas">✓ Tuntas KKM (≥ 70)</option>
                  <option value="remidial">⚠️ Perlu Remidial (&lt; 70)</option>
                  <option value="mumtaz">🏆 Mumtaz (≥ 90)</option>
                </select>

                {(cbtClassFilter !== 'all' || cbtSubjectFilter !== 'all' || cbtStatusFilter !== 'all' || cbtSearchQuery) && (
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setCbtClassFilter('all');
                      setCbtSubjectFilter('all');
                      setCbtStatusFilter('all');
                      setCbtSearchQuery('');
                    }}
                    className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-bold cursor-pointer"
                  >
                    Reset Filter
                  </button>
                )}
              </div>

              <div className="text-xs font-bold text-slate-500">
                Menampilkan <strong className="text-slate-800">{filteredCbtResults.length}</strong> dari {cbtResults.length} data
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Santri</th>
                    <th className="p-3.5">Kelas</th>
                    <th className="p-3.5">Mata Pelajaran</th>
                    <th className="p-3.5 text-center">Jawaban (B/S)</th>
                    <th className="p-3.5">Nilai CBT</th>
                    <th className="p-3.5">Predikat & Status</th>
                    <th className="p-3.5">Waktu Selesai</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCbtResults.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-slate-400">
                        Tidak ada riwayat hasil simulasi CBT yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredCbtResults.map((res: CbtExamResult) => {
                      return (
                        <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-medium">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs shrink-0">
                                {res.studentName.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{res.studentName}</div>
                                <div className="text-[10px] text-slate-400 font-mono">NIS: {res.studentNis}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold border border-slate-200">
                              {res.className}
                            </span>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${res.category === 'kemenag' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                              <span className="font-bold text-slate-800">{res.subjectName}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {res.packageCode} • {res.durationSpentMinutes} menit
                            </span>
                          </td>
                          <td className="p-3.5 text-center whitespace-nowrap">
                            <span className="font-mono text-emerald-700 font-bold">{res.correctCount}</span>
                            <span className="text-slate-400"> / </span>
                            <span className="font-mono text-rose-600 font-bold">{res.wrongCount}</span>
                            <div className="text-[9px] text-slate-400">dari {res.totalQuestions} soal</div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className={`text-base font-black font-mono ${res.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                                {res.score}
                              </span>
                              <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${res.isPassed ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                  style={{ width: `${res.score}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 whitespace-nowrap">
                            <div className="space-y-0.5">
                              <span
                                className={`px-2 py-0.5 rounded-md font-bold text-[10px] inline-block ${
                                  res.predicate === 'Mumtaz'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                    : res.predicate === 'Jayyid Jiddan'
                                    ? 'bg-blue-100 text-blue-900 border border-blue-200'
                                    : res.predicate === 'Jayyid'
                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                    : 'bg-rose-100 text-rose-900 border border-rose-200'
                                }`}
                              >
                                {res.predicate}
                              </span>
                              <div className={`text-[10px] font-semibold ${res.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {res.isPassed ? '✓ Tuntas KKM' : '⚠️ Butuh Remidial'}
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                            {res.completedAt}
                          </td>
                          <td className="p-3.5 text-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                soundEngine.playClick();
                                setSelectedCbtDetail(res);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ml-auto"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Lihat Lembar Jawaban</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

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
                onClick={handleResetMaterials}
                title="Reset materi ke default madrasah"
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-slate-200"
              >
                <span>Reset Default</span>
              </button>
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

          {/* Persistence status banner */}
          <div className="flex items-center justify-between bg-blue-50/70 border border-blue-200/80 rounded-xl px-4 py-2.5 text-xs text-blue-950">
            <div className="flex items-center gap-2">
              <Save className="w-4 h-4 text-blue-700 shrink-0" />
              <span>
                <strong>Penyimpanan Otomatis Aktif:</strong> Materi yang Anda unggah otomatis tersimpan di penyimpanan lokal dan <strong>tidak akan hilang saat Anda berganti menu ataupun me-refresh halaman</strong>.
              </span>
            </div>
            <span className="font-mono text-[11px] text-blue-800 font-bold shrink-0">
              {materials.length} Materi Terdaftar
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {materials.map((mat) => (
              <div key={mat.id} className="p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between bg-white shadow-2xs">
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

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                  <button
                    onClick={() => {
                      soundEngine.playSuccess();
                      setPreviewMaterial(mat);
                    }}
                    className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors self-start"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lihat Tampilan Siswa (Online)</span>
                  </button>

                  <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
                    <span className="font-semibold text-emerald-700">{mat.format}</span>
                    <button
                      onClick={() => handleDeleteMaterial(mat.id, mat.title)}
                      title={`Hapus materi "${mat.title}"`}
                      className="p-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
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
                  const waText = `*LAPORAN PENDIDIK MI DARUL ULUM SIDAREJA*\nDari: ${activeTeacherName} (${activeTeacherTitle})\nKepada: Bunda Aisyah (Wali Santri Ahmad Fauzi Mubarak)\n\nAssalamu'alaikum Bunda, kami menginformasikan ananda Ahmad hari ini hadir tepat waktu, menuntaskan shalat dhuha dan setoran hafalan Surah Al-Kautsar dengan predikat Mumtaz (96). Terima kasih atas kerja samanya.`;
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
                    const text = `*PESAN PENDIDIK MI DARUL ULUM SIDAREJA*\nDari: ${activeTeacherName}\nKepada: Bunda Aisyah (Wali Ahmad Fauzi Mubarak)\nTopik: [${teacherReplyTag}]\n\n${teacherReplyText}`;
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
                      const selectedVal = e.target.value;
                      setMatSubject(selectedVal);
                      const matched = subjects.find(s => s.name === selectedVal);
                      if (matched) {
                        setMatCategory(matched.category);
                      }
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.name}>
                        {sub.name} ({sub.category === 'kemenag' ? 'Kemenag' : 'Umum'})
                      </option>
                    ))}
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
                  <label className="font-bold text-slate-700 block mb-1">Target Tingkat Kelas:</label>
                  <select
                    value={matGrade}
                    onChange={(e) => setMatGrade(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value={0}>Semua Kelas (Kelas 1–6)</option>
                    <option value={1}>Kelas 1 (Fase A)</option>
                    <option value={2}>Kelas 2 (Fase A)</option>
                    <option value={3}>Kelas 3 (Fase B)</option>
                    <option value={4}>Kelas 4 (Fase B)</option>
                    <option value={5}>Kelas 5 (Fase C)</option>
                    <option value={6}>Kelas 6 (Fase C)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Status Publikasi:</label>
                  <select
                    value={matStatus}
                    onChange={(e) => setMatStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Diterbitkan">Diterbitkan (Langsung Aktif untuk Siswa)</option>
                    <option value="Terjadwal">Terjadwal (Sesuai Jam Rilis)</option>
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

      {/* Toast Notifikasi Sukses Unggah Materi */}
      {materialSuccessToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-xl border border-blue-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 text-xs">
          <div className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="font-bold">Materi Berhasil Dijadwalkan & Disimpan!</div>
            <div className="text-blue-200 text-[11px]">Materi tersimpan otomatis dan tidak akan hilang saat berpindah menu.</div>
          </div>
        </div>
      )}

      {/* Pratinjau Tampilan Siswa Langsung (Online Reader Modal) */}
      {previewMaterial && (
        <MaterialReaderModal
          material={previewMaterial}
          isOpen={Boolean(previewMaterial)}
          onClose={() => setPreviewMaterial(null)}
        />
      )}

      {/* ================= MODAL DETAIL LEMBAR HASIL CBT SANTRI ================= */}
      {selectedCbtDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wide uppercase flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Lembar Jawaban Santri</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 font-mono text-[10px] border border-white/20">
                    Paket: {selectedCbtDetail.packageCode}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                  Evaluasi CBT: {selectedCbtDetail.studentName} ({selectedCbtDetail.className})
                </h3>
                <p className="text-xs text-emerald-300">
                  Mata Pelajaran: <strong>{selectedCbtDetail.subjectName}</strong> • Diselesaikan: {selectedCbtDetail.completedAt}
                </p>
              </div>

              <button
                onClick={() => setSelectedCbtDetail(null)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Summary Banner */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-1">
                  <span className={`text-3xl font-black font-mono ${selectedCbtDetail.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {selectedCbtDetail.score}
                  </span>
                  <span className="text-xs font-bold text-slate-400">/ 100</span>
                </div>

                <div className="space-y-0.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-md font-bold text-xs inline-block ${
                      selectedCbtDetail.predicate === 'Mumtaz'
                        ? 'bg-purple-100 text-purple-900 border border-purple-200'
                        : selectedCbtDetail.predicate === 'Jayyid Jiddan'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : selectedCbtDetail.predicate === 'Jayyid'
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        : 'bg-rose-100 text-rose-900 border border-rose-200'
                    }`}
                  >
                    Predikat: {selectedCbtDetail.predicate}
                  </span>
                  <div className={`text-xs font-bold ${selectedCbtDetail.isPassed ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {selectedCbtDetail.isPassed ? '✓ Memenuhi Standar KKM (≥ 70)' : '⚠️ Belum Tuntas KKM - Perlu Remidial'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block">Total Soal</span>
                  <strong className="font-mono text-slate-800">{selectedCbtDetail.totalQuestions}</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-emerald-600 block">Benar</span>
                  <strong className="font-mono text-emerald-700">{selectedCbtDetail.correctCount}</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-rose-500 block">Salah</span>
                  <strong className="font-mono text-rose-600">{selectedCbtDetail.wrongCount}</strong>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-400 block">Durasi</span>
                  <strong className="font-mono text-slate-800">{selectedCbtDetail.durationSpentMinutes} Menit</strong>
                </div>
              </div>
            </div>

            {/* Modal Body: Question Answers & Teacher Note */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              
              {/* Teacher Feedback / Notes Section */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                    <span>Catatan & Rekomendasi Guru untuk Santri Ini:</span>
                  </span>
                  {cbtNoteSaveToast && (
                    <span className="text-[11px] font-bold text-emerald-700 animate-in fade-in">
                      ✓ Catatan berhasil disimpan!
                    </span>
                  )}
                </div>
                <textarea
                  value={cbtDetailTeacherNote}
                  onChange={(e) => setCbtDetailTeacherNote(e.target.value)}
                  placeholder="Ketik catatan evaluasi, motivasi, atau arahan remidial untuk santri..."
                  rows={2}
                  className="w-full p-2.5 bg-white rounded-xl border border-amber-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveCbtTeacherNote}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Simpan Catatan Guru</span>
                  </button>
                </div>
              </div>

              {/* Questions List with Student Answers */}
              <div className="space-y-4">
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Daftar Butir Soal & Jawaban Santri:</span>
                </div>

                {(() => {
                  const examQuestions = getShuffledQuestionsForStudent(
                    selectedCbtDetail.studentNis,
                    0,
                    selectedCbtDetail.subjectId
                  );

                  return (
                    <div className="space-y-3">
                      {examQuestions.map((q, idx) => {
                        const studentChoice = selectedCbtDetail.answersSnapshot?.[idx];
                        const isRight = studentChoice === q.correct;
                        const isSkipped = studentChoice === undefined;

                        return (
                          <div
                            key={q.id || idx}
                            className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
                              isRight
                                ? 'bg-emerald-50/50 border-emerald-200'
                                : isSkipped
                                ? 'bg-slate-50 border-slate-200'
                                : 'bg-rose-50/50 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between font-bold">
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-md bg-white border flex items-center justify-center font-mono text-slate-800">
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
                                {isRight ? '✓ Jawaban Benar' : isSkipped ? 'Tidak Dijawab' : '✗ Jawaban Salah'}
                              </span>
                            </div>

                            {q.arabicPrompt && (
                              <div className="p-2.5 bg-white/80 rounded-xl border border-emerald-100 text-center font-['Amiri',serif] text-xl text-emerald-950">
                                {q.arabicPrompt}
                              </div>
                            )}

                            <p className="font-semibold text-slate-900">{q.q}</p>

                            <div className="space-y-1 pl-2 border-l-2 border-slate-300">
                              <div className={isRight ? 'text-emerald-900' : 'text-rose-900'}>
                                Jawaban Santri:{' '}
                                <strong>
                                  {studentChoice !== undefined
                                    ? `${String.fromCharCode(65 + studentChoice)}. ${q.options[studentChoice]}`
                                    : 'Tidak dijawab'}
                                </strong>
                              </div>
                              <div className="text-emerald-800">
                                Kunci Jawaban:{' '}
                                <strong>
                                  {String.fromCharCode(65 + q.correct)}. {q.options[q.correct]}
                                </strong>
                              </div>
                            </div>

                            <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                              <strong>Pembahasan Guru:</strong> {q.explanation}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  window.print();
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar Evaluasi Ini</span>
              </button>

              <button
                onClick={() => setSelectedCbtDetail(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
