import type { Question } from '../types';

export interface QuestionPack {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export const questionPacks: QuestionPack[] = [
  {
    id: 'general',
    name: 'Общие знания',
    description: 'Разнообразные вопросы обо всем на свете.',
    questions: [
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
        text: 'В каком году человек впервые полетел в космос?',
        options: ['1957', '1961', '1965', '1969'],
        correctIndex: 1,
        timeSeconds: 20,
      },
      {
        text: 'Сколько цветов в радуге?',
        options: ['5', '6', '7', '8'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'Какой океа самый большой?',
        options: ['Атлантический', 'Индийский', 'Тихий', 'Северный Ледовитый'],
        correctIndex: 2,
        timeSeconds: 20,
      },
    ],
  },
  {
    id: 'movies',
    name: 'Кино и Сериалы',
    description: 'Вопросы для настоящих киноманов.',
    questions: [
      {
        text: 'Кто сыграл Железного человека в киновселенной Marvel?',
        options: ['Крис Эванс', 'Роберт Дауни-мл.', 'Крис Хемсворт', 'Марк Руффало'],
        correctIndex: 1,
        timeSeconds: 20,
      },
      {
        text: 'Как называется вымышленный город, в котором живет Бэтмен?',
        options: ['Метрополис', 'Готэм-Сити', 'Стар-Сити', 'Централ-Сити'],
        correctIndex: 1,
        timeSeconds: 20,
      },
      {
        text: 'Какой фильм получил Оскар как "Лучший фильм" в 2020 году?',
        options: ['1917', 'Джокер', 'Паразиты', 'Однажды в Голливуде'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'Как зовут главного героя сериала "Во все тяжкие"?',
        options: ['Джесси Пинкман', 'Сол Гудман', 'Уолтер Уайт', 'Хэнк Шрейдер'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'Сколько сезонов в сериале "Игра престолов"?',
        options: ['6', '7', '8', '9'],
        correctIndex: 2,
        timeSeconds: 20,
      },
    ],
  },
  {
    id: 'history',
    name: 'История',
    description: 'Древний мир и современность.',
    questions: [
      {
        text: 'Кто был первым президентом США?',
        options: ['Томас Джефферсон', 'Авраам Линкольн', 'Джордж Вашингтон', 'Бенджамин Франклин'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'В каком году закончилась Вторая мировая война?',
        options: ['1943', '1944', '1945', '1946'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'Как называлась столица Византийской империи?',
        options: ['Рим', 'Афины', 'Константинополь', 'Александрия'],
        correctIndex: 2,
        timeSeconds: 20,
      },
      {
        text: 'Кто открыл Америку в 1492 году?',
        options: ['Васко да Гама', 'Христофор Колумб', 'Фернан Магеллан', 'Америго Веспуччи'],
        correctIndex: 1,
        timeSeconds: 20,
      },
      {
        text: 'Какое событие произошло в 1789 году во Франции?',
        options: ['Битва при Ватерлоо', 'Взятие Бастилии', 'Коронация Наполеона', 'Подписание Версальского договора'],
        correctIndex: 1,
        timeSeconds: 20,
      },
    ],
  },
];
