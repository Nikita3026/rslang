import constants from './constants';

const reduceNumberOfLives = () => {
    let currentLive = document.querySelector('.fa-heart');
    currentLive.classList.remove('fa-heart');
    currentLive.classList.add('fa-heart-broken');
    currentLive.classList.add('broken');
}