import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, AlertTriangle } from 'lucide-react';
import { isFirebaseConfigured } from '../firebase';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      {!isFirebaseConfigured && (
        <div className="absolute top-0 w-full bg-red-600 text-white p-4 text-center font-bold flex items-center justify-center gap-3">
          <AlertTriangle size={24} />
          <span>Внимание: Настройте переменные окружения Firebase в файле .env!</span>
        </div>
      )}

      <h1 className="text-5xl md:text-7xl font-extrabold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mt-16 md:mt-0">
        Квиз!
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-md">
        <button
          onClick={() => navigate('/host')}
          className="flex items-center justify-center gap-3 w-full py-6 px-8 bg-indigo-600 hover:bg-indigo-700 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95"
        >
          <Play size={32} />
          Создать игру
        </button>

        <button
          onClick={() => navigate('/join')}
          className="flex items-center justify-center gap-3 w-full py-6 px-8 bg-emerald-600 hover:bg-emerald-700 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95"
        >
          <Users size={32} />
          Присоединиться
        </button>
      </div>
    </div>
  );
};

export default Landing;
