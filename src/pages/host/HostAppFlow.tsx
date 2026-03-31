import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set, onValue, update } from 'firebase/database';
import { db } from '../../firebase';
import { defaultQuestions } from '../../questions';
import type { Room } from '../../types';
import HostLobby from './HostLobby';
import HostQuestion from './HostQuestion';
import HostResults from './HostResults';
import HostFinished from './HostFinished';

const HostAppFlow: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
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
    });

    // Write questions for this room
    const questionsRef = ref(db, `questions/${code}`);
    set(questionsRef, defaultQuestions);

    // Listen to room updates
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoomData(data);
      }
    });

    return () => {
      unsubscribe();
      // Optionally clean up room on unmount, but typically we let it persist or clean up via a separate cron
      // remove(roomRef);
      // remove(questionsRef);
    };
  }, []);

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
    const isLast = roomData.currentQuestion >= defaultQuestions.length - 1;

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
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-3xl">Создание комнаты...</div>;
  }

  const currentQ = defaultQuestions[roomData.currentQuestion];
  const players = roomData.players || {};
  const totalPlayers = Object.keys(players).length;

  // Calculate answers count for current question
  const currentAnswers = roomData.answers && roomData.answers[roomData.currentQuestion.toString()]
    ? roomData.answers[roomData.currentQuestion.toString()]
    : {};
  const answersCount = Object.keys(currentAnswers).length;

  return (
    <div className="min-h-screen bg-gray-900">
      {roomData.status === 'lobby' && (
        <HostLobby
          roomCode={roomCode}
          players={players}
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
          isLastQuestion={roomData.currentQuestion >= defaultQuestions.length - 1}
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
