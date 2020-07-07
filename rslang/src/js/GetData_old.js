/* eslint-disable import/no-cycle */
import { renderAlert, routeTo } from './helpers';
import Modal from './Modal/Modal';

const axios = require('axios').default;

export default class GetData {
  constructor(link = '', body = null) {
    this.link = link;
    this.body = body;
  }

  loginUser() {
    return axios.post('https://afternoon-falls-25894.herokuapp.com/signin', this.body)
      .catch((error) => {
        if (error.response.status === 404) {
          renderAlert('Пользователь с таким email не существует');
          document.querySelector('form.form-group > button').disabled = true;
        }
        if (error.response.status === 403) {
          renderAlert('Комбинация email и пароль не верна');
          document.querySelector('form.form-group > button').disabled = true;
        }
        renderAlert(error.response.status);
      });
  }

  createUser() {
    return axios.post('https://afternoon-falls-25894.herokuapp.com/users', this.body)
      .catch((error) => {
        if (error.response.status === 417) {
          const buttons = [{ buttonLink: '/authorization', buttonText: 'Попробовать еще раз', buttonClass: 'btn-warning' }];
          const modal = new Modal('Ошибка', 'Пользователь с таким email уже существует.', 'auth', buttons);
          modal.init();
          document.querySelector('form.form-group > button').disabled = true;
        }
        if (error.response.status === 422) {
          renderAlert('Комбинация email и пароль не верна.');
          document.querySelector('form.form-group > button').disabled = true;
        }
        renderAlert(error.response.status);
      });
  }

  parseHtmlToDOM() {
    return axios.get(this.link)
      .catch((err) => {
        renderAlert('Something went wrong.', err);
      });
  }

  updateToken() {
    const options = {
      headers: {
        common: {
          Authorization: `Bearer ${this.body}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          WithCredentials: true,
          'Access-Control-Allow-Origin': '*',
        },
      },
    };
    return axios.get(this.link, options)
      .catch((error) => {
        if (error.response.status === 401) {
          routeTo('/authorization');
        }
        renderAlert(error.response.data);
      });
  }

  getWords() {
    return axios.get(this.link)
      .catch((error) => {
        renderAlert(error.response.status);
      });
  }
}
