const informations = document.querySelectorAll('.informations');
const buttonArrow = document.querySelectorAll('.button_arrow');
const change = document.querySelectorAll('.change');
const userEmail = document.querySelector('.email');
const userName = document.querySelector('.user_name');
const inputPassword = document.querySelector('.input_password');
const changeSeeHover = document.querySelector('.change.see_hover');
const textareaMistake = document.querySelector('.textarea_mistake');
const buttonSettingAll = document.querySelectorAll('.button_setting');
const settingAll = document.querySelectorAll('.container_settings');
const checkboxAll = document.querySelectorAll('.checkbox_word');
const maxWordCardAll = document.querySelectorAll('.max_word_card');
const numberWords = document.querySelector('#maxNewWords');
const numberCards = document.querySelector('#maxCards');
const checkboxTranslation = document.querySelector('#wordTranslate');
const checkboxMeaning = document.querySelector('#textMeaning');
const checkboxUse = document.querySelector('#textExample');
const checkboxTranscription = document.querySelector('#transcription');
const checkboxImage = document.querySelector('#image');
const checkboxAnswer = document.querySelector('#showAnswer');
const checkboxDifficultGroup = document.querySelector('#difficultWords');
const checkboxDeleteWord = document.querySelector('#delete');
const checkboxAgain = document.querySelector('#again');
const checkboxHard = document.querySelector('#hard');
const checkboxAlright = document.querySelector('#alright');
const checkboxEasy = document.querySelector('#easy');
const repeatWords = document.querySelector('#repeat_word');
const onlyDifficultWords = document.querySelector('#onlyDifficultWords');
const noRepeatWord = document.querySelector('#no_repeat_word');
const themeLight = document.querySelector('#theme_light');
const temeDark = document.querySelector('#theme_dark');

let checkRepeatedClick;

let settings = {
  userFullName: 'Пользователь',
  userEmail: '',
  userPassword: '',
  deleteUser: false,
  theme: 'light',
  maxNewWords: 10,
  maxCards: 10,
  wordTranslate: true,
  textMeaning: true,
  textExample: true,
  transcription: true,
  image: true,
  showAnswer: true,
  difficultWords: true,
  delete: true,
  again: true,
  hard: true,
  alright: true,
  easy: true,
  repeatWords: true,
  onlyDifficultWords: false,
  noRepeatWord: false,
};

function getUserData() {
  const settingsParse = localStorage.getItem('SWAuthData');
  const userData = JSON.parse(settingsParse);

  settings.userEmail = `${userData.email}`;
  // settings.userFullName = `${userData.userName}`;
  userEmail.innerText = `${userData.email}`;
  // userName.innerText = `${userData.userName}`;
  userName.innerText = `${settings.userFullName}`;
}

getUserData();

const setLocalstorage = () => {
  localStorage.setItem('settings', JSON.stringify(settings));
};

if (!localStorage.getItem('settings')) {
  setLocalstorage();
}

// ----------------------reload change checked----------------------------------

function applySettings() {
  maxWordCardAll.forEach((el) => {
    for (const key in settings) {
      if (el.id === key) {
        el.value = settings[key];
      }
    }
  });

  checkboxAll.forEach((el) => {
    for (const key in settings) {
      if (el.id === key && settings[key] === true) {
        el.checked = true;
      } else if (el.id === key && settings[key] === false) {
        el.checked = false;
      }
    }
  });

  if (settings.theme === 'dark') {
    temeDark.checked = 'on';
  } else {
    themeLight.checked = 'on';
  }

  if (settings.repeatWords === true) {
    repeatWords.checked = 'on';
  } else if (settings.onlyDifficultWords === true) {
    onlyDifficultWords.checked = 'on';
  } else if (settings.noRepeatWord === true) {
    noRepeatWord.checked = 'on';
  }
}

function reload() {
  const settingsParse = localStorage.getItem('settings');
  settings = JSON.parse(settingsParse);
  applySettings();
}

reload();

// ---------------------------------------------------------------------------

function openChangeBlock(ind) {
  buttonArrow.forEach((el) => el.classList.remove('active'));
  change.forEach((el) => el.classList.remove('active'));

  if (checkRepeatedClick !== ind) {
    applySettings();

    buttonArrow[ind].classList.add('active');
    change[ind].classList.add('active');

    if (informations[ind].classList.value === 'informations change_password') {
      inputPassword.value = '';
    }

    if (informations[ind].classList.value === 'informations report_error') {
      textareaMistake.value = '';
    }
    checkRepeatedClick = ind;
  } else {
    checkRepeatedClick = -1;
  }
}

