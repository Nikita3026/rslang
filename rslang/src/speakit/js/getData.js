const APIKEY = 'trnsl.1.1.20200422T200912Z.a68ad41293aef7a3.cddbdee20e19a0100c455bffae0536a6139d3de6'
//import Word from './Word'
import { renderWordsList, setDataFromReq } from '../../../src/index'

export const getWords = async (page, group) => {
    const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
    const res = await fetch(url);
    const json = await res.json();
    //const data = JSON.stringify(json, null, 1);
    const data = json;   
    //console.log(data);
    setDataFromReq(data);
    
};


export const getWordTranslate = async (word) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIKEY}&text= ${word} &lang=en-ru`;
    const res = await fetch(url);
    const data = await res.json();
    const text = data.text;
    //console.log(data.text);  
    return text;
}
