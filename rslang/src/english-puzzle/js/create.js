import createElement from './createElement';
import existRemove from './existRemove';
import getPhrase from './api.phrase';
import Game from './Game';

// Create all page with sign up, regisration

function createMainPage() {
  const mainPage = createElement('div', {
    classList: ['main-page'],
  });

  const mainPageNav = createElement('nav', {
    classList: ['main-page-nav'],
  });

  const wrapperLevel = createElement('div', {
    classList: ['wrapper-level'],
  });
  const labelLevel = createElement('label', {
    for: 'level',
    innerText: 'Level: ',
  });
  const selectLevel = createElement('select', {
    classList: ['select-level'],
    name: 'level',
    innerHTML: `
      <option value="0">1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
      <option value="4">5</option>
      <option value="5">6</option>
    `,
  });
  wrapperLevel.append(labelLevel, selectLevel);

  const wrapperLevelPage = createElement('div', {
    classList: ['wrapper-level-page'],
  });
  const labelLevelPage = createElement('label', {
    for: 'level-page',
    innerText: 'Page: ',
  });
  const selectLevelPage = createElement('select', {
    classList: ['select-level-page'],
    name: 'level-page',
  });
  // 30 elements for select (30 pages)
  for (let i = 0; i < 30; i += 1) {
    const option = createElement('option', {
      value: `${i}`,
      innerText: `${i + 1}`,
    });
    selectLevelPage.append(option);
  }
  selectLevel.onchange = () => {
    getPhrase(selectLevel.value, selectLevelPage.value)
      .then((nodes) => {
        new Game(nodes).prepareForMakePuzzle();
      });
  };
  selectLevelPage.onchange = () => {
    getPhrase(selectLevel.value, selectLevelPage.value)
      .then((nodes) => {
        new Game(nodes).prepareForMakePuzzle();
      });
  };
  wrapperLevelPage.append(labelLevelPage, selectLevelPage);

  const wrapperPrompt = createElement('div', {
    classList: ['wrapper-prompt'],
  });

  const audioPrompt = createElement('div', {
    classList: ['audio-prompt', 'prompt'],
    title: 'on / off audio',
  });
  audioPrompt.onclick = () => {
    if (audioPrompt.classList.contains('disabled')) {
      audioPrompt.classList.remove('disabled');
      document.querySelector('.pronunciation-audio').classList.remove('hide');
    } else {
      audioPrompt.classList.add('disabled');
      document.querySelector('.pronunciation-audio').classList.add('hide');
    }
  };

  const translatePrompt = createElement('div', {
    classList: ['translate-prompt', 'prompt'],
    title: 'on / off translate',
  });
  translatePrompt.onclick = () => {
    if (translatePrompt.classList.contains('disabled')) {
      translatePrompt.classList.remove('disabled');
      document.querySelector('.pronunciation-text').classList.remove('opacity-clear-zero');
    } else {
      translatePrompt.classList.add('disabled');
      document.querySelector('.pronunciation-text').classList.add('opacity-clear-zero');
    }
  };

  const volumePrompt = createElement('div', {
    classList: ['volume-prompt', 'prompt'],
    title: 'on / off volume',
  });
  volumePrompt.onclick = () => {
    if (volumePrompt.classList.contains('disabled')) {
      volumePrompt.classList.remove('disabled');
    } else {
      volumePrompt.classList.add('disabled');
    }
  };

  const imageCardPrompt = createElement('div', {
    classList: ['image-card-prompt', 'prompt'],
    title: 'on / off card',
  });
  imageCardPrompt.onclick = () => {
    const puzzleCards = document.querySelectorAll('.picked-word-game-puzzle');

    if (imageCardPrompt.classList.contains('disabled')) {
      imageCardPrompt.classList.remove('disabled');
      puzzleCards.forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle.replace('background: darkslategray;', '')}`);
      });
    } else {
      imageCardPrompt.classList.add('disabled');
      puzzleCards.forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: darkslategray;`);
      });
    }
  };

  const imageAllPrompt = createElement('div', {
    classList: ['image-all-prompt', 'prompt'],
    title: 'on / off puzzle translate',
  });
  imageAllPrompt.onclick = () => {
    const cellNests = document.querySelectorAll('.word-game-puzzle');

    if (imageAllPrompt.classList.contains('disabled')) {
      imageAllPrompt.classList.remove('disabled');
      [...cellNests].forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle.replace('background: #05ce70;', '')}`);
      });
    } else {
      imageAllPrompt.classList.add('disabled');
      [...cellNests].forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: #05ce70;`);
      });
    }
  };
  wrapperPrompt.append(audioPrompt, translatePrompt, volumePrompt, imageCardPrompt, imageAllPrompt);

  mainPageNav.append(wrapperLevel, wrapperLevelPage, wrapperPrompt);
  mainPage.append(mainPageNav);
  document.querySelector('.main__container').append(mainPage);

  const levelObj = window.localStorage.getItem('english-puzzle-levelObj');
  if (levelObj) {
    const obj = JSON.parse(levelObj);
    selectLevel.value = obj.level;
    selectLevelPage.value = obj.page;
  }

  getPhrase(selectLevel.value, selectLevelPage.value)
    .then((nodes) => {
      new Game(nodes).prepareForMakePuzzle();
    });
}

export function createStartPage() {
  existRemove('.sign-page');
  existRemove('.start-page');

  const startPage = createElement('div', {
    classList: ['start-page'],
  });

  const startPageTitle = createElement('h1', {
    classList: ['start-page__title'],
    innerText: 'ENGLISH PUZZLE',
  });
  const startPageText = createElement('p', {
    classList: ['start-page__text'],
    innerHTML: `Click on words, collect phrases.<br>
  Words can be drag and drop. Select tooltips in the menu.`,
  });
  const startPageButton = createElement('button', {
    classList: ['start-page__button', 'btn'],
    innerText: 'Start',
  });
  startPageButton.onclick = () => {
    startPage.remove();
    createMainPage();
  };
  startPage.append(startPageTitle, startPageText, startPageButton);
  document.querySelector('.main__container').append(startPage);
}

export {
  createMainPage,
};
