import GetData from '../../js/GetData';
import 'bootstrap';
import '../scss/authorization.scss';
import { routTo } from '../../js/helpers';

const CREATE_USER_LINK = 'https://afternoon-falls-25894.herokuapp.com/users';
const LOGIN_LINK = 'https://afternoon-falls-25894.herokuapp.com/signin';

let isValidPassword = false;
let isEqualPass = false;
let isValidEmail = false;
let isFormValid = false;
const regexValidationPassword = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
const regexValidationEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const getActiveTabType = () => {
  const tabActiveElement = document.querySelector('.tab_navigation > .nav_item.active');
  const { dataset: { type } } = tabActiveElement;
  return type;
};

const toogleTabActive = () => {
  const tabNavItems = document.querySelectorAll('.tab_navigation > .nav_item');
  tabNavItems.forEach((it) => {
    it.classList.toggle('active');
    it.classList.toggle('border-bottom-0');
  });
  return false;
};

export const updateToken = () => {
  const localData = JSON.parse(localStorage.getItem('SWAuthData'));
  const options = {
    headers: {
      common: {
        Authorization: `Bearer ${localData.refreshToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        WithCredentials: true,
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
  new GetData(`https://afternoon-falls-25894.herokuapp.com/users/${localData.userId}/tokens`, 'get', options)
    .sendRequest()
    .then((response) => {
      const loginAuthData = {
        ...localData,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        time: new Date(),
      };
      localStorage.setItem('SWAuthData', JSON.stringify(loginAuthData));
      routTo(window.location.href);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const logIn = (emailValue, passwordValue) => {
  const authLogin = new GetData(LOGIN_LINK, 'post', { email: `${emailValue}`, password: `${passwordValue}` })
    .sendRequest()
    .then((response) => {
      const loginAuthData = {
        email: emailValue,
        password: passwordValue,
        userId: response.data.userId,
        message: response.data.message,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        time: new Date(),
      };
      localStorage.setItem('SWAuthData', JSON.stringify(loginAuthData));
      routTo('/');
    })
    .catch((error) => {
      console.error(error);
    });
  return authLogin;
};

export const handleAuthorize = (event) => {
  event.preventDefault();
  event.stopPropagation();
  const { parentNode: { childNodes } } = event.target;
  const userEmail = childNodes[0].value;
  const userPassword = childNodes[1].value;
  const actionType = getActiveTabType();
  const isRegistration = actionType === 'register';
  if (isRegistration && !isFormValid) return;
  if (isRegistration) {
    new GetData(CREATE_USER_LINK, 'post', { email: `${userEmail}`, password: `${userPassword}` })
      .sendRequest()
      .then((response) => {
        const regAuthData = {
          email: userEmail,
          password: userPassword,
          id: response.data.id,
        };
        localStorage.setItem('SWAuthData', JSON.stringify(regAuthData));
        toogleTabActive();
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => logIn(userEmail, userPassword));
  } else logIn(userEmail, userPassword);
};

const checkIsPasswordValid = (value) => {
  const isValid = regexValidationPassword.test(value);
  isFormValid = isValid;
  return isValid;
};

const checkIsPasswordEqual = () => {
  const mainPass = document.querySelector('.password.main').value;
  const rSWeatPass = document.querySelector('.password.rSWeat').value;
  isFormValid = mainPass === rSWeatPass;
  return mainPass === rSWeatPass;
};

const checkIsEmailValid = (value) => {
  const isValid = regexValidationEmail.test(value);
  isFormValid = isValid;
  return isValid;
};

const checkIsButtonActive = (action) => {
  if (document.querySelector('.login_from_item.submit')) {
    if (
      (
        action === 'register'
      && isValidPassword
      && isEqualPass
      && isValidEmail)
      || (
        action === 'login'
        && isValidPassword
        && isValidEmail
      )
    ) {
      document.querySelector('.login_from_item.submit').removeAttribute('disabled');
    } else {
      document.querySelector('.login_from_item.submit').setAttribute('disabled', true);
    }
  }
  return isFormValid;
};

const getInputEmailElement = () => {
  const emailInputElement = document.createElement('input');
  emailInputElement.classList.add('form-control', 'login_from_item', 'email');
  emailInputElement.type = 'email';
  emailInputElement.required = true;
  emailInputElement.placeholder = 'Enter your e-mail*';
  emailInputElement.addEventListener('change', (event) => {
    emailInputElement.classList.remove('valid');
    emailInputElement.classList.remove('inValid');
    isValidEmail = checkIsEmailValid(event.target.value);
    if (isValidEmail) {
      emailInputElement.classList.add('valid');
    } else {
      emailInputElement.classList.add('inValid');
    }
    checkIsButtonActive(getActiveTabType());
  });
  return emailInputElement;
};

const getInputPasswordElement = (type) => {
  const passwordInputElement = document.createElement('input');
  passwordInputElement.classList.add('form-control', 'login_from_item', 'password', type);
  passwordInputElement.type = 'password';
  passwordInputElement.required = true;
  passwordInputElement.placeholder = type === 'main' ? 'Enter your password*' : 'Repeat your password*';
  passwordInputElement.addEventListener('change', (event) => {
    if (!event.target.value) return;
    passwordInputElement.classList.remove('valid');
    passwordInputElement.classList.remove('inValid');
    if (type === 'main') {
      isValidPassword = checkIsPasswordValid(event.target.value);
      if (isValidPassword) {
        passwordInputElement.classList.add('valid');
      } else {
        passwordInputElement.classList.add('inValid');
      }
    } else {
      isEqualPass = checkIsPasswordEqual(event.target.value);
      if (isEqualPass && isValidPassword) {
        passwordInputElement.classList.add('valid');
      } else {
        passwordInputElement.classList.add('inValid');
      }
    }
    checkIsButtonActive(getActiveTabType());
  });
  return passwordInputElement;
};

const getSubmitBtnElement = (text) => {
  const submitBtnElement = document.createElement('button');
  submitBtnElement.classList.add('btn', 'btn-success', 'login_from_item', 'submit');
  submitBtnElement.type = 'button';
  submitBtnElement.disabled = !isFormValid;
  submitBtnElement.innerText = text;
  submitBtnElement.addEventListener('click', (event) => handleAuthorize(event));
  return submitBtnElement;
};

export const getAuthIdFromLocalStorage = () => {
  const isRegister = localStorage.getItem('SWAuthId') && localStorage.getItem('SWAuthId') !== 'undefined';
  return isRegister;
};

const getFormElements = (type) => {
  const emailInputElement = getInputEmailElement();
  const passInputElement = getInputPasswordElement('main');
  const rSWeatPassInputElement = type === 'register' ? getInputPasswordElement('rSWeat') : null;
  const isRegistrated = getAuthIdFromLocalStorage();

  const submitInputElement = getSubmitBtnElement(!isRegistrated ? 'SignIn' : 'LogIn');

  return [emailInputElement, passInputElement, rSWeatPassInputElement, submitInputElement];
};

const renderAuthForm = (type) => {
  const formContainer = document.querySelector('form.login_form');
  formContainer.innerHTML = '';
  const formContainerElements = getFormElements(type);
  formContainerElements.map((it) => {
    if (!it) return false;
    formContainer.insertAdjacentElement('beforeend', it);
    return formContainer;
  });
  return false;
};

const runListener = () => {
  const TABNAVIGATION = document.querySelector('.tab_navigation');
  TABNAVIGATION.addEventListener('click', (event) => {
    const { parentElement: { dataset: { type }, classList } } = event.target;
    event.preventDefault();
    if (classList.contains('active')) {
      return false;
    }
    return Array.from(TABNAVIGATION.children).forEach((ch) => {
      ch.classList.remove('active');
      ch.classList.remove('border-bottom-0');
      if (ch.dataset.type === type) {
        ch.classList.add('active');
        ch.classList.add('border-bottom-0');
        renderAuthForm(type);
      }
    });
  });
};

const getWrapperContainer = () => {
  const wrapperContainer = document.createElement('div');
  wrapperContainer.classList.add('wrapper');
  return wrapperContainer;
};

const getHelloText = () => {
  const helloWordContainer = document.createElement('div');
  helloWordContainer.classList.add('login_form__header');
  const h1Element = document.createElement('h1');
  h1Element.innerText = 'RSLang';

  const h3Element = document.createElement('h3');
  h3Element.innerText = 'Please Log in or Register to start playing.';

  helloWordContainer.insertAdjacentElement('beforeend', h1Element);
  helloWordContainer.insertAdjacentElement('beforeend', h3Element);
  return helloWordContainer;
};

const getNavigateTabs = () => {
  const tabNavigationContainer = document.createElement('nav');
  tabNavigationContainer.classList.add('tab_navigation__container');
  const ulTabNavigation = document.createElement('ul');
  ulTabNavigation.classList.add('nav', 'tab_navigation');
  ['Login', 'Register'].map((it) => {
    const lowerIt = it.toLowerCase();
    const liElement = document.createElement('li');
    liElement.classList.add('nav_item', lowerIt, 'rounded-top', 'border');
    if (it === 'Login') liElement.classList.add('active', 'border-bottom-0');
    liElement.setAttribute('data-type', lowerIt);
    const link = document.createElement('a');
    link.classList.add('nav-link');
    link.setAttribute('href', '#');
    link.innerText = it;
    liElement.insertAdjacentElement('beforeend', link);
    return ulTabNavigation.insertAdjacentElement('beforeend', liElement);
  });
  tabNavigationContainer.insertAdjacentElement('beforeend', ulTabNavigation);
  return tabNavigationContainer;
};

const getFromContainer = () => {
  const fromContainer = document.createElement('div');
  fromContainer.classList.add('login_form__form_container');
  return fromContainer;
};

const getFormElementContainer = () => {
  const fromElement = document.createElement('form');
  fromElement.classList.add('form-group', 'login_form', 'from_login', 'border', 'border-top-0');
  return fromElement;
};

export const authorization = () => {
  const AUTHCONTANER = document.querySelector('section.login_from__container');
  const wrapperContainer = getWrapperContainer();
  const helloText = getHelloText();
  const formContainer = getFromContainer();
  const formElementContainer = getFormElementContainer();
  const navigateTabs = getNavigateTabs();
  formContainer.insertAdjacentElement('beforeend', navigateTabs);
  formContainer.insertAdjacentElement('beforeend', formElementContainer);
  wrapperContainer.insertAdjacentElement('beforeend', helloText);
  wrapperContainer.insertAdjacentElement('beforeend', formContainer);
  AUTHCONTANER.insertAdjacentElement('beforeend', wrapperContainer);
  renderAuthForm('login');
  runListener();
};
