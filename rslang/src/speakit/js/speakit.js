import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../css/style.scss';
import { getWords } from './getData';
import { handleMenuClick, getActiveLevel, getActiveLevelPage } from './utils';
import WordsList from './WordsList';
import { renderButtonsToDom } from './buttons';

let dataArr = [];
let dataArrActive = [];
let page = 0;
let level = 0;

export const setDataArr = (data) => {
  dataArr = data;
};

export const getDataArr = () => dataArr;

export const setDataArrActive = (data) => {
  dataArrActive = data;
};

export const getDataArrActive = () => dataArrActive;

export const setPage = (num) => {
  page = num;
};

export const getPage = () => page;

export const setLevel = (num) => {
  level = num;
};

export const getLevel = () => level;

const getActiveDataList = () => {
  // dataList = [];
  const suffleArr = Array.isArray(dataArr) ? dataArr.sort(() => Math.random() - 0.5) : [];
  const dataList = suffleArr.slice(0, 10);
  setDataArrActive(dataList);
  return dataList;
};

export const renderWordsList = () => {
  const dataLIst = getActiveDataList();
  const wordsList = new WordsList(dataLIst);
  wordsList.init();
};

export const setDataFromReq = (data) => {
  // dataArr = [...dataArr, ...data];
  dataArr = [];
  setDataArr(data);
  renderWordsList();
};

export const setActiveLevel = () => {
  level = getActiveLevel();
};

export const setActiveLevelPage = () => {
  page = getActiveLevelPage();
};

export const renderWords = () => {
  setActiveLevelPage();
  return getWords(page, level)
    .then((wordsData) => setDataFromReq(wordsData))
    .then(() => document.querySelector('nav.header_navigation > ul').addEventListener('click', handleMenuClick));
};

window.onload = () => {
  setActiveLevelPage();
  setActiveLevel();
  renderWords();
  renderButtonsToDom();
};
