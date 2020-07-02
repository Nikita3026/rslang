import constants from './constants';
import setNewWords from './setWords';
import buildStatistic from './build-statistic';
import checkMute from './check-mute';

localStorage.setItem('learningWordsForSavannahGame', localStorage.learningWords);
localStorage.setItem('shortTermStatisticSavannah', JSON.stringify({
  guessedWords: [],
  unspokenWords: [],
}));

if (localStorage.savannahPage === undefined) {
  localStorage.savannahPage = 0;
  localStorage.savannahLevel = 0;
  localStorage.savannahNumberOfWord = 0;
}

const increaseLevel = () => {
  if (localStorage.savannahNumberOfWord === constants.MAX_WORD_NUMBER) {
    localStorage.savannahNumberOfWord = 0;
    if (localStorage.savannahLevel === constants.MAX_LEVEL) {
      localStorage.savannahLevel = 0;
      if (localStorage.savannahPage === constants.MAX_PAGE) {
        localStorage.savannahPage = 0;
      } else {
        localStorage.savannahPage += 1;
      }
    } else {
      localStorage.savannahLevel += 1;
    }
  } else {
    localStorage.savannahNumberOfWord += 1;
  }
};

const startLoweringNewWord = async () => {
  await setNewWords();
  constants.ANSWER_OPTIONS.hidden = false;
  increaseLevel();
  constants.MAIN_WORD.classList.remove('not-guessed');
  constants.STEAM_INNER.classList.add('hide-steam');
  constants.STEAM.classList.remove('steam-rise-animation');
  constants.STEAM_INNER.classList.remove('steam-up-animation');
  constants.MAIN_WORD.classList.add('main-word-animation');
};

startLoweringNewWord();

const reduceNumberOfLives = () => {
  const currentLive = document.querySelector('.fa-heart');
  currentLive.classList.remove('fa-heart');
  currentLive.classList.add('fa-heart-broken');
  currentLive.classList.add('broken');
};

const wrongAnswer = () => {
  let isItNeedToHighlightRightWord = true;
  constants.MAIN_WORD.classList.remove('main-word-animation');
  constants.MAIN_WORD.classList.add('not-guessed');
  constants.POSSIBLE_ANSWERS_CONTAINER.forEach((item) => {
    if (item.classList.contains('highlight-right-word')) {
      isItNeedToHighlightRightWord = false;
    }
  });
  if (isItNeedToHighlightRightWord) {
    const mainWord = JSON.parse(localStorage.currentMainWordOfSavannahGame);
    constants.POSSIBLE_ANSWERS.forEach((item) => {
      if (item.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
        item.closest('.possible-answer').classList.add('highlight-right-choosen-word');
        setTimeout(() => {
          item.closest('.possible-answer').classList.remove('highlight-right-choosen-word');
        }, 1500);
      }
    });
  }
  const tempStatisticObject = JSON.parse(localStorage.shortTermStatisticSavannah);
  tempStatisticObject.unspokenWords.push(JSON.parse(localStorage.currentMainWordOfSavannahGame));
  localStorage.setItem('shortTermStatisticSavannah', JSON.stringify(tempStatisticObject));
  constants.STEAM.classList.add('steam-rise-animation');
  constants.STEAM_INNER.classList.add('steam-up-animation');
  constants.STEAM_INNER.classList.remove('hide-steam');
  if (!checkMute()) {
    constants.WRONG_ANSWER_SOUND.play();
  }
  reduceNumberOfLives();
};

constants.MAIN_WORD.addEventListener('animationend', () => {
  wrongAnswer();
});

const setStatistic = async () => {
  await buildStatistic();
  setTimeout(() => {
    constants.MAIN_PAGE.hidden = true;
    constants.RESULT_PAGE.hidden = false;
  }, 1000);
};

