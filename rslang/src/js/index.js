import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SideBar from './SideBar/SideBar';
import '../assets/scss/style.scss';
import { routTo } from './helpers';
// import { authorization, logIn } from '../authorization/js/authorization';

const renderSideBar = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};

window.onload = () => {
  if (localStorage.getItem('SWAuthData') && JSON.parse(localStorage.getItem('SWAuthData')).token) {
    // renderHomePage();
    renderSideBar();
  } else {
    routTo('/authorization');
  }
};
