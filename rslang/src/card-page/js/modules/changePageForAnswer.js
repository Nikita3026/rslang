import { removeClassOfElements } from './checkAnswer';
import { translatedWords, input, NEXT_NUMBER } from './constants';
import { settings } from './settings';
import { removeWord } from './changeDataWords';

const englishSentences = document.querySelectorAll('.english-sentence');
const progressBar = document.querySelector('.progress-bar');
const MAX_PERCENTS = 100;

let saveLearningWords = JSON.parse(localStorage.getItem('learningWords'));
if (!saveLearningWords) {
  saveLearningWords = [];
}

function showMissingWords(wordsForSentences) {
  wordsForSentences.forEach((word, index) => {
    const text = englishSentences[index].innerText.replace('[...]', word);
    englishSentences[index].innerText = text;
  });
}

export function changeCardForAnswer(wordsForSentences, repeat, repeatWords, unknownWord, dataWord) {
  input.classList.add('right-answer');
  if (settings.wordTranslate) {
    removeClassOfElements(translatedWords, 'hide');
  }
  showMissingWords(wordsForSentences);
  if (!repeat) {
    saveLearningWords.push(dataWord);
    localStorage.setItem('learningWords', JSON.stringify(saveLearningWords));
    removeWord(repeatWords, 'repeatWords', unknownWord);
  }
}

export function changeProgressBar(cards) {
  const progress = (cards - NEXT_NUMBER) / settings.maxCards;
  progressBar.style.width = `${progress * MAX_PERCENTS}%`;
  progressBar.innerText = `${cards - NEXT_NUMBER}/${settings.maxCards}`;
}
