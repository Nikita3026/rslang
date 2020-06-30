import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { authorization } from './authorization';

const pageHTML = '<section class="login_from__container"></section>';

window.onload = async () => {
  document.querySelector('body').innerHTML = pageHTML;
  authorization();
};