informations.forEach((el, ind) => {
  el.addEventListener('click', () => openChangeBlock(ind));
});

// ---------------------change info-------------------------

function changeInfoCard() {
  settings.wordTranslate = checkboxTranslation.checked;
  settings.textMeaning = checkboxMeaning.checked;
  settings.textExample = checkboxUse.checked;
  settings.transcription = checkboxTranscription.checked;
  settings.image = checkboxImage.checked;
  setLocalstorage();
  applySettings();
}

function changeMaxCards() {
  settings.maxCards = numberCards.value;
  setLocalstorage();
  applySettings();
}

function changeMaxNewWords() {
  settings.maxNewWords = numberWords.value;
  setLocalstorage();
  applySettings();
}

function changeButtonCards() {
  settings.showAnswer = checkboxAnswer.checked;
  settings.difficultWords = checkboxDifficultGroup.checked;
  settings.delete = checkboxDeleteWord.checked;
  setLocalstorage();
  applySettings();
}

function changeButtonPage() {
  settings.again = checkboxAgain.checked;
  settings.hard = checkboxHard.checked;
  settings.alright = checkboxAlright.checked;
  settings.easy = checkboxEasy.checked;
  setLocalstorage();
  applySettings();
}

function changeLearningWords() {
  settings.repeatWords = repeatWords.checked;
  settings.onlyDifficultWords = onlyDifficultWords.checked;
  settings.noRepeatWord = noRepeatWord.checked;
  setLocalstorage();
  applySettings();
}

function changePassword() {
  settings.userPassword = inputPassword.value;
  setLocalstorage();
  applySettings();
}

function changeDeleteUser() {
  settings.deleteUser = true;
  setLocalstorage();
  applySettings();
}

function changeTheme() {
  if (themeLight.checked) {
    settings.theme = 'light';
  } else {
    settings.theme = 'dark';
  }
  setLocalstorage();
  applySettings();
}

// ----------------------work with button block_change_setting------------------------

function clickButtonBlockChangeSetting(ind, event) {
  const buttonClick = `${event.target.className}`;

  switch (buttonClick) {
    case 'button_change save_password':
      openChangeBlock(ind);
      changePassword();
      break;
    case 'button_change cancel':
      openChangeBlock(ind);
      break;
    case 'button_change delete':
      openChangeBlock(ind);
      changeDeleteUser();
      break;
    case 'button_change send':
      openChangeBlock(ind);
      break;
    case 'button_change save_number_words':
      openChangeBlock(ind);
      changeMaxNewWords();
      break;
    case 'button_change save_number_cards':
      openChangeBlock(ind);
      changeMaxCards();
      break;
    case 'button_change save_info_card':
      openChangeBlock(ind);
      changeInfoCard();
      break;
    case 'button_change save_learning_words':
      openChangeBlock(ind);
      changeLearningWords();
      break;
    case 'button_change save_button_cards':
      openChangeBlock(ind);
      changeButtonCards();
      break;
    case 'button_change save_button_page':
      openChangeBlock(ind);
      changeButtonPage();
      break;
    case 'button_change save_theme':
      openChangeBlock(ind);
      changeTheme();
      break;
    default:
      break;
  }
}

change.forEach((el, ind) => {
  el.addEventListener('click', (event) => clickButtonBlockChangeSetting(ind, event));
});

// ---------------------see password-------------------------

function seePassword(event) {
  if (event.target.className === 'eye') {
    inputPassword.type = 'text';
  } else {
    inputPassword.type = 'password';
  }
}

changeSeeHover.addEventListener('mouseover', (event) => seePassword(event));

// ------------------click button setting----------------------

function clickButtonSetting(elem, ind) {
  buttonSettingAll.forEach((el) => el.classList.remove('active'));
  settingAll.forEach((el) => el.classList.remove('active'));

  elem.classList.add('active');
  settingAll[ind].classList.add('active');
}

buttonSettingAll.forEach((el, ind) => {
  el.addEventListener('click', () => clickButtonSetting(el, ind));
});

export default setLocalstorage;
