export default [
  {
    title: 'Главная', link: '/', child: [], icon: 'home',
  },
  {
    title: 'О команде', link: 'about.html', child: [], icon: 'info',
  },
  {
    title: 'Мини-игры',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: 'speakit.html' },
      { title: 'English puzzle', link: 'englishpuzzle.html' },
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
    title: 'Настройки', link: 'setting-page.html', child: [], icon: 'adjust',
  },
  {
    title: 'Выход', link: 'authorization.html', child: [], icon: 'logout',
  },
];
