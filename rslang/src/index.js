import 'core-js/stable';
import 'regenerator-runtime/runtime';
import SideBar from './js/SideBar/SideBar';
import 'bootstrap';
import './assets/scss/style.scss';
import { routTo, checkValidToken } from './js/helpers';

const renderSideBar = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};

window.onload = () => {
  if (localStorage.getItem('SWAuthData') && checkValidToken()) {
    renderSideBar();
    // const { renderApp } = await import('./js/renderApp'); 
    // renderHomePage();
  } else {
    routTo('/authorization');
  }
};
