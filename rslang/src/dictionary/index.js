import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import './css/style.scss';
import {
  checkTokenIsValid, routeToAuth, updateToken,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    renderSideBar();
    await import('./js/dictionary');
  } else {
    routeToAuth();
  }
};
