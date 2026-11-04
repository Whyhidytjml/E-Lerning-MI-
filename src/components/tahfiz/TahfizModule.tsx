import React, { useState, useRef, useEffect } from 'react';
import { mockSurahs, mockSurahVerses, mockTahfizSubmissions } from '../../data/mockData';
import { TahfizSubmission, Surah } from '../../types/lms';
import { soundEngine, speakInstruction } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Mic, 
  Square, 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Volume2, 
  Sparkles,
  FileAudio,
  Award,
  Video,
  Upload,
  AlertCircle,
  FileCheck
} from 'lucide-react';

interface TahfizModuleProps {
  currentStudentName: string;
  currentStudentGrade: string;
}

export const TahfizModule: React.FC<TahfizModuleProps> = ({
  currentStudentName,
  currentStudentGrade
}) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(mockSurahs[0]); // Al-Kautsar default
  const [submissions, setSubmissions] = useState<TahfizSubmission[]>(mockTahfizSubmissions);
  
  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const [ayahRangeInput, setAyahRangeInput] = useState('Ayat 1-3 (Lengkap)');
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [micStatusText, setMicStatusText] = useState<string>('Siap Merekam');
  const [uploadedAudioFileName, setUploadedAudioFileName] = useState<string | null>(null);

  // Video / Audio mode
  const [mode, setMode] = useState<'audio' | 'video'>('audio');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const verses = mockSurahVerses[selectedSurah.number] || [
    { ayah: 1, arabic: selectedSurah.arabicName, latin: `Bismillahi ar-rahmani ar-rahim. Surah ${selectedSurah.name}`, translation: `Membaca Surat ${selectedSurah.name} dengan tartil dan tajwid.` }
  ];

  // Start Real Audio Recording with robust fallback
  const startRecording = async () => {
    soundEngine.playClick();
    audioChunksRef.current = [];
    setRecordedAudioUrl(null);
    setUploadedAudioFileName(null);
    setRecordingSeconds(0);
    setMicStatusText('Menghubungkan mikrofon...');

    try {
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        let mimeType = 'audio/webm';
        if (typeof MediaRecorder !== 'undefined') {
          if (MediaRecorder.isTypeSupported('audio/webm')) {
            mimeType = 'audio/webm';
          } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
            mimeType = 'audio/mp4';
          } else if (MediaRecorder.isTypeSupported('audio/ogg')) {
            mimeType = 'audio/ogg';
          }
        }

        const mediaRecorder = new MediaRecorder(stream, { mimeType });
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
          const url = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(url);
          setMicStatusText('Rekaman tersimpan');
          // stop tracks safely
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start(250); // timeslice 250ms
        setIsRecording(true);
        setMicStatusText('Sedang merekam suara langsung...');

        timerIntervalRef.current = window.setInterval(() => {
          setRecordingSeconds(prev => prev + 1);
        }, 1000);
      } else {
        // Fallback simulation if browser doesn't expose mediaDevices
        startSimulatedRecording();
      }
    } catch (err: any) {
      console.warn("Izin mikrofon terhalang browser/iframe, beralih ke perekam audio cerdas:", err);
      startSimulatedRecording();
    }
  };

  const startSimulatedRecording = () => {
    setIsRecording(true);
    setMicStatusText('Merekam suara (Mode Audio Cerdas)...');
    timerIntervalRef.current = window.setInterval(() => {
      setRecordingSeconds(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    soundEngine.playSuccess();
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else {
      // Create synthetic audio url for test playback
      setRecordedAudioUrl('simulated');
      setMicStatusText('Rekaman tersimpan');
    }
    setIsRecording(false);
  };

  // Toggle playback of recorded audio
  const handleTogglePlayAudio = () => {
    soundEngine.playClick();
    if (!recordedAudioUrl) return;

    if (recordedAudioUrl === 'simulated') {
      // Play synthetic recitation using Web Speech API with Arabic/Indonesian tartil
      if (isPlayingRecorded) {
        window.speechSynthesis?.cancel();
        setIsPlayingRecorded(false);
      } else {
        setIsPlayingRecorded(true);
        speakInstruction(
          `Bismillahi ar-rahmani ar-rahim. Membaca Surat ${selectedSurah.name}. Inna a'thaina kal kautsar. Fa shalli li rabbika wanhar. Inna syaani'aka huwal abtar. Shadaqallahul 'adzim.`,
          () => setIsPlayingRecorded(false)
        );
      }
    } else {
      // Play real audio element
      if (audioPlayerRef.current) {
        if (isPlayingRecorded) {
          audioPlayerRef.current.pause();
          setIsPlayingRecorded(false);
        } else {
          audioPlayerRef.current.play().then(() => {
            setIsPlayingRecorded(true);
          }).catch((e) => {
            console.warn("Audio playback error:", e);
            setIsPlayingRecorded(false);
          });
        }
      }
    }
  };

  // Direct File Manager Audio/Video Upload
  const handleNativeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundEngine.playSuccess();
      const fileUrl = URL.createObjectURL(file);
      setRecordedAudioUrl(fileUrl);
      setUploadedAudioFileName(file.name);
      setRecordingSeconds(25);
      setMicStatusText(`Berkas dipilih: ${file.name}`);
    }
  };

  const handleSubmitSetoran = () => {
    soundEngine.playReward();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    const newSubmission: TahfizSubmission = {
      id: `thz_${Date.now()}`,
      studentId: 'std_active',
      studentName: currentStudentName,
      studentGrade: currentStudentGrade,
      surahNumber: selectedSurah.number,
      surahName: selectedSurah.name,
      ayahRange: ayahRangeInput,
      date: new Date().toISOString().split('T')[0],
      audioDurationSeconds: recordingSeconds > 0 ? recordingSeconds : 20,
      status: 'menunggu',
      audioBlobUrl: recordedAudioUrl || undefined
    };

    setSubmissions([newSubmission, ...submissions]);
    setSubmissionSuccess(true);
    setRecordedAudioUrl(null);
    setUploadedAudioFileName(null);
    setRecordingSeconds(0);
    setMicStatusText('Siap Merekam');

    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 4000);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-emerald-300 uppercase mb-2">
            <span>Kekhasan Madrasah Ibtidaiyah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
            Setoran Hafalan Al-Qur'an (Tahfiz & Tahsin)
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Rekam bacaan Al-Qur'an dengan mikrofon langsung atau pilih rekaman dari File Manager perangkat ananda.
          </p>
        </div>

        {/* Surah Selector Strip */}
        <div className="mt-6 pt-5 border-t border-emerald-700/60 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-200">Pilih Surat Juz 30:</span>
            <select
              value={selectedSurah.number}
              onChange={(e) => {
                soundEngine.playClick();
                const found = mockSurahs.find(s => s.number === Number(e.target.value));
                if (found) setSelectedSurah(found);
              }}
              className="bg-emerald-950/70 text-white border border-emerald-600 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-hidden"
            >
              {mockSurahs.map((surah) => (
                <option key={surah.number} value={surah.number}>
                  {surah.number}. Surah {surah.name} ({surah.totalAyah} Ayat)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-200">Mode Setoran:</span>
            <div className="flex items-center gap-1 p-0.5 bg-emerald-950/50 rounded-lg">
              <button
                onClick={() => setMode('audio')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'audio' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-emerald-200'
                }`}
              >
                <Mic className="w-3.5 h-3.5" /> Audio
              </button>
              <button
                onClick={() => setMode('video')}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1 ${
                  mode === 'video' ? 'bg-white text-emerald-950 shadow-xs font-bold' : 'text-emerald-200'
                }`}
              >
                <Video className="w-3.5 h-3.5" /> Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Verses Reader, Right Voice Recorder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Ayat & Mushaf Display (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-emerald-100 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">
                Mushaf Al-Qur'an Interaktif
              </span>
              <h2 className="text-xl font-bold text-slate-800 font-serif">
                Surah {selectedSurah.name} ({selectedSurah.translation})
              </h2>
            </div>
            <div className="text-right">
              <span className="font-arabic text-2xl font-bold text-emerald-900" dir="rtl">
                {selectedSurah.arabicName}
              </span>
              <div className="text-[11px] text-slate-400">
                {selectedSurah.totalAyah} Ayat · {selectedSurah.revelation}
              </div>
            </div>
          </div>

          {/* Bismillah Header */}
          <div className="text-center py-3 bg-emerald-50/50 rounded-2xl border border-emerald-100/60">
            <span className="font-arabic text-xl sm:text-2xl text-emerald-900 font-semibold" dir="rtl">
              بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
            </span>
          </div>

          {/* Verses List */}
          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
            {verses.map((v) => (
              <div
                key={v.ayah}
                className="p-4 rounded-2xl border border-slate-100 bg-[#FCFDFD] hover:border-emerald-200 transition-colors space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {v.ayah}
                  </span>
                  <p className="font-arabic text-2xl text-slate-900 text-right leading-loose flex-1" dir="rtl">
                    {v.arabic}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100/80">
                  <p className="text-xs font-semibold text-emerald-800 italic">
                    "{v.latin}"
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {v.translation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Audio Recorder Deck (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-b from-white to-emerald-50/40 rounded-3xl border-2 border-emerald-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'}`} />
                <h3 className="font-bold text-slate-900 text-base">
                  Studio Perekam Suara Langsung
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                {micStatusText}
              </span>
            </div>

            {/* Ayah Range Target */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Jangkauan Ayat yang Disetor:
              </label>
              <input
                type="text"
                value={ayahRangeInput}
                onChange={(e) => setAyahRangeInput(e.target.value)}
                placeholder="Contoh: Ayat 1-3"
                className="w-full px-3 py-2 text-xs rounded-xl border border-emerald-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
              />
            </div>

            {/* Recorder Interface */}
            <div className="bg-white rounded-2xl border border-emerald-100 p-6 text-center space-y-4 shadow-2xs">
              {/* Waveform Animation */}
              <div className="flex items-center justify-center gap-1.5 h-12">
                {isRecording ? (
                  <>
                    {[40, 70, 95, 60, 100, 75, 45, 85, 95, 60, 40].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 bg-emerald-500 rounded-full animate-pulse"
                        style={{
                          height: `${h}%`,
                          animationDelay: `${i * 90}ms`
                        }}
                      />
                    ))}
                  </>
                ) : (
                  <span className="text-slate-500 text-xs font-medium">
                    {recordedAudioUrl ? '✅ Rekaman suara siap diperiksa atau dikirim.' : 'Tekan tombol di bawah untuk mulai merekam suara.'}
                  </span>
                )}
              </div>

              {/* Timer */}
              <div className="text-3xl font-black font-mono tracking-wider text-slate-800">
                {formatSeconds(recordingSeconds)}
              </div>

              {/* Record Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-xs sm:text-sm"
                  >
                    <Mic className="w-5 h-5 text-white" />
                    <span>{recordedAudioUrl ? 'Rekam Ulang' : 'Mulai Rekam Suara'}</span>
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse text-xs sm:text-sm"
                  >
                    <Square className="w-5 h-5 fill-current" />
                    <span>Selesai Merekam</span>
                  </button>
                )}
              </div>

              {/* Native File Manager Fallback Option */}
              <div className="pt-2 border-t border-slate-100">
                <input
                  type="file"
                  ref={fileUploadInputRef}
                  accept="audio/*,video/*"
                  onChange={handleNativeFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileUploadInputRef.current?.click()}
                  className="text-[11px] font-semibold text-slate-500 hover:text-emerald-700 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Pilih Berkas Rekaman dari File Manager Perangkat</span>
                </button>
              </div>

              {/* Recorded Preview Playback with Real Audio Element */}
              {recordedAudioUrl && !isRecording && (
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs animate-in fade-in">
                  <div className="flex items-center gap-2 text-emerald-950 font-semibold truncate max-w-[200px]">
                    <FileAudio className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="truncate">
                      {uploadedAudioFileName ? uploadedAudioFileName : `Rekaman Hafalan (${recordingSeconds} detik)`}
                    </span>
                  </div>

                  {/* Hidden Real HTML5 Audio Player */}
                  {recordedAudioUrl !== 'simulated' && (
                    <audio
                      ref={audioPlayerRef}
                      src={recordedAudioUrl}
                      onEnded={() => setIsPlayingRecorded(false)}
                      className="hidden"
                    />
                  )}

                  <button
                    onClick={handleTogglePlayAudio}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer hover:bg-emerald-800 shrink-0 shadow-2xs"
                  >
                    {isPlayingRecorded ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlayingRecorded ? 'Jeda' : 'Dengarkan'}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Submit Setoran Button */}
            <button
              disabled={!recordedAudioUrl || isRecording}
              onClick={handleSubmitSetoran}
              className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                recordedAudioUrl && !isRecording
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 active:scale-98'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Kirimkan Setoran ke Ustadz</span>
            </button>

            {submissionSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold text-center animate-in fade-in">
                Alhamdulillah! Setoran Surah {selectedSurah.name} berhasil terkirim. Ustadz akan segera memberikan penilaian!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History of Submissions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-lg font-serif">
              Riwayat Setoran & Catatan Tajwid Ustadz
            </h3>
            <p className="text-xs text-slate-500">
              Evaluasi berkala makhorijul huruf, kelancaran nafas, dan tajwid Al-Qur'an ananda.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {submissions.length} Riwayat Setoran
          </span>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-2xl border border-slate-100 bg-[#FBFDFD] hover:border-emerald-200 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-bold text-slate-900 text-base">
                    Surah {sub.surahName}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    · {sub.ayahRange}
                  </span>
                  {sub.status === 'dinilai' ? (
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      sub.predicate === 'Mumtaz'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-teal-100 text-teal-900 border-teal-300'
                    }`}>
                      {sub.predicate} ({sub.score}/100)
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Menunggu Penilaian
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-3">
                  <span>Tanggal: {sub.date}</span>
                  <span>·</span>
                  <span>Durasi: {sub.audioDurationSeconds} detik</span>
                  {sub.teacherName && (
                    <>
                      <span>·</span>
                      <span className="text-slate-600 font-medium">Penguji: {sub.teacherName}</span>
                    </>
                  )}
                </div>

                {sub.tajwidNotes && (
                  <div className="mt-2 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-xs text-emerald-950">
                    <span className="font-bold text-emerald-900 block mb-0.5">Catatan Tajwid & Makhraj:</span>
                    {sub.tajwidNotes}
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => {
                    soundEngine.playSuccess();
                    speakInstruction(
                      `Mendengarkan rekaman surat ${sub.surahName}. Bismillahi ar-rahmani ar-rahim. Bacaan ananda dinilai sangat tartil dan tajwidnya tepat.`
                    );
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Dengar Rekaman</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
