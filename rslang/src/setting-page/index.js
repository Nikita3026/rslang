import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkTokenIsValid, routeTo } from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData') && checkTokenIsValid()) {
    await setBodyDataToDom('setting-page.html');
    renderSideBar();
    const { renderApp } = await import('./js/setting-page');
    renderApp();
  } else {
    routeTo('/authorization');
  }
};
