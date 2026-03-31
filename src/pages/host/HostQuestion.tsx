import React, { useEffect, useState } from 'react';
import { Timer, Users, MessageSquare } from 'lucide-react';
import type { Question } from '../../types';

interface HostQuestionProps {
  question: Question;
  questionStartedAt: number;
  totalPlayers: number;
  answersCount: number;
  onTimeUp: () => void;
}

const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500'];
const shapes = ['▲', '◆', '●', '■'];

const HostQuestion: React.FC<HostQuestionProps> = ({
  question,
  questionStartedAt,
  totalPlayers,
  answersCount,
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState(question.timeSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStartedAt) / 1000;
      const remaining = Math.max(0, Math.ceil(question.timeSeconds - elapsed));
      setTimeLeft(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [questionStartedAt, question.timeSeconds, onTimeUp]);

  const progress = (timeLeft / question.timeSeconds) * 100;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-8 bg-slate-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px]"></div>

      {/* Top Header */}
      <div className="relative z-10 w-full flex justify-between items-start">
        <div className="flex gap-4">
          <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3">
            <Users size={20} className="text-slate-400" />
            <span className="text-xl font-bold">{totalPlayers} игроков</span>
          </div>
        </div>

        <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-800"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={364.4}
                        strokeDashoffset={364.4 - (364.4 * progress) / 100}
                        strokeLinecap="round"
                        className="text-indigo-500 transition-all duration-300"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-white">{timeLeft}</span>
                </div>
            </div>
        </div>

        <div className="glass px-6 py-3 rounded-2xl flex items-center gap-3 border-emerald-500/30">
          <MessageSquare size={20} className="text-emerald-400" />
          <span className="text-xl font-bold">{answersCount} ответов</span>
        </div>
      </div>

      {/* Question Text */}
      <div className="relative z-10 max-w-5xl w-full text-center">
        <h2 className="text-5xl md:text-6xl font-black leading-tight text-white drop-shadow-xl mb-12">
          {question.text}
        </h2>
      </div>

      {/* Options Grid */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-6 p-6 rounded-[24px] border-b-[8px] border-black/20 shadow-xl ${colors[idx]} text-white transform transition duration-500 hover:scale-[1.02]`}
          >
            <span className="text-5xl md:text-6xl font-bold opacity-80 drop-shadow-lg min-w-[60px] text-center">
              {shapes[idx]}
            </span>
            <span className="text-2xl md:text-3xl font-bold">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostQuestion;
