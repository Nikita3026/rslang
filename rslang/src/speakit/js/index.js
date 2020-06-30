import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../css/style.scss';
import { renderApp } from './speakit';
import SideBar from '../../js/SideBar/SideBar';

const pageHTML = `<header>
<div class="header__container">
<div class="wrapper">
<nav class="header_navigation">
<ul>
<li class="nav_item active" data-level = 0>
<a href="#" class="nav_link level_0"></a>
</li>
<li class="nav_item" data-level = 1>
<a href="#" class="nav_link level_1"></a>
</li>
<li class="nav_item" data-level = 2>
<a href="#" class="nav_link level_2"></a>
</li>
<li class="nav_item" data-level = 3>
<a href="#" class="nav_link level_3"></a>
</li>
<li class="nav_item" data-level = 4>
<a href="#" class="nav_link level_4"></a>
</li>
<li class="nav_item" data-level = 5>
<a href="#" class="nav_link level_5"></a>
</li>
</ul>
</nav>
</div>            
</div>
</header>
<main>
<section class="image__container">
<div class="wrapper">
</div>
</section>
<section class="words__container">
<div class="wrapper">
</div>
</section>
<section class="buttons__container">
<div class="wrapper">
</div>
</section>
<section class="stat__container">
<div class="wrapper">                
</div>
</section>
</main>`;

const renderSideBar = () => {
  const sideBar = new SideBar();
  const sideBarElement = sideBar.init();
  document.querySelector('body').insertAdjacentElement('afterbegin', sideBarElement);
};

window.onload = () => {
  document.querySelector('body').innerHTML = pageHTML;
  renderSideBar();
  renderApp();
};
