import 'bootstrap';
import { recognition } from './webSpeech';
import { renderStatToDom } from './stat';
import {
  hideTranslation,
  renderMicrophoneLineToDom,
  restart, setIsPlay,
} from './utils';

const startSpeachListen = () => {
  recognition.start();
};

export const toggleBtnSpeachClass = () => {
  document.querySelector('section.buttons__container a.btn.btn_speach').classList.toggle('active');
};

export const handleButtonClick = (event) => {
  event.preventDefault();
  if (!event.target.classList.contains('btn')) return;
  const { target } = event;

  if (target.classList.contains('btn_speach')) {
    setIsPlay(true);
    toggleBtnSpeachClass();
    hideTranslation();
    renderMicrophoneLineToDom();
    startSpeachListen();
  }

  if (target.classList.contains('btn_restart')) {
    restart();
  }

  if (target.classList.contains('btn_result')) {
    document.querySelector('section.stat__container').style.display = 'flex';
    renderStatToDom();
  }
};

const createButton = (text, classList) => {
  const buttonsContainer = document.querySelector('section.buttons__container > .wrapper');
  const buttonElement = document.createElement('a');
  buttonElement.innerText = text;
  buttonElement.classList.add('btn');
  buttonElement.classList.add(classList);
  buttonsContainer.insertAdjacentElement('beforeend', buttonElement);
};

export const renderButtonsToDom = () => {
  const buttonsContainer = document.querySelector('section.buttons__container > .wrapper');
  createButton('Restart', 'btn_restart');
  createButton('Speach', 'btn_speach');
  createButton('Result', 'btn_result');
  buttonsContainer.addEventListener('click', handleButtonClick);
};

export default {};
