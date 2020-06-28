let isLoaded = null;

export const renderLoadingIcon = (bool) => {
  const body = document.querySelector('body');
  const iconElement = '<div class="cssload-loader"><div class="cssload-inner cssload-one"></div><div class="cssload-inner cssload-two"></div><div class="cssload-inner cssload-three"></div></div>';
  const iconContainer = document.createElement('div');
  iconContainer.classList.add('loading__container');
  iconContainer.insertAdjacentHTML('beforeend', iconElement);
  if (bool) {
    body.insertAdjacentElement('afterbegin', iconContainer);
  } else document.querySelector('.loading__container').remove();
};

export const setIsLoaded = (bool) => {
  isLoaded = bool;
};
export const getIsLoaded = () => isLoaded;

export const setHeadDataToDom = (head) => {
  const headElement = document.querySelector('head');
  Array.from(head.children).forEach((it) => {
    headElement.insertAdjacentElement('beforeend', it);
  });
  return headElement;
};
export const setBodyDataToDom = (body) => {
  const bodyElement = document.querySelector('body > script');
  // bodyElement.innerHTML = '';
  Array.from(body.children).forEach((it) => {
    if (it.localName === 'script') return;
    bodyElement.insertAdjacentElement('beforebegin', it);
  });
  setIsLoaded(true);
};

export default {};
