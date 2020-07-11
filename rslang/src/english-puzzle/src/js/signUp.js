// For page sign UP and create new user
import createElement from './createElement';
import existRemove from './existRemove';



export default (user) => {
  // URL used RS school
  fetch('https://afternoon-falls-25894.herokuapp.com/users', {
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
    // return data and time for logs and other
    return data.text();
  })
    .then((data) => {
      existRemove('.error-msg-signup');
      const msg = createElement('span', {
        classList: ['error-msg-signup'],
      }, {
        //Colour of error and effects
        color: 'darkred',
      });
      document.querySelector('.sign-up').before(msg);
      if (typeof data === 'string') {
        msg.innerText = `${data}`;
      } else {
        // Create new user with data of create
        console.log('Create new user:', data);
        msg.innerText = 'New user was created.';
      }
    });
};