constants.STEAM_INNER.addEventListener('animationend', async () => {
  constants.STEAM_INNER.classList.add('hide-steam');
  if (document.querySelectorAll('.fa-heart-broken').length === 5) {
    if (!checkMute()) {
      constants.END_GAME_SOUND.play();
    }
    await setStatistic();
  } else {
    setTimeout(() => {
      startLoweringNewWord();
    }, 250);
  }
});

const correctAnswer = async () => {
  constants.MAIN_WORD.classList.remove('main-word-animation');
  constants.WATER_IMAGE.classList.add('water-animation');
  constants.WATER_IMAGE.hidden = false;
  /*  const tempStatisticObject = ; */
  const { guessedWords } = JSON.parse(localStorage.shortTermStatisticSavannah);
  const { unspokenWords } = JSON.parse(localStorage.shortTermStatisticSavannah);
  guessedWords.push(JSON.parse(localStorage.currentMainWordOfSavannahGame));
  localStorage.setItem('shortTermStatisticSavannah',
    JSON.stringify(JSON.parse(localStorage.shortTermStatisticSavannah)));
  if (!checkMute()) {
    constants.RIGHT_ANSWER_SOUND.play();
  }
  let strikSound;
  if (guessedWords.length % 3 === 0) {
    strikSound = setTimeout(() => {
      const computedStyleOfGlass = getComputedStyle(constants.GLASS);
      if (!checkMute()) constants.STRIK_SOUND.play();
      constants.GLASS.style.width = `${+(computedStyleOfGlass.width.slice(0, -2)) + 4}px`;
      constants.GLASS.style.height = `${+(computedStyleOfGlass.height.slice(0, -2)) + 4}px`;
    }, 500);
  }
  const numberOfWordsPlayed = guessedWords.length + unspokenWords.length;
  if (numberOfWordsPlayed >= 30) {
    clearTimeout(strikSound);
    await setStatistic();
  }
};

constants.ANSWER_OPTIONS.addEventListener('click', ({ target }) => {
  let realTarget;
  if (target.classList.contains('number-of-answer')) {
    realTarget = target.nextSibling;
  } else if (target.classList.contains('possible-answer')) {
    realTarget = target.lastChild;
  } else {
    realTarget = target;
  }
  const mainWord = JSON.parse(localStorage.currentMainWordOfSavannahGame);
  if (constants.MAIN_WORD.classList.contains('main-word-animation')) {
    if (realTarget.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
      if (!constants.MAIN_WORD.classList.contains('not-guessed')) {
        target.closest('.possible-answer').classList.add('highlight-right-choosen-word');
        setTimeout(() => {
          target.closest('.possible-answer').classList.remove('highlight-right-choosen-word');
        }, 1500);
        correctAnswer();
      }
    } else {
      target.closest('.possible-answer').classList.add('highlight-wrong-word');
      constants.POSSIBLE_ANSWERS.forEach((item) => {
        if (item.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
          item.closest('.possible-answer').classList.add('highlight-right-word');
          setTimeout(() => {
            target.closest('.possible-answer').classList.remove('highlight-wrong-word');
            item.closest('.possible-answer').classList.remove('highlight-right-word');
          }, 1500);
        }
      });
      wrongAnswer();
    }
  }
});

constants.WATER_IMAGE.addEventListener('animationend', () => {
  constants.WATER_IMAGE.classList.remove('water-animation');
  constants.WATER_IMAGE.hidden = true;
  setTimeout(() => {
    startLoweringNewWord();
  }, 250);
});

document.addEventListener('keydown', (event) => {
  if (event.key === '1'
        || event.key === '2'
        || event.key === '3'
        || event.key === '4') {
    constants.POSSIBLE_ANSWERS_CONTAINER[event.key - 1].dispatchEvent(new Event('click', {
      bubbles: true,
    }));
  }
});

constants.RESULT_INNER.addEventListener('click', ({ target }) => {
  if (target.classList.contains('fa-bullhorn')) {
    setTimeout(constants.allResultPronunciation[target.id].play(), 1000);
  }
});
