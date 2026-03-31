import React, { useState } from 'react';
import { LogIn, User, Hash, Sparkles } from 'lucide-react';

interface JoinFormProps {
  initialCode: string;
  onJoin: (code: string, nickname: string) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ initialCode, onJoin }) => {
  const [code, setCode] = useState(initialCode);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !nickname) return;
    setLoading(true);
    await onJoin(code, nickname);
    setLoading(false);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15)_0%,transparent_70%)]"></div>

      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <div className="w-20 h-20 bg-indigo-600/20 rounded-3xl flex items-center justify-center mb-8 border border-indigo-500/30">
          <Sparkles className="text-indigo-400 w-10 h-10" />
        </div>

        <h1 className="text-4xl font-black text-center mb-2 tracking-tight text-white">Присоединиться</h1>
        <p className="text-slate-400 text-center mb-10 font-medium">Введите код комнаты и свой никнейм</p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-1">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Hash size={18} />
                </div>
                <input
                    type="text"
                    placeholder="КОД КОМНАТЫ"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-2xl py-4 pl-12 pr-4 text-white text-xl font-black tracking-[0.2em] placeholder:text-slate-700 placeholder:tracking-normal transition-all"
                    required
                />
            </div>
          </div>

          <div className="space-y-1">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <User size={18} />
                </div>
                <input
                    type="text"
                    placeholder="НИКНЕЙМ"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-2xl py-4 pl-12 pr-4 text-white text-xl font-bold placeholder:text-slate-700 transition-all"
                    required
                    maxLength={15}
                />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-black rounded-2xl shadow-xl shadow-indigo-900/40 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group mt-4 btn-premium overflow-hidden"
          >
            {loading ? (
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
                <>
                    <span>ИГРАТЬ</span>
                    <LogIn size={24} className="group-hover:translate-x-1 transition-transform" />
                </>
            )}
          </button>
        </form>

        <p className="mt-8 text-slate-600 text-xs font-bold uppercase tracking-widest text-center">Powered by QUIZ!</p>
      </div>
    </div>
  );
};

export default JoinForm;
