import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import { questionPacks } from '../../questions';
import type { Room, QuestionPack } from '../../types';
import HostLobby from './HostLobby';
import HostQuestion from './HostQuestion';
import HostResults from './HostResults';
import HostFinished from './HostFinished';

const HostAppFlow: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [selectedPack, setSelectedPack] = useState<QuestionPack>(questionPacks[0]);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a 6-digit room code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setRoomCode(code);

    // Initialize room in Firebase
    const roomRef = ref(db, `rooms/${code}`);
    set(roomRef, {
      status: 'lobby',
      currentQuestion: 0,
      packName: selectedPack.name,
      totalQuestions: selectedPack.questions.length,
    });

    // Write default questions for this room
    const questionsRef = ref(db, `questions/${code}`);
    set(questionsRef, selectedPack.questions);

    // Listen to room updates
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoomData(data);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSelectPack = (pack: QuestionPack) => {
    if (!roomCode) return;
    setSelectedPack(pack);
    
    // Update room info
    update(ref(db, `rooms/${roomCode}`), {
      packName: pack.name,
      totalQuestions: pack.questions.length,
    });

    // Update questions
    set(ref(db, `questions/${roomCode}`), pack.questions);
  };

  const handleStartGame = () => {
    if (!roomCode) return;
    update(ref(db, `rooms/${roomCode}`), {
      status: 'question',
      questionStartedAt: Date.now(),
      currentQuestion: 0,
    });
  };

  const handleTimeUp = () => {
    if (!roomCode) return;
    update(ref(db, `rooms/${roomCode}`), {
      status: 'results',
    });
  };

  const handleNextQuestion = () => {
    if (!roomCode || !roomData) return;
    const isLast = roomData.currentQuestion >= selectedPack.questions.length - 1;

    if (isLast) {
      update(ref(db, `rooms/${roomCode}`), {
        status: 'finished',
      });
    } else {
      update(ref(db, `rooms/${roomCode}`), {
        status: 'question',
        currentQuestion: roomData.currentQuestion + 1,
        questionStartedAt: Date.now(),
      });
    }
  };

  if (!roomCode || !roomData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-950 text-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-xl font-medium text-slate-400">Создание комнаты...</div>
      </div>
    );
  }

  const currentQ = selectedPack.questions[roomData.currentQuestion];
  const players = roomData.players || {};
  const totalPlayers = Object.keys(players).length;

  const currentAnswers = roomData.answers && roomData.answers[roomData.currentQuestion.toString()]
    ? roomData.answers[roomData.currentQuestion.toString()]
    : {};
  const answersCount = Object.keys(currentAnswers).length;

  return (
    <div className="min-h-screen bg-slate-950">
      {roomData.status === 'lobby' && (
        <HostLobby
          roomCode={roomCode}
          players={players}
          selectedPackId={selectedPack.id}
          onSelectPack={handleSelectPack}
          onStartGame={handleStartGame}
        />
      )}
      {roomData.status === 'question' && (
        <HostQuestion
          question={currentQ}
          questionStartedAt={roomData.questionStartedAt || Date.now()}
          totalPlayers={totalPlayers}
          answersCount={answersCount}
          onTimeUp={handleTimeUp}
        />
      )}
      {roomData.status === 'results' && (
        <HostResults
          question={currentQ}
          answers={currentAnswers as Record<string, number>}
          totalPlayers={totalPlayers}
          onNext={handleNextQuestion}
          isLastQuestion={roomData.currentQuestion >= selectedPack.questions.length - 1}
        />
      )}
      {roomData.status === 'finished' && (
        <HostFinished
          players={players}
          onHome={() => navigate('/')}
        />
      )}
    </div>
  );
};

export default HostAppFlow;
