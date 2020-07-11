import { createSignPage, createStartPage } from './js/create';
import './js/dragHandler';

window.onload = () => {
  // signIN({ email: 'o@user.com', password: 'Gfhjkm_123' });
  const token = localStorage.getItem('token');
  if (token) {
    createStartPage();
  } else {
    createSignPage('IN');
  }
};
