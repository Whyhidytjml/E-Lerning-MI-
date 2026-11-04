import React, { useState } from 'react';
import { Student, LiaisonMessage, Assignment, ExamSchedule } from '../../types/lms';
import { 
  mockStudents, 
  mockLiaisonMessages, 
  mockTahfizSubmissions, 
  mockAssignments, 
  mockExamSchedules, 
  mockRDMGrades,
  mockAnnouncements 
} from '../../data/mockData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  HeartHandshake, 
  Send, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  MessageSquare, 
  Share2, 
  Mail, 
  Sparkles, 
  FileText, 
  Calendar, 
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  ExternalLink,
  Eye,
  BarChart2,
  CalendarCheck,
  BellRing,
  AlertTriangle
} from 'lucide-react';

interface ParentDashboardProps {
  initialTab?: 'beranda' | 'status_tugas' | 'rekap_readonly' | 'penghubung';
  onNavigateTab?: (tab: string) => void;
  messages?: LiaisonMessage[];
  onSendMessage?: (msg: LiaisonMessage) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ 
  initialTab = 'beranda',
  onNavigateTab,
  messages: externalMessages,
  onSendMessage: externalOnSendMessage
}) => {
  const [activeTab, setActiveTab] = useState<'beranda' | 'status_tugas' | 'rekap_readonly' | 'penghubung'>(initialTab);
  const currentStudent = mockStudents[0]; // Strictly Ahmad Fauzi Mubarak (Anak Kandung Bunda Aisyah)
  const [taskFilter, setTaskFilter] = useState<'semua' | 'pending' | 'done'>('semua');
  const [internalMessages, setInternalMessages] = useState<LiaisonMessage[]>(externalMessages || mockLiaisonMessages);
  const [newMessageText, setNewMessageText] = useState('');
  const [selectedTag, setSelectedTag] = useState<LiaisonMessage['tag']>('Hafalan');
  const [waModalOpen, setWaModalOpen] = useState(false);
  const [waAlertModalOpen, setWaAlertModalOpen] = useState(false);
  const [selectedTaskForAlert, setSelectedTaskForAlert] = useState<Assignment | null>(null);
  const [copiedWA, setCopiedWA] = useState(false);
  const [sendSuccessToast, setSendSuccessToast] = useState<string | null>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Sync with external messages if provided
  React.useEffect(() => {
    if (externalMessages) {
      setInternalMessages(externalMessages);
    }
  }, [externalMessages]);

  React.useEffect(() => {
    if (activeTab === 'penghubung') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [internalMessages, activeTab]);

  const currentTahfiz = mockTahfizSubmissions.find(t => t.studentId === currentStudent.id) || mockTahfizSubmissions[0];
  const studentGrades = mockRDMGrades.filter(g => g.studentNis === currentStudent.nis);
  const studentExams = mockExamSchedules.filter(e => e.grade === currentStudent.grade);

  // Filter assignments for current student
  const studentAssignments = mockAssignments.filter(a => a.grade === currentStudent.grade);
  const filteredAssignments = studentAssignments.filter(a => {
    if (taskFilter === 'pending') return a.status === 'belum_selesai';
    if (taskFilter === 'done') return a.status === 'sudah_dikumpulkan' || a.status === 'dinilai';
    return true;
  });

  const pendingTaskCount = studentAssignments.filter(a => a.status === 'belum_selesai').length;
  const doneTaskCount = studentAssignments.filter(a => a.status === 'sudah_dikumpulkan' || a.status === 'dinilai').length;

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    soundEngine.playSuccess();
    const newMsg: LiaisonMessage = {
      id: `msg_${Date.now()}`,
      studentId: currentStudent.id,
      senderRole: 'orang_tua',
      senderName: 'Bunda Aisyah (Wali Siswa)',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tag: selectedTag,
      content: newMessageText.trim(),
      isRead: true
    };

    const updated = [...internalMessages, newMsg];
    setInternalMessages(updated);
    if (externalOnSendMessage) {
      externalOnSendMessage(newMsg);
    }
    const sentText = newMessageText;
    const sentTag = selectedTag;
    setNewMessageText('');
    setSendSuccessToast('Pesan berhasil terkirim ke Buku Penghubung Wali Kelas (Ustadz Ridwan, S.Pd.I)!');
    setTimeout(() => setSendSuccessToast(null), 4000);
  };

  const handleQuickTemplate = (text: string, tag: LiaisonMessage['tag']) => {
    soundEngine.playClick();
    setNewMessageText(text);
    setSelectedTag(tag);
  };

  // WhatsApp Task Reminder Generator
  const generateTaskReminderWA = (asg: Assignment) => {
    return `*PENGINGAT TUGAS MADRASAH*
Kepada Ananda: ${currentStudent.name} (${currentStudent.gradeLabel})

📌 *Tugas:* ${asg.title}
📚 *Mata Pelajaran:* ${asg.subjectName}
⏳ *Batas Pengumpulan (Deadline):* ${asg.dueDate}
📝 *Instruksi:* ${asg.instructions}

_Pesan dari Bunda: Ayo ananda shalih diselesaikan tugasnya sebelum tenggat waktu ya, barakallahu fiik._`;
  };

  const handleOpenTaskAlertWA = (asg: Assignment) => {
    soundEngine.playClick();
    setSelectedTaskForAlert(asg);
    setWaAlertModalOpen(true);
  };

  const sendTaskAlertDirect = (asg: Assignment) => {
    soundEngine.playSuccess();
    const text = generateTaskReminderWA(asg);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  // General Daily Recap WA text
  const waDailyDigestText = `*LAPORAN HARIAN SISWA MADRASAH IBTIDAIYAH*
Nama: ${currentStudent.name}
Kelas: ${currentStudent.gradeLabel}
Tanggal: Rabu, 4 November 2026

✅ *Kehadiran:* Hadir Tepat Waktu (06:48 WIB)
📖 *Capaian Tahfiz:* Surah ${currentTahfiz.surahName} (${currentTahfiz.predicate || 'Mumtaz 96'})
🕌 *Mutaba'ah Shalat:* 5 Waktu Tertunaikan + Shalat Dhuha
📋 *Tugas Belum Selesai:* ${pendingTaskCount} Tugas
🌟 *Poin Prestasi:* ${currentStudent.points} Poin · ${currentStudent.stars} Bintang Emas

_Catatan Ustadz: Ananda sangat tertib dan disiplin dalam murajaah hafalan hari ini._`;

  return (
    <div className="space-y-8 pb-12">
      {/* Parent Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-rose-300 uppercase mb-2">
              <HeartHandshake className="w-4 h-4" />
              <span>Hak Akses Orang Tua / Wali Santri</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Parent Dashboard: Bunda Aisyah
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/80 mt-1 max-w-xl">
              Portal pendampingan ananda terhubung langsung ke sistem madrasah, rekap nilai read-only, pemantauan tugas, dan komunikasi wali kelas.
            </p>
          </div>

          {/* Locked Single Child Profile (Strictly Own Child Ahmad Fauzi Mubarak) */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl border border-white/30 shrink-0">
              {currentStudent.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Akun Terhubung: Ananda Sendiri</span>
              </div>
              <div className="text-sm font-bold text-white font-serif">{currentStudent.name}</div>
              <div className="text-[11px] text-rose-200">
                NIS: {currentStudent.nis} · {currentStudent.gradeLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Sub-Tabs Strip */}
        <div className="mt-6 pt-5 border-t border-rose-900/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('beranda'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'beranda' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            🏠 Ringkasan Pantauan
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('status_tugas'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'status_tugas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Status Tugas & Jadwal Ujian ({pendingTaskCount} Pending)</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('rekap_readonly'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rekap_readonly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-rose-300" />
            <span>Rekap Nilai & Grafik Ibadah (Read-Only)</span>
          </button>
          <button
            onClick={() => { soundEngine.playClick(); setActiveTab('penghubung'); }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'penghubung' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            📖 Buku Penghubung & Notifikasi WA
          </button>
        </div>
      </div>

      {/* TAB 1: RINGKASAN PANTAUAN REAL-TIME */}
      {activeTab === 'beranda' && (
        <div className="space-y-6">
          {/* Real-time Status Card */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-xl shrink-0">
                🏫
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Status Kehadiran Hari Ini:</span>
                <div className="text-base font-bold text-slate-900">
                  {currentStudent.name} telah hadir di kelas pada pukul 06:48 WIB (Tepat Waktu)
                </div>
              </div>
            </div>

            <button
              onClick={() => { soundEngine.playClick(); setWaModalOpen(true); }}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
            >
              <Share2 className="w-4 h-4" />
              <span>Kirim Rekap ke WhatsApp</span>
            </button>
          </div>

          {/* 3 Snapshot Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Tahfiz Progress */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-700 uppercase">Hafalan Al-Qur'an</span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {currentTahfiz.predicate || 'Mumtaz (96)'}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Surah {currentTahfiz.surahName}</h3>
              <div className="text-xs text-slate-500">Target: {currentTahfiz.ayahRange}</div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-800 block mb-0.5">Catatan Tajwid Ustadz:</span>
                "{currentTahfiz.tajwidNotes || 'Bacaan sudah tartil dan makhraj fasih.'}"
              </div>
            </div>

            {/* Card 2: Mutabaah Today */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-700 uppercase">Mutaba'ah Hari Ini</span>
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {currentStudent.streakDays} Hari Istiqomah
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">Shalat 5 Waktu & Dhuha</h3>
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between"><span>Subuh Berjamaah:</span><span className="font-bold text-emerald-700">✓ Di Masjid</span></div>
                <div className="flex justify-between"><span>Shalat Dhuha:</span><span className="font-bold text-emerald-700">✓ Ditunaikan</span></div>
                <div className="flex justify-between"><span>Tadarus Al-Qur'an:</span><span className="font-bold text-emerald-700">✓ {currentStudent.currentSurah}</span></div>
              </div>
            </div>

            {/* Card 3: Pending Tasks Quick Check */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-700 uppercase">Status Tugas Aktif</span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {pendingTaskCount} Belum Selesai
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-serif">{doneTaskCount} Tugas Tuntas</h3>
              <div className="text-xs text-slate-600 space-y-1">
                <p>Pantau deadline tugas ananda agar tidak terlambat dikumpulkan ke Ustadz.</p>
              </div>
              <button
                onClick={() => setActiveTab('status_tugas')}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Periksa Tugas Sekarang</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STATUS TUGAS (DONE/PENDING) & JADWAL UJIAN */}
      {activeTab === 'status_tugas' && (
        <div className="space-y-6">
          {/* Task Status Board */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Status Tugas Ananda: {currentStudent.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Pantau tugas yang sudah selesai dikumpulkan vs tugas yang masih pending beserta tenggat waktunya.
                </p>
              </div>

              {/* Segmented Filter Control */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => { soundEngine.playClick(); setTaskFilter('semua'); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    taskFilter === 'semua' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Semua ({studentAssignments.length})
                </button>
                <button
                  onClick={() => { soundEngine.playClick(); setTaskFilter('pending'); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    taskFilter === 'pending' ? 'bg-amber-500 text-white font-bold shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Menunggu (Pending: {pendingTaskCount})
                </button>
                <button
                  onClick={() => { soundEngine.playClick(); setTaskFilter('done'); }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    taskFilter === 'done' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Selesai (Done: {doneTaskCount})
                </button>
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAssignments.map((asg) => {
                const isPending = asg.status === 'belum_selesai';
                return (
                  <div
                    key={asg.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isPending
                        ? 'bg-amber-50/40 border-amber-300'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                          {asg.subjectName}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          isPending
                            ? 'bg-amber-100 text-amber-900 border-amber-300 flex items-center gap-1'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300 flex items-center gap-1'
                        }`}>
                          {isPending ? (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>PENDING · Tenggat: {asg.dueDate}</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>DONE (Nilai: {asg.studentSubmission?.grade || 95})</span>
                            </>
                          )}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mb-1">{asg.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{asg.instructions}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Format: {asg.submissionFormat}</span>

                      {isPending && (
                        <button
                          onClick={() => handleOpenTaskAlertWA(asg)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <BellRing className="w-3.5 h-3.5" />
                          <span>Ingatkan via WA</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exam Schedules Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-blue-600" />
                <span>Jadwal Ujian & Penilaian Terdekat</span>
              </h3>
              <span className="text-xs text-slate-500">Kelas {currentStudent.grade}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Jenis Ujian</th>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Tanggal & Waktu</th>
                    <th className="py-3 px-4">Ruang Ujian</th>
                    <th className="py-3 px-4">Pengawas / Penguji</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentExams.map((ex) => (
                    <tr key={ex.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-blue-900">{ex.examType}</td>
                      <td className="py-3 px-4 font-semibold text-slate-900">{ex.subjectName}</td>
                      <td className="py-3 px-4 font-mono text-slate-700">{ex.date} ({ex.time})</td>
                      <td className="py-3 px-4 text-slate-600">{ex.room}</td>
                      <td className="py-3 px-4 text-slate-600">{ex.supervisor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REKAPITULASI NILAI & GRAFIK IBADAH (READ-ONLY) */}
      {activeTab === 'rekap_readonly' && (
        <div className="space-y-6">
          {/* Read-Only Banner */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-950">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="font-bold">Akses Read-Only (Hanya Melihat & Memantau):</span>
              <span>Data nilai dan hafalan Al-Qur'an resmi divalidasi langsung oleh dewan asatidz madrasah.</span>
            </div>
          </div>

          {/* Academic Report Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-serif">
                Rekapitulasi Nilai Akademik & Rapor Kemenag ({currentStudent.name})
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Rata-rata: 93.8 (Predikat A)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Mata Pelajaran</th>
                    <th className="py-3 px-4">Kelompok</th>
                    <th className="py-3 px-4">Nilai Harian (PH)</th>
                    <th className="py-3 px-4">PTS</th>
                    <th className="py-3 px-4">PAS</th>
                    <th className="py-3 px-4">Nilai Akhir (NA)</th>
                    <th className="py-3 px-4">Predikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentGrades.map((g, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{g.subjectName}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          g.category === 'kemenag' ? 'bg-emerald-50 text-emerald-800' : 'bg-indigo-50 text-indigo-800'
                        }`}>
                          {g.category === 'kemenag' ? 'Kemenag' : 'Umum'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{g.nilaiHarian}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{g.nilaiPTS}</td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{g.nilaiPAS}</td>
                      <td className="py-3 px-4 font-mono font-black text-emerald-700">{g.nilaiAkhir}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{g.predikat}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grafik Konsistensi Ibadah 7 Hari */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-serif flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-teal-600" />
                <span>Grafik Konsistensi Ibadah Harian (7 Hari Terakhir)</span>
              </h3>
              <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                94% Kepatuhan Shalat
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Persentase pelaksanaan shalat lima waktu, shalat dhuha, dan tadarus Al-Qur'an ananda {currentStudent.nickname}:
            </p>

            {/* Visual Bar Chart */}
            <div className="grid grid-cols-7 gap-3 pt-4">
              {[
                { day: 'Kamis', pct: 90 },
                { day: 'Jumat', pct: 100 },
                { day: 'Sabtu', pct: 95 },
                { day: 'Ahad', pct: 85 },
                { day: 'Senin', pct: 100 },
                { day: 'Selasa', pct: 95 },
                { day: 'Rabu (Hari ini)', pct: 100 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-100 h-36 rounded-2xl p-1 flex flex-col justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-teal-600 to-emerald-500 rounded-xl transition-all duration-500 text-[10px] text-white font-bold text-center pt-1"
                      style={{ height: `${item.pct}%` }}
                    >
                      {item.pct}%
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 text-center">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BUKU PENGHUBUNG & NOTIFIKASI WA */}
      {activeTab === 'penghubung' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-lg font-serif">
                  Buku Penghubung Digital: Wali Kelas & Orang Tua
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Komunikasi langsung dua arah dengan Ustadz Ridwan, S.Pd.I untuk konsultasi santri.
              </p>
            </div>

            {/* Quick WhatsApp Reminder Trigger */}
            <button
              onClick={() => { soundEngine.playClick(); setWaModalOpen(true); }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Share2 className="w-4 h-4" />
              <span>Kirim Ringkasan Harian ke WhatsApp</span>
            </button>
          </div>

          {/* Quick Message Templates */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400 font-medium">Templat Cepat:</span>
            <button
              onClick={() => handleQuickTemplate("Assalamu'alaikum Ustadz, mohon izin ananda Ahmad hari ini izin kontrol gigi pukul 09.30 WIB ya.", "Izin / Sakit")}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              + Izin Dokter/Sakit
            </button>
            <button
              onClick={() => handleQuickTemplate("Assalamu'alaikum Ustadz, apakah surat Al-Kautsar sudah boleh dilanjutkan ke surat An-Nasr?", "Hafalan")}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              + Tanya Hafalan
            </button>
          </div>

          {/* Toast Notification Banner */}
          {sendSuccessToast && (
            <div className="bg-emerald-500 text-white px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                <span>{sendSuccessToast}</span>
              </div>
              <button onClick={() => setSendSuccessToast(null)} className="text-white/80 hover:text-white text-xs">✕</button>
            </div>
          )}

          {/* Message Thread */}
          <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
            {internalMessages.map((msg) => {
              const isParent = msg.senderRole === 'orang_tua';
              return (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isParent
                      ? 'bg-rose-50/70 border-rose-200 ml-6 sm:ml-12 shadow-2xs'
                      : 'bg-emerald-50/70 border-emerald-200 mr-6 sm:mr-12 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{msg.senderName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isParent ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {msg.tag}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{msg.timestamp}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{msg.content}</p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Box */}
          <div className="pt-3 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-medium">Topik Pesan:</span>
                {(['Hafalan', 'Ibadah', 'Akademik', 'Izin / Sakit'] as const).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      selectedTag === tag ? 'bg-rose-600 text-white font-bold shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {newMessageText.trim() && (
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    const text = `*PESAN BUKU PENGHUBUNG MADRASAH*\nDari: Bunda Aisyah (Wali Ahmad Fauzi Mubarak)\nTopik: [${selectedTag}]\n\n${newMessageText}`;
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
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={(e) => { 
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage(); 
                  }
                }}
                placeholder="Tuliskan pesan atau izin untuk Ustadz Ridwan (Wali Kelas)..."
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-white shadow-inner"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessageText.trim()}
                className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 disabled:opacity-50 text-white rounded-2xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-95 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Task Deadline Alert Modal */}
      {waAlertModalOpen && selectedTaskForAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <BellRing className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-serif">Kirim Pengingat Tugas via WhatsApp</h3>
              </div>
              <button onClick={() => setWaAlertModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-emerald-200 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
              {generateTaskReminderWA(selectedTaskForAlert)}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setWaAlertModalOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  sendTaskAlertDirect(selectedTaskForAlert);
                  setWaAlertModalOpen(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka WhatsApp & Kirim</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Daily Digest Modal */}
      {waModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <Share2 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-serif">Format Ringkasan Harian WhatsApp</h3>
              </div>
              <button onClick={() => setWaModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-emerald-200 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
              {waDailyDigestText}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(waDailyDigestText);
                  setCopiedWA(true);
                  setTimeout(() => setCopiedWA(false), 2000);
                }}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                {copiedWA ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedWA ? 'Tersalin!' : 'Salin Teks'}</span>
              </button>

              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(waDailyDigestText)}`, '_blank');
                  setWaModalOpen(false);
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
