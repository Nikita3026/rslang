export const createLink = (link) => {
  const linkElement = document.createElement('a');
  linkElement.href = link;
  return linkElement;
};

export default {};
