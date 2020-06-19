import 'core-js/stable';
import 'regenerator-runtime/runtime';
// eslint-disable-next-line import/named
import { authorization, logIn } from '../authorization-page/js/authorization';

if (typeof window !== 'undefined') {
  window.onload = () => {
    if (localStorage.getItem('SWAuthData') && JSON.parse(localStorage.getItem('SWAuthData')).userId) {
      logIn();
      // renderHomePage();
    } else {
      authorization();
    }
  };
}
