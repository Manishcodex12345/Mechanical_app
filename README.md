# Mechanical_app

## Approval Workflow App Blueprint

This app can solve your manual invoice follow-up problem by giving both requesters and HR admins a clear workflow, priority queue, and automatic reminders.

## Core Problem to Solve

You currently:
- Send invoice/material approval requests manually.
- Follow up repeatedly with HR admins.
- Need quick approvals before shipping materials from India to USA/Canada.

The app should reduce manual follow-ups and make approval status visible in real time.

## Recommended Flow (MVP)

### 1. Request Creation
Requester submits:
- Invoice number
- Material description
- Weight
- Cost
- Destination country (USA/Canada)
- Required shipping date
- Priority (`Low`, `Medium`, `High`)
- Optional attachments (invoice PDF, shipping docs)

### 2. Validation
Before submission:
- Ensure weight and cost are numeric and positive.
- Ensure shipping date is not in the past.
- Require destination and invoice number.

### 3. HR Admin Queue
HR admin dashboard should show:
- **Pending Approvals list sorted by priority + age**.
- Tabs or filters for `High`, `Medium`, `Low`.
- SLA countdown (e.g., High must be reviewed within 4 hours).

Sort logic suggestion:
1. Priority weight (`High > Medium > Low`)
2. Oldest request first inside same priority
3. Earliest required shipping date first as tie-breaker

### 4. Approval Decision
Admin can:
- Approve
- Reject (mandatory reason)
- Request Clarification

Each action should generate a timeline event and notification.

### 5. Post-Approval Execution
After approval:
- Mark as `Ready to Ship`
- Notify logistics/requester
- Capture shipment reference/tracking

## Priority Model Suggestion

Use both **business urgency** and **financial risk**:
- **High**: urgent ship date (<= 2 days), high-value invoice, or customs-sensitive materials.
- **Medium**: normal cycle with moderate value.
- **Low**: non-urgent replenishment.

You can auto-suggest priority based on rules, but still allow manual override with justification.

## Notification Strategy (Important)

You mentioned notifications were not covered yet; this is critical for reducing manual follow-ups.

### Notification Triggers
- Request submitted
- Request assigned to HR admin
- SLA reminder before due time
- SLA breach/escalation
- Approved / Rejected / Clarification requested
- Shipment marked dispatched

### Channels
Start simple with:
- In-app notifications (required)
- Email notifications (required)
Later optional:
- Slack / Microsoft Teams
- WhatsApp/SMS for High priority escalations only

### Reminder and Escalation Rules
Example:
- High: reminder at 1 hour, escalate at 4 hours
- Medium: reminder at 6 hours, escalate at 24 hours
- Low: reminder at 24 hours, escalate at 48 hours

Escalation target can be a secondary approver or HR manager.

## Suggested Data Model

### Entities
- `User` (Requester, HR Admin, Manager)
- `ApprovalRequest`
- `Invoice`
- `MaterialItem`
- `ApprovalActionLog`
- `Notification`
- `Shipment`

### Key fields for ApprovalRequest
- `request_id`
- `invoice_number`
- `priority`
- `status` (`Pending`, `InReview`, `Approved`, `Rejected`, `ClarificationNeeded`, `ReadyToShip`, `Shipped`)
- `weight`
- `cost`
- `destination_country`
- `requested_ship_date`
- `assigned_admin_id`
- `sla_due_at`
- `created_at`, `updated_at`

## Dashboard Recommendations

### Requester Dashboard
- My requests with status chips
- Last action and pending with whom
- Expected approval time

### HR Admin Dashboard
- Priority queue
- Overdue requests block (top of page)
- One-click bulk actions for low-risk approvals (optional later)

### Manager Dashboard (later phase)
- SLA performance
- Bottlenecks by admin
- Approval turnaround trends by priority

## Audit and Compliance Must-Haves

- Full action history with timestamp/user.
- Reason mandatory on rejection or priority change.
- Immutable logs for compliance and dispute resolution.

## Metrics to Track

- Average approval turnaround time
- SLA breach rate
- High-priority pending count
- Rejection rate and top rejection reasons
- Notification delivery/read rate

## Suggested Implementation Phases

1. **Phase 1 (MVP)**
   - Request form + HR pending queue + approve/reject + email/in-app notifications
2. **Phase 2**
   - SLA timers + escalation + clarification workflow
3. **Phase 3**
   - Analytics dashboard + rule-based auto-priority + external integrations

## Next-Step Backlog (Practical)

- Define exact SLA per priority with HR team.
- Finalize required fields for invoice/material request form.
- Build status lifecycle diagram and get stakeholder approval.
- Implement notification templates (submit/approve/reject/reminder/escalation).
- Pilot with one India -> USA lane before rolling out to Canada.

## Quick Product Suggestions for Better Adoption

- Keep form short; add optional advanced fields under “More details”.
- Show expected response time during submission to reduce anxiety.
- Add comment thread per request to avoid email chains.
- Add “Nudge Admin” button with cooldown (e.g., once every 4 hours).
- Add mobile-friendly admin queue for quick approvals.

---

If you want, the next step can be converting this into:
1. User stories,
2. API contract draft,
3. A simple UI wireframe checklist.
