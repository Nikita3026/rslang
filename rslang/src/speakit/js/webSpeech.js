import { getDataArrActive } from '../index';
import { checkResult, getIsPlay } from './utils';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;

const words = () => {
  const dataArrActive = getDataArrActive();
  dataArrActive.reduce((worsObj, it) => {
    const { word: itWord } = it;
    // worsObj[word] = itWord;
    worsObj.push(itWord);
    console.log(worsObj);
    return worsObj;
  }, {});
};

const wordsList = Object.keys(words);

const grammar = `#JSGF V1.0; grammar words; public <word> = ${wordsList.join(' | ')} ;`;

// eslint-disable-next-line no-undef
export const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
// recognition.continuous = false;
recognition.lang = 'en-EN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.addEventListener('start', () => {
  console.log('start');
});

recognition.addEventListener('result', (event) => {
  console.log(event.results);
  const last = event.results.length - 1;
  checkResult(event.results[last][0].transcript);
  recognition.stop();
});

recognition.addEventListener('end', () => {
  console.log('end');
  const isPlay = getIsPlay();
  if (isPlay) {
    recognition.start();
  } else {
    recognition.abort();
  }
  return false;
});

recognition.onnomatch = () => alert("I didn't recognise the word.");

export default {};
