/* eslint-disable import/no-cycle */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import GetData from '../../js/GetData';
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
  const linkRequest = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${level}`;
  return new GetData(linkRequest, 'get')
    .sendRequest()
    .then((response) => setDataFromReq(response.data))
    .catch((error) => {
      console.error(error);
    })
    .then(() => document.querySelector('nav.header_navigation > ul').addEventListener('click', handleMenuClick));
};

export const renderApp = () => {
  setActiveLevelPage();
  setActiveLevel();
  renderWords();
  renderButtonsToDom();
};

// const renderSideBar = () => {
//   const sideBar = new SideBar();
//   const sideBarElement = sideBar.init();
//   document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
// };

// export const parseHTML = () => new Router(routes);

// window.onload = () => {
//   renderSideBar();
//   // parseHTML();
//   setTimeout(() => {
//     renderApp();
//   }, 500);
// };
