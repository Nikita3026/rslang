import constants from './constants';
import setNewWords from './setWords';
const temp = [{ "id": "5e9f5ee35eb9e72bc21af4c8", "group": 0, "page": 2, "word": "alien", "image": "files/03_0041.jpg", "audio": "files/03_0041.mp3", "audioMeaning": "files/03_0041_meaning.mp3", "audioExample": "files/03_0041_example.mp3", "textMeaning": "An <i>alien</i> is a creature from a different world.", "textExample": "The <b>alien</b> came in peace.", "transcription": "[éiljən]", "textExampleTranslate": "пришелец пришел с миром", "textMeaningTranslate": "Инопланетянин - это существо из другого мира", "wordTranslate": "инопланетянин", "wordsPerExampleSentence": 5 }, { "id": "5e9f5ee35eb9e72bc21af4c9", "group": 0, "page": 2, "word": "among", "image": "files/03_0042.jpg", "audio": "files/03_0042.mp3", "audioMeaning": "files/03_0042_meaning.mp3", "audioExample": "files/03_0042_example.mp3", "textMeaning": "If you are <i>among</i> certain things, they are all around you.", "textExample": "There was a red apple <b>among</b> the green ones.", "transcription": "[əmʌ̀ŋ]", "textExampleTranslate": "Среди зеленых было красное яблоко", "textMeaningTranslate": "Если вы среди определенных вещей, они все вокруг вас", "wordTranslate": "среди", "wordsPerExampleSentence": 9 }, { "id": "5e9f5ee35eb9e72bc21af4ca", "group": 0, "page": 2, "word": "chart", "image": "files/03_0043.jpg", "audio": "files/03_0043.mp3", "audioMeaning": "files/03_0043_meaning.mp3", "audioExample": "files/03_0043_example.mp3", "textMeaning": "A <i>chart</i> is a list of information.", "textExample": "We used a <b>chart</b> to see how we had improved.", "transcription": "[tʃɑːrt]", "textExampleTranslate": "Мы использовали график, чтобы увидеть, как мы улучшили", "textMeaningTranslate": "Диаграмма - это список информации", "wordTranslate": "диаграмма", "wordsPerExampleSentence": 10 }, { "id": "5e9f5ee35eb9e72bc21af4cb", "group": 0, "page": 2, "word": "cloud", "image": "files/03_0044.jpg", "audio": "files/03_0044.mp3", "audioMeaning": "files/03_0044_meaning.mp3", "audioExample": "files/03_0044_example.mp3", "textMeaning": "A <i>cloud</i> is a group of water drops in the sky.", "textExample": "The sky was filled with white <b>clouds</b>.", "transcription": "[klaud]", "textExampleTranslate": "Небо было наполнено белыми облаками", "textMeaningTranslate": "Облако - это группа капель воды в небе", "wordTranslate": "облако", "wordsPerExampleSentence": 7 }, { "id": "5e9f5ee35eb9e72bc21af4cc", "group": 0, "page": 2, "word": "describe", "image": "files/03_0045.jpg", "audio": "files/03_0045.mp3", "audioMeaning": "files/03_0045_meaning.mp3", "audioExample": "files/03_0045_example.mp3", "textMeaning": "To <i>describe</i> is to say or write what someone or something is like.", "textExample": "They <b>described</b> their tree as colorful, with gold ribbon and a star.", "transcription": "[diskráib]", "textExampleTranslate": "Они описали свое дерево как красочное, с золотой лентой и звездой", "textMeaningTranslate": "Описать - это сказать или написать, на что похож кто-то или что-то", "wordTranslate": "описать", "wordsPerExampleSentence": 12 }, { "id": "5e9f5ee35eb9e72bc21af4cd", "group": 0, "page": 2, "word": "ever", "image": "files/03_0046.jpg", "audio": "files/03_0046.mp3", "audioMeaning": "files/03_0046_meaning.mp3", "audioExample": "files/03_0046_example.mp3", "textMeaning": "<i>Ever</i> means at any time.", "textExample": "Going skiing last winter was the most fun I’ve <b>ever</b> had.", "transcription": "[évər]", "textExampleTranslate": "Кататься на лыжах прошлой зимой было самым веселым из всего, что я когда-либо ел", "textMeaningTranslate": "Всегда означает в любое время", "wordTranslate": "когда-либо", "wordsPerExampleSentence": 11 }, { "id": "5e9f5ee35eb9e72bc21af4ce", "group": 0, "page": 2, "word": "fail", "image": "files/03_0047.jpg", "audio": "files/03_0047.mp3", "audioMeaning": "files/03_0047_meaning.mp3", "audioExample": "files/03_0047_example.mp3", "textMeaning": "To <i>fail</i> means you do not succeed in what you try to do.", "textExample": "Since he <b>failed</b> to get the job, he was sad.", "transcription": "[feil]", "textExampleTranslate": "Так как он не смог получить работу, ему было грустно", "textMeaningTranslate": "Неудача означает, что вам не удается то, что вы пытаетесь сделать", "wordTranslate": "потерпеть поражение", "wordsPerExampleSentence": 10 }, { "id": "5e9f5ee35eb9e72bc21af4cf", "group": 0, "page": 2, "word": "grade", "image": "files/03_0048.jpg", "audio": "files/03_0048.mp3", "audioMeaning": "files/03_0048_meaning.mp3", "audioExample": "files/03_0048_example.mp3", "textMeaning": "A <i>grade</i> is a score or mark given to someone’s work.", "textExample": "I managed to get good <b>grades</b> on my report card.", "transcription": "[greid]", "textExampleTranslate": "Мне удалось получить хорошие оценки на моем табеле", "textMeaningTranslate": "Оценка - это оценка или оценка, присвоенная чьей-либо работе", "wordTranslate": "класс", "wordsPerExampleSentence": 10 }, { "id": "5e9f5ee35eb9e72bc21af4d0", "group": 0, "page": 2, "word": "instead", "image": "files/03_0049.jpg", "audio": "files/03_0049.mp3", "audioMeaning": "files/03_0049_meaning.mp3", "audioExample": "files/03_0049_example.mp3", "textMeaning": "<i>Instead</i> means in place of.", "textExample": "He ate the carrot <b>instead</b> of the ice cream.", "transcription": "[instéd]", "textExampleTranslate": "Он съел морковку вместо мороженого", "textMeaningTranslate": "Вместо означает вместо", "wordTranslate": "вместо", "wordsPerExampleSentence": 9 }, { "id": "5e9f5ee35eb9e72bc21af4d1", "group": 0, "page": 2, "word": "library", "image": "files/03_0050.jpg", "audio": "files/03_0050.mp3", "audioMeaning": "files/03_0050_meaning.mp3", "audioExample": "files/03_0050_example.mp3", "textMeaning": "A <i>library</i> is a place where you go to read books.", "textExample": "The <b>library</b> at school is full of books.", "transcription": "[láibrèri]", "textExampleTranslate": "Библиотека в школе полна книг", "textMeaningTranslate": "Библиотека - это место, куда вы ходите читать книги", "wordTranslate": "библиотека", "wordsPerExampleSentence": 8 }, { "id": "5e9f5ee35eb9e72bc21af4d2", "group": 0, "page": 2, "word": "photograph", "image": "files/03_0051.jpg", "audio": "files/03_0051.mp3", "audioMeaning": "files/03_0051_meaning.mp3", "audioExample": "files/03_0051_example.mp3", "textMeaning": "I like taking <i>photographs</i>.", "textExample": "I took this <b>photograph</b> with my cell phone.", "transcription": "[fóutəgrӕf]", "textExampleTranslate": "Я сделал эту фотографию на свой мобильный", "textMeaningTranslate": "Мне нравится фотографировать", "wordTranslate": "фотография", "wordsPerExampleSentence": 8 }, { "id": "5e9f5ee35eb9e72bc21af4d3", "group": 0, "page": 2, "word": "planet", "image": "files/03_0052.jpg", "audio": "files/03_0052.mp3", "audioMeaning": "files/03_0052_meaning.mp3", "audioExample": "files/03_0052_example.mp3", "textMeaning": "A <i>planet</i> is a large round thing in space.", "textExample": "Saturn is the <b>planet</b> with the ring around it.", "transcription": "[plǽnət]", "textExampleTranslate": "Сатурн - планета с кольцом вокруг него", "textMeaningTranslate": "Планета - это большая круглая вещь в космосе", "wordTranslate": "планета", "wordsPerExampleSentence": 9 }, { "id": "5e9f5ee35eb9e72bc21af4d4", "group": 0, "page": 2, "word": "report", "image": "files/03_0053.jpg", "audio": "files/03_0053.mp3", "audioMeaning": "files/03_0053_meaning.mp3", "audioExample": "files/03_0053_example.mp3", "textMeaning": "A <i>report</i> is something someone writes for school or work.", "textExample": "Karen had trouble writing her <b>report</b>.", "transcription": "[ripɔ́ːrt]", "textExampleTranslate": "Карен не могла написать свой отчет", "textMeaningTranslate": "Отчет - это то, что кто-то пишет для школы или работы", "wordTranslate": "отчет", "wordsPerExampleSentence": 6 }, { "id": "5e9f5ee35eb9e72bc21af4d5", "group": 0, "page": 2, "word": "several", "image": "files/03_0054.jpg", "audio": "files/03_0054.mp3", "audioMeaning": "files/03_0054_meaning.mp3", "audioExample": "files/03_0054_example.mp3", "textMeaning": "<i>Several</i> is more than two but not many.", "textExample": "He had to read <b>several</b> books for class.", "transcription": "[sévərəl]", "textExampleTranslate": "Он должен был прочитать несколько книг для класса", "textMeaningTranslate": "Несколько больше двух, но не много", "wordTranslate": "несколько", "wordsPerExampleSentence": 8 }, { "id": "5e9f5ee35eb9e72bc21af4d6", "group": 0, "page": 2, "word": "shape", "image": "files/03_0055.jpg", "audio": "files/03_0055.mp3", "audioMeaning": "files/03_0055_meaning.mp3", "audioExample": "files/03_0055_example.mp3", "textMeaning": "An object’s <i>shape</i> is the arrangement of its sides and surfaces.", "textExample": "Even with your eyes closed you can feel the <b>shape</b> of it.", "transcription": "[ʃeip]", "textExampleTranslate": "Даже с закрытыми глазами вы можете почувствовать его форму", "textMeaningTranslate": "Форма объекта - это расположение его сторон и поверхностей", "wordTranslate": "форма", "wordsPerExampleSentence": 12 }, { "id": "5e9f5ee35eb9e72bc21af4d7", "group": 0, "page": 2, "word": "solve", "image": "files/03_0056.jpg", "audio": "files/03_0056.mp3", "audioMeaning": "files/03_0056_meaning.mp3", "audioExample": "files/03_0056_example.mp3", "textMeaning": "To <i>solve</i> something is to find an answer to it.", "textExample": "All the students could easily <b>solve</b> the math problem.", "transcription": "[sɑlv]", "textExampleTranslate": "Все ученики могли легко решить математическую задачу", "textMeaningTranslate": "Решить что-то - значит найти ответ", "wordTranslate": "решать", "wordsPerExampleSentence": 9 }, { "id": "5e9f5ee35eb9e72bc21af4d8", "group": 0, "page": 2, "word": "suddenly", "image": "files/03_0057.jpg", "audio": "files/03_0057.mp3", "audioMeaning": "files/03_0057_meaning.mp3", "audioExample": "files/03_0057_example.mp3", "textMeaning": "If something happens <i>suddenly</i>, it happens quickly and unexpectedly.", "textExample": "I was surprised when my friends <b>suddenly</b> shouted, “Happy birthday!”", "transcription": "[sʌ́dnli]", "textExampleTranslate": "Я был удивлен, когда мои друзья вдруг закричали: 'С днем рождения!'", "textMeaningTranslate": "Если что-то происходит внезапно, это происходит быстро и неожиданно", "wordTranslate": "вдруг, внезапно", "wordsPerExampleSentence": 10 }, { "id": "5e9f5ee35eb9e72bc21af4d9", "group": 0, "page": 2, "word": "suppose", "image": "files/03_0058.jpg", "audio": "files/03_0058.mp3", "audioMeaning": "files/03_0058_meaning.mp3", "audioExample": "files/03_0058_example.mp3", "textMeaning": "To <i>suppose</i> is to guess.", "textExample": "I <b>suppose</b> I should go home now.", "transcription": "[səpóuz]", "textExampleTranslate": "Полагаю, мне пора домой", "textMeaningTranslate": "Предположить, значит угадать", "wordTranslate": "предположим", "wordsPerExampleSentence": 7 }, { "id": "5e9f5ee35eb9e72bc21af4da", "group": 0, "page": 2, "word": "understand", "image": "files/03_0059.jpg", "audio": "files/03_0059.mp3", "audioMeaning": "files/03_0059_meaning.mp3", "audioExample": "files/03_0059_example.mp3", "textMeaning": "To <i>understand</i> something you need to know what it means.", "textExample": "Henry could not <b>understand</b> the message.", "transcription": "[Λndərstǽnd]", "textExampleTranslate": "Генри не мог понять сообщение", "textMeaningTranslate": "Чтобы понять что-то, нужно знать, что это значит", "wordTranslate": "понимаю", "wordsPerExampleSentence": 6 }, { "id": "5e9f5ee35eb9e72bc21af4db", "group": 0, "page": 2, "word": "view", "image": "files/03_0060.jpg", "audio": "files/03_0060.mp3", "audioMeaning": "files/03_0060_meaning.mp3", "audioExample": "files/03_0060_example.mp3", "textMeaning": "To <i>view</i> is to look at something.", "textExample": "Michael likes to <b>view</b> himself in the mirror.", "transcription": "[vjuː]", "textExampleTranslate": "Михаилу нравится видеть себя в зеркале", "textMeaningTranslate": "Смотреть - значит смотреть на что-то", "wordTranslate": "посмотреть", "wordsPerExampleSentence": 8 }]


