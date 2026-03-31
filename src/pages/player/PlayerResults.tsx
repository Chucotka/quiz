import React from 'react';
import { CheckCircle2, XCircle, Trophy, User } from 'lucide-react';

interface PlayerResultsProps {
  score: number;
  rank: number;
  pointsEarned: number;
  isCorrect: boolean;
  totalPlayers: number;
}

const PlayerResults: React.FC<PlayerResultsProps> = ({ score, rank, pointsEarned, isCorrect, totalPlayers }) => {
  return (
    <div className={`min-h-[100dvh] flex flex-col items-center justify-center p-6 transition-colors duration-700 ${isCorrect ? 'bg-emerald-600' : 'bg-rose-600'} text-white overflow-hidden`}>
        {/* Animated background element */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-[100px] animate-pulse"></div>

        <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
            <div className="mb-8 flex flex-col items-center">
                {isCorrect ? (
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-in zoom-in duration-500">
                        <CheckCircle2 size={56} className="text-white" />
                    </div>
                ) : (
                    <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl animate-in zoom-in duration-500">
                        <XCircle size={56} className="text-white" />
                    </div>
                )}
                <h1 className="text-4xl md:text-5xl font-black text-center tracking-tight mb-2">
                    {isCorrect ? 'ПРАВИЛЬНО!' : 'НЕВЕРНО'}
                </h1>
                <div className="bg-black/20 px-4 py-1 rounded-full text-sm font-bold tracking-widest uppercase">
                    {isCorrect ? `+${pointsEarned} очков` : 'В следующий раз повезет'}
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center border border-white/10">
                    <Trophy size={20} className="text-white/60 mb-2" />
                    <span className="text-sm font-bold text-white/60 uppercase tracking-tighter">Место</span>
                    <span className="text-3xl font-black">{rank} / {totalPlayers}</span>
                </div>
                <div className="bg-black/20 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center border border-white/10">
                    <User size={20} className="text-white/60 mb-2" />
                    <span className="text-sm font-bold text-white/60 uppercase tracking-tighter">Счет</span>
                    <span className="text-3xl font-black">{score}</span>
                </div>
            </div>

            <p className="mt-12 text-white/50 text-xs font-black uppercase tracking-[0.3em] animate-pulse">
                Смотрите на экран хоста
            </p>
        </div>
    </div>
  );
};

export default PlayerResults;
