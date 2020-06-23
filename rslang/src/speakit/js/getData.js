const axios = require('axios').default;

const APIKEY = 'trnsl.1.1.20200422T200912Z.a68ad41293aef7a3.cddbdee20e19a0100c455bffae0536a6139d3de6';

export const getWordTranslate = (word) => axios.get(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIKEY}&text= ${word} &lang=en-ru`);

export const getWords = (page, group) => axios.get(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`);
