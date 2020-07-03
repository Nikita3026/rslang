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
let wordTranslation;
let activeWord;

const getWords = async (group, page) => {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  const request = new GetData(url, 'get');
  let wordsArr = null;
  await request.sendRequest()
    .then((response) => {
      wordsArr = response.data;
    })
    .catch((error) => console.error(error));
  console.log(wordsArr);

  return wordsArr;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function hideStartingWindow() {
  startingWindow.classList.add('hidden');
}

function showStartingWindow() {
  startingWindow.classList.remove('hidden');
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
  statisticWindow.classList.remove('hidden');
}

async function startGame() {
  hideStartingWindow();
  hideStatisticWindow();
  showGameWindow();
  spellWord();
}

function exitGame() {
  hideGameWindow();
  showStatisticWindow();
}

function changeLevel(event) {
  if (event.target.closest('.level')) {
    levels.forEach((level) => {
      level.classList.remove('level__active');
      event.target.closest('.level').classList.add('level__active');
    });
  }
}

async function spellWord() {
  const activeLevel = document.querySelector('.level__active');
  const group = Number(activeLevel.innerHTML) - 1;
  const page = getRandomInt(29);
  const randomTrueWord = getRandomInt(19);
  const words = await getWords(group, page);
  const path = words[randomTrueWord].audio.slice(5, words[randomTrueWord].audio.length);
  const audioUrl = `https://raw.githubusercontent.com/dmitruk89/rslang-data/master/data${path}`;
  const audio = new Audio(audioUrl);
  audio.play();
  activeWord = audio;
  wordTranslation = words[randomTrueWord].wordTranslate;
}

function repeatSpelling() {
  activeWord.play();
}

function fillWords() {
  const randomPlace = getRandomInt(5);
  words[randomPlace].innerHTML = wordTranslation;
}

async function updateWord() {
  await spellWord();
  fillWords();
}

startGameButton.addEventListener('click', startGame);
exitGameButton.addEventListener('click', exitGame);
pagination.addEventListener('click', changeLevel);
startAgainButton.addEventListener('click', startGame);
speacker.addEventListener('click', repeatSpelling);
skipButton.addEventListener('click', updateWord);
