import { dataArrActive } from '../../index';
import { checkResult, getIsPlay } from './utils';

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const words = () => {
    dataArrActive.reduce((worsObj, it) => {
        const { word } = it;
        worsObj[word] = word;
        console.log(worsObj);
        return worsObj;
    }, {})
}

const wordsList = Object.keys(words);

const grammar = '#JSGF V1.0; grammar words; public <word> = ' + wordsList.join(' | ') + ' ;';

export const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();


speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-EN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// microphoneButton.onclick = () => {
//     recognition.start();
//     console.log('Ready to receive a color command.');
// };


// recognition.onaudiostart = () => {
//     console.log('recognition - start');
// };

// recognition.onresult = (event) => {
//     const last = event.results.length - 1;
//     //const words = getColor(event.results[last][0].transcript); // исправить
//     //recognitionTextResult.textContent = 'Результат: ' + words[0];
//     //speechRecognitionSection.style.backgroundColor = colors[1];
//     console.log('Confidence: ' + event.results[0][0].confidence);
//     //recognition.stop();
//   };
recognition.addEventListener('start', () => {
    console.log(`start`);
  })


  recognition.addEventListener('result', (event) => {
    console.log(event.results);
    const last = event.results.length - 1;
    checkResult(event.results[last][0].transcript);
    recognition.stop();
  })

  recognition.addEventListener('end', () => {
    console.log(`end`)
    let isPlay = getIsPlay();
    isPlay ? recognition.start() : recognition.abort();
    //recognition.start()
  })

// recognition.onspeechend = () => {
//     console.log(`end`)
//     //recognition.start();
//     // microphoneWrapper.style.visibility = 'visible';
//     // audioRecordAnimation.style.visibility = 'hidden';
// };

recognition.onnomatch = (event) => {
    alert("I didn't recognise the word.");
};

// recognition.onerror = (event) => {
//     alert(`Error occurred in recognition: ${event.error}`);
// };