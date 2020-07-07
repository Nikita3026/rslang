import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import './assets/scss/style.scss';
import { routTo, checkValidToken } from './js/helpers';

window.onload = () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    routTo('/cardpage');
  } else {
    routTo('/authorization');
  }
};
