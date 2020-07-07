/* eslint-disable import/no-cycle */
import 'bootstrap';
import { restart } from './utils';

let clonedData = null;

const STATSCONTAINER = document.querySelector('section.stat__container');
const STATSWRAPPER = document.querySelector('section.stat__container > .stat_wrapper');

const clearStat = () => {
  STATSWRAPPER.innerHTML = '';
};

const closeStat = () => {
  document.querySelector('.stat__container').style.display = 'none';
};

const getSuccessContainer = () => {
  const successContainer = document.createElement('div');
  successContainer.classList.add('success_items');
  STATSWRAPPER.insertAdjacentElement('beforeend', successContainer);
  return successContainer;
};

const getFailedContainer = () => {
  const failedContainer = document.createElement('div');
  failedContainer.classList.add('failed_items');
  STATSWRAPPER.insertAdjacentElement('beforeend', failedContainer);
  return failedContainer;
};

const cloneDataNode = () => {
  clonedData = document.querySelector('.words__container > .wrapper').cloneNode(true);
  // return clonedNode;
};

const getSuccessNodes = () => {
  const nodesSuccess = Array.from(clonedData.children).filter((it) => it.classList.contains('checked'));
  return nodesSuccess;
};

const getFiledNodes = () => {
  const nodesFiled = Array.from(clonedData.children).filter((it) => !it.classList.contains('checked'));
  return nodesFiled;
};

const renderSuccessNodesToDom = () => {
  const nodesSuccess = getSuccessNodes();
  const headerText = document.createElement('div');
  headerText.insertAdjacentText('beforeend', 'Успешно');
  headerText.classList.add('result_count_header');
  const count = document.createElement('span');
  count.classList.add('success');
  headerText.insertAdjacentElement('beforeend', count);
  const countNumber = nodesSuccess.length;
  count.insertAdjacentText('beforeend', countNumber.toString());
  const successContainer = getSuccessContainer();
  // let failedsuccessContainerContainer = document.querySelector('.success_items');
  successContainer.insertAdjacentElement('beforeend', headerText);
  nodesSuccess.forEach((it) => {
    successContainer.insertAdjacentElement('beforeend', it);
  });
};

const renderFailedNodesToDom = () => {
  const nodesFiled = getFiledNodes();
  const failedContainer = getFailedContainer();
  const headerText = document.createElement('div');
  headerText.insertAdjacentText('beforeend', 'Ошибок');
  headerText.classList.add('result_count_header');
  const count = document.createElement('span');
  headerText.insertAdjacentElement('beforeend', count);
  const countNumber = nodesFiled.length;
  count.insertAdjacentText('beforeend', countNumber.toString());
  failedContainer.insertAdjacentElement('beforeend', headerText);
  // let failedContainer = document.querySelector('.failed_items');

  nodesFiled.forEach((it) => {
    failedContainer.insertAdjacentElement('beforeend', it);
  });
};

const createButton = (text, classList) => {
  const buttonElement = document.createElement('button');
  buttonElement.innerText = text;
  const classListArr = classList.split(',');
  classListArr.forEach((it) => {
    buttonElement.classList.add(it.replace(/\s*/, ''));
  });
  buttonElement.classList.add('btn');
  return buttonElement;
};

const handleClickStatButtons = (event) => {
  if (!event.target.classList.contains('btn')) return;
  const { target } = event;

  if (target.classList.contains('btn_return')) {
    closeStat();
  }

  if (target.classList.contains('btn_new_game')) {
    closeStat();
    restart();
  }
};

const renderStatButtonsToDom = () => {
  if (document.querySelector('.stat__container .buttons__container')) return;
  const buttonReturn = createButton('Return', 'btn_return, btn-info');
  const buttonNewGame = createButton('New Game', 'btn_new_game, btn-success');
  const statButtonsContainer = document.createElement('div');
  statButtonsContainer.classList.add('buttons__container');
  STATSCONTAINER.insertAdjacentElement('beforeend', statButtonsContainer);
  statButtonsContainer.insertAdjacentElement('beforeend', buttonReturn);
  statButtonsContainer.insertAdjacentElement('beforeend', buttonNewGame);
  statButtonsContainer.addEventListener('click', handleClickStatButtons);
};

export const renderStatToDom = () => {
  clearStat();
  cloneDataNode();
  renderSuccessNodesToDom();
  renderFailedNodesToDom();
  renderStatButtonsToDom();
};

export default {};
