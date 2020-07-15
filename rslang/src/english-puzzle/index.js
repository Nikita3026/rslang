import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from '../js/SideBar/SideBar';
import '../assets/scss/style.scss';
import './scss/style.scss';
import {
  setBodyDataToDom, checkTokenIsValid, routeTo, updateToken,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    await setBodyDataToDom('english-puzzle.html');
    renderSideBar();
    const { createStartPage } = await import('./js/create');
    await import('./js/dragHandler');
    createStartPage();
  } else {
    routeTo('/authorization');
  }
};
