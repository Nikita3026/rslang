export default [
  {
    title: 'Home', link: '/', child: [], icon: 'home',
  },
  {
    title: 'About', link: '/about', child: [], icon: 'info',
  },
  {
    title: 'Games',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: '/speakit' },
      { title: 'Sprint', link: '/sprint' },
    ],
    icon: 'puzzle',
  },
  {
    title: 'Portfolio', link: '/portfolio', child: [], icon: 'home',
  },
  {
    title: 'Settings', link: '#settings', child: [], icon: 'adjust',
  },
  {
    title: 'LogOut', link: '/authorization', child: [], icon: 'logout',
  },
];
