import React from 'react';
import { Heart, Github, Linkedin, ExternalLink, ShieldCheck, Waves, Mail, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  userName: string;
}

const Footer: React.FC<FooterProps> = ({ userName }) => {
  return (
    <footer className="w-full py-12 mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="space-y-2">
            <span className="text-slate-400 dark:text-slate-500 font-bold text-xs tracking-widest uppercase">Powered by</span>
            <h2 className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              AI 코디네이터 임정훈 소장 (Demian)
            </h2>
          </div>

          <div className="text-center space-y-3">
            <div className="flex flex-col items-center gap-1">
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300 flex items-center-center gap-1">
                <Waves size={18} className="text-indigo-500" /> FLOW: AX디자인연구소
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                사람과 일의 흐름을 디자인합니다
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-500">
            <a href="https://flowdesign.ai.kr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-500 transition-colors text-sm font-medium animate-pulse">
              <ExternalLink size={18} /> 홈페이지 방문하기
            </a>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <a href="mailto:rescuemyself@gmail.com" className="flex items-center gap-2 px-3 hover:text-indigo-500 transition-colors text-sm">
              <Mail size={16} /> rescuemyself@gmail.com
            </a>
          </div>

          <div className="flex gap-4 justify-center mt-4">
            <a href="https://www.linkedin.com/in/%EC%A0%95%ED%9B%88-%EC%9E%84-23ab981aa/" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://www.facebook.com/Rescuemyself7" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/demian_yim/" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-500 transition-colors">
              <Instagram size={20} />
            </a>
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-600 mt-6">
            COPYRIGHT @ FLOW: AX디자인연구소 ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
