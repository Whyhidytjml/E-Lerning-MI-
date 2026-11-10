/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Role, Student, UserAccount, LiaisonMessage } from './types/lms';
import { mockStudents, mockUserAccounts, mockLiaisonMessages } from './data/mockData';
import { Header } from './components/Header';
import { LoginScreen } from './components/auth/LoginScreen';
import { LowGradeDashboard } from './components/lowgrade/LowGradeDashboard';
import { HighGradeDashboard } from './components/highgrade/HighGradeDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SubjectCurriculumView } from './components/SubjectCurriculumView';
import { TahfizModule } from './components/tahfiz/TahfizModule';
import { MutabaahModule } from './components/mutabaah/MutabaahModule';
import { soundEngine } from './utils/audio';
import { 
  ShieldCheck, 
  LogOut
} from 'lucide-react';

export default function App() {
  // User Login Session (defaults to null so user enters via Login Screen)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('madrasahku_current_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [audioEnabled, setAudioEnabled] = useState<boolean>(true);

  // Shared Liaison Messages State across Parent and Teacher dashboards
  const [liaisonMessages, setLiaisonMessages] = useState<LiaisonMessage[]>(() => {
    try {
      const saved = localStorage.getItem('madrasahku_liaison_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockLiaisonMessages;
  });

  const handleSendLiaisonMessage = (newMsg: LiaisonMessage) => {
    setLiaisonMessages(prev => {
      const updated = [...prev, newMsg];
      try {
        localStorage.setItem('madrasahku_liaison_messages', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Student state for lower grade (Ahmad)
  const [lowGradeStudent, setLowGradeStudent] = useState<Student>(mockStudents[0]);
  // Student state for higher grade (Fatimah)
  const [highGradeStudent, setHighGradeStudent] = useState<Student>(mockStudents[1]);

  const handleUpdateStudentStats = (addedStars: number, addedPoints: number) => {
    setLowGradeStudent(prev => ({
      ...prev,
      stars: prev.stars + addedStars,
      points: prev.points + addedPoints
    }));
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  const handleLogout = () => {
    soundEngine.playClick();
    setCurrentUser(null);
    setActiveTab('beranda');
    try {
      localStorage.removeItem('madrasahku_current_user');
    } catch (e) {}
  };

  const handleLogin = (user: UserAccount) => {
    setCurrentUser(user);
    setActiveTab('beranda');
    try {
      localStorage.setItem('madrasahku_current_user', JSON.stringify(user));
    } catch (e) {}
  };

  // If user is logged out, show dedicated clean login screen
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const currentRole: Role = currentUser.role;

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex flex-col text-slate-800">
      {/* Top Header without multi-role switcher */}
      <Header
        currentUser={currentUser}
        currentRole={currentRole}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        audioEnabled={audioEnabled}
        onToggleAudio={handleToggleAudio}
        onLogout={handleLogout}
      />

      {/* User Session Bar */}
      <div className="bg-emerald-900/5 border-b border-emerald-900/10 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-emerald-950 font-medium flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-white shadow-2xs flex items-center justify-center text-sm border border-emerald-100">
              {currentUser.avatar}
            </span>
            <span className="font-bold text-slate-900">{currentUser.name}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">{currentUser.title}</span>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span className="font-mono text-slate-500 hidden sm:inline">{currentUser.identifier}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Sesi Login Terverifikasi: {currentUser.title}</span>
            </span>

            <button
              onClick={handleLogout}
              className="text-rose-700 hover:text-rose-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main View Area strictly routed by logged-in role & tab */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        
        {/* ======================= ROLE 1 & 2: SISWA ======================= */}
        {(currentRole === 'siswa_rendah' || currentRole === 'siswa_tinggi') && (
          <>
            {activeTab === 'beranda' && (
              currentRole === 'siswa_rendah' ? (
                <LowGradeDashboard
                  student={lowGradeStudent}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onUpdateStats={handleUpdateStudentStats}
                />
              ) : (
                <HighGradeDashboard
                  student={highGradeStudent}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                />
              )
            )}

            {activeTab === 'kurikulum' && (
              <SubjectCurriculumView 
                studentGrade={currentRole === 'siswa_tinggi' ? highGradeStudent.grade : lowGradeStudent.grade}
                studentName={currentRole === 'siswa_tinggi' ? highGradeStudent.name : lowGradeStudent.name}
                isStudent={true}
              />
            )}

            {activeTab === 'tahfiz' && (
              <TahfizModule
                currentStudentName={currentRole === 'siswa_tinggi' ? highGradeStudent.name : lowGradeStudent.name}
                currentStudentGrade={currentRole === 'siswa_tinggi' ? highGradeStudent.gradeLabel : lowGradeStudent.gradeLabel}
              />
            )}

            {activeTab === 'mutabaah' && (
              <MutabaahModule
                studentName={currentRole === 'siswa_tinggi' ? highGradeStudent.nickname : lowGradeStudent.nickname}
              />
            )}
          </>
        )}

        {/* ======================= ROLE 3: GURU ======================= */}
        {currentRole === 'guru' && (
          <TeacherDashboard 
            initialTab={
              activeTab === 'beranda' ? 'presensi' :
              activeTab === 'grading_center' ? 'grading_center' :
              activeTab === 'kelola_materi' ? 'kelola_materi' :
              activeTab === 'bank_soal' ? 'bank_soal' :
              activeTab === 'penghubung' ? 'penghubung' : 'presensi'
            }
            messages={liaisonMessages}
            onSendMessage={handleSendLiaisonMessage}
            currentUser={currentUser}
            onSwitchTeacher={(newTeacher) => {
              setCurrentUser(newTeacher);
              try {
                localStorage.setItem('madrasahku_current_user', JSON.stringify(newTeacher));
              } catch (e) {}
            }}
          />
        )}

        {/* ======================= ROLE 4: ORANG TUA ======================= */}
        {currentRole === 'orang_tua' && (
          <ParentDashboard
            initialTab={
              activeTab === 'beranda' ? 'beranda' :
              activeTab === 'status_tugas' ? 'status_tugas' :
              activeTab === 'rekap_readonly' ? 'rekap_readonly' :
              activeTab === 'penghubung' ? 'penghubung' : 'beranda'
            }
            onNavigateTab={(tab) => setActiveTab(tab)}
            messages={liaisonMessages}
            onSendMessage={handleSendLiaisonMessage}
          />
        )}

        {/* ======================= ROLE 5: ADMINISTRATOR ======================= */}
        {currentRole === 'admin' && (
          <AdminDashboard 
            initialTab={
              activeTab === 'beranda' ? 'rekap' :
              activeTab === 'admin_pengguna' ? 'admin_pengguna' :
              activeTab === 'admin_pemetaan' ? 'admin_pemetaan' :
              activeTab === 'admin_rdm' ? 'admin_rdm' : 'rekap'
            } 
          />
        )}

      </main>

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-emerald-100 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-950 font-serif">LMS MI Darul Ulum Sidareja</span>
            <span>·</span>
            <span>Sistem Pembelajaran Terintegrasi RDM Kemenag</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Kurikulum Kemenag & Kemendikbud</span>
            <span>·</span>
            <span>Tahun Ajaran 2026/2027</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
