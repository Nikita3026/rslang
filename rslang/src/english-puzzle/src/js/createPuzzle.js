import createElement from './createElement';

export default (data) => {
  const wrapperGame = document.querySelector('.wrapper-game');
  const bounding = wrapperGame.getBoundingClientRect();
  const game = document.querySelector('.wrapper-sentences-game').children;

  const puzzleGame = createElement('div', {
    classList: ['wrapper-game-puzzle'],
  });
  const assembledPuzzleGame = createElement('div', {
    classList: ['wrapper-assembled-game-puzzle'],
  });

  [...game].forEach((sentence, heightIndex) => {
    const assembledSentencePuzzle = createElement('div', {
      classList: ['picked-sentence-game', `sentence-${heightIndex}`],
    });
    assembledPuzzleGame.append(assembledSentencePuzzle);

    const sentencePuzzle = createElement('div', {
      classList: ['sentence-game-puzzle', `sentence-${heightIndex}`],
    });
    puzzleGame.append(sentencePuzzle);

    let widthPuzzle = 0;
    [...sentence.children].forEach((word, index) => {
      const bound = word.getBoundingClientRect();

      let width = Number(bound.width);
      if (sentence.children.length - 1 > index) {
        width += 10;
      }

      const wordPuzzle = createElement('div', {
        classList: ['word-game-puzzle', 'picked-word-game-puzzle'],
        innerText: `${word.textContent}`,
        'data-key-word': `${word.textContent}`,
        'puzzle-key-sentence': `${heightIndex}`,
      }, {
        width: `${width}px`,
        height: `${bound.height}px`,
        background: `url(./src/assets/data_paintings/${data.pageImage.imageSrc})`,
        backgroundSize: `${bounding.width}px`,
        backgroundPositionX: `-${widthPuzzle}px`,
        backgroundPositionY: `-${bound.height * heightIndex}px`,
      });

      if (index === 0) {
        wordPuzzle.classList.add('first-puzzle');
      }
      if (index > 0 && sentence.children.length - 1 > index) {
        wordPuzzle.classList.add('center-puzzle');
      }
      if (sentence.children.length - 1 === index) {
        wordPuzzle.classList.add('last-puzzle');
      }
      widthPuzzle += Number(bound.width);

      const assembledWordPuzzle = wordPuzzle.cloneNode(true);
      assembledWordPuzzle.classList.remove('picked-word-game-puzzle');
      assembledWordPuzzle.textContent = '';
      wordPuzzle.classList.remove('word-game-puzzle');
      if (!assembledWordPuzzle.classList.contains('last-puzzle')) {
        assembledWordPuzzle.classList.add('assembled-puzzle');
      }

      assembledSentencePuzzle.append(assembledWordPuzzle);
      sentencePuzzle.append(wordPuzzle);
    });
  });
  [...wrapperGame.children].forEach((node) => node.remove());
  wrapperGame.append(assembledPuzzleGame);
  return puzzleGame;
};
