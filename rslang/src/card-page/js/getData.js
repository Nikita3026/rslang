import axios from 'axios';
import { settings } from './settings';
import { NEXT_NUMBER } from './constants';

const MAX_NUMBER_PAGES = 19;
const MIN_NUMBER = 0;
const savePage = JSON.parse(localStorage.getItem('page'));
const saveGroup = JSON.parse(localStorage.getItem('group'));
const errorMessage = document.querySelector('.error');
const settingsButton = document.querySelector('.settings');

let page = 0;
let group = 0;
if (savePage) {
  page = savePage;
}
if (saveGroup) {
  group = saveGroup;
}

let textErrorMessage = `Нет карточек для изучения, пожалуйста попробуйте перейти
   в настройки и изменить количество карточек или новых слов для изучения`;
textErrorMessage = textErrorMessage.replace(/\n| {2}/g, '');
errorMessage.innerText = textErrorMessage;

function getData(url) {
  return axios.get(url)
    .then((response) => {
      settingsButton.classList.remove('hide');
      errorMessage.innerText = textErrorMessage;
      return response.data;
    })
    .catch((error) => {
      settingsButton.classList.add('hide');
      errorMessage.innerText = error;
      return [];
    });
}

function saveSaveUrlData() {
  localStorage.setItem('page', JSON.stringify(page));
  localStorage.setItem('group', JSON.stringify(group));
}

function createUrl() {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  page += NEXT_NUMBER;
  if (page > MAX_NUMBER_PAGES) {
    page = MIN_NUMBER;
    group += NEXT_NUMBER;
  }
  return url;
}

export default async function getDataCard(newWords) {
  let data = newWords;
  if (newWords.length < settings.maxNewWords) {
    const url = createUrl();
    const gettingData = await getData(url);
    data = data.concat(gettingData);
    localStorage.setItem('words', JSON.stringify(data));
    saveSaveUrlData();
  }
  return data;
}
