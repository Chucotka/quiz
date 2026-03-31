import React, { useEffect, useState } from 'react';

interface PlayerQuestionProps {
  onAnswer: (index: 0 | 1 | 2 | 3, timeElapsed: number) => void;
  questionStartedAt: number;
}

const colors = ['bg-red-500 hover:bg-red-600', 'bg-blue-500 hover:bg-blue-600', 'bg-yellow-500 hover:bg-yellow-600', 'bg-green-500 hover:bg-green-600'];
const shapes = ['▲', '◆', '●', '■'];

const PlayerQuestion: React.FC<PlayerQuestionProps> = ({ onAnswer, questionStartedAt }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, [questionStartedAt]);

  const handleSelect = (idx: 0 | 1 | 2 | 3) => {
    if (disabled) return;
    setDisabled(true);
    const timeElapsed = (Date.now() - questionStartedAt) / 1000;
    onAnswer(idx, timeElapsed);
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-gray-900 overflow-hidden">
      <div className="grid grid-cols-2 grid-rows-2 h-full gap-2 p-2 sm:gap-4 sm:p-4">
        {[0, 1, 2, 3].map((idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => handleSelect(idx as 0 | 1 | 2 | 3)}
            className={`flex items-center justify-center w-full h-full rounded-2xl sm:rounded-3xl shadow-lg border-b-8 sm:border-b-[12px] border-black/30 transform transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${colors[idx]} text-white`}
            aria-label={`Answer option ${idx + 1}`}
          >
            <span className="text-[100px] sm:text-[150px] md:text-[200px] drop-shadow-2xl">
              {shapes[idx]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerQuestion;
