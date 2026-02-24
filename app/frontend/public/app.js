const requests = [
  {
    invoice: "INV-2026-100",
    material: "Steel Panels",
    weight: 420,
    cost: 12000,
    destination: "USA",
    shipDate: "2026-03-10",
    priority: "High",
    createdAt: "2026-02-20T07:30:00Z"
  },
  {
    invoice: "INV-2026-101",
    material: "Copper Coils",
    weight: 180,
    cost: 4800,
    destination: "Canada",
    shipDate: "2026-03-12",
    priority: "Medium",
    createdAt: "2026-02-20T12:00:00Z"
  },
  {
    invoice: "INV-2026-102",
    material: "Aluminium Sheets",
    weight: 90,
    cost: 2100,
    destination: "USA",
    shipDate: "2026-03-22",
    priority: "Low",
    createdAt: "2026-02-21T10:45:00Z"
  }
];

const priorityRank = { High: 3, Medium: 2, Low: 1 };
let activeFilter = "All";

const listEl = document.getElementById("list");
const toast = document.getElementById("toast");
const form = document.getElementById("requestForm");

function showToast(text) {
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function renderAdminList() {
  const filtered = requests
    .filter((r) => activeFilter === "All" || r.priority === activeFilter)
    .sort((a, b) => {
      if (priorityRank[b.priority] !== priorityRank[a.priority]) {
        return priorityRank[b.priority] - priorityRank[a.priority];
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  listEl.innerHTML = "";

  if (!filtered.length) {
    listEl.innerHTML = `<div class="empty">No ${activeFilter.toLowerCase()} priority requests pending.</div>`;
    return;
  }

  filtered.forEach((r) => {
    const card = document.createElement("article");
    card.className = `item ${r.priority.toLowerCase()}`;

    const createdAgoHours = Math.max(
      1,
      Math.floor((Date.now() - new Date(r.createdAt).getTime()) / 36e5)
    );

    card.innerHTML = `
      <h3>${r.invoice} • ${r.material} <span class="badge ${r.priority.toLowerCase()}">${r.priority}</span></h3>
      <div class="meta">
        <span>Weight: ${r.weight} kg</span>
        <span>Cost: $${r.cost.toLocaleString()}</span>
        <span>Destination: ${r.destination}</span>
        <span>Ship Date: ${r.shipDate}</span>
        <span>Pending: ${createdAgoHours}h</span>
      </div>
    `;
    listEl.appendChild(card);
  });
}

function wireNavigation() {
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.view;

      document.querySelectorAll(".nav-link").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      document.querySelectorAll(".view").forEach((view) => view.classList.remove("active"));
      document.getElementById(target).classList.add("active");
    });
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const req = Object.fromEntries(data.entries());

  requests.push({
    invoice: req.invoice,
    material: req.material,
    weight: Number(req.weight),
    cost: Number(req.cost),
    destination: req.destination,
    shipDate: req.shipDate,
    priority: req.priority,
    createdAt: new Date().toISOString()
  });

  form.reset();
  renderAdminList();
  showToast("Request submitted and HR admin notified.");
});

document.querySelectorAll("[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;
    document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    renderAdminList();
  });
});

wireNavigation();
renderAdminList();
