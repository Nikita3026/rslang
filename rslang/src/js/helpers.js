import GetData from './GetData';

export const createLink = (link) => {
  const linkElement = document.createElement('a');
  linkElement.href = link;
  return linkElement;
};

export const routTo = (path) => {
  window.location.href = path;
};

export const renderHeadDataToDom = (head) => {
  const headElement = document.querySelector('head');
  Array.from(head.children).forEach((it) => {
    headElement.insertAdjacentElement('beforeend', it);
  });
  return headElement;
};

export const renderBodyDataToDom = (body) => {
  const bodyElement = document.querySelector('body > script');
  Array.from(body.children).forEach((it) => {
    if (it.localName === 'script') return;
    bodyElement.insertAdjacentElement('beforebegin', it);
  });
};

export const setBodyDataToDom = async (path) => {
  const parseHtml = new GetData(path, 'get');
  await parseHtml.sendRequest()
    .then((response) => response.data)
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      renderHeadDataToDom(doc.head);
      renderBodyDataToDom(doc.body);
    })
    .catch((err) => {
      console.log('Something went wrong.', err);
    });
};

export const removeToken = () => {
  const localStorageData = JSON.parse(localStorage.getItem('SWAuthData'));
  delete localStorageData.token;
  delete localStorageData.time;
  const newLocalStorageData = JSON.stringify(localStorageData);
  return localStorage.setItem('SWAuthData', newLocalStorageData);
};

export const checkValidToken = () => {
  const localStorageData = JSON.parse(localStorage.getItem('SWAuthData'));
  let result = false;
  if (localStorageData && localStorageData.token) {
    const tokenTime = new Date(localStorageData.time);
    const now = new Date();
    const comp = now - tokenTime;
    result = comp < 14400000;
  }
  return result;
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
    })
    .catch((error) => {
      if (error.response.status === 401) {
        routTo('/authorization');
      }
      console.log(error.response.data);
    });
};

export const renderAlert = (alertValue, alertClass) => {
  const alertContainer = document.createElement('div');
  const dopClass = alertClass || 'alert-danger';
  alertContainer.classList.add('alert', dopClass);
  alertContainer.setAttribute('role', 'alert');
  alertContainer.innerText = alertValue;
  const closeIcon = document.createElement('span');
  closeIcon.classList.add('icon', 'icon-close');
  alertContainer.insertAdjacentElement('afterbegin', closeIcon);
  closeIcon.addEventListener('click', () => {
    alertContainer.classList.add('hide');
    setTimeout(() => alertContainer.remove(), 300);
  });
  setTimeout(() => {
    alertContainer.classList.add('hide');
    setTimeout(() => alertContainer.remove(), 300);
  }, 5000);
  return alertContainer;
};

export default {};
