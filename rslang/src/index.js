import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from './js/SideBar/SideBar';
import 'bootstrap';
import './assets/scss/style.scss';
import { updateToken } from './authorization/js/authorization';
import { routTo, checkValidToken } from './js/helpers';

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
