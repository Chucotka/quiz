import React from 'react';

const PlayerLobby: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6 relative overflow-hidden">
      <div className="absolute w-[200vw] h-[200vw] bg-indigo-900 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      <div className="z-10 flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center animate-bounce text-indigo-300">
          Вы в игре!
        </h1>
        <p className="text-2xl text-gray-400 font-medium text-center">
          Ожидание запуска хостом...
        </p>
        <div className="flex gap-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-6 h-6 bg-indigo-500 rounded-full animate-ping"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerLobby;
