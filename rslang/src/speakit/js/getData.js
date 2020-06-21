const APIKEY = 'trnsl.1.1.20200422T200912Z.a68ad41293aef7a3.cddbdee20e19a0100c455bffae0536a6139d3de6';

export const getWordTranslate = async (word) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${APIKEY}&text= ${word} &lang=en-ru`;
  const res = await fetch(url);
  const data = await res.json();
  const { text } = data;
  return text;
};

export const getWords = async (page, group) => {
  const rawResponse = await fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`, {
    method: 'GET',
    // withCredentials: true,
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await rawResponse.json();
  return data;
};
