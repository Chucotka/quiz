import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Play, Users, BookOpen, ChevronRight } from 'lucide-react';
import { questionPacks } from '../../questions';
import type { Player, QuestionPack } from '../../types';

interface HostLobbyProps {
  roomCode: string;
  players: Record<string, Player>;
  selectedPackId: string;
  onSelectPack: (pack: QuestionPack) => void;
  onStartGame: () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({ roomCode, players, selectedPackId, onSelectPack, onStartGame }) => {
  const joinUrl = `${window.location.origin}/join?code=${roomCode}`;
  const playerCount = Object.keys(players).length;

  return (
    <div className="relative min-h-screen flex flex-col p-6 md:p-12 overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Room Info & Players */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card rounded-[32px] p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2">Присоединяйтесь к игре</p>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                  {window.location.host.split(':')[0]}<span className="text-indigo-500">/join</span>
                </h1>
                <div className="inline-flex flex-col bg-slate-900/50 border border-white/10 rounded-2xl p-4">
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-tighter mb-1">Код комнаты</p>
                  <p className="text-6xl md:text-7xl font-black tracking-[0.2em] text-white">
                    {roomCode}
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] shrink-0">
                <QRCodeSVG value={joinUrl} size={160} />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[32px] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Users size={24} />
                </div>
                <h2 className="text-2xl font-bold">Игроки <span className="text-slate-500 ml-1">({playerCount})</span></h2>
              </div>
              
              <button
                onClick={onStartGame}
                disabled={playerCount === 0}
                className="group flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 text-lg font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
              >
                <span>Начать игру</span>
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {Object.values(players).map((player, idx) => (
                <div
                  key={idx}
                  className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl text-lg font-semibold text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {player.nickname}
                </div>
              ))}
              {playerCount === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-500 italic border-2 border-dashed border-white/5 rounded-3xl">
                  <p>Ожидание первых игроков...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pack Selection */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3 px-2">
            <BookOpen size={20} className="text-indigo-400" />
            <h3 className="text-xl font-bold">Выберите тему</h3>
          </div>
          
          <div className="space-y-4">
            {questionPacks.map((pack) => (
              <button
                key={pack.id}
                onClick={() => onSelectPack(pack)}
                className={`w-full text-left p-5 rounded-[24px] border transition-all duration-300 group ${
                  selectedPackId === pack.id
                    ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-900/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className={`font-bold text-lg ${selectedPackId === pack.id ? 'text-white' : 'text-slate-200'}`}>
                    {pack.name}
                  </p>
                  {selectedPackId === pack.id && (
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                    </div>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${selectedPackId === pack.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                  {pack.description}
                </p>
                <div className={`mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider ${
                  selectedPackId === pack.id ? 'text-indigo-200' : 'text-indigo-400'
                }`}>
                  {pack.questions.length} вопросов
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostLobby;
