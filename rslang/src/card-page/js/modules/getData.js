import { settings } from './settings';
import { NEXT_NUMBER } from './constants';

const MAX_NUMBER_PAGES = 19;
const MIN_NUMBER = 0;
const savePage = JSON.parse(localStorage.getItem('page'));
const saveGroup = JSON.parse(localStorage.getItem('group'));

let page = 0;
let group = 0;
if (savePage) {
  page = savePage;
}
if (saveGroup) {
  group = saveGroup;
}

function getData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}

function createUrl() {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  page += NEXT_NUMBER;
  if (page > MAX_NUMBER_PAGES) {
    page = MIN_NUMBER;
    group += NEXT_NUMBER;
  }
  localStorage.setItem('page', JSON.stringify(page));
  localStorage.setItem('group', JSON.stringify(group));
  return url;
}

export default async function getDataCard(newWords) {
  let data = newWords;
  if (newWords.length < settings.maxNewWords) {
    const url = createUrl();
    const gettingData = await getData(url);
    data = data.concat(gettingData);
    localStorage.setItem('words', JSON.stringify(data));
  }
  return data;
}
