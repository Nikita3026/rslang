import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { renderSideBar } from './js/SideBar/SideBar';
import 'bootstrap';
import './assets/scss/style.scss';
import { routeToAuth, checkTokenIsValid, updateToken } from './js/helpers';

window.onload = () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    renderSideBar();
    routeTo('/cardpage');
  } else {
    routeToAuth();
  }
};
