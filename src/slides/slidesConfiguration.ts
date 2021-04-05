import { SlideConfig } from 'src/types/config';

export const slidesConfiguration: SlideConfig[] = [
  {
    alias: 'leaders',
    title: 'Больше всего коммитов',
    emoji: '👑',
    valueText: (value: number) => `${value}`,
  },
  {
    alias: 'vote',
    title: 'Самый 🔎 внимательный разработчик',
    emoji: '🔎',
    valueText: (value: number) => {
      switch (value % 100) {
        case 11:
        case 12:
        case 13:
        case 14:
          return `${value} голосов`;
        default:
          break;
      }
      switch (value % 10) {
        case 1:
          return `${value} голос`;
        case 2:
        case 3:
        case 4:
          return `${value} голоса`;
        default:
          return `${value} голосов`;
      }
    },
  },
  {
    alias: 'chart',
    title: 'Коммиты',
    valueText: (value: number) => `${value}`,
  },
  {
    alias: 'diagram',
    title: 'Размер коммитов',
    totalText: (value: number) => `${value} коммита`,
    differenceText: (value: number) => `${value} с прошлого спринта`,
    categories: {
      extra: '> 1001 строки',
      max: '501 — 1000 строк',
      mid: '101 — 500 строк',
      min: '1 — 100 строк',
    },
    valueText: (commits: number) => {
      switch (Math.abs(commits) % 100) {
        case 11:
        case 12:
        case 13:
        case 14:
          return `${commits} коммитов`;
        default:
          break;
      }
      switch (Math.abs(commits) % 10) {
        case 1:
          return `${commits} коммит`;
        case 2:
        case 3:
        case 4:
          return `${commits} коммита`;
        default:
          return `${commits} коммитов`;
      }
    },
  },
  {
    alias: 'activity',
    title: 'Коммиты',
  },
];
