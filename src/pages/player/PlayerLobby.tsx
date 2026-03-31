import React from 'react';
import { UserCheck, Loader2 } from 'lucide-react';

const PlayerLobby: React.FC = () => {
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden text-center">
        {/* Animated background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse"></div>

        <div className="relative z-10">
            <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500/30 rounded-[32px] flex items-center justify-center mb-8 mx-auto shadow-lg shadow-emerald-500/10 animate-in zoom-in duration-500">
                <UserCheck size={48} className="text-emerald-400" />
            </div>

            <h1 className="text-4xl font-black text-white mb-4">Вы в игре!</h1>
            <p className="text-slate-400 text-lg font-medium max-w-xs mx-auto mb-10 leading-relaxed">
                Смотрите на экран хоста. Игра начнется через несколько мгновений...
            </p>

            <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                <span className="text-indigo-400/60 font-black text-xs uppercase tracking-[0.3em]">Ожидание старта</span>
            </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[200px]">
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 animate-loading-bar origin-left"></div>
            </div>
        </div>
        
        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes loading-bar {
                0% { transform: scaleX(0); }
                50% { transform: scaleX(1); }
                100% { transform: scaleX(0); }
            }
            .animate-loading-bar {
                animation: loading-bar 3s infinite ease-in-out;
            }
        `}} />
    </div>
  );
};

export default PlayerLobby;
