import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkValidToken, routTo } from '../js/helpers';

import './css/style.scss';
import '../assets/scss/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    await setBodyDataToDom('setting.html');
    renderSideBar();
    const { renderApp } = await import('./js/setting');
    renderApp();
  } else {
    routTo('/authorization');
  }
};
