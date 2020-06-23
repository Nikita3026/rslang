import { settings } from './settings';
import {
  MIN_NUMBER, URL_MATERIALS, app, NEXT_NUMBER,
} from './constants';
import { changeTextButton } from './createCard';

const audios = ['audio', 'audioMeaning', 'audioExample'];
const changeSound = document.querySelector('.change-sound');
const TEXT_PLAY_SOUND = 'Включить звук';
const TEXT_OFF_SOUND = 'Выключить звук';

let numberAudio = 0;

function searchAudio() {
  if (settings[audios[numberAudio]] === false && numberAudio < audios.length) {
    numberAudio += NEXT_NUMBER;
    searchAudio();
  }
}

export function playAudio(allWords, nextCard) {
  if (settings.audio && numberAudio < audios.length) {
    app.style.pointerEvents = 'none';
    const audio = new Audio();
    audio.src = `${URL_MATERIALS}${allWords[MIN_NUMBER][audios[numberAudio]]}`;
    audio.autoplay = true;
    audio.onended = () => playAudio(allWords, nextCard);
    numberAudio += NEXT_NUMBER;
    searchAudio();
  } else {
    numberAudio = MIN_NUMBER;
    nextCard();
  }
}

function checkAudio() {
  if (settings.textExample) {
    settings.audioExample = true;
  }
  if (settings.textMeaning) {
    settings.audioMeaning = true;
  }
  changeTextButton(changeSound, 'audio', TEXT_PLAY_SOUND, TEXT_OFF_SOUND);
}
checkAudio();

export function buttonChangeSound() {
  changeSound.addEventListener('click', () => {
    settings.audio = !settings.audio;
    checkAudio();
  });
}
