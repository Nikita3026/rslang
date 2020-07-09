import {
  MIN_NUMBER, NEXT_NUMBER, notification, statistic, app, LAST_NUMBER_FOR_DATE,
} from './constants';
import { settings } from './settings';

const numbersStatistic = document.querySelector('.numbers-statistics');
const buttonStatistic = document.querySelector('.button-statistic');
const errorMessage = document.querySelector('.error-message');
const numberSeria = document.querySelector('.number-seria');

const numbersStatisticElements = [...numbersStatistic.children]
  .map((element) => element.children[NEXT_NUMBER]);
const valuesRightAnswer = [];
const MAX_PERCENT = 100;

let maxRightAnswer = 0;
let saveStatistic = JSON.parse(localStorage.getItem('statistic'));
let numberNewWords = 0;
let rightAnswer = 0;

if (!saveStatistic) {
  saveStatistic = {};
  saveStatistic.seria = 0;
  saveStatistic.cards = 0;
  saveStatistic.rightAnswer = 0;
}

export function changeRightAnswer(repeat) {
  if (!repeat) {
    maxRightAnswer += NEXT_NUMBER;
    rightAnswer += NEXT_NUMBER;
  } else {
    maxRightAnswer = MIN_NUMBER;
  }
  valuesRightAnswer.push(maxRightAnswer);
}

export function changeNumberNewWords(key) {
  if (key === 'words') {
    numberNewWords += NEXT_NUMBER;
  } else {
    numberNewWords -= NEXT_NUMBER;
  }
}

function resetValues() {
  numberNewWords = MIN_NUMBER;
  valuesRightAnswer.length = MIN_NUMBER;
  maxRightAnswer = MIN_NUMBER;
  rightAnswer = MIN_NUMBER;
}

function savingStatistic(learningWords, cards) {
  const date = new Date().toISOString().slice(MIN_NUMBER, LAST_NUMBER_FOR_DATE);
  saveStatistic.seria += NEXT_NUMBER;
  saveStatistic.cards += cards;
  saveStatistic.rightAnswer += rightAnswer;
  saveStatistic[date] = learningWords.length;
  localStorage.setItem('statistic', JSON.stringify(saveStatistic));
  numberSeria.innerText = saveStatistic.seria;
  console.log(saveStatistic);
}

function writeStatistic(learningWords, cards) {
  const numberMaxRights = Math.max.apply(null, valuesRightAnswer);
  const proportionRightAnswer = rightAnswer / settings.maxCards;
  const percentRightAnswer = `${proportionRightAnswer * MAX_PERCENT}%`;
  const valuesStatistic = [cards, percentRightAnswer, numberNewWords, numberMaxRights];
  valuesStatistic.forEach((number, index) => {
    numbersStatisticElements[index].innerText = number;
  });
  savingStatistic(learningWords, cards);
  resetValues();
  app.classList.add('hide');
  statistic.classList.remove('hide');
}

export function checkError(learningWords, cards) {
  if (cards) {
    writeStatistic(learningWords, cards);
  } else {
    app.classList.add('hide');
    errorMessage.classList.remove('hide');
  }
}

buttonStatistic.addEventListener('click', () => {
  statistic.classList.add('hide');
  notification.classList.remove('hide');
});
