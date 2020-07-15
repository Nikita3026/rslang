// Fuction for data of log and local current date

export default () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const hour = `${date.getHours()}`;
  const minute = `${Number(date.getMinutes()) >= 10 ? date.getMinutes() : 0 + String(date.getMinutes())}`;
  const second = `${Number(date.getSeconds()) >= 10 ? date.getSeconds() : 0 + String(date.getSeconds())}`;
  const currentDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  return `${currentDate} ${hour}:${minute}:${second}`;
};
