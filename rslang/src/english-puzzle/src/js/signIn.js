
import createElement from './createElement';
import existRemove from './existRemove';

export default (user) => {
  //URL use RS School
  fetch('https://afternoon-falls-25894.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  }).then((data) => {
    const { ok } = data;
    if (ok) {
      return data.json();
    }
    return data.text();
  })
    .then((data) => {
      existRemove('.error-msg-signin');
      if (typeof data === 'string') {
        const msg = createElement('span', {
          classList: ['error-msg-signin'],
          innerText: `${data}`,
        }, {
          //Colour of error and effect
          color: 'red',
        });
        document.querySelector('.sign-in').before(msg);
      } else {
        //write local storage
        localStorage.setItem('token', data.token);
        window.location.reload();
      }
    });
};
