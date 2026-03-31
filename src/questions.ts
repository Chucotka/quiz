import type { Question } from './types';
import { questionPacks } from './data/questionPacks';

export { questionPacks };

export const defaultQuestions: Question[] = [
  ...questionPacks[0].questions
];
