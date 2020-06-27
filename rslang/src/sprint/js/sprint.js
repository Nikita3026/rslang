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
const keysButton = document.querySelector('.keys');
let pointsPerAnswer = 10;
let rigthInRow = 0;
let timeinterval;

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
  clearRight();
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
    btnFalse.classList.remove('right');
  } else {
    wordRu.innerHTML = words[0].wordTranslate;
    wordEn.innerHTML = words[randomFalseWord].word;
    btnFalse.classList.add('right');
    btnTrue.classList.remove('right');
  }
}

function changeLevel(event) {
  if (event.target.closest('.level')) {
    levels.forEach((level) => {
      level.classList.remove('level__active');
      event.target.closest('.level').classList.add('level__active');
    });
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

function setRightAnswer() {
  console.log('right');
  rigthInRow += 1;
  if (rigthInRow === 4) {
    rigthInRow = 0;
    pointsPerAnswer *= 2;
    updatePoints(pointsPerAnswer);
  }
  updateTotalPoints(pointsPerAnswer);
  generateWords();
}

function setWrongAnswer() {
  console.log('no');
  rigthInRow = 0;
  pointsPerAnswer = 10;
  updatePoints(pointsPerAnswer);
  generateWords();
}

function answerHanlers(event) {
  if (event.target.classList.contains('right')) {
    setRightAnswer();
  } else {
    setWrongAnswer();
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
  // timeinterval = setInterval(updateTimer, 1000);
}

function lightKeyPressButton(code) {
  switch (code) {
    case 'ArrowRight':
      keysButton.children[1].classList.add('active');
      keysButton.children[0].classList.remove('active');
      break;
    case 'ArrowLeft':
      keysButton.children[0].classList.add('active');
      keysButton.children[1].classList.remove('active');
      break;

    default:
      break;
  }
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
    lightKeyPressButton(event.code);
    if ((event.code === 'ArrowRight' && btnTrue.classList.contains('right'))
  || (event.code === 'ArrowLeft' && btnFalse.classList.contains('right'))) {
      setRightAnswer();
    } else {
      setWrongAnswer();
    }
  }
  console.log('жмяк');
});
document.addEventListener('keyup', () => {
  keysButton.children.forEach((it) => it.classList.remove('active'));
});
buttons.addEventListener('click', answerHanlers);
startGameButton.addEventListener('click', startGame);
pagination.addEventListener('click', changeLevel);
