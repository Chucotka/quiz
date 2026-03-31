import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Play } from 'lucide-react';
import type { Player } from '../../types';

interface HostLobbyProps {
  roomCode: string;
  players: Record<string, Player>;
  onStartGame: () => void;
}

const HostLobby: React.FC<HostLobbyProps> = ({ roomCode, players, onStartGame }) => {
  const joinUrl = `${window.location.origin}/join?code=${roomCode}`;
  const playerCount = Object.keys(players).length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center bg-gray-800 p-6 rounded-3xl shadow-2xl mb-12">
        <div className="flex flex-col">
          <span className="text-gray-400 text-2xl font-semibold mb-2">Присоединяйтесь на</span>
          <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {window.location.host}/join
          </span>
          <div className="flex items-center gap-6 mt-6">
            <span className="text-gray-400 text-3xl font-semibold">Код комнаты:</span>
            <span className="text-7xl font-black tracking-widest text-white px-6 py-2 bg-gray-900 rounded-2xl border-4 border-purple-500">
              {roomCode}
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-xl">
          <QRCodeSVG value={joinUrl} size={180} />
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Игроки ({playerCount})</h2>
        <button
          onClick={onStartGame}
          disabled={playerCount === 0}
          className={`flex items-center gap-3 px-8 py-4 text-2xl font-bold rounded-2xl shadow-lg transition transform ${
            playerCount > 0
              ? 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Play size={28} />
          Начать игру
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mt-4">
        {Object.values(players).map((player, idx) => (
          <div
            key={idx}
            className="px-6 py-3 bg-indigo-600 rounded-xl text-2xl font-semibold shadow-md animate-fade-in-up"
          >
            {player.nickname}
          </div>
        ))}
        {playerCount === 0 && (
          <div className="w-full text-center py-20 text-gray-500 text-2xl italic">
            Ожидание игроков...
          </div>
        )}
      </div>
    </div>
  );
};

export default HostLobby;
