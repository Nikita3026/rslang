export default [
  {
    title: 'Главная', link: '/', child: [], icon: 'home',
  },
  {
    title: 'Мини-игры',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: '/speakit' },
      { title: 'English puzzle', link: '/englishpuzzle' },
      { title: 'Спринт', link: '/sprint' },
      { title: 'Саванна', link: '/savannah' },
      { title: 'Аудиовызов', link: '/audiocall' },
    ],
    icon: 'puzzle',
  },
  {
    title: 'Статистика', link: '/statistics', child: [], icon: 'statistics',
  },
  {
    title: 'Словарь', link: '/dictionary', child: [], icon: 'dictionary',
  },
  {
    title: 'Настройки', link: '/setting', child: [], icon: 'adjust',
  },
  {
    title: 'О команде', link: '/about', child: [], icon: 'info',
  },
  {
    title: 'Промо страница', link: '/promo', child: [], icon: 'promo',
  },
  {
    title: 'Выход', link: '/authorization', child: [], icon: 'logout',
  },
];
