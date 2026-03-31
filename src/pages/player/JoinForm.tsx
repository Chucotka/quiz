import React, { useState } from 'react';

interface JoinFormProps {
  initialCode: string;
  onJoin: (code: string, nickname: string) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ initialCode, onJoin }) => {
  const [code, setCode] = useState(initialCode);
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code && nickname) {
      onJoin(code, nickname);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-6 bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Вход в игру
        </h1>

        <input
          type="number"
          placeholder="Код комнаты"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-4 text-center text-3xl font-bold bg-gray-900 rounded-xl border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition"
          required
          maxLength={6}
        />

        <input
          type="text"
          placeholder="Ваш никнейм"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="w-full p-4 text-center text-2xl font-semibold bg-gray-900 rounded-xl border-2 border-gray-600 focus:border-green-500 focus:outline-none transition"
          required
          maxLength={15}
        />

        <button
          type="submit"
          disabled={!code || !nickname}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 text-2xl font-bold rounded-2xl shadow-lg transform transition active:scale-95 mt-4"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default JoinForm;
