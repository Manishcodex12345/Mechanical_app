const state = {
  currentView: 'dashboard',
  priorityFilter: 'All',
  myFilter: 'All'
};

const requests = [
  {
    id: 'REQ-1001', invoice: 'INV-2026-100', material: 'Steel Panels', weight: 420, cost: 12000,
    destination: 'USA', shipDate: '2026-03-10', priority: 'High', requester: 'Rahul Sharma',
    status: 'Pending', createdAt: '2026-02-20T07:30:00Z', history: ['Submitted by Rahul Sharma']
  },
  {
    id: 'REQ-1002', invoice: 'INV-2026-101', material: 'Copper Coils', weight: 180, cost: 4800,
    destination: 'Canada', shipDate: '2026-03-12', priority: 'Medium', requester: 'Priya Iyer',
    status: 'ClarificationNeeded', createdAt: '2026-02-20T12:00:00Z', history: ['Submitted by Priya Iyer', 'Need revised invoice format']
  },
  {
    id: 'REQ-1003', invoice: 'INV-2026-102', material: 'Aluminium Sheets', weight: 90, cost: 2100,
    destination: 'USA', shipDate: '2026-03-22', priority: 'Low', requester: 'Arjun Mehta',
    status: 'Approved', createdAt: '2026-02-21T10:45:00Z', history: ['Submitted by Arjun Mehta', 'Approved by HR Admin']
  },
  {
    id: 'REQ-1004', invoice: 'INV-2026-103', material: 'Hydraulic Valves', weight: 60, cost: 3500,
    destination: 'Canada', shipDate: '2026-03-18', priority: 'High', requester: 'Neha Kapoor',
    status: 'Rejected', createdAt: '2026-02-22T08:10:00Z', history: ['Submitted by Neha Kapoor', 'Rejected - missing customs code']
  }
];

const notifications = [
  'REQ-1001 submitted and assigned to HR Admin.',
  'REQ-1002 needs clarification on invoice format.',
  'REQ-1003 approved and marked Ready to Ship.',
  'REQ-1004 rejected with reason: missing customs code.'
];

const viewConfig = {
  dashboard: ['Overview Dashboard', 'Track end-to-end invoice approvals for India → USA/Canada shipments.'],
  'create-request': ['Create Request', 'Submit new invoice approval requests with priority and shipment details.'],
  'my-requests': ['My Requests', 'Review all requests submitted by users with status visibility.'],
  'admin-queue': ['HR Admin Queue', 'Prioritize pending approvals by urgency and shipment timelines.'],
  notifications: ['Notifications', 'In-app feed of alerts and status changes (demo content).'],
  documents: ['Documents / Manuals', 'Role-based guidance for requester and HR admin users.']
};

const priorityRank = { High: 3, Medium: 2, Low: 1 };

const q = (s) => document.querySelector(s);
const qa = (s) => Array.from(document.querySelectorAll(s));

function showToast(msg) {
  const t = q('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1700);
}

function setView(view) {
  state.currentView = view;
  qa('.nav-link').forEach((b) => b.classList.toggle('active', b.dataset.view === view));
  qa('.view').forEach((v) => v.classList.toggle('active', v.id === view));
  q('#viewTitle').textContent = viewConfig[view][0];
  q('#viewSubtitle').textContent = viewConfig[view][1];
}

function priorityCount(priority) {
  return requests.filter((r) => r.priority === priority).length;
}

function statusCount(status) {
  return requests.filter((r) => r.status === status).length;
}

function renderDashboard() {
  q('#kpiCards').innerHTML = [
    ['Total Requests', requests.length],
    ['Pending', statusCount('Pending')],
    ['Approved', statusCount('Approved')],
    ['SLA Risk (High Pending)', requests.filter((r) => r.priority === 'High' && r.status === 'Pending').length]
  ].map(([label, val]) => `<article class="card kpi-card"><h4>${label}</h4><div class="value">${val}</div></article>`).join('');

  const total = requests.length || 1;
  q('#priorityBars').innerHTML = ['High', 'Medium', 'Low'].map((p) => {
    const count = priorityCount(p);
    const pct = Math.round((count / total) * 100);
    return `
      <div class="progress-row">
        <div class="labels"><span>${p}</span><span>${count} (${pct}%)</span></div>
        <div class="progress"><span class="${p.toLowerCase()}" style="width:${pct}%"></span></div>
      </div>
    `;
  }).join('');

  const activity = requests
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6)
    .map((r) => `<li>${r.id}: ${r.status} (${r.priority}) - ${r.material}</li>`)
    .join('');
  q('#activityList').innerHTML = activity;
}

