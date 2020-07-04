export default [
  {
    title: 'Home', link: '/', child: [], icon: 'home',
  },
  {
    title: 'About Us', link: '/about', child: [], icon: 'info',
  },
  {
    title: 'Games',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: '/speakit' },
      { title: 'Sprint', link: '/sprint' },
      { title: 'English puzzle', link: '/englishpuzzle' },
      { title: 'Savannah', link: '/savannah' },
      { title: 'AudioCall', link: '/audiocall' },
    ],
    icon: 'puzzle',
  },
  {
    title: 'Statistics', link: '/statistics', child: [], icon: 'statistics',
  },
  {
    title: 'Dictionary', link: '/dictionary', child: [], icon: 'dictionary',
  },
  {
    title: 'Settings', link: '/setting', child: [], icon: 'adjust',
  },
  {
    title: 'Exit', link: '/authorization', child: [], icon: 'logout',
  },
];
