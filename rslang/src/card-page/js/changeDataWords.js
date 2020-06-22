import { MIN_NUMBER, NEXT_NUMBER } from './constants';

const saveDictionary = JSON.parse(localStorage.getItem('dictionary'));
const saveDifficultWords = JSON.parse(localStorage.getItem('difficultWords'));
const saveRepeatWords = JSON.parse(localStorage.getItem('repeatWords'));
const saveNewWords = JSON.parse(localStorage.getItem('words'));

const allSaveData = [saveNewWords, saveRepeatWords, saveDictionary, saveDifficultWords];

export function shuffleArray(currentArray) {
  const array = currentArray;
  const maxNumber = array.length - NEXT_NUMBER;
  let first = MIN_NUMBER;
  let second = MIN_NUMBER;
  let temp;
  for (let i = MIN_NUMBER; i < maxNumber; i++) {
    do {
      first = Math.floor(Math.random() * maxNumber);
      second = Math.floor(Math.random() * maxNumber);
    } while (first === second);
    temp = array[first];
    array[first] = array[second];
    array[second] = temp;
  }
}

export function getAllDataWords() {
  const allData = allSaveData.map((currentData) => {
    let data = [];
    if (currentData) {
      data = currentData;
    }
    return data;
  });
  return allData;
}

export function removeWord(words, key, unknownWord) {
  const allUnknownWord = words.map((item) => item.word.toLowerCase());
  const index = allUnknownWord.indexOf(unknownWord);
  if (index >= MIN_NUMBER) {
    words.splice(index, NEXT_NUMBER);
    localStorage.setItem(key, JSON.stringify(words));
  }
}

export function changeRepeatWords(repeat, allWords, repeatWords, unknownWord) {
  if (!repeat) {
    const word = allWords.slice(MIN_NUMBER, NEXT_NUMBER)[MIN_NUMBER];
    const allUnknownWord = repeatWords.map((item) => item.word);
    if (!allUnknownWord.includes(unknownWord)) {
      repeatWords.push(word);
      localStorage.setItem('repeatWords', JSON.stringify(repeatWords));
    }
  }
}

export function changeDataWords(words, key, allWords, repeatWords, unknownWord) {
  const word = allWords.slice(MIN_NUMBER, NEXT_NUMBER)[MIN_NUMBER];
  words.push(word);
  localStorage.setItem(key, JSON.stringify(words));
  removeWord(repeatWords, 'repeatWords', unknownWord);
}
