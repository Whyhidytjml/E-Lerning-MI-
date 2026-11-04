import React, { useState } from 'react';
import { MutabaahEntry } from '../../types/lms';
import { mockMutabaahToday } from '../../data/mockData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  Flame, 
  Sparkles, 
  Heart, 
  BookOpen, 
  Save, 
  Check, 
  FileCheck, 
  Sun,
  Moon,
  Clock
} from 'lucide-react';

interface MutabaahModuleProps {
  studentName: string;
}

export const MutabaahModule: React.FC<MutabaahModuleProps> = ({ studentName }) => {
  const [entry, setEntry] = useState<MutabaahEntry>(mockMutabaahToday);
  const [saveToast, setSaveToast] = useState(false);
  const [parentNotesInput, setParentNotesInput] = useState(entry.parentNotes || '');

  const shalatList: Array<{
    key: keyof MutabaahEntry['shalat'];
    name: string;
    icon: typeof Sun;
    timeLabel: string;
  }> = [
    { key: 'subuh', name: 'Shalat Subuh', icon: Moon, timeLabel: '04:30 WIB' },
    { key: 'dzuhur', name: 'Shalat Dzuhur', icon: Sun, timeLabel: '12:00 WIB' },
    { key: 'ashar', name: 'Shalat Ashar', icon: Sun, timeLabel: '15:15 WIB' },
    { key: 'maghrib', name: 'Shalat Maghrib', icon: Moon, timeLabel: '18:05 WIB' },
    { key: 'isya', name: 'Shalat Isya', icon: Moon, timeLabel: '19:15 WIB' }
  ];

  const handleShalatChange = (
    prayer: keyof MutabaahEntry['shalat'],
    value: 'masjid' | 'munfarid' | 'tidak' | 'qadha'
  ) => {
    soundEngine.playClick();
    setEntry(prev => ({
      ...prev,
      shalat: {
        ...prev.shalat,
        [prayer]: value
      }
    }));
  };

  const toggleSunnah = (key: keyof MutabaahEntry['sunnah']) => {
    soundEngine.playSuccess();
    setEntry(prev => ({
      ...prev,
      sunnah: {
        ...prev.sunnah,
        [key]: !prev.sunnah[key]
      }
    }));
  };

  const toggleAkhlak = (key: keyof MutabaahEntry['akhlakHarian']) => {
    soundEngine.playSuccess();
    setEntry(prev => ({
      ...prev,
      akhlakHarian: {
        ...prev.akhlakHarian,
        [key]: !prev.akhlakHarian[key]
      }
    }));
  };

  const handleSaveMutabaah = () => {
    soundEngine.playReward();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    setEntry(prev => ({
      ...prev,
      parentNotes: parentNotesInput
    }));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3500);
  };

  const handleSignParent = () => {
    soundEngine.playReward();
    setEntry(prev => ({
      ...prev,
      parentSignature: true
    }));
  };

  const completedShalatCount = Object.values(entry.shalat).filter(v => v === 'masjid' || v === 'munfarid').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Streak Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-teal-300 uppercase mb-2">
              <span>Pembiasaan Karakter & Adab</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white">
              Jurnal Mutaba'ah Yaumiyah (Ibadah Harian)
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-2 max-w-xl leading-relaxed">
              Catatan amalan harian ananda {studentName} untuk menumbuhkan cinta shalat berjamaah, tilawah Al-Qur'an, dan berbakti kepada orang tua.
            </p>
          </div>

          {/* Streak Indicator */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center shrink-0 min-w-[180px]">
            <div className="flex items-center justify-center gap-1.5 text-rose-300 font-black text-2xl">
              <Flame className="w-6 h-6 fill-rose-400" />
              <span>8 Hari</span>
            </div>
            <div className="text-xs font-bold text-teal-100 mt-0.5">
              Istiqomah Berjamaah
            </div>
            <div className="text-[11px] text-teal-200/80 mt-1">
              {completedShalatCount} dari 5 Shalat Tertunaikan
            </div>
          </div>
        </div>

        {/* Date Selector */}
        <div className="mt-6 pt-5 border-t border-teal-700/60 flex items-center justify-between flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2 text-teal-200">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold text-white">Rabu, 4 November 2026</span>
            <span>(14 Rabiul Awal 1448 H)</span>
          </div>

          <div className="flex items-center gap-2">
            {entry.parentSignature ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/30 text-emerald-200 rounded-full font-bold border border-emerald-400/40">
                <Check className="w-3.5 h-3.5" /> Terverifikasi Orang Tua
              </span>
            ) : (
              <button
                onClick={handleSignParent}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-lg transition-all cursor-pointer shadow-xs"
              >
                Tandatangani Sebagai Orang Tua
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Checklist Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 5 Fardhu Prayers (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800 text-base font-serif">
                01. Shalat Fardhu 5 Waktu
              </h3>
              <p className="text-xs text-slate-500">
                Pilih tempat dan kondisi pelaksanaan shalat ananda hari ini.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {completedShalatCount}/5 Ditunaikan
            </span>
          </div>

          <div className="space-y-3.5">
            {shalatList.map((item) => {
              const currentVal = entry.shalat[item.key];
              const IconComp = item.icon;
              return (
                <div
                  key={item.key}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FCFDFD]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {item.timeLabel}
                      </div>
                    </div>
                  </div>

                  {/* Segmented Radio Options */}
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                    <button
                      onClick={() => handleShalatChange(item.key, 'masjid')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        currentVal === 'masjid'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🕌 Di Masjid
                    </button>
                    <button
                      onClick={() => handleShalatChange(item.key, 'munfarid')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        currentVal === 'munfarid'
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🏠 Di Rumah
                    </button>
                    <button
                      onClick={() => handleShalatChange(item.key, 'tidak')}
                      className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                        currentVal === 'tidak'
                          ? 'bg-rose-500 text-white shadow-xs'
                          : 'text-slate-400 hover:text-slate-700'
                      }`}
                    >
                      Belum
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Sunnah, Tilawah & Akhlak (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Amalan Sunnah */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm font-serif">
                02. Ibadah & Amalan Sunnah
              </h3>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-2.5 text-xs font-semibold">
              <div
                onClick={() => toggleSunnah('dhuha')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  entry.sunnah.dhuha
                    ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">☀️</span>
                  <span>Shalat Sunnah Dhuha</span>
                </div>
                {entry.sunnah.dhuha ? <CheckCircle2 className="w-5 h-5 text-amber-600" /> : <Circle className="w-5 h-5 text-slate-300" />}
              </div>

              <div
                onClick={() => toggleSunnah('sedekahSubuh')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  entry.sunnah.sedekahSubuh
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🪙</span>
                  <span>Infaq / Sedekah Subuh</span>
                </div>
                {entry.sunnah.sedekahSubuh ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-slate-300" />}
              </div>

              <div
                onClick={() => toggleSunnah('tahajjud')}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  entry.sunnah.tahajjud
                    ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🌙</span>
                  <span>Shalat Tahajjud & Witir</span>
                </div>
                {entry.sunnah.tahajjud ? <CheckCircle2 className="w-5 h-5 text-indigo-600" /> : <Circle className="w-5 h-5 text-slate-300" />}
              </div>
            </div>
          </div>

          {/* Tilawah / Tadarus Al-Qur'an Tracker */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm font-serif">
                03. Tadarus Al-Qur'an / Iqro
              </h3>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-slate-500 block mb-1">
                  Capaian Bacaan Hari Ini:
                </label>
                <input
                  type="text"
                  value={entry.tilawah.detail}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEntry(prev => ({
                      ...prev,
                      tilawah: { ...prev.tilawah, detail: val }
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-xs"
                  placeholder="Contoh: Juz 30 Surat Al-Kautsar atau Iqro 2 Hal 15"
                />
              </div>

              <div
                onClick={() => setEntry(prev => ({
                  ...prev,
                  tilawah: { ...prev.tilawah, completed: !prev.tilawah.completed }
                }))}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                  entry.tilawah.completed
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Sudah Tilawah Bersama Orang Tua</span>
                {entry.tilawah.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-slate-300" />}
              </div>
            </div>
          </div>

          {/* Akhlak Harian & Catatan Orang Tua */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-800 text-sm font-serif">
                04. Akhlak & Catatan Orang Tua
              </h3>
              <Heart className="w-4 h-4 text-rose-500" />
            </div>

            <div className="space-y-2 text-xs font-semibold">
              <div
                onClick={() => toggleAkhlak('bantuOrangTua')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                  entry.akhlakHarian.bantuOrangTua ? 'bg-rose-50 border-rose-300 text-rose-950' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>Membantu Orang Tua di Rumah</span>
                {entry.akhlakHarian.bantuOrangTua ? <CheckCircle2 className="w-4 h-4 text-rose-600" /> : <Circle className="w-4 h-4 text-slate-300" />}
              </div>

              <div
                onClick={() => toggleAkhlak('doaHarian')}
                className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${
                  entry.akhlakHarian.doaHarian ? 'bg-teal-50 border-teal-300 text-teal-950' : 'border-slate-200 text-slate-600'
                }`}
              >
                <span>Membaca Doa Sebelum & Sesudah Kegiatan</span>
                {entry.akhlakHarian.doaHarian ? <CheckCircle2 className="w-4 h-4 text-teal-600" /> : <Circle className="w-4 h-4 text-slate-300" />}
              </div>
            </div>

            {/* Note Input */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-500 block mb-1">
                Pesan / Catatan Evaluasi dari Orang Tua:
              </label>
              <textarea
                rows={2}
                value={parentNotesInput}
                onChange={(e) => setParentNotesInput(e.target.value)}
                placeholder="Catatan perkembangan ibadah ananda..."
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-teal-500 resize-none"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveMutabaah}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-2xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Jurnal Ibadah Hari Ini</span>
            </button>

            {saveToast && (
              <div className="p-2.5 rounded-xl bg-teal-100 text-teal-900 border border-teal-300 text-xs font-bold text-center animate-in fade-in">
                Alhamdulillah! Jurnal Mutaba'ah berhasil disimpan dan tersinkronisasi ke Ustadz & Wali Kelas.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
