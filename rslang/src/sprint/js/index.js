import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import '../css/sprint.scss';

import { renderApp } from './sprint';
import SideBar from '../../js/SideBar/SideBar';

const pageHTML = `<div class="container container-fluid starting-window wrapper">
<ul class="title animate-ul">
    <li>S</li>
    <li>P</li>
    <li>R</li>
    <li>I</li>
    <li>N</li>
    <li>T</li>
  </ul>
  <div class="overlay"></div>
  <div class="button start-game_button"><a href="#">Start game </a></div>
</div>

<div class="container-fluid wrapper game-window hidden">
<div class="row align-items-center">
  <div class="col difficulty">
      <div class="row justify-content-center level">6</div>
      <div class="row justify-content-center level">5</div>
      <div class="row justify-content-center level">4</div>
      <div class="row justify-content-center level">3</div>
      <div class="row justify-content-center level">2</div>
      <div class="row justify-content-center level level__active">1</div>
  </div>
  <div class="col  gameflow">
    <div class="row justify-content-center score">
        <p class="total-points">0</p>
    </div>

    <div class="card  text-center">
        <div class="card-header">
            <h5 class="card-title row justify-content-center points">10</h5>
        </div>
        <div class="card-body">
          
          <p class="card-text row justify-content-center word_ru">макака</p>
          <p class="row justify-content-center word_en">monkey</p>
          
        </div>
        <div class="card-footer text-muted">
            <div class="row justify-content-around buttons">
                <div class="col-sm-3 btn_false">Неверно</div>
                <div class="col-sm-3 btn_true">Верно</div>
            </div>
        </div>
    </div> 
    <div class="row justify-content-center keys">
        <div class="col-sm-3 key_false">&larr;</div>
        <div class="col-sm-3 key_true">&rarr;</div>
    </div>
  </div>
  <div class="col">
      <div class="row justify-content-center timer"></div>
  </div>
</div>
</div>`;

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
