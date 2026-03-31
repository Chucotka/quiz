import React, { useEffect, useState } from 'react';

interface PlayerQuestionProps {
  onAnswer: (index: 0 | 1 | 2 | 3, timeElapsed: number) => void;
  questionStartedAt: number;
}

const colors = [
    'from-red-500 to-rose-600', 
    'from-blue-500 to-indigo-600', 
    'from-amber-400 to-yellow-500', 
    'from-emerald-500 to-green-600'
];
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
    <div className="flex flex-col h-[100dvh] bg-slate-950 overflow-hidden font-sans">
      <div className="grid grid-cols-2 h-full gap-3 p-3">
        {([0, 1, 2, 3] as const).map((idx) => (
          <button
            key={idx}
            disabled={disabled}
            onClick={() => handleSelect(idx)}
            className={`
              relative flex items-center justify-center rounded-[32px] 
              bg-gradient-to-br ${colors[idx]} text-white shadow-2xl
              border-b-[10px] border-black/30 transform transition-all 
              active:scale-95 active:border-b-[2px] active:translate-y-[8px]
              disabled:opacity-20 disabled:grayscale-[0.5] disabled:cursor-not-allowed
              group overflow-hidden
            `}
            aria-label={`Option ${idx + 1}`}
          >
            {/* Subtle inner gloss */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <span className="text-[120px] md:text-[180px] font-black drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110">
              {shapes[idx]}
            </span>

            {/* Tap effect indicator */}
            <div className="absolute bottom-4 text-xs font-black uppercase tracking-[0.2em] opacity-40 group-active:opacity-0 transition-opacity">
                Нажми
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlayerQuestion;
