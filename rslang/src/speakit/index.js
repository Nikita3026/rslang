import { getWords } from './js/getData';
import { handleMenuClick, getActiveLevel, getActiveLevelPage } from './js/utils';
import WordsList from './js/WordsList';
import { renderButtonsToDom } from './js/buttons';

let dataArr = [];
let dataArrActive = [];
let page = 1;
let level = 1;

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
  const suffleArr = Array.isArray(dataArr) ? dataArr.sort(() => Math.random() - 0.5) : [];
  const dataList = suffleArr.slice(0, 10);
  // console.log(dataList);
  dataArrActive = dataList;
  return dataList;
};

export const renderWordsList = () => {
  const dataLIst = getActiveDataList();
  const wordsList = new WordsList(dataLIst);
  wordsList.init();
};

export const setDataFromReq = (data) => {
  dataArr = [...dataArr, ...data];
  renderWordsList();
};

export const setActiveLevel = () => {
  level = getActiveLevel();
};

export const setActiveLevelPage = () => {
  page = getActiveLevelPage();
};

window.onload = () => {
  setActiveLevelPage();
  setActiveLevel();
  getWords(page, level);
  renderButtonsToDom();
  document.querySelector('nav.header_navigation > ul').addEventListener('click', handleMenuClick);
};
