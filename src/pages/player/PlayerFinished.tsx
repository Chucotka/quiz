import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PlayerFinishedProps {
  score: number;
  rank: number;
  totalPlayers: number;
}

const PlayerFinished: React.FC<PlayerFinishedProps> = ({ score, rank, totalPlayers }) => {
  const navigate = useNavigate();

  const getRankMessage = () => {
    if (rank === 1) return '🥇 Победитель!';
    if (rank === 2) return '🥈 Второе место!';
    if (rank === 3) return '🥉 Третье место!';
    return 'Отличная игра!';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 relative overflow-hidden">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-gray-900 to-gray-900"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-sm bg-gray-800 p-10 rounded-[3rem] shadow-2xl border-4 border-yellow-500/30">
        <h1 className="text-5xl md:text-6xl font-black text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 drop-shadow-lg">
          Игра окончена!
        </h1>

        <span className="text-6xl mb-8 animate-bounce">
          {getRankMessage().split(' ')[0]}
        </span>

        <p className="text-3xl font-bold text-center mb-8 text-white/90">
          {getRankMessage()}
        </p>

        <div className="w-full bg-black/40 rounded-3xl p-6 flex justify-between items-center text-2xl font-semibold mb-6 shadow-inner border border-white/5">
          <span className="text-gray-400">Счет:</span>
          <span className="text-4xl font-mono text-yellow-400 drop-shadow-md">{score}</span>
        </div>

        <div className="w-full bg-black/40 rounded-3xl p-6 flex justify-between items-center text-2xl font-semibold mb-10 shadow-inner border border-white/5">
          <span className="text-gray-400">Место:</span>
          <span className="text-4xl font-mono text-cyan-400 drop-shadow-md">{rank} <span className="text-xl text-gray-500">/ {totalPlayers}</span></span>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95 border-b-4 border-indigo-800 active:border-b-0 active:translate-y-1"
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default PlayerFinished;
