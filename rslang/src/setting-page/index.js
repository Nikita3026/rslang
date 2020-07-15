import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  checkTokenIsValid, routeToAuth 
} from '../js/helpers';

import './css/style.scss';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData') && checkTokenIsValid()) {
    renderSideBar();
    const { setSettingsLocalstorage } = await import('./js/setting-page');
    setSettingsLocalstorage();
  } else {
    routeToAuth();
  }
};
