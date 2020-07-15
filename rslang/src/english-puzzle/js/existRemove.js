// Function remove element
export default (className) => {
  const el = document.querySelector(className);
  if (el) {
    el.remove();
  }
};
