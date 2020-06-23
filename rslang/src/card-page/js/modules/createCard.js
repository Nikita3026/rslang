import {
  MIN_NUMBER, textElementAnswer, context, translatedWords, URL_MATERIALS, NEXT_NUMBER,
} from './constants';
import { settings } from './settings';
import { addClassOfElements } from './checkAnswer';

const buttons = document.querySelectorAll('.card-button');
const sentences = document.querySelectorAll('.context span');
const additionalContent = document.querySelectorAll('.additional-content');
const img = document.querySelector('.img-card');
const TEXT_HIDE_TRANSLATION = 'Скрыть перевод';
const TEXT_SHOW_TRANSLATION = 'Показать перевод';

const additionalForWord = ['transcription', 'wordTranslate'];
const namesButtons = ['showAnswer', 'delete', 'difficultWords'];
const typesSentences = ['textMeaning', 'textMeaningTranslate', 'textExample', 'textExampleTranslate'];
const settingsTranslate = ['textMeaning', 'textMeaning', 'textExample', 'textExample'];

const changeTranslate = document.querySelector('.change-translate');

export function changeTextButton(button, typeSetting, textOn, textOff) {
  const curentButton = button;
  if (settings[typeSetting]) {
    curentButton.innerText = textOff;
  } else {
    curentButton.innerText = textOn;
  }
}

function checkTranslations() {
  changeTextButton(changeTranslate, 'wordTranslate', TEXT_SHOW_TRANSLATION, TEXT_HIDE_TRANSLATION);
}
checkTranslations();

changeTranslate.addEventListener('click', () => {
  settings.wordTranslate = !settings.wordTranslate;
  checkTranslations();
});

function createTextElementForAnswer(dataCard, numberSentence, unknownWord) {
  for (let i = MIN_NUMBER; i < unknownWord.length; i += NEXT_NUMBER) {
    const letter = document.createElement('span');
    letter.innerText = unknownWord[i].toLowerCase();
    letter.classList.add('letter');
    textElementAnswer.append(letter);
  }
  additionalForWord.forEach((element, index) => {
    if (settings[element]) {
      additionalContent[index].innerText = dataCard[numberSentence][additionalForWord[index]];
    }
  });
}

function writeSentence(text, element) {
  const words = text.split(' ');
  const changedWords = words.map((word) => {
    let currentWord = word;
    if (word.search(/<\/b>|<\/i>/) > MIN_NUMBER) {
      currentWord = '[...]';
    }
    return currentWord;
  });
  const sentence = element;
  sentence.innerText = changedWords.join(' ');
  context.append(sentence);
}

function showImage(dataCard, numberSentence) {
  if (settings.image) {
    img.src = `${URL_MATERIALS}${dataCard[numberSentence].image}`;
  }
}

function showButtons() {
  namesButtons.forEach((element, index) => {
    if (settings[element]) {
      buttons[index].classList.remove('hide');
    }
  });
}

export function createCard(dataCard, numberSentence, unknownWord) {
  createTextElementForAnswer(dataCard, numberSentence, unknownWord);
  showImage(dataCard, numberSentence);
  settingsTranslate.forEach((element, index) => {
    if (settings[element]) {
      writeSentence(dataCard[numberSentence][typesSentences[index]], sentences[index]);
    }
  });
  showButtons();
  addClassOfElements(translatedWords, 'hide');
}
