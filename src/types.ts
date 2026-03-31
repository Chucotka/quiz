export type GameStatus = 'lobby' | 'question' | 'results' | 'finished';

export interface Player {
  nickname: string;
  score: number;
}

export interface Answer {
  [playerId: string]: 0 | 1 | 2 | 3; // answer index
}

export interface Room {
  status: GameStatus;
  currentQuestion: number;
  questionStartedAt?: number;
  packName?: string; // name of the selected question pack
  totalQuestions?: number;
  players?: Record<string, Player>;
  answers?: Record<string, Answer>; // key is question index as string
}

export interface Question {
  text: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  timeSeconds: number;
}

export interface QuestionPack {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}
