import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../css/audiocall.scss';
import 'bootstrap';

import GetData from '../../js/GetData';

const startGameButton = document.querySelector('.start-game_button');
const exitGameButton = document.querySelector('.btn-exit');
const startingWindow = document.querySelector('.starting-window');
const startAgainButton = document.querySelector('.start-again_button');
const statisticWindow = document.querySelector('.statisict-window');
const gameWindow = document.querySelector('.game-window');
const levels = document.querySelectorAll('.level');
const pagination = document.querySelector('.difficulty');
const speacker = document.querySelector('.speacker');
const skipButton = document.querySelector('.btn-skip');
const words = document.querySelectorAll('.word');
const wordNumbers = document.querySelectorAll('.word-number');
const wordsList = document.querySelector('.words-list');
const nextButton = document.querySelector('.btn-next');
const progressBar = document.querySelector('.progress-bar');
const picture = document.querySelector('.word-picture');
const transcription = document.querySelector('.word-transcription');
const statisict = document.querySelector('.statistic');
let statisticListElement;
let mistakesNumber = 0;
let correctNumber = 0;
let mistakesList = '';
let correctList = '';
let progressPercent = 0;
let wordAudio;
let wordTranscription;
let wordTranslation;
let wordPicture;
let activeWord;
let trueWordNumber;
let wordsArrFalse = [];

const rightSound = new Audio();
rightSound.preload = 'auto';
rightSound.src = '../../assets/audio/rightAnswer.wav';

const wrongSound = new Audio();
wrongSound.preload = 'auto';
wrongSound.src = '../../assets/audio/wrongAnswer.wav';

const endGameSound = new Audio();
endGameSound.preload = 'auto';
endGameSound.src = '../../assets/audio/endGame.mp3';

const gongSound = new Audio();
gongSound.preload = 'auto';
gongSound.src = '../../assets/audio/gong.mp3';

const getWords = async (group, page) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  const request = new GetData(url, 'get');
  let wordsArr = null;
  await request.sendRequest()
    .then((response) => {
      wordsArr = response.data;
    })
    .catch((error) => console.error(error));

  return wordsArr;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function hideStartingWindow() {
  startingWindow.classList.add('hidden');
}

function showGameWindow() {
  gameWindow.classList.remove('hidden');
}

function hideGameWindow() {
  gameWindow.classList.add('hidden');
}

function hideStatisticWindow() {
  statisticWindow.classList.add('hidden');
}

function showStatisticWindow() {
  fillStatistic();
  statisticWindow.classList.remove('hidden');
}

function exitGame() {
  hideGameWindow();
  showStatisticWindow();
  endGameSound.play();
}

async function getAllData() {
  const activeLevel = document.querySelector('.active').firstChild;
  const group = Number(activeLevel.innerHTML) - 1;
  const page = getRandomInt(29);
  const randomTrueWord = getRandomInt(19);
  trueWordNumber = randomTrueWord;
  const wordsArr = await getWords(group, page);
  console.log(wordsArr);
  const path = wordsArr[randomTrueWord].audio.slice(5, wordsArr[randomTrueWord].audio.length);
  const audioUrl = `https://raw.githubusercontent.com/dmitruk89/rslang-data/master/data${path}`;
  wordAudio = new Audio(audioUrl);
  wordAudio.play();
  wordTranslation = wordsArr[randomTrueWord].wordTranslate;
  wordPicture = wordsArr[randomTrueWord].image.slice(5, wordsArr[randomTrueWord].audio.length);
  wordTranscription = wordsArr[randomTrueWord].word;
  statisticListElement = `<p><b>${wordsArr[randomTrueWord].word}</b> –– ${wordsArr[randomTrueWord].wordTranslate}</p>`;
}

function spellWord() {
  wordAudio.play();
}

async function getFalseWords() {
  while (wordsArrFalse.length !== 5) {
    const group = getRandomInt(5);
    const page = getRandomInt(29);
    const randomFalseWord = getRandomInt(19);
    const wordsArr = await getWords(group, page);
    if (randomFalseWord !== trueWordNumber) {
      wordsArrFalse.push(wordsArr[randomFalseWord].wordTranslate);
    }
  }
  return wordsArrFalse;
}

function clearWords() {
  for (let i = 0; i < words.length; i += 1) {
    words[i].innerHTML = '';
    words[i].classList.remove('right');
  }
}

async function fillWords() {
  let wordsToFill = await getFalseWords();
  clearWords();
  for (let i = 0; i < wordsToFill.length; i += 1) {
    words[i].innerHTML = wordsToFill[i];
  }
  wordsArrFalse = [];
  wordsToFill = [];
  const randomPlace = getRandomInt(5);

  words[randomPlace].innerHTML = wordTranslation;
  words[randomPlace].classList.add('right');
}

async function updateWord() {
  await getAllData();
  fillWords();
}

function showPicture() {
  picture.classList.remove('hidden');
  picture.style.backgroundImage = `url(https://raw.githubusercontent.com/dmitruk89/rslang-data/master/data/${wordPicture})`;
}

function hidePicture() {
  picture.classList.add('hidden');
}

function showWord() {
  transcription.innerHTML = wordTranscription;
}

function hideWord() {
  transcription.innerHTML = '';
}

function toggleSkipNextButton() {
  nextButton.classList.toggle('hidden');
  skipButton.classList.toggle('hidden');
}

