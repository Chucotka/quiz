import React from 'react';
import { Trophy, Star, RefreshCw } from 'lucide-react';

interface PlayerFinishedProps {
  score: number;
  rank: number;
  totalPlayers: number;
}

const PlayerFinished: React.FC<PlayerFinishedProps> = ({ score, rank, totalPlayers }) => {
  const isWinner = rank === 1;

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden text-white text-center">
        {/* Confetti-like decoration (CSS only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(20)].map((_, i) => (
                <div 
                    key={i} 
                    className="absolute w-2 h-2 bg-white rounded-full animate-confetti"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `-10px`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`
                    }}
                />
            ))}
        </div>

        <div className="relative z-10 w-full max-w-sm">
            <div className={`w-32 h-32 mx-auto rounded-[40px] flex items-center justify-center mb-8 shadow-2xl shadow-indigo-500/20 animate-in zoom-in duration-700 ${isWinner ? 'bg-yellow-500/20 border-2 border-yellow-500/40' : 'bg-indigo-600/20 border-2 border-indigo-500/40'}`}>
                {isWinner ? (
                    <Trophy size={64} className="text-yellow-500" />
                ) : (
                    <Star size={64} className="text-indigo-400" />
                )}
            </div>

            <h1 className="text-5xl font-black mb-2 tracking-tighter gradient-text">ИГРА ОКОНЧЕНА</h1>
            <p className="text-slate-400 font-medium mb-10 italic">Спасибо за игру!</p>

            <div className="glass-card rounded-[32px] p-8 mb-10">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Ваше место</span>
                    <span className="text-6xl font-black mb-6">{rank} <span className="text-2xl text-slate-600">из {totalPlayers}</span></span>
                    <div className="w-full h-px bg-white/10 mb-6"></div>
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Итоговый счет</span>
                    <span className="text-4xl font-black">{score}</span>
                </div>
            </div>

            <button
                onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-3 w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-lg font-bold rounded-2xl transition-all active:scale-[0.98]"
            >
                <RefreshCw size={20} />
                <span>Играть снова</span>
            </button>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
            @keyframes confetti {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
            .animate-confetti {
                animation: confetti linear infinite;
            }
        `}} />
    </div>
  );
};

export default PlayerFinished;
