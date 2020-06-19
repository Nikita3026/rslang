const sidebarButton = document.getElementById('sidebarCollapse');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
  sidebar.classList.toggle('active');
}

sidebarButton.addEventListener('click', toggleSidebar);
