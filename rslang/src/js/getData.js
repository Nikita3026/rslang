/* eslint-disable import/prefer-default-export */
const CREATE_USER_LINK = 'https://afternoon-falls-25894.herokuapp.com/users';
const LOGIN_LINK = 'https://afternoon-falls-25894.herokuapp.com/signin';
export const getAuthorizationData = async (user, action) => {
  const fetchLink = action === 'login' ? LOGIN_LINK : CREATE_USER_LINK;
  const rawResponse = await fetch(fetchLink, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const data = await rawResponse.json();
  return data;
};
