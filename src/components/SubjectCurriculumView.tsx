import React, { useState } from 'react';
import { mockSubjects } from '../data/mockData';
import { Subject, SubjectCategory } from '../types/lms';
import { 
  BookOpen, 
  Sparkles, 
  Compass, 
  Languages, 
  HeartHandshake, 
  Calculator, 
  Feather, 
  Globe, 
  ShieldCheck, 
  Activity,
  Play,
  FileText,
  Clock,
  User,
  CheckCircle2,
  X
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const SubjectCurriculumView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SubjectCategory | 'semua'>('semua');
  const [gradeFilter, setGradeFilter] = useState<number | 'semua'>('semua');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-emerald-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-cyan-600" />;
      case 'Compass': return <Compass className="w-6 h-6 text-amber-600" />;
      case 'Languages': return <Languages className="w-6 h-6 text-emerald-600" />;
      case 'Calculator': return <Calculator className="w-6 h-6 text-indigo-600" />;
      case 'Feather': return <Feather className="w-6 h-6 text-rose-600" />;
      case 'Globe': return <Globe className="w-6 h-6 text-sky-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-red-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-orange-600" />;
      default: return <BookOpen className="w-6 h-6 text-emerald-600" />;
    }
  };

  const filteredSubjects = mockSubjects.filter((subject) => {
    const matchesCat = activeCategory === 'semua' || subject.category === activeCategory;
    const matchesGrade = gradeFilter === 'semua' || subject.gradeLevels.includes(gradeFilter as number);
    return matchesCat && matchesGrade;
  });

  const kemenagSubjects = filteredSubjects.filter(s => s.category === 'kemenag');
  const umumSubjects = filteredSubjects.filter(s => s.category === 'umum');

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Introduction */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-300 uppercase mb-3">
            <span>Kurikulum Terpadu Madrasah Ibtidaiyah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-serif text-white mb-3">
            Struktur Mata Pelajaran Keagamaan & Umum
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Mengharmonisasikan standar kurikulum Kementerian Agama (Kemenag) untuk fondasi akidah dan spiritualitas, dengan kurikulum Nasional Kemendikbud untuk kompetensi sains, literasi, dan logika berpikir.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-6 pt-6 border-t border-emerald-700/50 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-emerald-950/40 rounded-xl backdrop-blur-xs">
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('semua'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'semua'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Semua Pelajaran ({mockSubjects.length})
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('kemenag'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'kemenag'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Khas Kemenag (5)
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveCategory('umum'); }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                activeCategory === 'umum'
                  ? 'bg-white text-emerald-950 font-bold shadow-xs'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Umum Nasional (5)
            </button>
          </div>

          {/* Grade Level Selector */}
          <div className="flex items-center gap-2 text-xs text-emerald-100">
            <span>Tingkat Kelas:</span>
            <select
              value={gradeFilter}
              onChange={(e) => {
                soundEngine.playClick();
                setGradeFilter(e.target.value === 'semua' ? 'semua' : Number(e.target.value));
              }}
              className="bg-emerald-950/60 border border-emerald-700/60 text-white rounded-lg px-2.5 py-1 text-xs cursor-pointer focus:outline-hidden"
            >
              <option value="semua">Semua Tingkat (1–6)</option>
              <option value="1">Kelas 1 (Fase A)</option>
              <option value="2">Kelas 2 (Fase A)</option>
              <option value="3">Kelas 3 (Fase B)</option>
              <option value="4">Kelas 4 (Fase B)</option>
              <option value="5">Kelas 5 (Fase C)</option>
              <option value="6">Kelas 6 (Fase C)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 1: Mata Pelajaran Kemenag */}
      {(activeCategory === 'semua' || activeCategory === 'kemenag') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg font-serif">
                <span>01. Mata Pelajaran Keagamaan (Kemenag)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pendidikan agama Islam terstruktur mencakup aspek Qur'an, akidah, ibadah syariah, sejarah, dan bahasa Al-Qur'an.
              </p>
            </div>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {kemenagSubjects.length} Mata Pelajaran
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {kemenagSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSubject(sub);
                }}
                className="bg-white rounded-xl border border-emerald-100 p-5 shadow-2xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(sub.iconName)}
                    </div>
                    {sub.arabicName && (
                      <span className="font-arabic text-base text-emerald-800 font-bold" dir="rtl">
                        {sub.arabicName}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-emerald-700 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sub.teacherName}</span>
                  </div>
                  <span className="text-emerald-700 font-semibold group-hover:underline">
                    Lihat Modul &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Mata Pelajaran Umum (Kemendikbud) */}
      {(activeCategory === 'semua' || activeCategory === 'umum') && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-slate-800 font-bold text-lg font-serif">
                <span>02. Mata Pelajaran Umum (Kemendikbudristek)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Penguatan literasi, numerasi logika, pemahaman alam sekitar ciptaan Allah, dan kebangsaan Indonesia.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              {umumSubjects.length} Mata Pelajaran
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {umumSubjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => {
                  soundEngine.playClick();
                  setSelectedSubject(sub);
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(sub.iconName)}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      Kelas {sub.gradeLevels.join(', ')}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{sub.teacherName}</span>
                  </div>
                  <span className="text-indigo-600 font-semibold group-hover:underline">
                    Lihat Modul &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                  {getIcon(selectedSubject.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 font-serif">
                      {selectedSubject.name}
                    </h2>
                    {selectedSubject.arabicName && (
                      <span className="font-arabic text-emerald-800 font-bold text-lg">
                        {selectedSubject.arabicName}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{selectedSubject.category === 'kemenag' ? 'Kurikulum Kemenag' : 'Kurikulum Nasional'}</span>
                    <span>·</span>
                    <span>Guru Pengampu: {selectedSubject.teacherName}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Overview & Interactive Modules */}
            <div className="mt-5 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Deskripsi & Capaian Pembelajaran
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {selectedSubject.description} Materi pembelajaran didesain dengan integrasi nilai-nilai keislaman, ramah tumbuh kembang anak usia SD/MI, serta menyertakan latihan interaktif audio dan visual.
                </p>
              </div>

              {/* Sample Chapters */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Daftar Bab & Materi Interaktif
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          Pengenalan Konsep & Dalil Pokok
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> 2 Jam Pelajaran (JP)
                          <span>·</span>
                          <span className="text-emerald-700 font-medium">Video Ajar Interaktif</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        soundEngine.playSuccess();
                        alert(`Memulai modul pembelajaran "${selectedSubject.name}: Bab 1"`);
                      }}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Buka Materi
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          Praktik Mandiri & Pembiasaan Adab
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> 2 JP
                          <span>·</span>
                          <span className="text-blue-700 font-medium">Lembar Kerja & Audio</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        soundEngine.playSuccess();
                        alert(`Membuka Lembar Kerja "${selectedSubject.name}: Bab 2"`);
                      }}
                      className="px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Lembar Kerja
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">
                          Kuis Bintang & Asesmen Formatif
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-amber-500" /> Gamifikasi 10 Soal
                          <span>·</span>
                          <span className="text-amber-700 font-medium">+50 Poin Bintang</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        soundEngine.playReward();
                        alert(`Membuka kuis formatif "${selectedSubject.name}"`);
                      }}
                      className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-semibold hover:bg-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Mulai Kuis
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Tutup Modul
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
