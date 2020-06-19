import 'core-js/stable';
import 'regenerator-runtime/runtime';
import constants from './constants';

import '../../assets/scss/style.scss';

constants.BTN_START.addEventListener('click', () => {
    constants.START_PAGE.hidden = true;
    constants.MAIN_PAGE.hidden = false;
})