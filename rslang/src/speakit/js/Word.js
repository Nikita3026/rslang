import { getWordTranslate } from './getData'

const DATAPATH = 'https://raw.githubusercontent.com/okrypets/rslang-data/master/data/';
const audioIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="M15.788 13.007a3 3 0 110 5.985c.571 3.312 2.064 5.675 3.815 5.675 2.244 0 4.064-3.88 4.064-8.667 0-4.786-1.82-8.667-4.064-8.667-1.751 0-3.244 2.363-3.815 5.674zM19 26c-3.314 0-12-4.144-12-10S15.686 6 19 6s6 4.477 6 10-2.686 10-6 10z" fill-rule="evenodd"></path></svg>'

class Word {
    constructor(item) {
        this.word = item.word
        this.image = item.image;
        this.audio = item.audio;
        //this.audioMeaning = item.audioMeaning;
        //this.audioExample = item.audioExample
        //this.textMeaning = item.textMeaning;
        //this.textExample = item.textExample;
        this.transcription = item.transcription;
        this.getWordTemplate = this.getWordTemplate.bind(this);
        this.setTranslate = this.setTranslate.bind(this);
    }

    getWordTemplate() {
        let wordContainer = this.getWordContainer();
        let wordElement = this.getWordElement();
        let transcriptionTextElement = this.getTranscriptionElement();
        let audioElement = this.getAudioElement();
        
        getWordTranslate(this.word).then(text => {
            this.setTranslate(text[0]);
            let translationTextElement = this.getTranslationElement(text[0]);
            wordContainer.insertAdjacentElement('beforeend', translationTextElement);
        })

        wordContainer.insertAdjacentHTML('beforeend', audioIcon);
        wordContainer.insertAdjacentElement('beforeend', wordElement);
        wordContainer.insertAdjacentElement('beforeend', transcriptionTextElement);
        wordContainer.insertAdjacentElement('beforeend', audioElement);

        return wordContainer;
    }

    getWordContainer() {
        let wordContainer = document.createElement('div');
        let wordId = this.getWordId();        
        wordContainer.classList.add('word_item');
        wordContainer.setAttribute('data-id', wordId);
        return wordContainer;
    }

    getWordElement() {
        let wordTextElement = document.createElement('p');
        wordTextElement.classList.add('word');
        wordTextElement.innerText = this.word;
        return wordTextElement;
    }

    getTranscriptionElement() {
        let transcriptionTextElement = document.createElement('p');
        transcriptionTextElement.classList.add('transcription');
        transcriptionTextElement.innerText = this.transcription;
        return transcriptionTextElement;
    }
    
    setTranslate (text) {
        //let trText = getWordTranslate(this.word);
        this.translation = text;
    }

    getTranslationElement(text) {
        let translationTextElement = document.createElement('p');
            translationTextElement.classList.add('translation');
        // getWordTranslate(this.word).then(text => {
        //     this.setTranslate(text[0]);            
        //     translationTextElement.innerText = text[0];
        //     return translationTextElement;
        // }
        // )
        translationTextElement.innerText = text;
        return translationTextElement;
    }

    getWordId() {
        let regexp = (/[0-9]{4}/g);
        let id = Number(this.image.match(regexp)[0]);
        return id;
    }

    getAudioElement() {
        let audioElement = document.createElement('audio');
        let audio = this.audio.replace(/[files\/]/g, '');
        audioElement.id = 'audio-player';
        audioElement.controls = 'controls';
        audioElement.src = `${DATAPATH}${audio}`;
        audioElement.type = 'audio/mpeg';
        return audioElement;
    }
}

export default Word;