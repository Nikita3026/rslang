import { createHtmlForWord, playAudio } from './createHtmlForWord';

const containers = Array.from(document.querySelectorAll('.container'))
  .reduce((container, el) => {
    const prev = container;
    prev[el.dataset.name] = el;
    return prev;
  }, {});

const renderHtml = {

  dictionary(name) {
    const htmlCode = createHtmlForWord(name);
    return htmlCode;
  },
  restore(name) {
    return `<div class='word-other' data-name='${name.word}'><span>${name.word}</span>
    <button class='restore'>Восстановить</button></div>`;
  },
  deleted(name) {
    return this.restore(name);
  },
  difficult(name) {
    return this.restore(name);
  },

};

const words = {
  dictionary: JSON.parse(localStorage.getItem('dictionary') || '[]'),
  deleted: JSON.parse(localStorage.getItem('deleted') || '[]'),
  difficult: JSON.parse(localStorage.getItem('difficult') || '[]'),
};

function save(name) {
  localStorage.setItem(name, JSON.stringify(words[name]));
}

function fill(name) {
  const html = words[name].reduce((code, current) => code + renderHtml[name](current), '');
  containers[name].insertAdjacentHTML('afterbegin', html);
}

fill('dictionary');
fill('deleted');
fill('difficult');

const navs = document.querySelectorAll('.nav');
navs.forEach((el) => {
  const { target } = el.dataset;

  el.addEventListener('click', () => {
    if (el.classList.contains('selected')) return;

    navs.forEach((element) => element.classList.remove('selected'));
    el.classList.add('selected');

    Object.values(containers).forEach((element) => element.classList.add('closed'));
    containers[target].classList.remove('closed');
  });
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.remove') || event.target.closest('.difficult')) {
    let name;
    if (event.target.closest('.remove')) name = 'deleted';
    else if (event.target.closest('.difficult')) name = 'difficult';

    const dom = event.target.closest('.word');
    const index = words.dictionary.map((el) => el.word).indexOf(dom.dataset.name);

    dom.remove();
    containers[name].insertAdjacentHTML('beforeend', renderHtml[name](words.dictionary[index]));

    words[name].push(words.dictionary[index]);
    words.dictionary.splice(index, 1);
    save(name);
    save('dictionary');
  }

  if (event.target.closest('.restore')) {
    const dom = event.target.closest('.word');
    const { name } = event.target.closest('.container').dataset;
    const index = words[name].map((el) => el.word).indexOf(dom.dataset.name);

    dom.remove();
    containers.dictionary.insertAdjacentHTML('beforeend', renderHtml.dictionary(words[name][index]));

    words.dictionary.push(words[name][index]);
    words[name].splice(index, 1);
    save('dictionary');
    save(name);
  }

  if (event.target.closest('.audio')) {
    const dom = event.target.closest('.word');
    const index = words.dictionary.map((el) => el.word).indexOf(dom.dataset.name);
    playAudio(index, words.dictionary);
  }
});
