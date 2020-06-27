import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../css/sprint.scss';
import 'bootstrap';

import GetData from '../../js/GetData';

const startGameButton = document.querySelector('.start-game_button');
const startingWindow = document.querySelector('.starting-window');
const gameWindow = document.querySelector('.game-window');
const timer = document.querySelector('.timer');
const levels = document.querySelectorAll('.level');
const pagination = document.querySelector('.difficulty');
const wordRu = document.querySelector('.word_ru');
const wordEn = document.querySelector('.word_en');
const buttons = document.querySelector('.buttons');
const btnTrue = document.querySelector('.btn_true');
const btnFalse = document.querySelector('.btn_false');
const points = document.querySelector('.points');
const totalPoints = document.querySelector('.total-points');
let pointsPerAnswer = 10;
let rigthInRow = 0;
let timeinterval;
// let word = null;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

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

function hideStartingWindow() {
  startingWindow.classList.add('hidden');
}

function showGameWindow() {
  gameWindow.classList.remove('hidden');
}

function showStartingWindow() {
  startingWindow.classList.remove('hidden');
}

function hideGameWindow() {
  gameWindow.classList.add('hidden');
}

function clearRight() {
  btnFalse.classList.remove('right');
  btnTrue.classList.remove('right');
}

async function generateWords() {
  const activeLevel = document.querySelector('.level__active');
  const group = Number(activeLevel.innerHTML) - 1;
  console.log(group);
  const page = getRandomInt(29);
  const words = await getWords(group, page);
  const trueFalseIndicator = getRandomInt(3);
  const randomFalseWord = getRandomInt(19);
  if (trueFalseIndicator >= 1) {
    wordRu.innerHTML = words[0].wordTranslate;
    wordEn.innerHTML = words[0].word;
    btnTrue.classList.add('right');
  } else {
    wordRu.innerHTML = words[0].wordTranslate;
    wordEn.innerHTML = words[randomFalseWord].word;
    btnFalse.classList.add('right');
  }
}

function changeLevel(event) {
  if (event.target.closest('.level')) {
    // for (let i = 0; i <= levels.length; i += 1) {
    //   levels[i].classList.remove('level__active');
    //   event.target.closest('.level').classList.add('level__active');
    // }
    for (const level of levels) {
      level.classList.remove('level__active');
      event.target.closest('.level').classList.add('level__active');
    }
  }
  generateWords();
}

function updatePoints(pt) {
  points.innerHTML = ` ${pt} очков за правильный ответ`;
}

function updateTotalPoints(pt) {
  let counter = Number(totalPoints.innerHTML);
  counter += pt;
  totalPoints.innerHTML = counter;
}

async function answerHanlers(event) {
  if (event.target.classList.contains('right')) {
    console.log('right');
    rigthInRow += 1;
    if (rigthInRow === 4) {
      rigthInRow = 0;
      pointsPerAnswer *= 2;
      updatePoints(pointsPerAnswer);
    }
    updateTotalPoints(pointsPerAnswer);
    clearRight();
    generateWords();
  } else {
    console.log('no');
    rigthInRow = 0;
    pointsPerAnswer = 10;
    updatePoints(pointsPerAnswer);
    clearRight();
    generateWords();
  }
}

function stopTimer() {
  clearInterval(timeinterval);
  console.log('stop');
  hideGameWindow();
  showStartingWindow();
}

function updateTimer() {
  const timerCurrent = timer.innerHTML;
  if (timer.innerHTML > 0) {
    timer.innerHTML = timerCurrent - 1;
  }
  if (timer.innerHTML === '0') {
    stopTimer();
  }
}

async function startGame() {
  hideStartingWindow();
  showGameWindow();
  timer.innerHTML = 160;
  pointsPerAnswer = 10;
  totalPoints.innerHTML = 0;
  rigthInRow = 0;
  updatePoints(pointsPerAnswer);
  generateWords();
  updateTimer();
  timeinterval = setInterval(updateTimer, 1000);
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
    answerHanlers(event);
    console.log('жмяк');
  }
});

buttons.addEventListener('click', answerHanlers);
startGameButton.addEventListener('click', startGame);
pagination.addEventListener('click', changeLevel);
