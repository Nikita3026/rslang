export default [
  {
    title: 'Главная', link: 'cardpage.html', child: [], icon: 'home',
  },
  {
    title: 'Мини-игры',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: 'speakit.html' },
      { title: 'English puzzle', link: 'english-puzzle.html' },
      { title: 'Спринт', link: 'sprint.html' },
      { title: 'Саванна', link: 'savannah.html' },
      { title: 'Аудиовызов', link: 'audiocall.html' },
    ],
    icon: 'puzzle',
  },
  {
    title: 'Статистика', link: 'statistics.html', child: [], icon: 'statistics',
  },
  {
    title: 'Словарь', link: 'dictionary.html', child: [], icon: 'dictionary',
  },
  {
    title: 'Настройки', link: 'setting.html', child: [], icon: 'adjust',
  },
  {
    title: 'О команде', link: 'about.html', child: [], icon: 'info',
  },
  {
    title: 'Промо страница', link: '/promo', child: [], icon: 'promo',
  },
  {
    title: 'Выход', link: '/authorization', child: [], icon: 'logout',
  },
];
