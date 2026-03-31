import React from 'react';

interface PlayerResultsProps {
  score: number;
  rank: number;
  pointsEarned: number;
  isCorrect: boolean;
  totalPlayers: number;
}

const PlayerResults: React.FC<PlayerResultsProps> = ({ score, rank, pointsEarned, isCorrect, totalPlayers }) => {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen text-white p-6 relative transition-colors duration-500 ${isCorrect ? 'bg-green-700' : 'bg-red-700'}`}>

      <div className="z-10 flex flex-col items-center w-full max-w-sm">

        <div className={`w-full bg-white/10 backdrop-blur-md border ${isCorrect ? 'border-green-400' : 'border-red-400'} rounded-[3rem] p-10 shadow-2xl flex flex-col items-center mb-8`}>
          <span className="text-8xl mb-6">{isCorrect ? '✅' : '❌'}</span>
          <h1 className="text-4xl md:text-5xl font-black text-center mb-4">
            {isCorrect ? 'Правильно!' : 'Неверно'}
          </h1>
          <p className="text-2xl font-bold bg-white/20 px-6 py-2 rounded-full mb-8">
            +{pointsEarned} очков
          </p>

          <div className="w-full bg-black/30 rounded-3xl p-6 flex justify-between items-center text-xl font-semibold mb-4 border border-white/10 shadow-inner">
            <span className="text-white/70">Твой счет:</span>
            <span className="text-3xl font-mono text-yellow-300 drop-shadow-md">{score}</span>
          </div>

          <div className="w-full bg-black/30 rounded-3xl p-6 flex justify-between items-center text-xl font-semibold border border-white/10 shadow-inner">
            <span className="text-white/70">Место:</span>
            <span className="text-3xl font-mono text-cyan-300 drop-shadow-md">{rank} <span className="text-lg text-white/50">/ {totalPlayers}</span></span>
          </div>
        </div>

        <p className="text-xl text-white/60 font-medium text-center animate-pulse">
          Ожидание следующего раунда...
        </p>

      </div>
    </div>
  );
};

export default PlayerResults;
