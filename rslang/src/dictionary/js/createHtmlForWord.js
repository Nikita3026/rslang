export const settings = {
  textMeaning: true,
  textExample: true,
  image: true,
  audioMeaning: false,
  audioExample: false,
  wordTranslate: true,
  audio: true,
  transcription: true,
  showAnswer: true,
  delete: true,
  difficultWords: true,
  maxCards: 10,
  maxNewWords: 10,
  again: true,
  hard: true,
  alright: true,
  easy: true,
  repeatWords: true,
  onlyDifficultWords: false,
};

const URL_MATERIALS = 'https://raw.githubusercontent.com/Nikita3026/rslang-data/master/';
const namesSettings = ['textMeaning', 'textExample', 'transcription'];
const levelsLearning = ['у вас прекрасная память',
  'это слово так и вертится у вас на языке', 'вы в процессе запоминания слова',
  'это слово нужно подучить'];

function createButtons() {
  let htmlCode = '';
  if (settings.delete) {
    htmlCode += "<button class='remove'>Удалить</button>";
  }
  if (settings.difficultWords) {
    htmlCode += "<button class='difficult'>Сложные</button>";
  }
  return htmlCode;
}

function createImage(data) {
  let htmlCode = '';
  if (settings.image) {
    htmlCode += `<img src='${URL_MATERIALS}${data.image}'>`;
  }
  return htmlCode;
}

function checkSettingsForHTMLCode(data) {
  let code = '';
  namesSettings.forEach((name) => {
    if (settings[name]) {
      code += `<p>${data[name]}</p>`;
    }
  });
  code += '</div>';
  return code;
}

function createProgressLearning(data) {
  let htmlCode = `<span>Количество повторений: ${data.replays}</span>`;
  htmlCode += `<span>Повторялось последний раз: ${data.oldInterval}</span>`;
  htmlCode += `<span>Повторится снова: ${data.interval}</span>`;
  htmlCode += `<span>Уровень изучения слова: ${levelsLearning[data.coefficient]}</span>`;
  htmlCode += '</div>';
  return htmlCode;
}

export function createHtmlForWord(data) {
  let htmlCode = `<div class='word' data-name='${data.word}'><div><span class="word-text">
  ${data.word}</span><button class="audio">Слушать</button>`;
  htmlCode += createButtons(htmlCode);
  htmlCode += `<p>${data.wordTranslate}</p>`;
  htmlCode += checkSettingsForHTMLCode(data);
  htmlCode += createImage(data, htmlCode);
  htmlCode += createProgressLearning(data);
  return htmlCode;
}

export function playAudio(dom, words) {
  const index = words.map((el) => el.word).indexOf(dom.dataset.name);
  const audio = new Audio();
  audio.src = `${URL_MATERIALS}${words[index].audio}`;
  audio.autoplay = true;
}
