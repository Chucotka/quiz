import React from 'react';
import { Check, Loader2 } from 'lucide-react';

const PlayerAnswered: React.FC = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden text-center text-white">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]"></div>

        <div className="relative z-10">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8 mx-auto shadow-2xl animate-in zoom-in duration-500">
                <Check size={48} className="text-white" />
            </div>

            <h1 className="text-4xl font-black mb-4">Ответ принят!</h1>
            <p className="text-slate-400 text-lg font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                Дождитесь окончания времени или пока все игроки ответят.
            </p>

            <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                <span className="text-indigo-400/40 font-black text-[10px] uppercase tracking-[0.4em]">Ожидание остальных</span>
            </div>
        </div>
    </div>
  );
};

export default PlayerAnswered;
