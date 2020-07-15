import createElement from './createElement';
import createPuzzle from './createPuzzle';
import getLevelImage from '../assets/data_paintings/getLevel';
import getPhrase from './api.phrase';
import statiscicsGame from './statisticsGame';
import getTimeDate from './getDateTime';

import existRemove from './existRemove';
import translate from './api.translate';
import storage from './storage';

const URL_MATERIALS = 'https://raw.githubusercontent.com/Nikita3026/rslang-data/master/';

export default class Game {
  constructor(data) {
    this.data = data;

    this.level = data[0].group;
    this.page = data[0].page;
    // TO DO: error on windows on s
    this.nextLevel = this.page === 29 ? (this.level + 1) % 6 : this.level;
    this.nextPage = (this.page + 1) % 30;

    this.levelImages = getLevelImage(this.level);
    this.pageImage = this.levelImages[this.page];
    const sentences = [];
    data.sort(() => Math.random() - 0.5);
    data.forEach((value) => {
      const sentenceNode = {};
      const sentenceText = value.textExample.replace(/<b>|<\/b>/g, '');
      const sentence = sentenceText.split(' ');
      if (sentence.length < 11 && sentences.length < 10) {
        const path = `${URL_MATERIALS}${value.audioExample}`;

        sentenceNode.sentenceText = sentenceText;
        sentenceNode.words = sentence;
        sentenceNode.path = path;
        sentenceNode.audio = new Audio(path);
        sentenceNode.audio.onended = () => {
          document.querySelector('.pronunciation-audio').classList.remove('wave');
        };
        sentenceNode.sentenceAudio = value.audioExample;
        sentences.push(sentenceNode);
      }
    });
    this.sentences = sentences;
  }

