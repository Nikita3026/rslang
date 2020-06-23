const axios = require('axios').default;

const CREATE_USER_LINK = 'https://afternoon-falls-25894.herokuapp.com/users';
const LOGIN_LINK = 'https://afternoon-falls-25894.herokuapp.com/signin';

export const getAuthorizationData = (user, action) => {
  const link = action === 'login' ? LOGIN_LINK : CREATE_USER_LINK;
  return axios.post(link, user);
};

export default {};
