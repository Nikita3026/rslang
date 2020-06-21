import Word from './Word';
import { handleClickByWord, getImageById } from './utils'

class WordsList {
    constructor(data) {
        this.data = data;
        //this.getActiveDataList = this.getActiveDataList.bind(this);
    }

    init() {        
        //this.renderTranslateToDom();
        //this.renderSpeakListenToDom();
        this.renderWordsListToDom();
        this.renderImageToDom();
        this.eventListner();
    }
    
    eventListner() {
        document.querySelector('.words__container > .wrapper').addEventListener('click', handleClickByWord);
    }    

    renderImageToDom() {
        let image = this.getImageFromData();
        let imageContainer = document.querySelector('.image__container > .wrapper');
        imageContainer.innerHTML = '';
        imageContainer.insertAdjacentElement('afterbegin', image);       
    }

    getImageFromData() {
        let imageElement = document.createElement('img');
        let firstId = Number(document.querySelectorAll('.word_item')[0].dataset.id);
        let imageUrl = getImageById(firstId);
        imageElement.src = imageUrl;
        return imageElement;
    }

    renderWordsListToDom() {
        let wordsListContainer = document.querySelector('section.words__container > .wrapper');
        wordsListContainer.innerHTML = '';
        let wordsFromDataList = this.getWordsFromData();
        if (wordsListContainer) {
            wordsFromDataList.map(element => {
                let wordEl = element.getWordTemplate();
                wordsListContainer.insertAdjacentElement('beforeend', wordEl);
            })
        }
        
    }

    getWordsFromData() {
        let wordsArr = [];
        //let dataList = this.getActiveDataList();
        this.data.forEach(item => {
            let wordItem = this.renderWord(item)
            wordsArr.push(wordItem);
        })

        return wordsArr;
    }

    renderWord(item) {
        let word = null;
        word = new Word(item);        
        return word;
    }
}

export default WordsList;