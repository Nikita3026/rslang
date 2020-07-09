import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './scss/style.scss';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
  setBodyDataToDom, checkTokenIsValid, routeTo, updateToken,
} from '../js/helpers';

window.onload = async () => {
  if (localStorage.getItem('SWAuthData')) {
    if (!checkTokenIsValid()) {
      updateToken();
    }
    await setBodyDataToDom('cardpage.html');
    renderSideBar();
    const { nextCard } = await import('./js/changeCard');
    await nextCard();
  } else {
    routeTo('/authorization');
  }
};
