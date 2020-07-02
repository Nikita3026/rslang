import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../../assets/scss/style.scss';

import constants from './constants';
import checkMute from './check-mute';
import './gameplay';
import './swiper';

constants.BTN_START.addEventListener('click', () => {
  constants.START_PAGE.hidden = true;
  constants.LOADING_PAGE.hidden = false;
  if (!checkMute()) {
    constants.START_SOUND.play();
  }
  const countdownInterval = setInterval(() => {
    if (constants.COUNTDOWN.innerText === '1') {
      clearInterval(countdownInterval);
      constants.LOADING_PAGE.hidden = true;
      constants.MAIN_PAGE.hidden = false;
      constants.COUNTDOWN.innerText = 3;
    } else {
      constants.COUNTDOWN.innerText = +constants.COUNTDOWN.innerText - 1;
    }
  }, 1000);
});

const changeSoundMode = () => {
  if (constants.CROSS_OUT.hidden) {
    constants.CROSS_OUT.hidden = false;
    constants.MUTE_BTN.classList.add('muted');
    localStorage.setItem('isSoundsMute', true);
  } else {
    constants.CROSS_OUT.hidden = true;
    constants.MUTE_BTN.classList.remove('muted');
    localStorage.setItem('isSoundsMute', false);
  }
};

if (localStorage.isSoundsMute === 'true') changeSoundMode();

constants.MUTE_BTN.addEventListener('click', changeSoundMode);
constants.CROSS_OUT.addEventListener('click', changeSoundMode);

constants.CLOSE_BTN.addEventListener('click', () => {
  constants.MAIN_WORD.classList.remove('main-word-animation');
});

constants.CANCEL_BTN.addEventListener('click', () => {
  constants.MAIN_WORD.classList.add('main-word-animation');
});

constants.QUIT_BTNS.forEach((item) => {
  item.addEventListener('click', () => {
    document.location.href = './index.html';
  });
});

constants.PROCEED_BTN.addEventListener('click', () => {
  document.location.href = './savannah.html';
});
