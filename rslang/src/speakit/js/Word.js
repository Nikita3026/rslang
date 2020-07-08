import 'bootstrap';

const DATAPATH = 'https://raw.githubusercontent.com/okrypets/rslang-data/master/data/';
const AUDIOICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>';
class Word {
  constructor(item) {
    this.word = item.word;
    this.image = item.image;
    this.audio = item.audio;
    this.transcription = item.transcription;
    this.translate = item.wordTranslate;
    this.getWordTemplate = this.getWordTemplate.bind(this);
    this.setTranslate = this.setTranslate.bind(this);
    this.translationTextElement = document.createElement('p');
  }

  getWordTemplate() {
    const wordContainer = this.getWordContainer();
    const wordElement = this.getWordElement();
    const transcriptionTextElement = this.getTranscriptionElement();
    const audioElement = this.getAudioElement();
    const translationTextElement = this.getTranslationElement(this.translate);

    wordContainer.insertAdjacentHTML('beforeend', AUDIOICON);
    wordContainer.insertAdjacentElement('beforeend', wordElement);
    wordContainer.insertAdjacentElement('beforeend', transcriptionTextElement);
    wordContainer.insertAdjacentElement('beforeend', audioElement);
    wordContainer.insertAdjacentElement('beforeend', translationTextElement);

    return wordContainer;
  }

  getTranslationElement(text) {
    this.translationTextElement.classList.add('translation');
    this.translationTextElement.innerText = text;
    return this.translationTextElement;
  }

  getWordContainer() {
    const wordContainer = document.createElement('div');
    const wordId = this.getWordId();
    wordContainer.classList.add('word_item');
    wordContainer.setAttribute('data-id', wordId);
    return wordContainer;
  }

  getWordElement() {
    const wordTextElement = document.createElement('p');
    wordTextElement.classList.add('word');
    wordTextElement.innerText = this.word;
    return wordTextElement;
  }

  getTranscriptionElement() {
    const transcriptionTextElement = document.createElement('p');
    transcriptionTextElement.classList.add('transcription');
    transcriptionTextElement.innerText = this.transcription;
    return transcriptionTextElement;
  }

  setTranslate(text) {
    this.translation = text;
  }

  getWordId() {
    const regexp = (/[0-9]{4}/g);
    const id = Number(this.image.match(regexp)[0]);
    return id;
  }

  getAudioElement() {
    const audioElement = document.createElement('audio');
    const audio = this.audio.replace(/[files/]/g, '');
    audioElement.id = 'audio-player';
    audioElement.controls = 'controls';
    audioElement.src = `${DATAPATH}${audio}`;
    audioElement.type = 'audio/mpeg';
    return audioElement;
  }
}

export default Word;