function moveProgress() {
  progressPercent += 20;
  progressBar.style.width = `${progressPercent}%`;
  if (progressPercent === 100) {
    hideGameWindow();
    showStatisticWindow();
  }
}

async function updateMistakesList() {
  mistakesList += `${statisticListElement}`;
}

async function updateCorrectList() {
  correctList += `${statisticListElement}`;
}

function showCheck() {
  const wordNumber = document.querySelector('.right').previousElementSibling;
  wordNumber.classList.add('checked');
}

function hideCheck() {
  const wordNumber = document.querySelector('.checked');
  wordNumber.classList.remove('checked');
}

function showWrong(event) {
  const wordNumber = event.target.previousElementSibling;
  wordNumber.classList.add('wrong');
}

function hideWrong() {
  const wordNumber = document.querySelector('.wrong');
  wordNumber.classList.remove('wrong');
}

function highlightRight() {
  const wordRight = document.querySelector('.right');
  wordRight.classList.add('highlighted');
}

function removeHighlightRight() {
  const wordRight = document.querySelector('.highlighted');
  wordRight.classList.remove('highlighted');
}

function overlineWrong(event) {
  const wordWrong = event.target;
  wordWrong.classList.add('crossed');
}

function removeoverlineWrong() {
  const wordRight = document.querySelector('.crossed');
  wordRight.classList.remove('crossed');
}

function clearMarks() {
  for (let i = 0; i < wordNumbers.length; i += 1) {
    if (wordNumbers[i].classList.contains('checked')) {
      wordNumbers[i].classList.remove('checked');
    } if (wordNumbers[i].classList.contains('wrong')) {
      wordNumbers[i].classList.remove('wrong');
    } if (words[i].classList.contains('highlighted')) {
      words[i].classList.remove('highlighted');
    } if (words[i].classList.contains('crossed')) {
      words[i].classList.remove('crossed');
    }
  }
}

function setRightAnswer() {
  console.log('right');
  rightSound.play();
  showCheck();
  highlightRight();
  showPicture();
  showWord();
  toggleSkipNextButton();
  moveProgress();
  updateCorrectList();
  correctNumber += 1;
}

function setWrongAnswer() {
  console.log('no');
  wrongSound.play();
  toggleSkipNextButton();
  moveProgress();
  updateMistakesList();
  mistakesNumber += 1;
}

async function startGame() {
  hidePicture();
  hideWord();
  clearMarks();
  gongSound.play();
  hideStartingWindow();
  hideStatisticWindow();
  showGameWindow();
  updateWord();
}

function answerHandlers(event) {
  if (event.target.classList.contains('right')) {
    setRightAnswer();
  } else {
    setWrongAnswer();
    showWrong(event);
    overlineWrong(event);
  }
}

function goNext() {
  console.log('next');
  clearMarks();
  toggleSkipNextButton();
  updateWord();
  hidePicture();
  hideWord();
}

function skipWord() {
  console.log('skip');
  updateWord();
}

// function skipOrNext(event) {
//   if (event.code === 'Enter' && nextButton.classList.contains('hidden')) {
//     skipWord();
//   } else {
//     goNext();
//   }
// }

function changeLevel(event) {
  if (event.target.closest('.level')) {
    levels.forEach((level) => {
      level.classList.remove('active');
      event.target.closest('.level').classList.add('active');
    });
  }
  updateWord();
  hidePicture();
  hideWord();
}

function fillStatistic(total) {
  document.querySelector('.statistic-header').innerHTML = '<p>Результат игры</p>';
  statisict.innerHTML = '';
  statisict.insertAdjacentHTML('afterbegin', `
  <p class="stat-mistakes">Ошибок: ${mistakesNumber}</p>
  ${mistakesList}
  <hr>
  <p class="stat-correct">Верно: ${correctNumber}</p>
  ${correctList}
  `);
}

startGameButton.addEventListener('click', startGame);
exitGameButton.addEventListener('click', exitGame);
pagination.addEventListener('click', changeLevel);
startAgainButton.addEventListener('click', startGame);
speacker.addEventListener('click', spellWord);
skipButton.addEventListener('click', skipWord);
nextButton.addEventListener('click', goNext);
wordsList.addEventListener('click', answerHandlers);
// document.addEventListener('keydown', skipOrNext);

document.addEventListener('keydown', (event) => {
  if ((event.code === 'Digit1' && words[0].classList.contains('right'))
  || (event.code === 'Digit2' && words[1].classList.contains('right'))
  || (event.code === 'Digit3' && words[2].classList.contains('right'))
  || (event.code === 'Digit4' && words[3].classList.contains('right'))
  || (event.code === 'Digit5' && words[4].classList.contains('right'))) {
    setRightAnswer();
  } else if ((event.code === 'Digit1' && !words[0].classList.contains('right'))
  || (event.code === 'Digit2' && !words[1].classList.contains('right'))
  || (event.code === 'Digit3' && !words[2].classList.contains('right'))
  || (event.code === 'Digit4' && !words[3].classList.contains('right'))
  || (event.code === 'Digit5' && !words[4].classList.contains('right'))) {
    setWrongAnswer();
  }
  if (event.code === 'Enter' && nextButton.classList.contains('hidden')) {
    skipWord();
  } else if (event.code === 'Enter' && skipButton.classList.contains('hidden')) {
    goNext();
  }
});
