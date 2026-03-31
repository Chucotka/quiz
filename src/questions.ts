import type { Question } from './types';

export const defaultQuestions: Question[] = [
  {
    text: 'Сколько планет в Солнечной системе?',
    options: ['7', '8', '9', '10'],
    correctIndex: 1,
    timeSeconds: 20,
  },
  {
    text: 'Какой химический элемент обозначается буквой "O"?',
    options: ['Золото', 'Осмий', 'Олово', 'Кислород'],
    correctIndex: 3,
    timeSeconds: 20,
  },
  {
    text: 'Кто написал роман "Преступление и наказание"?',
    options: ['Лев Толстой', 'Федор Достоевский', 'Александр Пушкин', 'Антон Чехов'],
    correctIndex: 1,
    timeSeconds: 20,
  },
  {
    text: 'Какая самая большая планета в нашей Солнечной системе?',
    options: ['Земля', 'Марс', 'Юпитер', 'Сатурн'],
    correctIndex: 2,
    timeSeconds: 20,
  },
  {
    text: 'Какой океан самый большой?',
    options: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'],
    correctIndex: 2,
    timeSeconds: 20,
  },
  {
    text: 'В каком году человек впервые полетел в космос?',
    options: ['1957', '1961', '1965', '1969'],
    correctIndex: 1,
    timeSeconds: 20,
  },
  {
    text: 'Как называется столица Австралии?',
    options: ['Сидней', 'Мельбурн', 'Канберра', 'Брисбен'],
    correctIndex: 2,
    timeSeconds: 20,
  },
  {
    text: 'Сколько цветов в радуге?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
    timeSeconds: 20,
  },
  {
    text: 'Какое животное является самым быстрым на земле?',
    options: ['Лев', 'Гепард', 'Лошадь', 'Антилопа'],
    correctIndex: 1,
    timeSeconds: 20,
  },
  {
    text: 'Какая страна производит больше всего кофе в мире?',
    options: ['Колумбия', 'Вьетнам', 'Бразилия', 'Эфиопия'],
    correctIndex: 2,
    timeSeconds: 20,
  },
];