localStorage.setItem('learningWords', JSON.stringify(temp));
localStorage.setItem('learningWordsForSavannahGame', localStorage.learningWords);


if (localStorage.savannahPage == undefined) {
    localStorage.savannahPage = 0;
    localStorage.savannahLevel = 0;
    localStorage.savannahNumberOfWord = 0;
}

const increaseLevel = () => {
    if (localStorage.savannahNumberOfWord === constants.MAX_WORD_NUMBER) {
        localStorage.savannahNumberOfWord = 0;
        if (localStorage.savannahLevel === constants.MAX_LEVEL) {
            localStorage.savannahLevel = 0;
            if (localStorage.savannahPage === constants.MAX_PAGE) {
                localStorage.savannahPage = 0;
            } else {
                localStorage.savannahPage++;
            }
        } else {
            localStorage.savannahLevel++;
        }
    } else {
        localStorage.savannahNumberOfWord++;
    }
}

const startLoweringNewWord = async() => {
    await setNewWords();
    constants.ANSWER_OPTIONS.hidden = false;
    increaseLevel();
    constants.MAIN_WORD.classList.remove('not-guessed');
    constants.STEAM_INNER.classList.add('hide-steam');
    constants.STEAM.classList.remove('steam-rise-animation');
    constants.STEAM_INNER.classList.remove('steam-up-animation');
    constants.MAIN_WORD.classList.add('main-word-animation');
}

