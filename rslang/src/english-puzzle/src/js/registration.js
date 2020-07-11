// Choice and check statsu
export default (status) => {
  if (status === 'logged') {
    document.querySelector('.logout').classList.remove('event-none');
    document.querySelector('.page-sign-in').classList.add('event-none');
    document.querySelector('.page-sign-up').classList.add('event-none');
  }
  if (status === 'not logged') {
    document.querySelector('.logout').classList.add('event-none');
    document.querySelector('.page-sign-in').classList.remove('event-none');
    document.querySelector('.page-sign-up').classList.remove('event-none');
  }
};
