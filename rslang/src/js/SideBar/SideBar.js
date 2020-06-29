import 'bootstrap';
import { createLink } from '../helpers';
import sideBarList from './sideBarList';
import './SideBar.scss';

const toggleSidebar = () => {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
};

const renderNavButtonToDom = () => {
  const navButtonContainer = document.createElement('nav');
  navButtonContainer.classList.add('navbar', 'navbar-expand-lg', 'navbar-light');
  const divBlocContainer = document.createElement('div');
  divBlocContainer.classList.add('container-fluid');
  const buttonElement = document.createElement('button');
  buttonElement.classList.add('btn', 'btn-info');
  buttonElement.id = 'sidebarCollapse';
  buttonElement.setAttribute('type', 'button');
  const spanElement = document.createElement('span');
  spanElement.classList.add('navbar-toggler-icon');
  buttonElement.insertAdjacentElement('beforeend', spanElement);
  divBlocContainer.insertAdjacentElement('beforeend', buttonElement);
  navButtonContainer.insertAdjacentElement('beforeend', divBlocContainer);
  document.querySelector('body').insertAdjacentElement('afterbegin', navButtonContainer);
  buttonElement.addEventListener('click', toggleSidebar);
};

const linkListener = ( el, link ) => {
  el.addEventListener("click", () => {
    import(/* webpackChunkName: "lazyLoaded" */ `./src${link}/js${link}.js`).then(module => module.renderApp());
  });
};

export default class SideBar {
  constructor() {
    this.data = sideBarList;
    this.sideBar = document.createElement('nav');
  }

  init() {
    this.sideBar.id = 'sidebar';
    this.renderSidebarHeaderToDom();
    this.renderNavListToDom();
    renderNavButtonToDom();
    // this.addEventListener();
    return this.sideBar;
  }

  renderSidebarHeaderToDom() {
    const sidebarHeaderContainer = document.createElement('div');
    sidebarHeaderContainer.classList.add('sidebar-header');
    const linkElement = createLink('/');
    const h3 = document.createElement('h3');
    h3.classList.add('logo');
    h3.innerText = 'RS LANG';
    linkElement.insertAdjacentElement('beforeend', h3);
    sidebarHeaderContainer.insertAdjacentElement('beforeend', linkElement);
    this.sideBar.insertAdjacentElement('beforeend', sidebarHeaderContainer);
    return sidebarHeaderContainer;
  }

  renderNavListToDom() {
    const ulElement = document.createElement('ul');
    ulElement.classList.add('list-unstyled', 'components');
    this.data.forEach((it) => {
      const liElement = document.createElement('li');
      liElement.classList.add('li-item');
      const liLink = createLink(it.link);
      liLink.innerText = it.title;
      liElement.insertAdjacentElement('beforeend', liLink);
      if (it.child.length > 0) {
        liLink.classList.add('dropdown-toggle');
        liLink.setAttribute('data-toggle', 'collapse');
        liLink.setAttribute('aria-expanded', 'false');
        const childUl = document.createElement('ul');
        childUl.classList.add('collapse', 'list-unstyled');
        childUl.id = 'pageSubmenu';
        it.child.forEach((ch) => {
          const chilLi = document.createElement('li');
          const childLink = createLink(ch.link);
          childLink.innerText = ch.title;
          chilLi.insertAdjacentElement('beforeend', childLink);
          childUl.insertAdjacentElement('beforeend', chilLi);
        });
        liElement.insertAdjacentElement('beforeend', childUl);
      }
      ulElement.insertAdjacentElement('beforeend', liElement);
    });
    this.sideBar.insertAdjacentElement('beforeend', ulElement);
    return ulElement;
  }
}