  async runGame(sentenceNumber) {
    this.sentenceNumber = sentenceNumber;
    const game = document.querySelector('.wrapper-game');
    const nav = document.querySelector('.main-page-nav');
    const assembledGamePuzzle = document.querySelector('.wrapper-assembled-game-puzzle');
    const text = await translate(this.sentences[sentenceNumber].sentenceText);

    existRemove('.wrapper-auto-pronunciation');
    existRemove('.wrapper-game-round');
    [...assembledGamePuzzle.children].forEach((sentence) => {
      sentence.classList.remove('opacity-full', 'event-none-opacity-full');
    });

    const wrapperAutoPronunciation = createElement('div', {
      classList: ['wrapper-auto-pronunciation'],
    });
    const pronunciationAudio = createElement('div', {
      classList: ['pronunciation-audio', 'prompt'],
      title: 'pronunciation audio',
    });
    pronunciationAudio.onclick = () => {
      this.sentences[sentenceNumber].audio.play();
      pronunciationAudio.classList.add('wave');
    };
    const isDisabledAudio = document.querySelector('.audio-prompt').classList.contains('disabled');
    if (isDisabledAudio) {
      pronunciationAudio.classList.add('opacity-clear-zero');
    }

    const pronunciationText = createElement('div', {
      classList: ['pronunciation-text'],
      title: 'pronunciation text',
      innerText: `${text}`,
    });
    const isDisabledText = document.querySelector('.translate-prompt').classList.contains('disabled');
    if (isDisabledText) {
      pronunciationText.classList.add('opacity-clear-zero');
    }

    wrapperAutoPronunciation.append(pronunciationAudio, pronunciationText);
    nav.after(wrapperAutoPronunciation);

    const wrapperGameRound = createElement('div', {
      classList: ['wrapper-game-round'],
    });
    const gameRoundWords = createElement('div', {
      classList: ['game-round-words'],
    });
    const gameRoundControls = createElement('div', {
      classList: ['game-round-controls'],
    });

    const dontKnowBotton = createElement('botton', {
      classList: ['btn', 'game-button', 'dont-know-botton'],
      innerText: 'I don\'t know',
    });
    const checkBotton = createElement('botton', {
      classList: ['btn', 'game-button', 'check-botton', 'hidden'],
      innerText: 'Check',
    });
    const continueBotton = createElement('botton', {
      classList: ['btn', 'game-button', 'continue-botton', 'hidden'],
      innerText: 'Continue',
    });
    const resultsBotton = createElement('botton', {
      classList: ['btn', 'game-button', 'results-botton', 'hidden'],
      innerText: 'Results',
    });

    dontKnowBotton.onclick = () => {
      const isDisabled = document.querySelector('.volume-prompt').classList.contains('disabled');
      if (!isDisabled) {
        this.sentences[sentenceNumber].audio.play();
        pronunciationAudio.classList.add('wave');
      }
      const currentSentence = assembledGamePuzzle.children[sentenceNumber];
      currentSentence.setAttribute('data-is-correct', false);
      currentSentence.classList.remove('opacity-full');
      currentSentence.classList.add('event-none-opacity-full');
      [...currentSentence.children].forEach((nest) => {
        if (nest.children.length) {
          gameRoundWords.append(nest.children[0]);
        }
      });
      [...currentSentence.children].forEach((nest) => {
        const key = nest.getAttribute('data-key-word');
        const wordPuzzle = [...gameRoundWords.children]
          .find((node) => node.getAttribute('data-key-word') === key);
        wordPuzzle.classList.add('absolute');
        wordPuzzle.style.left = '0px';
        wordPuzzle.style.top = '0px';
        nest.append(wordPuzzle);
      });
      checkBotton.classList.add('hidden');
      dontKnowBotton.classList.add('hidden');
      continueBotton.classList.remove('hidden');
    };
    checkBotton.onclick = () => {
      let countCorrectSentence = 0;
      const currentSentence = assembledGamePuzzle.children[sentenceNumber];
      const lengthSentence = currentSentence.children.length;
      [...currentSentence.children].forEach((puzzle) => {
        const keyNest = puzzle.getAttribute('data-key-word');
        const keyPuzzle = puzzle.children[0].getAttribute('data-key-word');
        puzzle.children[0].classList.remove('correct-word', 'incorrect-word');
        if (keyNest === keyPuzzle) {
          countCorrectSentence += 1;
          puzzle.children[0].classList.add('correct-word');
        } else {
          puzzle.children[0].classList.add('incorrect-word');
        }
      });
      const isCorrectSentence = countCorrectSentence === lengthSentence;
      currentSentence.setAttribute('data-is-correct', `${isCorrectSentence}`);
      if (isCorrectSentence) {
        const isDisabled = document.querySelector('.volume-prompt').classList.contains('disabled');
        if (!isDisabled) {
          this.sentences[sentenceNumber].audio.play();
          pronunciationAudio.classList.add('wave');
        }
        checkBotton.classList.add('hidden');
        continueBotton.classList.remove('hidden');
      } else {
        dontKnowBotton.classList.remove('hidden');
      }
    };
    continueBotton.onclick = () => {
      if (this.sentenceNumber < 9) {
        this.runGame(this.sentenceNumber + 1);
      } else if (this.sentenceNumber === 9) {
        const currentGame = this.statisticsСollection();
        storage(currentGame.innerHTML, { level: this.level, page: this.page });
        resultsBotton.classList.remove('hidden');
        const wrapperGame = document.querySelector('.wrapper-game');
        const imageSentencesGame = createElement('img', {
          classList: ['image-sentences-game'],
          src: `assets/images/englishPuzzle/data_paintings/${this.pageImage.imageSrc}`,
        }, {
          zIndex: 50,
          position: 'absolute',
        });
        wrapperGame.append(imageSentencesGame);
        this.sentenceNumber += 1;
      } else {
        existRemove('.results-page');
        document.querySelector('.main-page').classList.remove('hidden');
        document.querySelector('.select-level').value = this.nextLevel;
        document.querySelector('.select-level-page').value = this.nextPage;
        getPhrase(this.nextLevel, this.nextPage)
          .then((nodes) => {
            new Game(nodes).prepareForMakePuzzle();
          });
      }
    };
    resultsBotton.onclick = () => {
      existRemove('.results-page');
      document.querySelector('.main-page').classList.add('hidden');

      const resultsPage = createElement('div', {
        classList: ['results-page'],
      });

      const wrapperResults = createElement('div', {
        classList: ['wrapper-results'],
      });

      const wrapperResultsImage = createElement('div', {
        classList: ['wrapper-results-image'],
      });
      const resultImage = createElement('img', {
        classList: ['result-image'],
        src: `assets/images/englishPuzzle/data_paintings/${this.pageImage.imageSrc}`,
      }, {
        width: '300px',
      });
      const resultAuthor = createElement('h4', {
        innerText: `${this.pageImage.author}`,
      }, {
        color: 'darkslategray',
      });
      const resultNameImage = createElement('h4', {
        innerText: `${this.pageImage.name}(${this.pageImage.year})`,
      }, {
        color: 'darkslategray',
      });
      wrapperResultsImage.append(resultImage, resultAuthor, resultNameImage);

      const wrapperResSentences = createElement('div', {
        classList: ['wrapper-results-sentences'],
      });
      const resultKnow = createElement('div', {
        classList: ['result-know'],
      });
      const resultDontKnow = createElement('div', {
        classList: ['result-dont-know'],
      });
      wrapperResSentences.append(resultKnow, resultDontKnow);

      [...assembledGamePuzzle.children].forEach((sentence, index) => {
        const wrapperResult = createElement('div', {
          classList: ['wrapper-result'],
          'data-result-number-sentence': index,
        });
        const resultAudio = createElement('div', {
          classList: ['result-audio'],
        });
        resultAudio.onclick = () => {
          this.sentences[index].audio.play();
        };
        const resultSentence = createElement('div', {
          classList: ['result-sentence'],
          innerText: `${this.sentences[index].sentenceText}`,
        });
        wrapperResult.append(resultAudio, resultSentence);

        const isCorrect = sentence.getAttribute('data-is-correct');
        if (isCorrect === 'true') {
          resultKnow.append(wrapperResult);
        } else {
          resultDontKnow.append(wrapperResult);
        }
      });
      const titleKnow = createElement('h2', {
        innerText: `I know ${resultKnow.children.length}`,
      }, {
        color: 'white',
        background: '#98d33c',
        borderRadius: '6px',
        marginBottom: '5px',
      });
      resultKnow.prepend(titleKnow);

      const titleIDontKnow = createElement('h2', {
        innerText: `I don't know ${resultDontKnow.children.length}`,
      }, {
        color: 'white',
        background: '#bd3737',
        borderRadius: '6px',
        marginBottom: '5px',
      });
      resultDontKnow.prepend(titleIDontKnow);

      const wrapperResBotton = createElement('div', {
        classList: ['wrapper-results-botton'],
      }, {
        display: 'flex',
      });
      const statisticBotton = createElement('botton', {
        classList: ['btn', 'game-button', 'statistic-botton'],
        innerText: 'Statistic',
      });
      statisticBotton.onclick = () => {
        document.querySelector('.results-page').classList.add('hidden');
        const games = window.localStorage.getItem('english-puzzle-statistics');
        if (games) {
          const arr = JSON.parse(games);
          statiscicsGame(arr);
        }
      };
      wrapperResBotton.append(continueBotton, statisticBotton);

      wrapperResults.append(wrapperResultsImage, wrapperResSentences, wrapperResBotton);
      resultsPage.append(wrapperResults);
      document.querySelector('body').append(resultsPage);
    };

    gameRoundControls.append(dontKnowBotton, checkBotton, continueBotton, resultsBotton);
    wrapperGameRound.append(gameRoundWords, gameRoundControls);

    if (sentenceNumber === 0) {
      window.scrollTo({ top: 0 });
    }
    assembledGamePuzzle.children[sentenceNumber].classList.add('opacity-full');
    const bounding = assembledGamePuzzle.children[sentenceNumber].getBoundingClientRect();
    if (sentenceNumber === 0) {
      this.gameY = Math.abs(bounding.bottom - 35);
    } else {
      this.gameY += bounding.height;
    }
    wrapperGameRound.setAttribute('style', `top: ${this.gameY}px`);

    const shuffle = [...this.puzzle.children[sentenceNumber].children]
      .sort(() => Math.random() - 0.5);

    const prompImgCardBotton = document.querySelector('.image-card-prompt');
    shuffle.forEach((puzzle) => {
      if (prompImgCardBotton.classList.contains('disabled')) {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: darkslategray;`);
      }
      gameRoundWords.append(puzzle);
    });

    game.after(wrapperGameRound);
  }

  statisticsСollection() {
    const gameStatistics = createElement('div', {
      classList: ['game-statistics'],
    });
    const dateStatistics = createElement('div', {
      classList: ['date-statistics'],
      innerText: `${getTimeDate()}`,
    });
    const levelAndPage = createElement('div', {
      classList: ['levelAndPage'],
      innerText: `Level: ${this.level + 1}. Page: ${this.page + 1}`,
    });

    const statisticsImage = createElement('div', {
      classList: ['wrapper-results-image'],
    });
    const resultImage = createElement('img', {
      classList: ['result-image'],
      src: `assets/images/englishPuzzle/data_paintings/${this.pageImage.imageSrc}`,
    }, {
      width: '300px',
    });
    const resultAuthor = createElement('h4', {
      innerText: `${this.pageImage.author}`,
    }, {
      color: 'darkslategray',
    });
    const resultNameImage = createElement('h4', {
      innerText: `${this.pageImage.name}(${this.pageImage.year})`,
    }, {
      color: 'darkslategray',
    });
    statisticsImage.append(resultImage, resultAuthor, resultNameImage);

    const know = [...document.querySelector('.wrapper-assembled-game-puzzle').children]
      .filter((sentence) => sentence.getAttribute('data-is-correct') === 'true');

    const titleKnow = createElement('div', {
      innerText: `I know ${know.length}`,
    });
    const titleIDontKnow = createElement('div', {
      innerText: `I don't know ${10 - know.length}`,
    });

    gameStatistics.append(statisticsImage, dateStatistics, levelAndPage);
    gameStatistics.append(titleKnow, titleIDontKnow);
    return gameStatistics;
  }

  prepareForMakePuzzle() {
    existRemove('.wrapper-game');

    window.scrollTo({ top: 0 });

    const wrapperGame = createElement('div', { classList: ['wrapper-game'] });
    const wrapperSentencesGame = createElement('div', {
      classList: ['wrapper-sentences-game'],
    });
    const imageSentencesGame = createElement('img', {
      classList: ['image-sentences-game'],
      src: `assets/images/englishPuzzle/data_paintings/${this.pageImage.imageSrc}`,
    });
    imageSentencesGame.onload = () => {
      this.puzzle = createPuzzle(this);
      this.runGame(0);
    };

    this.sentences.forEach((sentenceNode, index) => {
      const sentenceGame = createElement('div', {
        classList: ['sentence-game', `sentence-${index}`],
      });
      sentenceNode.words.forEach((word) => {
        const wordGame = createElement('div', {
          classList: ['word-game'],
          innerText: `${word}`,
          'data-key-word': `${word}`,
          'puzzle-key-sentence': `${index}`,
        });
        sentenceGame.append(wordGame);
      });
      wrapperSentencesGame.append(sentenceGame);
    });
    wrapperGame.append(wrapperSentencesGame, imageSentencesGame);
    document.querySelector('.main-page').append(wrapperGame);
  }
}
