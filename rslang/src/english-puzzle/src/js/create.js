import createElement from './createElement';
import existRemove from './existRemove';
import registration from './registration';
import getPhrase from './api.phrase';
import Game from './Game';
import signIN from './signIn';
import signUP from './signUp';

// Create all page with sign up, regisration
function createSignPage(mode) {
  existRemove('.sign-page');
  existRemove('.start-page');
  existRemove('.main-page');
  if (mode === 'UP') {
    const signPage = createElement('div', {
      classList: ['sign-page'],
      innerHTML: '<h1 class="sign-page__title">Sign up</h1>',
    });
    const signUpForm = createElement('form', {
      classList: ['sign-up-form'],
      name: 'signUp',
    });
    const wrapperEmail = createElement('div', { classList: ['wrapper-email'] });
    const labelEmail = createElement('label', {
      for: 'email',
      innerText: 'Your email: ',
    });
    const inputEmail = createElement('input', {
      classList: ['sign-up-email'],
      type: 'email',
      name: 'email',
      required: 'required',
    });
    wrapperEmail.append(labelEmail, inputEmail);

    const wrapperPassword = createElement('div', { classList: ['wrapper-password'] });
    const labelPassword = createElement('label', {
      for: 'password',
      innerText: 'Password: ',
    });
    const inputPassword = createElement('input', {
      classList: ['sign-up-password'],
      type: 'password',
      name: 'password',
      pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W|_])[a-zA-Z0-9_\\W]{8,}$',
      required: 'required',
    });
    wrapperPassword.append(labelPassword, inputPassword);
    const inputSubmit = createElement('input', {
      classList: ['sign-up', 'btn'],
      type: 'submit',
      value: 'Sign up',
    });
    inputSubmit.onclick = (e) => {
      const { signUp } = document.forms;
      const emailValue = signUp.elements.email.value;
      const passwordValue = signUp.elements.password.value;
      if (emailValue && passwordValue) {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_])[a-zA-Z0-9_\W]{8,}$/.test(passwordValue)) {
          e.preventDefault();
          signUP({ email: emailValue, password: passwordValue });
        }
      }
    };
    signUpForm.append(wrapperEmail, wrapperPassword, inputSubmit);

    signPage.append(signUpForm);
    document.querySelector('body').append(signPage);
  }
  if (mode === 'IN') {
    const signPage = createElement('div', {
      classList: ['sign-page'],
      innerHTML: '<h1 class="sign-page__title">Sign in</h1>',
    });
    const signUpForm = createElement('form', {
      classList: ['sign-in-form'],
      name: 'signIn',
    });
    const wrapperEmail = createElement('div', { classList: ['wrapper-email'] });
    const labelEmail = createElement('label', {
      for: 'email',
      innerText: 'Your email: ',
    });
    const inputEmail = createElement('input', {
      classList: ['sign-in-email'],
      type: 'email',
      name: 'email',
      required: 'required',
    });
    wrapperEmail.append(labelEmail, inputEmail);

    const wrapperPassword = createElement('div', { classList: ['wrapper-password'] });
    const labelPassword = createElement('label', {
      for: 'password',
      innerText: 'Password: ',
    });
    const inputPassword = createElement('input', {
      classList: ['signin-password'],
      type: 'password',
      name: 'password',
      required: 'required',
    });
    wrapperPassword.append(labelPassword, inputPassword);
    const inputSubmit = createElement('input', {
      classList: ['sign-in', 'btn'],
      type: 'submit',
      value: 'sign in',
    });
    inputSubmit.onclick = (e) => {
      const { signIn } = document.forms;
      const emailValue = signIn.elements.email.value;
      const passwordValue = signIn.elements.password.value;
      if (emailValue && passwordValue) {
        e.preventDefault();
        signIN({ email: emailValue, password: passwordValue });
      }
    };
    signUpForm.append(wrapperEmail, wrapperPassword, inputSubmit);

    signPage.append(signUpForm);
    document.querySelector('body').append(signPage);
  }
}

