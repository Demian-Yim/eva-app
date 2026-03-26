import React, { useState } from 'react';
import { X, ArrowRight, Sparkles, Rocket, ShieldCheck, CheckCircle2, MonitorPlay } from 'lucide-react';

interface TutorialModalProps {
  onClose: () => void;
  userName: string;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose, userName }) => {
  const [step, setStep] = useState(1);

  const steps = [
    {
      title: `존경하는 ${userName}님,`,
      subtitle: "환영합니다, 마법의 시작입니다",
      content: "코딩이나 복잡한 기술 지식은 전혀 모르셔도 관찮습니다.\n오직 사용자님의 비즈니스 아이디어와 직관만으로 \n매우 매력적인 앱 기획안을 만들어 드립니다.",
      icon: <Sparkles className="w-20 h-20 text-yellow-500 drop-shadow-2xl animate-pulse" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/20",
      accent: "text-indigo-600"
    },
    {
      title: "1단계: 고민 입력하기",
      subtitle: "현재의 상황을 알려주세요",
      content: "현재 어떤 업무를 하고 계신가요?\n가장 해결하고 싶은 '페인 포인트'는 무엇인가요?\n아주 솔직하게 털어놓으세요.",
      icon: <MonitorPlay className="w-20 h-20 text-purple-500 drop-shadow-2xl" />,
      bg: "bg-purple-50 dark:bg-purple-900/20",
      accent: "text-purple-600"
    },
    {
      title: "2단계: 솔루션 선택하기",
      subtitle: "3가지 맞춤형 기획안",
      content: "Eva는 3가지 서로 다른 매력의 앱 기획안을 제안합니다.\n가장 마음에 드는 솔루션을 클릭하여 상세 설계를 확인하세요.",
      icon: <ShieldCheck className="w-20 h-20 text-emerald-500 drop-shadow-2xl" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
      accent: "text-emerald-600"
    },
    {
      title: "3단계: 현실로 만들기",
      subtitle: "복사하고 빨녀넣으세요",
      content: "완성된 '마법의 프롬프트'를 복사 버튼 한번으로 가져가세요.\nGoogle AI Studio에 블0녀넣는 순간, 상상하던 앱이 탄생합니다!",
      icon: <Rocket className="w-20 h-20 text-rose-500 drop-shadow-2xl animate-bounce-slow" />,
      bg: "bg-rose-50 dark:bg-rose-900/20",
      accent: "text-rose-600"
    }
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] w-full max-w-md relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white z-10"
        >
          <span className="text-[11px] font-black tracking-[0.3em] group-hover:text-rose-500 transition">SKIP</span>
          <X size={14} strokeWidth={3} />
        </button>

        <div className={`relative h-72 ${currentStep.bg} transition-colors duration-1000 flex flex-col items-center justify-center`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-current to-transparent" />
          <div className="bg-white/95 dark:bg-slate-900/95 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur">
            {currentStep.icon}
          </div>
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full border border-white/30 animate-spin" style={{animationDuration:'20s'}} />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border-2 border-white/20" />
        </div>

        <div className="p-10 md:p-14 text-center relative bg-white dark:bg-slate-900">
          <h3 className={`text-[12px] font-black ${currentStep.accent} mb-4 tracking-[0.4em] uppercase tr`}>{step}/{steps.length}</h3>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 brand-font t">
            {currentStep.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-12 whitespace-pre-line text">
            {currentStep.content}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-700 ${i + 1 === step ? 'w-10 bg-sl' : 'w-2 bg-s'}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (step < steps.length) setStep(step + 1);
                else onClose();
              }}
              className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-[1.5"
            >
              {step === steps.length ? '에바 만나러 가기!' : '다음'}
              {step === steps.length ? <CheckCircle2 size={22} /> : <ArrowRight size={22} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialModal;
