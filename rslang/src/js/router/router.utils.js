let isLoading = false;

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

export const setHeadDataToDom = (head) => {
  const headElement = document.querySelector('head');
  Array.from(head.children).forEach((it) => {
    if (it.localName === 'script') return;
    headElement.insertAdjacentElement('beforeend', it);
  });
  return headElement;
};
export const setBodyDataToDom = (body) => {
  const bodyElement = document.querySelector('body');
  // bodyElement.innerHTML = '';
  Array.from(body.children).forEach((it) => {
    if (it.localName === 'script') return;
    bodyElement.insertAdjacentElement('beforeend', it);
  });
};

export const setIsLoading = (bool) => {
  isLoading = bool;
};
export const getIsLoading = () => isLoading;

export default {};
