import React, { useState } from 'react';
import { ShieldAlert, HelpCircle, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import NameEntry from './components/NameEntry';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import AdminDashboard from './components/AdminDashboard';
import TutorialModal from './components/TutorialModal';
import Footer from './components/Footer';
import { generateAppPlan } from './services/geminiService';
import { EvaResponse, UserInput } from './types';
import { useAuth } from './components/AuthContext';
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);
  const [result, setResult] = useState<EvaResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const { user, isAdmin, login, logout } = useAuth();

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setIsNameSubmitted(true);
    setShowTutorial(true);
  };

  const handleFormSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await generateAppPlan(input, userName);
      if (response) {
        setResult(response);
      }
    } catch (err: any) {
      setError(`기획안 생성 중 오류가 발생했습니다: ${err.message || '알 수 없는 오류'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const ProcessStep = ({ icon, text, step, active, completed }: any) => (
    <div className={`flex flex-col items-center z-10 transition-all duration-700 flex-1 ${active || completed ? '' : ''}`}>
      <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] flex items-center justify-center shadow-lg
        ${completed ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white scale-110 rotate-3 shadow-emerald-200' : active ? 'bg-indigo-600 text-white scale-110 shadow-indigo-300' : 'bg-white/70 dark:bg-slate-800 text-slate-400'}`}
      >
        {completed ? null : icon}
      </div>
      <div className="flex flex-col items-center">
        <span className={`text-[10px] font-black tracking-widest uppercase mb-1 font-serif ${active ? 'te' : 'te'}`}></span>
        <span className={`text-xs md:text-sm font-black px-4 py-1.5 rounded-full whitespace-nowrap trans`}>
          {text}
        </span>
      </div>
    </div>
  );

  if (showAdmin && isAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen w-full transition-colors duration-500 bg-[#F8F9FF] dark:bg-slate-950`}>
      {/* Upper Right Action Buttons */}
      <div className="fixed top-6 right-6 z-[60] flex gap-3 items-center">
        {isAdmin && (
          <button
            onClick={() => setShowAdmin(true)}
            className="w-12 h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 rounded-2xl hover:scale-105 transition-all shadow-lg"
            title="관리자 대시보드"
          >
            <ShieldAlert size={22} />
          </button>
        )}
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-2xl hover:scale-105 transition-all shadow-lg"
            title="로그아웃"
          >
            <img src={user.photoURL || ''} alt="Profile" className="w-6 h-6 rounded-full" />
            <span className="hidden sm:inline">로그아웃</span>
            <LogOut size={16} />
          </button>
        ) : (
          <button
            onClick={login}
            className="px-4 py-2 flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-2xl hover:scale-105 transition-all shadow-lg"
            title="구글 로그인"
          >
            <LogIn size={16} /> <span className="hidden sm:inline">로그인</span>
          </button>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-12 h-12 flex items-center justify-center bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 rounded-2xl hover:scale-105 transition-all shadow-lg backdrop-blur"
          title="테마 변경"
        >
          {darkMode ? <Sun size={22} className="text-amber-400 group-hover:rotate-45 transition-transform" /> : <Moon size={22} />}
        </button>
        {isNameSubmitted && (
          <button
            onClick={() => setShowTutorial(true)}
            className="px-6 py-2 flex items-center gap-2 bg-indigo-600/90 dark:bg-indigo-500/90 text-white rounded-2xl hover:scale-105 transition-all shadow-lg backdrop-blur"
          >
            <HelpCircle size={18} /> <span className="hidden sm:inline">사용법</span>
          </button>
        )}
      </div>

      {!isNameSubmitted ? (
        <NameEntry onNameSubmit={handleNameSubmit} />
      ) : (
        <>
          {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} userName={userName} />}
          <div className="container mx-auto px-4 py-16 flex flex-col items-center">
            <header className="text-center mb-24 w-full max-w-5xl animate-fade-in relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30 dark:opacity-10" />

              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full text-[11px] font-black tracking-[0.3em] uppercase text-indigo-500 dark:text-indigo-400">
                <Sparkles size={16} className="text-amber-400 animate-pulse" /> EVA : YOUR CREATIVE PARTNER
              </div>

              <div className="space-y-6 mb-16 relative z-10">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black brand-font tracking-tight leading-[1.1] text-slate-800 dark:text-white">
                  <span className="block text-slate-900 dark:text-white mb-2 font-serif">상상 그 이상의 앱</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">만들어드리겠습니다</span>
                </h1>
                <p className="text-lg md:text-xl xl:text-2xl text-center text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                  안녕하세요, <strong className="text-indigo-600 dark:text-indigo-400">{userName}</strong>님의 아이디어를 기다렸어요!
                </p>
              </div>
            </header>

            <main className="w-full max-w-5xl space-y-16">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-sm">{error}</div>
              )}
              {!result && !isLoading && <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
              {(isLoading || result) && (
                <ResultDisplay
                  result={result}
                  isLoading={isLoading}
                  userName={userName}
                  userInput={null}
                  onReset={() => { setResult(null); setError(null); }}
                />
              )}
            </main>

            <Footer userName={userName} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
