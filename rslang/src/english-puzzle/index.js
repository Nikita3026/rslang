import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from '../js/SideBar/SideBar';
import '../assets/scss/style.scss';
import './scss/style.scss';
import {
  checkTokenIsValid, updateToken, routeToAuth,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    renderSideBar();
    const { createStartPage } = await import('./js/create');
    await import('./js/dragHandler');
    createStartPage();
  } else {
    routeToAuth();
  }
};