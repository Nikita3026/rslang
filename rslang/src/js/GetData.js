/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { renderAlert, routeTo } from './helpers';
import Modal from './Modal/Modal';

const axios = require('axios').default;

const authData = JSON.parse(localStorage.getItem('SWAuthData'));
export class ApiService {
  loginUser(body) {
    return axios.post('https://afternoon-falls-25894.herokuapp.com/signin', body)
      .catch((error) => {
        if (error.response.status === 404) {
          renderAlert('Пользователь с таким email не существует');
          document.querySelector('form.form-group > button').disabled = true;
        }
        if (error.response.status === 403) {
          renderAlert('Комбинация email и пароль не верна');
          document.querySelector('form.form-group > button').disabled = true;
        }
        throw new Error(error.response.data);
      });
  }

  createUser(body) {
    return axios.post('https://afternoon-falls-25894.herokuapp.com/users', body)
      .catch((error) => {
        if (error.response.status === 417) {
          const buttons = [{ buttonLink: 'authorization.html', buttonText: 'Попробовать еще раз', buttonClass: 'btn-warning' }];
          const modal = new Modal('Ошибка', 'Пользователь с таким email уже существует.', 'auth', buttons);
          modal.init();
          document.querySelector('form.form-group > button').disabled = true;
        }
        if (error.response.status === 422) {
          renderAlert('Комбинация email и пароль не верна.');
          document.querySelector('form.form-group > button').disabled = true;
        }
        throw new Error(error.response.data);
      });
  }

  parseHtmlToDOM(link) {
    return axios.get(link)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }

  updateToken(link) {
    const options = {
      headers: {
        common: {
          Authorization: `Bearer ${authData.refreshToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          WithCredentials: true,
          'Access-Control-Allow-Origin': '*',
        },
      },
    };
    return axios.get(link, options)
      .catch((error) => {
        if (error.response.status === 401) {
          routeTo('authorization.html');
        }
        throw new Error(error.response.data);
      });
  }

  getWords(link) {
    return axios.get(link)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }

  getUser() {
    const options = {
      headers: {
        Authorization: `Bearer ${authData.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return axios.get(`https://afternoon-falls-25894.herokuapp.com/users/${authData.id}`, options)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }

  createUserWord(link, word) {
    const options = {
      headers: {
        common: {
          Authorization: `Bearer ${authData.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          WithCredentials: true,
          'Access-Control-Allow-Origin': '*',
        },
      },
    };
    return axios.post(link, word, options)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }

  upsetStatistics(body) {
    const options = {
      headers: {
        common: {
          Authorization: `Bearer ${authData.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          WithCredentials: true,
          'Access-Control-Allow-Origin': '*',
        },
      },
    };
    return axios.put(`https://afternoon-falls-25894.herokuapp.com/users/${authData.userId}/statistics`, body, options)
      .catch((error) => {
        throw new Error(error.response.data);
      });
  }

  getStatistics() {
    const options = {
      headers: {
        Authorization: `Bearer ${authData.token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    return axios.get(`https://afternoon-falls-25894.herokuapp.com/users/${authData.userId}/statistics`, options);
  }
}

const apiService = new ApiService();

export default apiService;