function badgePriority(priority) {
  return `<span class="badge ${priority.toLowerCase()}">${priority}</span>`;
}

function badgeStatus(status) {
  return `<span class="badge status">${status}</span>`;
}

function renderMyRequests() {
  const body = q('#myRequestsBody');
  const rows = requests
    .filter((r) => state.myFilter === 'All' || r.status === state.myFilter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((r) => `
      <tr>
        <td>${r.invoice}</td>
        <td>${r.material}</td>
        <td>${badgePriority(r.priority)}</td>
        <td>${badgeStatus(r.status)}</td>
        <td>${r.destination}</td>
        <td>${r.shipDate}</td>
      </tr>
    `)
    .join('');

  body.innerHTML = rows || `<tr><td colspan="6">No requests for selected filter.</td></tr>`;
}

function renderAdminQueue() {
  const cards = requests
    .filter((r) => ['Pending', 'ClarificationNeeded'].includes(r.status))
    .filter((r) => state.priorityFilter === 'All' || r.priority === state.priorityFilter)
    .sort((a, b) => {
      if (priorityRank[b.priority] !== priorityRank[a.priority]) return priorityRank[b.priority] - priorityRank[a.priority];
      return new Date(a.createdAt) - new Date(b.createdAt);
    })
    .map((r) => `
      <article class="admin-item ${r.priority.toLowerCase()}">
        <h4>${r.id} • ${r.invoice} • ${badgePriority(r.priority)} ${badgeStatus(r.status)}</h4>
        <div class="admin-meta">
          <span>Material: ${r.material}</span>
          <span>Weight: ${r.weight} kg</span>
          <span>Cost: $${Number(r.cost).toLocaleString()}</span>
          <span>Destination: ${r.destination}</span>
          <span>Ship date: ${r.shipDate}</span>
        </div>
        <div class="admin-actions">
          <button class="btn secondary" data-action="Approved" data-id="${r.id}">Approve</button>
          <button class="btn secondary" data-action="Rejected" data-id="${r.id}">Reject</button>
          <button class="btn secondary" data-action="ClarificationNeeded" data-id="${r.id}">Need Clarification</button>
        </div>
      </article>
    `)
    .join('');

  q('#adminCards').innerHTML = cards || '<div class="card">No pending items for selected filter.</div>';

  qa('[data-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const req = requests.find((x) => x.id === id);
      if (!req) return;
      req.status = action;
      req.history.push(`Updated by HR Admin: ${action}`);
      notifications.unshift(`${id} updated to ${action}.`);
      showToast(`${id} marked as ${action}.`);
      renderAll();
    });
  });
}

function renderNotifications() {
  q('#notificationList').innerHTML = notifications.map((n) => `<li>${n}</li>`).join('');
}

function renderAll() {
  renderDashboard();
  renderMyRequests();
  renderAdminQueue();
  renderNotifications();
}

function wireEvents() {
  qa('.nav-link').forEach((btn) => {
    btn.addEventListener('click', () => setView(btn.dataset.view));
  });

  q('#requestForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const v = Object.fromEntries(data.entries());
    const newId = `REQ-${1000 + requests.length + 1}`;
    requests.push({
      id: newId,
      invoice: v.invoice,
      material: v.material,
      weight: Number(v.weight),
      cost: Number(v.cost),
      destination: v.destination,
      shipDate: v.shipDate,
      priority: v.priority,
      requester: v.requester,
      status: 'Pending',
      createdAt: new Date().toISOString(),
      history: [`Submitted by ${v.requester}`, `Justification: ${v.justification}`]
    });
    notifications.unshift(`${newId} submitted and assigned to HR Admin.`);
    e.currentTarget.reset();
    showToast(`Request ${newId} submitted successfully.`);
    setView('my-requests');
    renderAll();
  });

  qa('[data-priority-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.priorityFilter = btn.dataset.priorityFilter;
      qa('[data-priority-filter]').forEach((x) => x.classList.remove('active'));
      btn.classList.add('active');
      renderAdminQueue();
    });
  });

  q('#myFilter').addEventListener('change', (e) => {
    state.myFilter = e.target.value;
    renderMyRequests();
  });

  q('#themeToggle').addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
  });

  setInterval(() => {
    q('#clockPill').textContent = new Date().toLocaleTimeString();
  }, 1000);
  q('#clockPill').textContent = new Date().toLocaleTimeString();
}

wireEvents();
renderAll();
