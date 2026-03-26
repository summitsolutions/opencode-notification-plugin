import type { Adapter } from './router';
import type { PluginConfig } from './config';

export async function createAdapter(config: PluginConfig['adapters'][number]): Promise<Adapter> {
  if (config.type === 'smtp') {
    try {
      const { SmtpAdapter } = await import('./adapters/smtp');
      return new SmtpAdapter(config);
    } catch {
      throw new Error('SMTP adapter requires `nodemailer`. Please run `npm install nodemailer`');
    }
  }
  if (config.type === 'webhook') {
    const { WebhookAdapter } = await import('./adapters/webhook');
    return new WebhookAdapter(config);
  }
  throw new Error(`Unknown adapter type: ${(config as any).type}`);
}
