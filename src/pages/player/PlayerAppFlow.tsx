import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ref, onValue, update, get } from 'firebase/database';
import { db } from '../../firebase';
import type { Room } from '../../types';
import JoinForm from './JoinForm';
import PlayerLobby from './PlayerLobby';
import PlayerQuestion from './PlayerQuestion';
import PlayerAnswered from './PlayerAnswered';
import PlayerResults from './PlayerResults';
import PlayerFinished from './PlayerFinished';

const PlayerAppFlow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCode = searchParams.get('code') || '';
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
  const [roomData, setRoomData] = useState<Room | null>(null);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [lastPointsEarned, setLastPointsEarned] = useState(0);

  useEffect(() => {
    if (!roomCode) return;

    const roomRef = ref(db, `rooms/${roomCode}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRoomData(data);

        // Reset answer state when a new question starts
        if (data.status === 'question' && roomData?.status !== 'question') {
          setHasAnsweredCurrent(false);
          setLastPointsEarned(0);
        }
      } else {
        // Room closed or deleted
        alert('Комната не найдена или игра завершена.');
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [roomCode, navigate, roomData?.status]);

  const handleJoin = async (code: string, nickname: string) => {
    const roomRef = ref(db, `rooms/${code}`);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      alert('Комната не найдена!');
      return;
    }

    const room = snapshot.val() as Room;
    if (room.status !== 'lobby') {
      alert('Игра уже началась!');
      return;
    }

    const newPlayerId = `player_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await update(ref(db, `rooms/${code}/players/${newPlayerId}`), {
      nickname,
      score: 0,
    });

    setRoomCode(code);
    setPlayerId(newPlayerId);
  };

  const handleAnswer = async (answerIndex: 0 | 1 | 2 | 3, timeElapsed: number) => {
    if (!roomCode || !playerId || !roomData) return;

    setHasAnsweredCurrent(true);

    // Save the answer
    const answerRef = ref(db, `rooms/${roomCode}/answers/${roomData.currentQuestion}`);
    await update(answerRef, {
      [playerId]: answerIndex,
    });

    // Calculate score locally
    const questionRef = ref(db, `questions/${roomCode}/${roomData.currentQuestion}`);
    const qSnapshot = await get(questionRef);

    if (qSnapshot.exists()) {
      const question = qSnapshot.val();
      let points = 0;

      if (answerIndex === question.correctIndex) {
        const MAX_POINTS = 1000;
        const totalTime = question.timeSeconds;
        const remainingTime = Math.max(0, totalTime - timeElapsed);
        points = Math.round(MAX_POINTS * (remainingTime / totalTime));
      }

      setLastPointsEarned(points);

      // Get the latest score from Firebase before updating
      const playerRef = ref(db, `rooms/${roomCode}/players/${playerId}`);
      const playerSnapshot = await get(playerRef);
      if (playerSnapshot.exists()) {
        const playerData = playerSnapshot.val();
        const currentScore = playerData.score || 0;
        await update(playerRef, {
          score: currentScore + points,
        });
      }
    }
  };

  if (!roomCode || !playerId) {
    return <JoinForm initialCode={initialCode} onJoin={handleJoin} />;
  }

  if (!roomData) return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Загрузка...</div>;

  const getRankAndScore = () => {
    const players = roomData.players || {};
    const sorted = Object.entries(players).sort(([, a], [, b]) => b.score - a.score);
    const rank = sorted.findIndex(([id]) => id === playerId) + 1;
    const score = players[playerId]?.score || 0;
    return { rank, score, total: sorted.length };
  };

  const { rank, score, total } = getRankAndScore();

  return (
    <div className="min-h-screen bg-gray-900">
      {roomData.status === 'lobby' && <PlayerLobby />}
      {roomData.status === 'question' && !hasAnsweredCurrent && (
        <PlayerQuestion
          onAnswer={handleAnswer}
          questionStartedAt={roomData.questionStartedAt || Date.now()}
        />
      )}
      {roomData.status === 'question' && hasAnsweredCurrent && (
        <PlayerAnswered />
      )}
      {roomData.status === 'results' && (
        <PlayerResults
          score={score}
          rank={rank}
          pointsEarned={lastPointsEarned}
          isCorrect={lastPointsEarned > 0}
          totalPlayers={total}
        />
      )}
      {roomData.status === 'finished' && (
        <PlayerFinished
          score={score}
          rank={rank}
          totalPlayers={total}
        />
      )}
    </div>
  );
};

export default PlayerAppFlow;
