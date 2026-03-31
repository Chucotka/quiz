import React, { useEffect, useState } from 'react';
import type { Question } from '../../types';

interface HostQuestionProps {
  question: Question;
  questionStartedAt: number;
  totalPlayers: number;
  answersCount: number;
  onTimeUp: () => void;
}

const colors = [
  'bg-red-500 border-red-700 text-white',
  'bg-blue-500 border-blue-700 text-white',
  'bg-yellow-500 border-yellow-700 text-black',
  'bg-green-500 border-green-700 text-white',
];

const shapes = ['▲', '◆', '●', '■'];

const HostQuestion: React.FC<HostQuestionProps> = ({
  question,
  questionStartedAt,
  totalPlayers,
  answersCount,
  onTimeUp
}) => {
  const [timeLeft, setTimeLeft] = useState(question.timeSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - questionStartedAt) / 1000;
      const remaining = Math.max(0, question.timeSeconds - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        onTimeUp();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [questionStartedAt, question.timeSeconds, onTimeUp]);

  useEffect(() => {
    if (totalPlayers > 0 && answersCount >= totalPlayers) {
      onTimeUp();
    }
  }, [answersCount, totalPlayers, onTimeUp]);

  const percentage = (timeLeft / question.timeSeconds) * 100;

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-6 justify-between">
      <div className="flex justify-between items-center text-3xl font-bold bg-gray-800 p-4 rounded-xl mb-4">
        <span>Ответов: {answersCount} / {totalPlayers}</span>
        <span className="text-5xl font-mono px-4 py-2 bg-gray-700 rounded-lg shadow-inner">
          {Math.ceil(timeLeft)}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 bg-gray-800 rounded-3xl shadow-2xl my-6 border-4 border-gray-700">
        <h1 className="text-5xl md:text-7xl font-extrabold text-center leading-tight">
          {question.text}
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-4 h-1/3 min-h-[250px]">
        {question.options.map((option, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-6 p-6 rounded-2xl shadow-xl border-b-8 transform transition ${colors[idx]} hover:scale-[1.02]`}
          >
            <span className="text-5xl opacity-80">{shapes[idx]}</span>
            <span className="text-4xl font-bold break-words">{option}</span>
          </div>
        ))}
      </div>

      <div className="w-full h-4 mt-6 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100 ease-linear"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HostQuestion;
