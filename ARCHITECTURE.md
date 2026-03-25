# Architecture: Notification Plugin

The core goal of this plugin is to enable flexible external notifications (SMTP, Webhooks, Slack/Mattermost, etc.) for OpenCode agents without introducing dependency bloat.

## Design Decisions

### 1. Lazy-Loading (Plugin Factory Pattern)
Instead of forcing the user to install every possible dependency (`nodemailer`, `apprise`, `fetch`, etc.) regardless of which notifications they use, the plugin uses a **Dynamic Factory**. Dependencies are imported `await import()` only when the adapter is initialized based on the `notification-plugin.json` config.

### 2. Port & Adapter Pattern
- **Port:** `NotificationRouter` defines the interface `Adapter` (a single `send` method).
- **Adapters:** Independent modules (`SmtpAdapter`, `WebhookAdapter`) implement the `Adapter` interface. This decoupling allows adding support for new services (e.g., Twilio, Slack) without changing the core plugin code.

### 3. Rigid Schema Validation (Zod)
We use `zod` to validate the `notification-plugin.json` configuration *before* any adapters are instantiated. This provides immediate, clear error messages to the user if they misconfigure an adapter.

## Workflow
1.  **Plugin Init**: OpenCode invokes the plugin function.
2.  **Config Load**: Plugin reads `notification-plugin.json`, validates it via `Zod`.
3.  **Adapter Factory**: For each enabled adapter, the factory dynamically imports necessary dependencies and instantiates the adapter.
4.  **Register**: The `NotificationRouter` stores these initialized adapters.
5.  **Event Handling**: On agent events (`session.idle`, etc.), the router dispatches the event concurrently to all registered adapters.
