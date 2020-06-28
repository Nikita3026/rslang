import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/scss/style.scss';
import SideBar from './SideBar/SideBar';

window.onload = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};
