import React from 'react';
import { Role, UserAccount } from '../types/lms';
import { 
  BookOpen, 
  Volume2, 
  VolumeX, 
  UserCheck, 
  GraduationCap, 
  HeartHandshake, 
  Building2,
  Sparkles, 
  LogOut
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface HeaderProps {
  currentUser: UserAccount;
  currentRole: Role;
  activeTab: string;
  onTabChange: (tab: string) => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  currentRole,
  activeTab,
  onTabChange,
  audioEnabled,
  onToggleAudio,
  onLogout
}) => {
  const getRoleLabel = (role: Role) => {
    switch (role) {
      case 'siswa_rendah':
        return 'Siswa Rendah (Kls 1–3)';
      case 'siswa_tinggi':
        return 'Siswa Tinggi (Kls 4–6)';
      case 'guru':
        return 'Ustadz / Guru';
      case 'orang_tua':
        return 'Orang Tua (Wali)';
      case 'admin':
        return 'Administrator (RDM)';
    }
  };

  const getRoleBadgeStyle = (role: Role) => {
    switch (role) {
      case 'siswa_rendah':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'siswa_tinggi':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'guru':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'orang_tua':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      case 'admin':
        return 'bg-slate-900 text-white border-slate-700';
    }
  };

  // Strict Navigation Links based on Active Role
  const renderNavLinks = () => {
    if (currentRole === 'siswa_rendah' || currentRole === 'siswa_tinggi') {
      return (
        <>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('beranda'); }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'beranda' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Dasbor Siswa
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('kurikulum'); }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'kurikulum' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Materi Pelajaran
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('tahfiz'); }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'tahfiz' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Setoran Hafalan
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('mutabaah'); }}
            className={`hover:text-emerald-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'mutabaah' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Jurnal Ibadah
          </button>
        </>
      );
    }

    if (currentRole === 'guru') {
      return (
        <>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('beranda'); }}
            className={`hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'beranda' ? 'text-blue-800 font-bold border-b-2 border-blue-600' : ''
            }`}
          >
            Dasbor & Presensi
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('grading_center'); }}
            className={`hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'grading_center' ? 'text-blue-800 font-bold border-b-2 border-blue-600' : ''
            }`}
          >
            Pusat Penilaian
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('kelola_materi'); }}
            className={`hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'kelola_materi' ? 'text-blue-800 font-bold border-b-2 border-blue-600' : ''
            }`}
          >
            Materi & Jadwal Ajar
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('bank_soal'); }}
            className={`hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'bank_soal' ? 'text-blue-800 font-bold border-b-2 border-blue-600' : ''
            }`}
          >
            Bank Soal & Rapor
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('penghubung'); }}
            className={`hover:text-blue-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'penghubung' ? 'text-blue-800 font-bold border-b-2 border-blue-600' : ''
            }`}
          >
            Buku Penghubung
          </button>
        </>
      );
    }

    if (currentRole === 'orang_tua') {
      return (
        <>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('beranda'); }}
            className={`hover:text-rose-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'beranda' ? 'text-rose-800 font-bold border-b-2 border-rose-600' : ''
            }`}
          >
            Pantauan Ananda
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('status_tugas'); }}
            className={`hover:text-rose-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'status_tugas' ? 'text-rose-800 font-bold border-b-2 border-rose-600' : ''
            }`}
          >
            Status Tugas & Ujian
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('rekap_readonly'); }}
            className={`hover:text-rose-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'rekap_readonly' ? 'text-rose-800 font-bold border-b-2 border-rose-600' : ''
            }`}
          >
            Rekap Nilai & Ibadah
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('penghubung'); }}
            className={`hover:text-rose-700 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'penghubung' ? 'text-rose-800 font-bold border-b-2 border-rose-600' : ''
            }`}
          >
            Buku Penghubung Digital
          </button>
        </>
      );
    }

    if (currentRole === 'admin') {
      return (
        <>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('beranda'); }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'beranda' ? 'text-slate-900 font-bold border-b-2 border-slate-900' : ''
            }`}
          >
            Statistik Madrasah
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('admin_pengguna'); }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'admin_pengguna' ? 'text-slate-900 font-bold border-b-2 border-slate-900' : ''
            }`}
          >
            Manajemen Akun
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('admin_pemetaan'); }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'admin_pemetaan' ? 'text-slate-900 font-bold border-b-2 border-slate-900' : ''
            }`}
          >
            Pemetaan Kelas & Mapel
          </button>
          <button
            onClick={() => { soundEngine.playClick(); onTabChange('admin_rdm'); }}
            className={`hover:text-slate-900 transition-colors whitespace-nowrap cursor-pointer pb-1 ${
              activeTab === 'admin_rdm' ? 'text-slate-900 font-bold border-b-2 border-slate-900' : ''
            }`}
          >
            Ekspor Rapor RDM
          </button>
        </>
      );
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div 
            onClick={() => { soundEngine.playClick(); onTabChange('beranda'); }}
            className="flex items-center gap-3 shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-emerald-950 font-serif">
                MI Darul Ulum
              </span>
              <span className="text-xs text-emerald-700 font-medium block -mt-1">
                LMS MI Darul Ulum Sidareja
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Strictly Filtered by Active Role) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {renderNavLinks()}
          </nav>

          {/* Zone 3: Audio Toggle, Locked Active Role Badge, and Logout Button (No Multi-Role Switcher) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onToggleAudio();
              }}
              title={audioEnabled ? 'Matikan Suara Panduan' : 'Nyalakan Suara Panduan'}
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Current Active Role Badge (Locked) */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border shadow-2xs ${getRoleBadgeStyle(
                currentRole
              )}`}
            >
              {currentRole === 'siswa_rendah' && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
              {currentRole === 'siswa_tinggi' && <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />}
              {currentRole === 'guru' && <UserCheck className="w-3.5 h-3.5 text-blue-600" />}
              {currentRole === 'orang_tua' && <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />}
              {currentRole === 'admin' && <Building2 className="w-3.5 h-3.5 text-slate-200" />}
              <span className="max-w-[130px] sm:max-w-none truncate">{getRoleLabel(currentRole)}</span>
            </div>

            {/* Logout / Keluar Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                onLogout();
              }}
              title="Keluar dari sesi ini"
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
