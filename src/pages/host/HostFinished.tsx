import React from 'react';
import { Home, Trophy, Star, Award } from 'lucide-react';
import type { Player } from '../../types';

interface HostFinishedProps {
  players: Record<string, Player>;
  onHome: () => void;
}

const HostFinished: React.FC<HostFinishedProps> = ({ players, onHome }) => {
  const sortedPlayers = Object.entries(players)
    .sort(([, a], [, b]) => b.score - a.score)
    .slice(0, 5); // Show top 5

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-8 bg-slate-950 overflow-hidden text-white">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.2)_0%,transparent_70%)]"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 border-2 border-yellow-500/30 animate-pulse">
                <Trophy size={48} className="text-yellow-500" />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-center mb-4 tracking-tighter gradient-text">
                ФИНАЛ
            </h1>
            <p className="text-slate-400 text-xl font-medium uppercase tracking-widest text-center">Пьедестал почета</p>
        </div>

        <div className="glass-card w-full rounded-[40px] p-8 md:p-12 mb-12">
          <div className="space-y-6">
            {sortedPlayers.map(([id, player], idx) => {
              const colors = [
                'from-yellow-400 to-amber-600', // Gold
                'from-slate-300 to-slate-500', // Silver
                'from-orange-400 to-orange-700', // Bronze
                'from-indigo-400 to-indigo-600',
                'from-indigo-400 to-indigo-600'
              ];
              
              const icons = [
                  <Trophy size={24} />,
                  <Award size={24} />,
                  <Star size={24} />,
                  <null />,
                  <null />
              ];

              return (
                <div
                  key={id}
                  className={`flex items-center justify-between p-6 rounded-[24px] bg-white/5 border border-white/10 transition-all hover:bg-white/10 ${idx === 0 && 'ring-2 ring-yellow-500/50 scale-[1.02] shadow-[0_0_30px_rgba(234,179,8,0.2)]'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg bg-gradient-to-br ${colors[idx]} text-white`}>
                      {idx + 1}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{player.nickname}</span>
                            {idx < 3 && <span className="text-yellow-500">{icons[idx]}</span>}
                        </div>
                        {idx === 0 && <span className="text-xs font-bold uppercase tracking-widest text-yellow-500/80">Победитель</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white">{player.score}</span>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">очков</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={onHome}
          className="group flex items-center gap-3 px-10 py-5 bg-white/10 hover:bg-white/20 border border-white/10 text-xl font-bold rounded-[24px] transition-all active:scale-95"
        >
          <Home size={24} />
          <span>Вернуться на главную</span>
        </button>
      </div>
    </div>
  );
};

export default HostFinished;