function createMainPage() {
  const mainPage = createElement('div', {
    classList: ['main-page'],
  });

  const mainPageNav = createElement('nav', {
    classList: ['main-page-nav'],
  });

  const wrapperLevel = createElement('div', {
    classList: ['wrapper-level'],
  });
  const labelLevel = createElement('label', {
    for: 'level',
    innerText: 'Level: ',
  });
  const selectLevel = createElement('select', {
    classList: ['select-level'],
    name: 'level',
    innerHTML: `
      <option value="0">1</option>
      <option value="1">2</option>
      <option value="2">3</option>
      <option value="3">4</option>
      <option value="4">5</option>
      <option value="5">6</option>
    `,
  });
  wrapperLevel.append(labelLevel, selectLevel);

  const wrapperLevelPage = createElement('div', {
    classList: ['wrapper-level-page'],
  });
  const labelLevelPage = createElement('label', {
    for: 'level-page',
    innerText: 'Page: ',
  });
  const selectLevelPage = createElement('select', {
    classList: ['select-level-page'],
    name: 'level-page',
  });
  // 30 elements for select (30 pages)
  for (let i = 0; i < 30; i += 1) {
    const option = createElement('option', {
      value: `${i}`,
      innerText: `${i + 1}`,
    });
    selectLevelPage.append(option);
  }
  selectLevel.onchange = () => {
    getPhrase(selectLevel.value, selectLevelPage.value)
      .then((nodes) => {
        new Game(nodes).prepareForMakePuzzle();
      });
  };
  selectLevelPage.onchange = () => {
    getPhrase(selectLevel.value, selectLevelPage.value)
      .then((nodes) => {
        new Game(nodes).prepareForMakePuzzle();
      });
  };
  wrapperLevelPage.append(labelLevelPage, selectLevelPage);

  const wrapperPrompt = createElement('div', {
    classList: ['wrapper-prompt'],
  });

  const audioPrompt = createElement('div', {
    classList: ['audio-prompt', 'prompt'],
    title: 'on / off audio',
  });
  audioPrompt.onclick = () => {
    if (audioPrompt.classList.contains('disabled')) {
      audioPrompt.classList.remove('disabled');
      document.querySelector('.speech-audio').classList.remove('opacity-clear-zero');
    } else {
      audioPrompt.classList.add('disabled');
      document.querySelector('.speech-audio').classList.add('opacity-clear-zero');
    }
  };

  const translatePrompt = createElement('div', {
    classList: ['translate-prompt', 'prompt'],
    title: 'on / off translate',
  });
  translatePrompt.onclick = () => {
    if (translatePrompt.classList.contains('disabled')) {
      translatePrompt.classList.remove('disabled');
      document.querySelector('.pronunciation-text').classList.remove('opacity-clear-zero');
    } else {
      translatePrompt.classList.add('disabled');
      document.querySelector('.pronunciation-text').classList.add('opacity-clear-zero');
    }
  };

  const volumePrompt = createElement('div', {
    classList: ['volume-prompt', 'prompt'],
    title: 'on / off volume',
  });
  volumePrompt.onclick = () => {
    if (volumePrompt.classList.contains('disabled')) {
      volumePrompt.classList.remove('disabled');
    } else {
      volumePrompt.classList.add('disabled');
    }
  };

  const imageCardPrompt = createElement('div', {
    classList: ['image-card-prompt', 'prompt'],
    title: 'on / off card',
  });
  imageCardPrompt.onclick = () => {
    const puzzleCards = document.querySelectorAll('.picked-word-game-puzzle');

    if (imageCardPrompt.classList.contains('disabled')) {
      imageCardPrompt.classList.remove('disabled');
      puzzleCards.forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle.replace('background: darkslategray;', '')}`);
      });
    } else {
      imageCardPrompt.classList.add('disabled');
      puzzleCards.forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: darkslategray;`);
      });
    }
  };

  const imageAllPrompt = createElement('div', {
    classList: ['image-all-prompt', 'prompt'],
    title: 'on / off puzzle translate',
  });
  imageAllPrompt.onclick = () => {
    const cellNests = document.querySelectorAll('.word-game-puzzle');

    if (imageAllPrompt.classList.contains('disabled')) {
      imageAllPrompt.classList.remove('disabled');
      [...cellNests].forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle.replace('background: #05ce70;', '')}`);
      });
    } else {
      imageAllPrompt.classList.add('disabled');
      [...cellNests].forEach((puzzle) => {
        const currentStyle = puzzle.getAttribute('style');
        puzzle.setAttribute('style', `${currentStyle}background: #05ce70;`);
      });
    }
  };
  wrapperPrompt.append(audioPrompt, translatePrompt, volumePrompt, imageCardPrompt, imageAllPrompt);

  mainPageNav.append(wrapperLevel, wrapperLevelPage, wrapperPrompt);
  mainPage.append(mainPageNav);
  document.querySelector('body').append(mainPage);

  const levelObj = window.localStorage.getItem('english-puzzle-levelObj');
  if (levelObj) {
    const obj = JSON.parse(levelObj);
    selectLevel.value = obj.level;
    selectLevelPage.value = obj.page;
  }

  getPhrase(selectLevel.value, selectLevelPage.value)
    .then((nodes) => {
      new Game(nodes).prepareForMakePuzzle();
    });
}

function createStartPage() {
  existRemove('.sign-page');
  existRemove('.start-page');
  registration('logged');

  const startPage = createElement('div', {
    classList: ['start-page'],
  });

  const startPageTitle = createElement('h1', {
    classList: ['start-page__title'],
    innerText: 'ENGLISH PUZZLE',
  });
  const startPageText = createElement('p', {
    classList: ['start-page__text'],
    innerHTML: `Click on words, collect phrases.<br>
  Words can be drag and drop. Select tooltips in the menu.`,
  });
  const startPageButton = createElement('button', {
    classList: ['start-page__button', 'btn'],
    innerText: 'Start',
  });
  startPageButton.onclick = () => {
    startPage.remove();
    createMainPage();
  };
  startPage.append(startPageTitle, startPageText, startPageButton);
  document.querySelector('body').append(startPage);
}

const header = createElement('header', {
  classList: ['header'],
});

const logout = createElement('button', {
  classList: ['logout', 'event-none', 'btn-small'],
  innerText: 'Logout',
});
logout.onclick = () => {
  localStorage.removeItem('token');
  registration('not logged');
  createSignPage('IN');
};

const pageSignIn = createElement('button', {
  classList: ['page-sign-in', 'btn-small'],
  innerText: 'Autrhorization',
});
pageSignIn.onclick = () => {
  createSignPage('IN');
};

const pageSignUp = createElement('button', {
  classList: ['page-sign-up', 'btn-small'],
  innerText: 'Sign up',
});
pageSignUp.onclick = () => {
  createSignPage('UP');
};

header.append(logout, pageSignIn, pageSignUp);
document.querySelector('body').append(header);

export {
  createSignPage,
  createStartPage,
  createMainPage,
};
