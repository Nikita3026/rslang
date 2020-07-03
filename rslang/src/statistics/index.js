import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkValidToken, routTo } from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    await setBodyDataToDom('statistics.html');
    renderSideBar();
    const { renderApp } = await import('./js/statistics');
    renderApp();
  } else {
    routTo('/authorization');
  }
};
