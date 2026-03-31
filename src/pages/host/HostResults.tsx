import React from 'react';
import { ChevronRight } from 'lucide-react';
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
  onNext,
  isLastQuestion
}) => {
  const counts = [0, 0, 0, 0];
  Object.values(answers || {}).forEach(ans => {
    if (ans >= 0 && ans < 4) counts[ans]++;
  });

  const maxCount = Math.max(...counts, 1);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-8 overflow-hidden">
      <div className="flex justify-between items-center mb-8 bg-gray-800 p-6 rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold max-w-4xl truncate">{question.text}</h1>
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95 whitespace-nowrap"
        >
          {isLastQuestion ? 'Завершить игру' : 'Следующий вопрос'}
          <ChevronRight size={32} />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-end pb-12">
        <div className="flex justify-center items-end gap-12 h-[50vh]">
          {counts.map((count, idx) => {
            const isCorrect = idx === question.correctIndex;
            const heightPercent = Math.max((count / maxCount) * 100, 5);

            return (
              <div key={idx} className="flex flex-col items-center gap-4 w-40 group">
                <span className="text-5xl font-bold text-gray-300 group-hover:text-white transition-colors">
                  {count}
                </span>
                <div
                  className={`w-full rounded-t-xl transition-all duration-1000 ease-out relative shadow-2xl ${
                    isCorrect ? colors[idx] : 'bg-gray-600'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {isCorrect && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl">
                      ✅
                    </div>
                  )}
                </div>
                <div
                  className={`w-full h-16 rounded-b-xl flex items-center justify-center text-3xl font-bold shadow-lg ${
                    isCorrect ? colors[idx] : 'bg-gray-700'
                  }`}
                >
                  {shapes[idx]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HostResults;
