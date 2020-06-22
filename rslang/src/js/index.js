import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/scss/style.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'bootstrap';

import { checkAnswer } from '../card-page/js/checkAnswer';
import {
  MIN_NUMBER, textElementAnswer, context, input, app, NEXT_NUMBER,
} from '../card-page/js/constants';
import { createCard } from '../card-page/js/createCard';
import { settings } from '../card-page/js/settings';
import getDataCard from '../card-page/js/getData';
import getWordsForSentences from '../card-page/js/changeSettencesForAnswer';
import {
  removeWord, getAllDataWords, changeRepeatWords, changeDataWords, shuffleArray,
} from '../card-page/js/changeDataWords';
import { changeCardForAnswer, changeProgressBar } from '../card-page/js/changePageForAnswer';
import { playAudio, buttonChangeSound } from '../card-page/js/playAudio';

const nextBtn = document.querySelector('.next');
const deleteButton = document.querySelector('.delete-btn');
const openModalButton = document.querySelector('.open-modal');
const continueButton = document.querySelector('.continue-card');
const difficultWordsButton = document.querySelector('.difficult-words');
const showAnswerButton = document.querySelector('.show-answer-btn');

const NUMBER_MILLISECONDS = 1000;
const NUMBER_SENTENCE = 0;

let dictionary = [];
let difficultWords = [];
let repeatWords = [];
let newWords = [];
let wordsForSentences = [];
let unknownWord = '';
let repeat = false;
let cards = 1;

[newWords, repeatWords, dictionary, difficultWords] = getAllDataWords();
let allWords = newWords.concat(repeatWords);

function changeCard() {
  wordsForSentences = getWordsForSentences(wordsForSentences, allWords);
  unknownWord = allWords[NUMBER_SENTENCE].word.toLowerCase();
  [...context.children, ...textElementAnswer.children].forEach((elem) => elem.remove());
  createCard(allWords, NUMBER_SENTENCE, unknownWord);
}

async function createCollectionWords() {
  newWords = await getDataCard(newWords);
  allWords = newWords.slice(MIN_NUMBER, settings.maxNewWords);
  if (settings.repeatWords) {
    allWords = allWords.concat(repeatWords);
  }
  shuffleArray(allWords);
}

async function initApp() {
  await createCollectionWords();
  changeCard();
  changeProgressBar(cards);
}

function nextCard() {
  app.style.pointerEvents = 'none';
  allWords.splice(NUMBER_SENTENCE, NEXT_NUMBER);
  removeWord(newWords, 'words', unknownWord);
  localStorage.setItem('words', JSON.stringify(newWords));
  if (cards < settings.maxCards && allWords.length) {
    setTimeout(() => {
      changeCard();
      input.classList.remove('right-answer');
      input.click();
      app.style.pointerEvents = 'auto';
    }, NUMBER_MILLISECONDS);
  } else {
    openModalButton.click();
  }
  cards++;
  changeProgressBar(cards);
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    nextBtn.click();
  }
});

nextBtn.addEventListener('click', () => {
  const isRightWord = checkAnswer(unknownWord);
  if (isRightWord) {
    changeCardForAnswer(wordsForSentences, repeat, repeatWords, unknownWord);
    playAudio(allWords, nextCard);
    repeat = false;
  } else {
    changeRepeatWords(repeat, allWords, repeatWords, unknownWord);
    repeat = true;
    input.click();
  }
});

continueButton.addEventListener('click', async () => {
  cards = MIN_NUMBER;
  await createCollectionWords();
  nextCard();
});

function eventForButton(button, words, key) {
  button.addEventListener('click', async () => {
    changeDataWords(words, key, allWords, repeatWords, unknownWord);
    cards--;
    if (allWords.length === NEXT_NUMBER) {
      await createCollectionWords();
    }
    nextCard();
  });
}
eventForButton(difficultWordsButton, difficultWords, 'difficultWords');
eventForButton(deleteButton, dictionary, 'dictionary');

showAnswerButton.addEventListener('click', () => {
  changeRepeatWords(repeat, allWords, repeatWords, unknownWord);
  repeat = true;
  input.value = unknownWord;
  nextBtn.click();
});

buttonChangeSound();
initApp();


