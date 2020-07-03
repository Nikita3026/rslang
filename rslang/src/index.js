import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from './js/SideBar/SideBar';
import 'bootstrap';
import './assets/scss/style.scss';
import { routTo, checkValidToken } from './js/helpers';

window.onload = () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    renderSideBar();
    // renderHomePage();
  } else {
    routTo('/authorization');
  }
};
