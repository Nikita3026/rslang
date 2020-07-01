import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import './scss/authorization.scss';
import { authorization } from './js/authorization';
import { setBodyDataToDom } from '../js/helpers';

const pageHTML = '<section class="login_from__container"></section>';

window.onload = async () => {
  setBodyDataToDom(pageHTML, 'Authorization');
  authorization();
};
