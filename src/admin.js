import { defaultProjects } from './data/projects.js';

const ADMIN_PASS = 'alazar2026';
const STORAGE_KEY = 'portfolio_projects';

function getProjects() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) { try { return JSON.parse(stored); } catch(e) { /* */ } }
  return [...defaultProjects];
}

function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// ── Login ──
const loginGate = document.getElementById('loginGate');
const dashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

if (sessionStorage.getItem('admin_auth') === 'true') {
  loginGate.style.display = 'none';
  dashboard.style.display = 'block';
  renderList();
}

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const pw = document.getElementById('adminPassword').value;
  if (pw === ADMIN_PASS) {
    sessionStorage.setItem('admin_auth', 'true');
    loginGate.style.display = 'none';
    dashboard.style.display = 'block';
    renderList();
  } else {
    loginError.textContent = 'Incorrect password.';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('admin_auth');
  location.reload();
});

// ── Project list ──
function renderList() {
  const list = document.getElementById('projectsList');
  const projects = getProjects();
  if (projects.length === 0) {
    list.innerHTML = `<div class="empty-state"><p>No projects yet.</p><button id="emptyAdd" class="btn btn-primary"><span>+ Add Your First Project</span></button></div>`;
    document.getElementById('emptyAdd')?.addEventListener('click', openAddModal);
    return;
  }
  list.innerHTML = projects.map((p, i) => `
    <div class="project-list-item">
      <div class="project-list-info">
        <div class="project-list-title">${p.title} <span style="font-size: 0.7rem; opacity: 0.5; text-transform: uppercase;">(${p.type})</span></div>
        <div class="project-list-meta">${p.category} · ${p.device || 'N/A'} · ${p.tech.slice(0, 3).join(', ')}</div>
      </div>
      <div class="project-list-actions">
        <button class="btn-sm edit-btn" data-index="${i}">Edit</button>
        <button class="btn-sm delete" data-index="${i}">Delete</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.index)));
  });
  list.querySelectorAll('.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Delete this project?')) {
        const projects = getProjects();
        projects.splice(parseInt(btn.dataset.index), 1);
        saveProjects(projects);
        renderList();
      }
    });
  });
}

// ── Modal ──
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const form = document.getElementById('projectForm');

function openAddModal() {
  modalTitle.textContent = 'Add New Project';
  form.reset();
  document.getElementById('projEditId').value = '';
  modal.style.display = 'flex';
}

function openEditModal(index) {
  const projects = getProjects();
  const p = projects[index];
  modalTitle.textContent = 'Edit Project';
  document.getElementById('projType').value = p.type || 'code';
  document.getElementById('projTitle').value = p.title;
  document.getElementById('projDesc').value = p.description;
  document.getElementById('projCategory').value = p.category;
  if (p.device) document.getElementById('projDevice').value = p.device;
  document.getElementById('projTech').value = p.tech.join(', ');
  document.getElementById('projUrl').value = p.url || '';
  document.getElementById('projScreenshot').value = p.screenshot || '';
  document.getElementById('projEditId').value = index;
  modal.style.display = 'flex';
}

function closeModalFn() { modal.style.display = 'none'; }

document.getElementById('addProjectBtn').addEventListener('click', openAddModal);
document.getElementById('closeModal').addEventListener('click', closeModalFn);
document.getElementById('cancelModal').addEventListener('click', closeModalFn);
document.querySelector('.modal-backdrop')?.addEventListener('click', closeModalFn);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const projects = getProjects();
  const editId = document.getElementById('projEditId').value;
  const projectData = {
    id: document.getElementById('projTitle').value.toLowerCase().replace(/\s+/g, '-'),
    type: document.getElementById('projType').value,
    title: document.getElementById('projTitle').value,
    description: document.getElementById('projDesc').value,
    category: document.getElementById('projCategory').value,
    device: document.getElementById('projDevice').value,
    tech: document.getElementById('projTech').value.split(',').map(t => t.trim()).filter(Boolean),
    url: document.getElementById('projUrl').value,
    screenshot: document.getElementById('projScreenshot').value,
  };

  if (editId !== '') {
    projects[parseInt(editId)] = projectData;
  } else {
    projects.push(projectData);
  }
  saveProjects(projects);
  closeModalFn();
  renderList();
});
