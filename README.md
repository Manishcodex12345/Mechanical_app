# Mechanical_app

## Workflow UI Showcase (Static)

This repo now includes a **pure HTML + CSS** responsive workflow showcase (not a functional app backend).

- File: `app/frontend/public/index.html`
- Styling: `app/frontend/public/styles.css`

## What this demo shows

- End-to-end approval workflow steps.
- Priority SLA matrix (High / Medium / Low).
- Notification channel overview.
- Roles and responsibility section (Requester, HR Admin, Manager).
- **Dark mode toggle**.
- Responsive layout for desktop/mobile.

## Run locally

```bash
cd app/frontend/public
python -m http.server 4173 --bind 0.0.0.0
```

If `python` is not available, use:

```bash
python3 -m http.server 4173 --bind 0.0.0.0
```

Then open:

- `http://localhost:4173` (same machine)
- `http://<server-ip>:4173` (remote machine)
