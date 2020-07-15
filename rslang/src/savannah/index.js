import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'bootstrap';
import { renderSideBar } from '../js/SideBar/SideBar';
import {
    setBodyDataToDom,
    checkTokenIsValid,
    routeTo,
    updateToken,
} from '../js/helpers';

import './scss/style.scss';

window.onload = async() => {
    if (localStorage.getItem('SWAuthData')) {
        if (!checkTokenIsValid()) {
            updateToken();
        }
        await setBodyDataToDom('savannah.html');
        renderSideBar();
        const { renderApp } = await
        import ('./js/savannah');
        renderApp();
    } else {
        routeTo('/authorization');
    }
};