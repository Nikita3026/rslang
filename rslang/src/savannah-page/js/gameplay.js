import constants from './constants';

const startLoweringNewWord = () => {
    constants.STEAM_INNER.classList.add('hide-steam');
    constants.STEAM.classList.remove('steam-rise-animation');
    constants.STEAM_INNER.classList.remove('steam-up-animation');
    constants.MAIN_WORD.classList.add('main-word-animation');
}

startLoweringNewWord();

const reduceNumberOfLives = () => {
    let currentLive = document.querySelector('.fa-heart');
    currentLive.classList.remove('fa-heart');
    currentLive.classList.add('fa-heart-broken');
    currentLive.classList.add('broken');
}

const wrongAnswer = () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.STEAM.classList.add('steam-rise-animation');
    constants.STEAM_INNER.classList.add('steam-up-animation');
    constants.STEAM_INNER.classList.remove('hide-steam');
    reduceNumberOfLives();
}

constants.MAIN_WORD.addEventListener('animationend', () => {
    wrongAnswer();
})

constants.STEAM_INNER.addEventListener('animationend', () => {
    constants.STEAM_INNER.classList.add('hide-steam');
    if (document.querySelectorAll('.fa-heart-broken').length === 5) {
        console.log('game-over');
    } else {
        setTimeout(() => {
            startLoweringNewWord()
        }, 500);
    }
})


const correctAnswer = () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.WATER_IMAGE.classList.add('water-animation');
    constants.WATER_IMAGE.hidden = false;
}

constants.ANSWER_OPTIONS.addEventListener('click', ({ target }) => {
    let realTarget = target.closest('.answer-text');
    if (realTarget.innerText.toLowerCase() === constants.MAIN_WORD.innerText.toLowerCase()) {
        correctAnswer();
    } else {
        wrongAnswer();
    }
})

constants.WATER_IMAGE.addEventListener('animationend', () => {
    constants.WATER_IMAGE.classList.remove('water-animation');
    constants.WATER_IMAGE.hidden = true;
    setTimeout(() => {
        startLoweringNewWord()
    }, 500);
})