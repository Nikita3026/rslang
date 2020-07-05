import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from './js/SideBar/SideBar';
import 'bootstrap';
import './assets/scss/style.scss';
import { routTo, checkValidToken, updateToken } from './js/helpers';

window.onload = () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkValidToken()) {
      updateToken();
    }
    renderSideBar();
    // renderHomePage();
  } else {
    routTo('/authorization');
  }
};
