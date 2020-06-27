import constants from "./constants";
import getWord from './getWord';

const getWrongAnswerOptions = async() => {
    let arrayOfWrongAnswerOptions = [];
    let arrayOfrandomValues = [];
    for (let i = 0; i < 3; i++) {
        let randomValue = {
            randomPage: Math.round(Math.random() * (5 - 1) + 1),
            randomLevel: Math.round(Math.random() * (29 - 1) + 1),
            randomNumberOfWord: Math.round(Math.random() * 19)
        }
        arrayOfrandomValues.push(randomValue);
    }
    for (let value of arrayOfrandomValues) {
        let randomWord = await getWord(value.randomPage, value.randomLevel);
        arrayOfWrongAnswerOptions.push(randomWord[value.randomNumberOfWord]);
    }
    return arrayOfWrongAnswerOptions;
}

const setWrongOptions = (wrongOptions, positionOfRightAnswer) => {
    let tempIndex = 0;
    wrongOptions.forEach((item) => {
        if (tempIndex === positionOfRightAnswer) {
            tempIndex++;
        }
        constants.POSSIBLE_ANSWERS[tempIndex].innerText = item.wordTranslate.toLowerCase();
        tempIndex++;
    });
}

const setNewWords = async() => {
    let mainWord;
    let randomWordNumber;
    let tempArrayOfLearningWords = JSON.parse(localStorage.learningWordsForSavannahGame);
    if (tempArrayOfLearningWords.length === 0) {
        mainWord = await getWord(localStorage.savannahPage, localStorage.savannahLevel);
        mainWord = mainWord[localStorage.savannahNumberOfWord];
    } else {
        let max = tempArrayOfLearningWords.length - 1;
        randomWordNumber = Math.trunc(Math.random() * (max - 0) + 0);
        mainWord = tempArrayOfLearningWords[randomWordNumber];
        tempArrayOfLearningWords.splice(randomWordNumber, 1);
        localStorage.setItem('learningWordsForSavannahGame', JSON.stringify(tempArrayOfLearningWords));
    }
    const wrongOptions = await getWrongAnswerOptions();
    constants.MAIN_WORD.innerText = mainWord.word.toLowerCase();
    let maxPositionValue = constants.POSSIBLE_ANSWERS.length - 1
    const positionForRightAnswer = Math.round(Math.random() * maxPositionValue);
    constants.POSSIBLE_ANSWERS[positionForRightAnswer].innerText = mainWord.wordTranslate.toLowerCase();
    setWrongOptions(wrongOptions, positionForRightAnswer);
    localStorage.currentMainWordOfSavannahGame = JSON.stringify(mainWord);
};

export default setNewWords;