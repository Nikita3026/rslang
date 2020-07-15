export default (storage, levelObj) => {
  const games = window.localStorage.getItem('english-puzzle-statistics');
  if (games) {
    const arr = JSON.parse(games);
    arr.push(storage);
    window.localStorage.setItem('english-puzzle-statistics', JSON.stringify(arr));
  } else {
    window.localStorage.setItem('english-puzzle-statistics', JSON.stringify([storage]));
  }

  window.localStorage.setItem('english-puzzle-levelObj', JSON.stringify(levelObj));
};
