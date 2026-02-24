# Mechanical_app

## Frontend Demo Included

A runnable demo UI is now available at:

- `app/frontend/public/index.html`

It demonstrates:
- Approval request submission form (invoice, material, weight, cost, destination, ship date, priority)
- HR Admin pending queue
- Priority filtering (`High`, `Medium`, `Low`)
- Sorting by priority and oldest pending first
- Basic in-app notification toast on submit

## Run locally

From repo root:

```bash
cd app/frontend/public
python3 -m http.server 4173
```

Then open:

- `http://localhost:4173`
