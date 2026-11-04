import React, { useState } from 'react';
import { UserAccount, Role } from '../../types/lms';
import { mockUserAccounts } from '../../data/mockData';
import { soundEngine } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  BookOpen, 
  Lock, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  X, 
  Eye, 
  EyeOff, 
  Sparkles,
  KeyRound,
  GraduationCap,
  HeartHandshake,
  UserCheck
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  currentUserId?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUserId
}) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'form'>('quick');
  const [selectedRole, setSelectedRole] = useState<Role>('siswa_rendah');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleQuickLogin = (user: UserAccount) => {
    soundEngine.playReward();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onLoginSuccess(user);
    onClose();
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Find account matching role or username
    const found = mockUserAccounts.find(u => u.role === selectedRole);
    if (found) {
      soundEngine.playReward();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onLoginSuccess(found);
      onClose();
    } else {
      setErrorMsg('Akun tidak ditemukan. Silakan gunakan opsi Masuk Cepat.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Lockup */}
        <div className="text-center pb-5 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-md mb-2">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-emerald-950">
            Masuk ke MadrasahKu
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sistem Manajemen Pembelajaran & Pengasuhan Digital Terpadu MI
          </p>

          {/* Toggle between Quick 1-Click vs Manual Form */}
          <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl mt-4 max-w-xs mx-auto">
            <button
              onClick={() => { soundEngine.playClick(); setActiveTab('quick'); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'quick' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              ⚡ Masuk Cepat Multi-Role
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveTab('form'); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'form' ? 'bg-white text-emerald-950 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              🔑 Formulir Login
            </button>
          </div>
        </div>

        {/* Tab 1: Quick Multi-Role Switcher (Best for evaluation & multi-role testing) */}
        {activeTab === 'quick' && (
          <div className="space-y-3 pt-5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center">
              Pilih Akun Berdasarkan Hak Akses:
            </div>

            <div className="space-y-2.5">
              {mockUserAccounts.map((account) => {
                const isCurrent = currentUserId === account.id;
                return (
                  <div
                    key={account.id}
                    onClick={() => handleQuickLogin(account)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
                        {account.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">
                            {account.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                              Aktif Sekarang
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {account.title} · <span className="font-mono text-slate-400">{account.identifier}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                        Masuk &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2 mt-4">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Setiap role memiliki dasbor, modul tugas, presensi, dan batasan hak akses yang berbeda secara terisolasi.
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Manual Form Login */}
        {activeTab === 'form' && (
          <form onSubmit={handleFormLogin} className="space-y-4 pt-5">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Pilih Peran Akun:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { r: 'siswa_rendah', label: 'Siswa Rendah' },
                  { r: 'siswa_tinggi', label: 'Siswa Tinggi' },
                  { r: 'guru', label: 'Ustadz / Guru' },
                  { r: 'orang_tua', label: 'Orang Tua' },
                  { r: 'admin', label: 'Administrator' }
                ].map(item => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => { soundEngine.playClick(); setSelectedRole(item.r as Role); }}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      selectedRole === item.r
                        ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Username / NIS / NIP:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan nomor identitas atau nama pengguna"
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Kata Sandi:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
