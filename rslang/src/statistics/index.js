import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import './css/style.scss';
import 'bootstrap/scss/bootstrap.scss';

import { renderSideBar } from '../js/SideBar/SideBar';
import { setBodyDataToDom, checkValidToken, routTo } from '../js/helpers';

window.onload = async () => {
  // if (localStorage.getItem('SWAuthData') && checkValidToken()) {
  renderSideBar();
  await setBodyDataToDom('statistics.html');
  await import('./js/statistics');
  // } else {
  //   routTo('/authorization');
  // }
};
