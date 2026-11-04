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
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles,
  GraduationCap,
  HeartHandshake,
  UserCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  LogIn
} from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: UserAccount) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [loginMethod, setLoginMethod] = useState<'form' | 'quick'>('form');
  const [identifierInput, setIdentifierInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions: Array<{ role: Role; label: string; desc: string; icon: string; user: UserAccount; usernameHint: string }> = [
    {
      role: 'siswa_rendah',
      label: 'Siswa Rendah (Kls 1–3)',
      desc: 'Ahmad Fauzi Mubarak · NIS: MI240201',
      icon: '👦🏻',
      user: mockUserAccounts[0],
      usernameHint: 'ahmad.fauzi'
    },
    {
      role: 'siswa_tinggi',
      label: 'Siswa Tinggi (Kls 4–6)',
      desc: 'Fatimah Az-Zahra · NIS: MI210512',
      icon: '👧🏻',
      user: mockUserAccounts[1],
      usernameHint: 'fatimah.zahra'
    },
    {
      role: 'guru',
      label: 'Ustadz / Guru / Wali Kelas',
      desc: 'Ustadz Ridwan, S.Pd.I · NIP: 198507122010011005',
      icon: '👳🏻‍♂️',
      user: mockUserAccounts[2],
      usernameHint: 'ustadz.ridwan'
    },
    {
      role: 'orang_tua',
      label: 'Orang Tua / Wali Santri',
      desc: 'Bunda Aisyah · Wali Ananda Ahmad',
      icon: '🧕🏻',
      user: mockUserAccounts[3],
      usernameHint: 'bunda.aisyah'
    },
    {
      role: 'admin',
      label: 'Administrator / Kepala Madrasah',
      desc: 'Drs. KH. Ahmad Mansur, M.Pd.I',
      icon: '🏫',
      user: mockUserAccounts[4],
      usernameHint: 'kepala.madrasah'
    }
  ];

  const handleAutofill = (user: UserAccount) => {
    soundEngine.playClick();
    setIdentifierInput(user.username);
    setPasswordInput('madrasah123');
    setErrorMsg(null);
  };

  const handleDirectLogin = (targetUser: UserAccount) => {
    soundEngine.playReward();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
    onLogin(targetUser);
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanInput = identifierInput.trim().toLowerCase();
    if (!cleanInput) {
      setErrorMsg('Silakan masukkan NIS, NIP, atau Nama Pengguna Anda.');
      return;
    }

    if (!passwordInput) {
      setErrorMsg('Silakan masukkan kata sandi Anda.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Find matching user by username, NIS, NIP, or name
      const matched = mockUserAccounts.find(u => {
        const uName = u.username.toLowerCase();
        const name = u.name.toLowerCase();
        const iden = u.identifier.toLowerCase();
        return uName.includes(cleanInput) || 
               name.includes(cleanInput) || 
               iden.includes(cleanInput) ||
               (cleanInput === 'ahmad' && u.role === 'siswa_rendah') ||
               (cleanInput === 'fatimah' && u.role === 'siswa_tinggi') ||
               (cleanInput === 'ridwan' && u.role === 'guru') ||
               (cleanInput === 'aisyah' && u.role === 'orang_tua') ||
               (cleanInput === 'admin' && u.role === 'admin');
      });

      setIsLoading(false);

      if (matched) {
        soundEngine.playReward();
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.6 }
        });
        onLogin(matched);
      } else {
        soundEngine.playClick();
        setErrorMsg('Kredensial tidak ditemukan. Pastikan NIS/NIP/Username sesuai atau gunakan tombol demo di bawah.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 flex items-center justify-center p-4 sm:p-6 text-slate-800">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-emerald-900/20 relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none opacity-60" />

        {/* Brand Header */}
        <div className="text-center pb-5 border-b border-slate-100 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white mx-auto shadow-md mb-3">
            <BookOpen className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950">
            MadrasahKu Digital LMS
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Portal Pembelajaran Terintegrasi Siswa, Guru, Orang Tua & RDM
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mt-5 p-1 bg-slate-100 rounded-2xl grid grid-cols-2 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); setLoginMethod('form'); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginMethod === 'form' 
                ? 'bg-white text-emerald-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Form Login User</span>
          </button>
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); setLoginMethod('quick'); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginMethod === 'quick' 
                ? 'bg-white text-emerald-900 shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilih Akun Demo (1-Klik)</span>
          </button>
        </div>

        {/* MODE 1: FORM LOGIN USER */}
        {loginMethod === 'form' && (
          <form onSubmit={handleFormLogin} className="py-5 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span className="leading-relaxed">{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                NIS / NIP / Nama Pengguna (Username):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifierInput}
                  onChange={(e) => setIdentifierInput(e.target.value)}
                  placeholder="Contoh: ahmad.fauzi atau MI240201"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Kata Sandi (Password):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Masukkan kata sandi akun..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-md text-emerald-600 focus:ring-emerald-500"
                />
                <span>Ingat Sesi Saya</span>
              </label>
              <span className="text-emerald-700 font-semibold text-[11px]">
                Sandi Default: madrasah123
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk ke Akun Sekarang</span>
                </>
              )}
            </button>

            {/* Quick Autofill Helper Chips */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Autofill Kredensial Cepat:
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => handleAutofill(opt.user)}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-900 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.user.name.split(' ')[0]} ({opt.role.replace('siswa_', 'kls-')})</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        {/* MODE 2: QUICK ROLE SELECTOR (1-CLICK DIRECT LOGIN) */}
        {loginMethod === 'quick' && (
          <div className="py-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
              Pilih Profil Pengguna untuk Langsung Masuk:
            </div>

            <div className="space-y-2">
              {roleOptions.map((item) => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleDirectLogin(item.user)}
                  className="w-full p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-400 bg-white hover:bg-emerald-50/50 transition-all cursor-pointer flex items-center justify-between text-left group shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-900 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0">
                    <span>Masuk</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Security & System Note */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
          <p>Terintegrasi dengan Kurikulum Kemenag & Standar Rapor Digital Madrasah (RDM).</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Tahun Ajaran 2026/2027 · MI Terpadu</p>
        </div>

      </div>
    </div>
  );
};
