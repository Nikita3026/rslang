import 'bootstrap';
import '../css/basic-layout.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Router from '../../js/router/router';
import { routes } from '../../js/router/routes';

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

const parseHTML = async () => {
  await new Router(routes);
};

window.onload = async () => {
  await parseHTML();
  setTimeout(() => document.getElementById('sidebarCollapse').addEventListener('click', toggleSidebar), 500);
};
