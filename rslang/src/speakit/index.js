import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import SideBar from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkValidToken, routTo } from '../js/helpers';

import './css/style.scss';

const renderSideBar = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};

window.onload = async () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    renderSideBar();
    await setBodyDataToDom('speakit.html');
    const { renderApp } = await import('./js/speakit');
    renderApp();
  } else {
    routTo('/authorization');
  }
};
