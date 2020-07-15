// Page of statitics and relationship buttons of page of statisctics

import createElement from './createElement';

export default (results) => {
  const pageStat = createElement('div', {
    classList: ['stat-page'],
  });

  const valueOfStat = createElement('botton', {
    classList: ['btn', 'game-button'],
    innerText: 'return',
  });

  const wrapperStat = createElement('div', {
    classList: ['stat-wrapper'],
  });

  valueOfStat.onclick = () => {
    pageStat.remove();
    document.querySelector('.results-page').classList.remove('hidden');
  };

  results.forEach((game) => {
    const div = createElement('div', {
      classList: ['game-statistics'],
      innerHTML: `${game}`,
    });
    wrapperStat.append(div);
  });

  pageStat.append(wrapperStat, valueOfStat);
  document.querySelector('body').append(pageStat);

};
