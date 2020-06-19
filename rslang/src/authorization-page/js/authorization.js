import { cleareContainer } from './helpers';
import { getAuthorizationData } from '../../js/getData';

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
  });
  return false;
};

export const logIn = () => {
  const AUTHCONTANER = document.querySelector('section.login_from__container');
  const userEmail = JSON.parse(localStorage.getItem('SWAuthData')).email;
  const userPassword = JSON.parse(localStorage.getItem('SWAuthData')).password;
  return getAuthorizationData({ email: `${userEmail}`, password: `${userPassword}` }, 'login')
    .then((res, rej) => {
      if (res) {
        const loginAuthData = {
          email: userEmail,
          password: userPassword,
          userId: res.userId,
          message: res.message,
          token: res.token,
        };
        localStorage.setItem('SWAuthData', JSON.stringify(loginAuthData));
        cleareContainer(AUTHCONTANER);
      }
      if (rej) {
        throw new Error();
      }
    });
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
    getAuthorizationData({ email: `${userEmail}`, password: `${userPassword}` }, actionType)
      .then((res, rej) => {
        if (res) {
          const regAuthData = {
            email: userEmail,
            password: userPassword,
            id: res.id,
          };
          localStorage.setItem('SWAuthData', JSON.stringify(regAuthData));
          toogleTabActive();
        }
        if (rej) {
          throw new Error();
        }
      })
      .then(() => logIn());
  } else {
    logIn();
  }
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

const checkIsButtonActive = () => {
  if (document.querySelector('.login_from_item.submit')) {
    if (
      isValidPassword
      && isEqualPass
      && isValidEmail
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
  emailInputElement.classList.add('login_from_item', 'email');
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
    checkIsButtonActive();
  });
  return emailInputElement;
};

const getInputPasswordElement = (type) => {
  const passwordInputElement = document.createElement('input');
  passwordInputElement.classList.add('login_from_item', 'password', type);
  passwordInputElement.type = 'password';
  passwordInputElement.required = true;
  passwordInputElement.placeholder = type === 'main' ? 'Enter your password*' : 'RSWeat your password*';
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
    checkIsButtonActive();
  });
  return passwordInputElement;
};

const getSubmitBtnElement = (text) => {
  const submitBtnElement = document.createElement('input');
  submitBtnElement.classList.add('login_from_item', 'submit');
  submitBtnElement.type = 'submit';
  submitBtnElement.disabled = !isFormValid;
  submitBtnElement.value = text;
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
  cleareContainer(formContainer);
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
    return TABNAVIGATION.children.forEach((ch) => {
      ch.classList.remove('active');
      if (ch.dataset.type === type) {
        ch.classList.add('active');
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
  h3Element.innerText = 'Please LogIn or Register to start playing.';

  helloWordContainer.insertAdjacentElement('beforeend', h1Element);
  helloWordContainer.insertAdjacentElement('beforeend', h3Element);
  return helloWordContainer;
};

const getNavigateTabs = () => {
  const tabNavigationContainer = document.createElement('nav');
  tabNavigationContainer.classList.add('tab_navigation__container');
  const ulTabNavigation = document.createElement('ul');
  ulTabNavigation.classList.add('tab_navigation');
  ['login', 'register'].map((it) => {
    const liElement = document.createElement('li');
    liElement.classList.add('nav_item', it);
    liElement.setAttribute('data-type', it);
    const link = document.createElement('a');
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
  fromElement.classList.add('login_form', 'from_login');
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
