import { Adapter } from '../router';
import { PluginConfig } from '../config';
import type { Transporter } from 'nodemailer';

export class SmtpAdapter implements Adapter {
  private transporter: Transporter;
  constructor(private config: Extract<PluginConfig['adapters'][number], { type: 'smtp' }>) {
    // We expect the user to have installed nodemailer
    const nodemailer = require('nodemailer');
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      auth: config.user ? { user: config.user, pass: config.pass } : undefined,
    });
  }

  async send(event: { type: string; title: string; message: string }): Promise<void> {
    await this.transporter.sendMail({
      from: this.config.from,
      to: 'admin@local.test',
      subject: `[Notification] ${event.title}`,
      text: event.message,
    });
  }
}
