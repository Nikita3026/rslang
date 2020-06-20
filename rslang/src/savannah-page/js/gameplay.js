import constants from './constants';

const reduceNumberOfLives = () => {
    let currentLive = document.querySelector('.fa-heart');
    currentLive.classList.remove('fa-heart');
    currentLive.classList.add('fa-heart-broken');
    currentLive.classList.add('broken');
}

const startLoweringNewWord = () => {
    constants.STEAM_INNER.classList.add('hide-steam');
    constants.STEAM.classList.remove('steam-rise-animation');
    constants.STEAM_INNER.classList.remove('steam-up-animation');
    constants.MAIN_WORD.classList.add('main-word-animation');
}

constants.MAIN_WORD.addEventListener('animationend', () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.STEAM.classList.add('steam-rise-animation');
    constants.STEAM_INNER.classList.add('steam-up-animation');
    constants.STEAM_INNER.classList.remove('hide-steam');
    reduceNumberOfLives();
})

constants.STEAM_INNER.addEventListener('animationend', () => {
    constants.STEAM_INNER.classList.add('hide-steam');
    if (document.querySelectorAll('.fa-heart-broken').length === 5) {
        console.log('game-over');
    }
    setTimeout(() => {
        startLoweringNewWord()
    }, 500);
})

startLoweringNewWord();