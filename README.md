# Mechanical_app

## Complete Frontend Demo (Working Flows + Dummy Content)

This project now includes a **working frontend demo** with multiple pages/flows and preloaded dummy data.

### Files
- `app/frontend/public/index.html`
- `app/frontend/public/styles.css`
- `app/frontend/public/app.js`

## Included Demo Flows

- Overview Dashboard (KPIs, priority distribution, recent activity)
- Create Request flow (submits new request)
- My Requests table (filter by status)
- HR Admin Queue (priority filter + Approve/Reject/Clarification actions)
- Notifications feed (updates from actions)
- Documents/Manuals for Requester and HR Admin
- Dark mode toggle
- Responsive layout for desktop/mobile

## Run in VS Code Terminal

```bash
cd app/frontend/public
python -m http.server 4173 --bind 0.0.0.0
```

If `python` is not available:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Open:
- `http://localhost:4173` (same machine)
- `http://<server-ip>:4173` (if remote VM/container)
