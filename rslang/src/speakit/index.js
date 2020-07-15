import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  checkTokenIsValid, routeToAuth, updateToken,
} from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    renderSideBar();
    const { renderStartPage } = await import('./js/startPage');
    renderStartPage();
  } else {
    routeToAuth();
  }
};
