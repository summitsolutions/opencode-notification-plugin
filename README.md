# @sumsol/opencode-notification-plugin

An extensible OpenCode plugin for sending external notifications (email, webhooks, etc.) when your AI agent needs human intervention.

## Features
- **Extensible:** Support multiple adapters (SMTP, Webhook) via a simple Port/Adapter pattern.
- **Lazy-Loaded:** Only installs/imports dependencies for adapters you actually use.
- **Strict Config:** Schema-based validation using Zod to catch misconfigurations early.
- **Local Dev Ready:** Includes Docker Compose for local SMTP testing (Mailpit).

## Installation
Add the plugin to your `opencode.json`:
```json
{
  "plugin": ["@sumsol/opencode-notification-plugin"]
}
```

## Configuration
Create a `notification-plugin.json` in your project root:
```json
{
  "adapters": [
    {
      "enabled": true,
      "type": "webhook",
      "url": "https://hooks.n8n.io/..."
    }
  ]
}
```

## Local Testing
See `docker-compose.yml` to spin up a local [Mailpit](https://mailpit.axllent.org/) instance to test SMTP notifications without external services.

## Development
To run tests:
```bash
bun test
```
