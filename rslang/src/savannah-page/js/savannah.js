import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../../assets/scss/style.scss';

import constants from './constants';
import './gameplay';
import './swiper';


constants.BTN_START.addEventListener('click', () => {
    constants.START_PAGE.hidden = true;
    constants.LOADING_PAGE.hidden = false;
    const countdownInterval = setInterval(() => {
        if (constants.COUNTDOWN.innerText == 1) {
            clearInterval(countdownInterval);
            constants.LOADING_PAGE.hidden = true;
            constants.MAIN_PAGE.hidden = false;
            constants.COUNTDOWN.innerText = 3;
        } else {
            constants.COUNTDOWN.innerText = +constants.COUNTDOWN.innerText - 1;
        }
    }, 1000)
})

const changeSoundMode = () => {
    if (constants.CROSS_OUT.hidden) {
        constants.CROSS_OUT.hidden = false;
    } else {
        constants.CROSS_OUT.hidden = true;
    }
}

constants.MUTE_BTN.addEventListener('click', changeSoundMode);
constants.CROSS_OUT.addEventListener('click', changeSoundMode);

constants.CLOSE_BTN.addEventListener('click', () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
})

constants.CANCEL_BTN.addEventListener('click', () => {
    constants.MAIN_WORD.classList.add('main-word-animation');
})

constants.QUIT_BTN.addEventListener('click', () => {
    document.location.href = './index.html';
})