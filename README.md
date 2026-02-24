# Mechanical_app

## Frontend Demo Included

A runnable demo UI is available at:

- `app/frontend/public/index.html`

## What is included now

- Left-side navigation tree with:
  - Requester Portal
  - HR Admin Dashboard
  - Documents
- Requester Portal with approval request submission form.
- HR Admin Dashboard with pending list, priority filters, and sorting (High → Low, oldest first).
- Documents section containing user manuals for:
  - Requester/User
  - HR Admin
- Basic in-app toast notification after request submission.

## Run locally

From repo root:

```bash
cd app/frontend/public
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open:

- `http://localhost:4173`
