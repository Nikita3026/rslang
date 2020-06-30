export const createLink = (link) => {
  const linkElement = document.createElement('a');
  linkElement.href = link;
  return linkElement;
};

export const routTo = (path) => {
  window.location.href = path;
};

export default {};
