import { MIN_NUMBER } from './constants';
import { settings } from './settings';

const START_MISSING_WORD = 3;

function getMissingWord(sentence, symbol) {
  const start = sentence.search(`<${symbol}>`);
  const end = sentence.search(`</${symbol}>`);
  const wordTextMeaning = sentence.slice(start + START_MISSING_WORD, end);
  return wordTextMeaning;
}

export default function getWordsForSentences(words, allWords) {
  const wordsForSentences = words;
  wordsForSentences.length = MIN_NUMBER;
  if (settings.textMeaning) {
    const word = getMissingWord(allWords[MIN_NUMBER].textMeaning, 'i');
    wordsForSentences.push(word);
  }
  if (settings.textExample) {
    const word = getMissingWord(allWords[MIN_NUMBER].textExample, 'b');
    wordsForSentences.push(word);
  }
  return wordsForSentences;
}
