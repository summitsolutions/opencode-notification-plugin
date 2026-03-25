import { Adapter } from '../router';
import { PluginConfig } from '../config';

export class WebhookAdapter implements Adapter {
  constructor(private config: Extract<PluginConfig['adapters'][number], { type: 'webhook' }>) {}

  async send(event: { type: string; title: string; message: string }): Promise<void> {
    await fetch(this.config.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  }
}
