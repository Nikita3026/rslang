import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import './css/style.scss';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  setBodyDataToDom, checkTokenIsValid, routeTo, updateToken,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    await setBodyDataToDom('statistics.html');
    renderSideBar();
    await import('./js/statistics');
  } else {
    routeTo('/authorization');
  }
};
