import React from 'react';
import type { Player } from '../../types';

interface HostFinishedProps {
  players: Record<string, Player>;
  onHome: () => void;
}

const HostFinished: React.FC<HostFinishedProps> = ({ players, onHome }) => {
  const sortedPlayers = Object.entries(players)
    .sort(([, a], [, b]) => b.score - a.score)
    .map(([id, p]) => ({ id, ...p }));

  const top3 = sortedPlayers.slice(0, 3);
  const others = sortedPlayers.slice(3, 10); // Show up to top 10 total

  const podiumOrder = [top3[1], top3[0], top3[2]]; // 2nd, 1st, 3rd

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8 items-center justify-center relative overflow-hidden">

      {/* Confetti / background decorations could go here */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-gray-900 to-gray-900"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-5xl">
        <h1 className="text-6xl md:text-8xl font-black mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-lg">
          Пьедестал Почета
        </h1>

        <div className="flex items-end justify-center gap-4 md:gap-8 h-96 w-full max-w-4xl mb-16">
          {podiumOrder.map((player, idx) => {
            if (!player) return <div key={idx} className="w-1/3" />;

            const position = idx === 1 ? 1 : idx === 0 ? 2 : 3;
            const heightClass = position === 1 ? 'h-full' : position === 2 ? 'h-3/4' : 'h-1/2';
            const colorClass = position === 1 ? 'bg-yellow-400' : position === 2 ? 'bg-gray-300' : 'bg-orange-400';
            const icon = position === 1 ? '🏆' : position === 2 ? '🥈' : '🥉';

            return (
              <div key={player.id} className="flex flex-col items-center w-1/3 animate-fade-in-up" style={{ animationDelay: `${position * 200}ms` }}>
                <span className="text-5xl mb-4 animate-bounce">{icon}</span>
                <span className="text-3xl font-bold mb-2 text-center break-words w-full">{player.nickname}</span>
                <span className="text-2xl font-mono mb-4 text-gray-300">{player.score}</span>
                <div className={`w-full rounded-t-3xl shadow-[0_0_30px_rgba(255,255,255,0.2)] flex justify-center pt-6 ${heightClass} ${colorClass}`}>
                  <span className="text-6xl font-black text-black opacity-40">{position}</span>
                </div>
              </div>
            );
          })}
        </div>

        {others.length > 0 && (
          <div className="w-full max-w-2xl bg-gray-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-400 border-b-2 border-gray-700 pb-4">Остальные финалисты</h2>
            <div className="flex flex-col gap-4">
              {others.map((player, idx) => (
                <div key={player.id} className="flex justify-between items-center text-2xl font-semibold bg-gray-700 p-4 rounded-xl">
                  <div className="flex gap-4">
                    <span className="text-gray-400 w-8">{idx + 4}.</span>
                    <span>{player.nickname}</span>
                  </div>
                  <span className="font-mono text-yellow-500">{player.score}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onHome}
          className="mt-12 px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95 z-20"
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default HostFinished;