startLoweringNewWord();

const reduceNumberOfLives = () => {
    let currentLive = document.querySelector('.fa-heart');
    currentLive.classList.remove('fa-heart');
    currentLive.classList.add('fa-heart-broken');
    currentLive.classList.add('broken');
}

const wrongAnswer = () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.MAIN_WORD.classList.add('not-guessed');
    constants.STEAM.classList.add('steam-rise-animation');
    constants.STEAM_INNER.classList.add('steam-up-animation');
    constants.STEAM_INNER.classList.remove('hide-steam');
    reduceNumberOfLives();
}

constants.MAIN_WORD.addEventListener('animationend', () => {
    wrongAnswer();
})

constants.STEAM_INNER.addEventListener('animationend', () => {
    constants.STEAM_INNER.classList.add('hide-steam');
    if (document.querySelectorAll('.fa-heart-broken').length === 5) {
        console.log('game-over');
    } else {
        setTimeout(() => {
            startLoweringNewWord();
        }, 250);
    }
})


const correctAnswer = () => {
    constants.MAIN_WORD.classList.remove('main-word-animation');
    constants.WATER_IMAGE.classList.add('water-animation');
    constants.WATER_IMAGE.hidden = false;

}

constants.ANSWER_OPTIONS.addEventListener('click', ({ target }) => {
    let realTarget;
    if (target.classList.contains('number-of-answer')) {
        realTarget = target.nextSibling;
    } else if (target.classList.contains('possible-answer')) {
        realTarget = target.lastChild;
    } else {
        realTarget = target;
    }

    let mainWord = JSON.parse(localStorage.currentMainWordOfSavannahGame);
    if (constants.MAIN_WORD.classList.contains('main-word-animation')) {
        if (realTarget.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
            if (!constants.MAIN_WORD.classList.contains('not-guessed')) {
                target.closest('.possible-answer').classList.add('highlight-right-choosen-word');
                setTimeout(() => {
                    target.closest('.possible-answer').classList.remove('highlight-right-choosen-word');
                }, 1500);
                correctAnswer();
            }
        } else {
            target.closest('.possible-answer').classList.add('highlight-wrong-word');
            constants.POSSIBLE_ANSWERS.forEach((item) => {
                if (item.innerText.toLowerCase() === mainWord.wordTranslate.toLowerCase()) {
                    item.closest('.possible-answer').classList.add('highlight-right-word');
                    setTimeout(() => {
                        target.closest('.possible-answer').classList.remove('highlight-wrong-word');
                        item.closest('.possible-answer').classList.remove('highlight-right-word');
                    }, 1500);
                }
            });
            wrongAnswer();
        }
    }

})

constants.WATER_IMAGE.addEventListener('animationend', () => {
    constants.WATER_IMAGE.classList.remove('water-animation');
    constants.WATER_IMAGE.hidden = true;
    setTimeout(() => {
        startLoweringNewWord();
    }, 250);
});

document.addEventListener('keydown', (event) => {
    if (event.key == '1' ||
        event.key == '2' ||
        event.key == '3' ||
        event.key == '4') {
        constants.POSSIBLE_ANSWERS_CONTAINER[event.key - 1].dispatchEvent(new Event('click', {
            bubbles: true
        }));
    }
})