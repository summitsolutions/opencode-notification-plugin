import type { Adapter } from '../router';
import type { PluginConfig } from '../config';

export class SmtpAdapter implements Adapter {
  private transporter: any;
  constructor(private config: Extract<PluginConfig['adapters'][number], { type: 'smtp' }>) {}

  async send(event: { type: string; title: string; message: string }): Promise<void> {
    if (!this.transporter) {
      const nodemailer = await import('nodemailer');
      this.transporter = nodemailer.createTransport({
        host: this.config.host,
        port: this.config.port,
        auth: this.config.user ? { user: this.config.user, pass: this.config.pass } : undefined,
      });
    }

    await this.transporter.sendMail({
      from: this.config.from,
      to: 'admin@local.test',
      subject: `[Notification] ${event.title}`,
      text: event.message,
    });
  }
}
