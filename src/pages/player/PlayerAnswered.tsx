import React from 'react';

const PlayerAnswered: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 relative">
      <div className="absolute inset-0 bg-green-900/20"></div>

      <div className="z-10 flex flex-col items-center p-8 bg-gray-800 rounded-[2rem] shadow-[0_0_50px_rgba(34,197,94,0.3)] border-4 border-green-500/30">
        <span className="text-8xl mb-6 animate-pulse">⏳</span>
        <h1 className="text-4xl md:text-5xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
          Ответ принят!
        </h1>
        <p className="text-2xl text-gray-300 font-medium text-center">
          Ждем остальных...
        </p>
      </div>
    </div>
  );
};

export default PlayerAnswered;
