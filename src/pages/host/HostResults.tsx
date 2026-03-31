import React from 'react';
import { Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { Question } from '../../types';

interface HostResultsProps {
  question: Question;
  answers: Record<string, number>;
  totalPlayers: number;
  onNext: () => void;
  isLastQuestion: boolean;
}

const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
const shapes = ['▲', '◆', '●', '■'];

const HostResults: React.FC<HostResultsProps> = ({
  question,
  answers,
  totalPlayers,
  onNext,
  isLastQuestion,
}) => {
  // Count how many people chose each option
  const counts = [0, 0, 0, 0];
  Object.values(answers).forEach((idx) => {
    if (idx >= 0 && idx < 4) counts[idx]++;
  });

  const maxCount = Math.max(...counts, 1);

  return (
    <div className="relative min-h-screen flex flex-col items-center p-8 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.15)_0%,transparent_50%)]"></div>

      <div className="relative z-10 w-full flex justify-between items-center mb-12">
        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 border-indigo-500/30">
          <Trophy size={24} className="text-yellow-400" />
          <h2 className="text-2xl font-bold">Результаты раунда</h2>
        </div>

        <button
          onClick={onNext}
          className="group flex items-center gap-3 px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-2xl font-black rounded-[24px] shadow-xl shadow-indigo-900/40 transition-all active:scale-95"
        >
          <span>{isLastQuestion ? 'Завершить' : 'Далее'}</span>
          <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      <h1 className="relative z-10 text-4xl md:text-5xl font-black text-center text-white mb-16 max-w-4xl leading-tight">
        {question.text}
      </h1>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-end justify-center gap-6 h-[400px]">
        {counts.map((count, idx) => {
          const isCorrect = idx === question.correctIndex;
          const height = (count / maxCount) * 100;
          
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full group">
              <div className="mb-4 text-3xl font-black text-white">{count}</div>
              <div className="relative flex-1 w-full flex flex-col justify-end">
                <div 
                  className={`w-full rounded-t-[24px] transition-all duration-1000 ease-out ${colors[idx]} shadow-lg relative ${!isCorrect && 'opacity-40'}`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                >
                    {isCorrect && (
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
                            <CheckCircle2 size={40} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        </div>
                    )}
                </div>
              </div>
              <div className={`mt-6 w-full p-4 rounded-2xl flex items-center gap-4 ${colors[idx]} text-white shadow-xl ${!isCorrect && 'opacity-40 grayscale-[0.5]'}`}>
                <span className="text-3xl font-bold">{shapes[idx]}</span>
                <span className="text-lg font-bold line-clamp-1">{question.options[idx]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HostResults;
