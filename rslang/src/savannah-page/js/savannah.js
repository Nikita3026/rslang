import 'core-js/stable';
import 'regenerator-runtime/runtime';
import constants from './constants';

import '../../assets/scss/style.scss';

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

constants.MUTE_BTN.addEventListener('click', () => {
    constants.MUTE_BTN.classList.toggle('muted');
})