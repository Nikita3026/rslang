import { createSignPage, createStartPage } from './js/create';
import './js/dragHandler';

window.onload = () => {
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
  } else {
    createSignPage('IN');
  }
};
