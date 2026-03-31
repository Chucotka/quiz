import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Users, Sparkles } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl w-full">
        <div className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass text-sm font-medium text-purple-300">
          <Sparkles size={16} />
          <span>Новое поколение квизов</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black mb-6 text-center tracking-tight leading-none gradient-text">
          QUIZ!
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl text-center mb-12 max-w-md">
          Создавайте захватывающие викторины и играйте вместе с друзьями в реальном времени.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 w-full px-4">
          <button
            onClick={() => navigate('/host')}
            className="group relative flex-1 flex items-center justify-center gap-3 py-5 px-8 bg-indigo-600 hover:bg-indigo-500 text-xl font-bold rounded-2xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all active:scale-95 btn-premium"
          >
            <Play size={24} className="fill-current" />
            <span>Создать игру</span>
          </button>

          <button
            onClick={() => navigate('/join')}
            className="flex-1 flex items-center justify-center gap-3 py-5 px-8 glass-card hover:bg-white/10 text-xl font-bold rounded-2xl transition-all active:scale-95 btn-premium"
          >
            <Users size={24} />
            <span>Присоединиться</span>
          </button>
        </div>

        <div className="mt-16 text-gray-500 font-medium text-sm flex items-center gap-4">
          <span>Быстро</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
          <span>Бесплатно</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
          <span>Красиво</span>
        </div>
      </div>
    </div>
  );
};

export default Landing;
