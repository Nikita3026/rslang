import {
  MIN_NUMBER, textElementAnswer, context, translatedWords, URL_MATERIALS, NEXT_NUMBER,
} from './constants';
import { settings } from './settings';
import { addClassOfElements, removeClassOfElements } from './checkAnswer';

const sentences = document.querySelectorAll('.context span');
const additionalContent = document.querySelectorAll('.additional-content');
export const buttons = document.querySelectorAll('.card-button');
const img = document.querySelector('.img-card');
const changeTranslate = document.querySelector('.change-translate');

const PART_TEXT_OF_UNKNOWN_WORD = /<\/b>|<\/i>/;
const HIDDEN_UNKNOWN_WORD = '[...]';
const TEXT_HIDE_TRANSLATION = 'Скрыть перевод';
const TEXT_SHOW_TRANSLATION = 'Показать перевод';

const additionalForWord = ['transcription', 'wordTranslate'];
const namesButtons = ['showAnswer', 'delete', 'difficultWords'];
const typesSentences = ['textMeaning', 'textMeaningTranslate', 'textExample', 'textExampleTranslate'];
const settingsTranslate = ['textMeaning', 'textMeaning', 'textExample', 'textExample'];

export function changeTextButton(button, typeSetting, textOn, textOff) {
  const currentButton = button;
  if (settings[typeSetting]) {
    currentButton.innerText = textOff;
  } else {
    currentButton.innerText = textOn;
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

function createTextElementForAnswer(dataCard, unknownWord) {
  for (let i = MIN_NUMBER; i < unknownWord.length; i += NEXT_NUMBER) {
    const letter = document.createElement('span');
    letter.innerText = unknownWord[i].toLowerCase();
    letter.classList.add('letter');
    textElementAnswer.append(letter);
  }
  additionalForWord.forEach((element, index) => {
    if (settings[element]) {
      additionalContent[index].innerText = dataCard[MIN_NUMBER][additionalForWord[index]];
    }
  });
}

function writeSentence(text, element) {
  const words = text.split(' ');
  const changedWords = words.map((word) => {
    let currentWord = word;
    if (word.search(PART_TEXT_OF_UNKNOWN_WORD) > MIN_NUMBER) {
      currentWord = HIDDEN_UNKNOWN_WORD;
    }
    return currentWord;
  });
  const sentence = element;
  sentence.innerText = changedWords.join(' ');
  context.append(sentence);
}

function showImage(dataCard) {
  if (settings.image) {
    img.src = `${URL_MATERIALS}${dataCard[MIN_NUMBER].image}`;
  }
}

export function showButtons(gettingNamesButtons, gettingButtons) {
  const showingButtons = [];
  gettingNamesButtons.forEach((element, index) => {
    if (settings[element]) {
      showingButtons.push(gettingButtons[index]);
    }
  });
  removeClassOfElements(showingButtons, ['hide']);
}

export function createCard(dataCard, unknownWord) {
  createTextElementForAnswer(dataCard, unknownWord);
  showImage(dataCard);
  settingsTranslate.forEach((element, index) => {
    if (settings[element]) {
      const dataWord = dataCard[MIN_NUMBER];
      const sentenceType = typesSentences[index];
      const sentence = dataWord[sentenceType];
      const placeForSentence = sentences[index];
      writeSentence(sentence, placeForSentence);
    }
  });
  showButtons(namesButtons, buttons);
  addClassOfElements(translatedWords, 'hide');
}
