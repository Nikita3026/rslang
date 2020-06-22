import { removeClassOfElements } from './checkAnswer';
import { translatedWords, input, NEXT_NUMBER } from './constants';
import { settings } from './settings';
import { removeWord } from './changeDataWords';

const englishSentences = document.querySelectorAll('.english-sentence');
const progressBar = document.querySelector('.progress-bar');

function showMissingWords(wordsForSentences) {
  wordsForSentences.forEach((word, index) => {
    const text = englishSentences[index].innerText.replace('[...]', word);
    englishSentences[index].innerText = text;
  });
}

export function changeCardForAnswer(wordsForSentences, repeat, repeatWords, unknownWord) {
  input.classList.add('right-answer');
  if (settings.wordTranslate) {
    removeClassOfElements(translatedWords, 'hide');
  }
  showMissingWords(wordsForSentences);
  if (!repeat) {
    removeWord(repeatWords, 'repeatWords', unknownWord);
  }
}

export function changeProgressBar(cards) {
  const progress = (cards - NEXT_NUMBER) / settings.maxCards;
  progressBar.style.width = `${progress * 100}%`;
  progressBar.innerText = `${cards - NEXT_NUMBER}/${settings.maxCards}`;
}
