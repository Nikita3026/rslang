import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkValidToken, routTo, updateToken } from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkValidToken()) {
      updateToken();
    }
    await setBodyDataToDom('sprint.html');
    renderSideBar();
    const { renderApp } = await import('./js/sprint');
    renderApp();
  } else {
    routTo('/authorization');
  }
};
