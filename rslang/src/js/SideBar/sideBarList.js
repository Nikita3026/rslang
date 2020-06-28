export default [
  { title: 'Home', link: '/', child: [] },
  { title: 'About', link: '/about', child: [] },
  {
    title: 'Games',
    link: '#pageSubmenu',
    child: [
      { title: 'SpeakIt', link: '/speakit', child: [] },
      { title: 'Sprint', link: '/sprint', child: [] },
    ],
  },
  { title: 'Portfolio', link: '/portfolio', child: [] },
  { title: 'Contacts', link: '/contacts', child: [] },
];
