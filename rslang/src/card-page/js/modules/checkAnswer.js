import { input } from './constants';

export function addClassOfElements(array, className) {
  array.forEach((elem) => {
    elem.classList.add(className);
  });
}

export function removeClassOfElements(array, className) {
  array.forEach((elem) => {
    elem.classList.remove(className);
  });
}

function changeColorLetter(arrayElementsText, text) {
  const wrongLetters = arrayElementsText.filter((item, index) => item.textContent !== text[index]);
  const rightLetters = arrayElementsText.filter((item, index) => item.textContent === text[index]);
  if (wrongLetters.length === arrayElementsText.length) {
    addClassOfElements(wrongLetters, 'red');
  } else {
    addClassOfElements(wrongLetters, 'orange');
    addClassOfElements(rightLetters, 'right-answer');
  }
}

function changeOpacityLetters(arrayElementsText) {
  setTimeout(() => {
    addClassOfElements(arrayElementsText, 'opacity');
    removeClassOfElements(arrayElementsText, 'red');
    removeClassOfElements(arrayElementsText, 'orange');
    removeClassOfElements(arrayElementsText, 'right-answer');
  }, 1000);
}

function showWrongLetters() {
  const letters = document.querySelectorAll('.letter');
  const arrayElementsText = [...letters];
  const text = input.value;
  input.value = '';
  input.classList.add('transparent');
  addClassOfElements(arrayElementsText, 'visible');
  changeColorLetter(arrayElementsText, text);
  changeOpacityLetters(arrayElementsText);
}

export function checkAnswer(unknownWord) {
  let result;
  if (input.value === unknownWord) {
    result = true;
  } else {
    showWrongLetters();
  }
  return result;
}

input.addEventListener('click', () => {
  const letters = document.querySelectorAll('.letter');
  const arrayElementsText = [...letters];
  input.classList.remove('transparent');
  input.value = '';
  removeClassOfElements(arrayElementsText, 'visible');
  removeClassOfElements(arrayElementsText, 'opacity');
});
